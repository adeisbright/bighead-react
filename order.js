 makeOrder = async (req , res,  next) => {
        try {
            let {
                items , 
                address ,
                eventAddress , 
                latitude , 
                longitude ,
                startDate ,
                startTime , 
                endDate , 
                endTime
            } = req.body 
            let customer = await VerifyRequestMaker(req , Admin , Customer , next) 
            if (!customer){
                return next(new NotAuthorizeError("Unauthorize request"))
            }
            let [orders , products , vendors] = await Promise.all([
                Order.find({}) , 
                Product.find({})  , 
                Vendor.find({
                    location : {
                        $near : {
                            $geometry : {
                                type : "Point" , 
                                coordinates : [
                                    longitude  , 
                                    latitude
                                ]
                            }  , 
                            $minDistance : 0 , 
                            $maxDistance : 700000
                        } 
                    } , 
                    status : {
                        "$in" : ["v"]
                    }
                })
                .select({name : 1 , location : 1 , status : 1})
                .lean()
            ]) 

            const productId = Array.from(
                products , product => String(product._id)
            )  
            const areAllProducts = items.every(item => 
                productId.includes(item.product)
            ) 
            
            if (!areAllProducts){
                return next(new BadRequestError("Unknown products provided"))
            }
            Object.prototype.hasProp = function(property){
                if(this.hasOwnProperty(property)){
                    return true 
                }
                return false
            }
            if (Array.isArray(items) ){ 
                let elems = items.every(item => 
                    item.hasProp("product") && 
                    item.hasProp("quantity")
                ) 
                if (elems){
                    items.map(item => {
                        let {quantity , product} = item
                        let orderedProducts = products.find(e => String(e._id) === product) 
                        let {price , vendorPrice , appPrice , deliveryCost} = orderedProducts
                        item.rate = price 
                        item.vendorAmount = vendorPrice*quantity 
                        item.amount = price*Number(quantity) 
                        item.appAmount = appPrice*quantity 
                        item.deliveryCost = deliveryCost*quantity
                    })
                }else{
                    return next(new BadRequestError("Poorly formatted items array"))
                }
            }else{
                return next(new BadRequestError("Poorly formatted items array"))
            }

               
            
            let currentTime = new Date().getTime() 
            let start = new Date(startDate) 
            let end = new Date(endDate)
            let orderEndTime = end.getTime() 
            let orderStartTime = start.getTime() 

            if (orderStartTime < currentTime || orderStartTime > orderEndTime){
                return next(new BadRequestError("Select the right booking time"))
            }

            
            let orderCode = CodeGenerator(orders , "000000001" , "orderCode" , 1 , 9) 

            if(!address || !eventAddress)  return next(new BadRequestError("No address"))

            let timeGap = orderEndTime - orderStartTime 
            let millisecondsToDate  = 1000*60*60*24
            let hirePeriod = Math.ceil(timeGap/millisecondsToDate)
            let endTimeParser = endTime.trim() 
            let colonPosition = endTimeParser.indexOf(":") 
            let endHours = Number(endTimeParser.substring(0 , colonPosition)) 
            let endTimeIndicator = endTimeParser.charAt(endTimeParser.length - 2).toLowerCase() 
            //let endMinutes = Number(endTimeParser.substr(colonPosition + 1 , 2))
            
            if ((endHours >= 9 && endTimeIndicator === "a") || 
                (endTimeIndicator === "p")
            ){
                hirePeriod += 1
            }

            let vendorIds =  []  
            vendors.map(vendor => vendorIds.push(String(vendor._id)))

            let vendorsWithInventories = await Inventory.find({
                vendor : {
                    "$in" : vendorIds
                } , 
                "items.quantityAdded" : {
                    "$gt" : 0
                } , 
                status : "p"
            }).distinct("vendor")

            if (vendorsWithInventories.length === 0){
                return next(new NotFoundError("Sorry , we could not match any vendor to this order"))
            }
            
            let randomIndex = Math.floor(Math.random()*[vendorsWithInventories].length) 
            let vendorId = vendorsWithInventories[randomIndex]
            let vendor = vendors.find(vendor => String(vendor._id) === String(vendorId)) 
            
            //Select the vendor with the most available product and the closest
            // let customerPoint = [latitude , longitude] 
            // let vendorPoint = vendor[0].location.coordinates 
            //let distanceApart = ComputeDistance(customerPoint , vendorPoint)
            
            let purchaseCost = items.reduce((a , b) => a + Number(b.amount) , 0)
            let deliveryCost = items.reduce((a , b) => a + Number(b.deliveryCost) , 0) 
            console.log(hirePeriod)
            let order = await Order.create({
                totalCost : purchaseCost*hirePeriod + deliveryCost*2 , 
                delivery : {
                    cost : deliveryCost*2 //distanceApart
                } , 
                items : items , 
                pendingVendor : vendor._id , 
                customer : customer._id , 
                rentalDuration : hirePeriod , 
                orderCode : orderCode , 
                orderStatus : [{
                    status  : "x" , 
                    statusDate : new Date() , 
                }] , 
                location : {
                    address : address , 
                    eventAddress : eventAddress , 
                    coordinates : [Number(longitude) , Number(latitude)]
                } , 
                duration : {
                    startTime : startTime ,
                    startDate : startDate , 
                    endTime : endTime , 
                    endDate : endDate , 
                }
            })
            if (!order) return next(new DbError("Unable to create prder"))
            
            //Create Notification for status updates 
            let eventUrl = `/customer/bookings/${order._id}`
            await Notification.create({
                event : "booking" , 
                customer : customer._id , 
                description : `You added a new  booking(${order.orderCode})` , 
                eventUrl : eventUrl || "http://eventals.netlify.app" , 
               
            })

            res.status(200).json({
                orderCode : order._id , 
                duration : hirePeriod , 
                amountToPay : items.reduce((a , b) => a + b.amount , 0)*hirePeriod , 
                deliveryCost : order.delivery.cost
            })
        }catch(error){
            return next(new ApplicationError(error))
        }
    }
