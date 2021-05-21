import React ,{Fragment , Component} from "react"  
import "./css/easyframer.css" 

export default class App extends Component {
    constructor(props){
        super(props) 
        this.state = {
            date  : new Date()
        }
    }
    tick(){
        this.setState({
            date : new Date()
        })
    }
    componentDidMount(){
        this.timerID = setInterval(() => {
            this.tick()
        }, 1000);
    }
    componentWillUnmount(){
        clearInterval(this.timerID)
    }
    render(){
        return ( 
            <Fragment>
                <div className="framer"> 
                    <div 
                        className="frame" 
                        style={{
                            flexDirection : "column" , 
                            alignItems : "center" ,
                            paddingTop:"30px"
                        }}
                    > 
                        <h1>
                            <span>The time is </span>
                            <span>{this.state.date.toLocaleTimeString()}</span>
                        </h1>
                    </div>
                </div>
            </Fragment> 
        )
    }
}