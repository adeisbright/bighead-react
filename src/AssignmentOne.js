import React , {Component, Fragment} from "react" 

let currentStates = [
    "Abia" , 
    "Adamawa" , 
    "Anambra" , 
    "Bauchi"
] 
const NigerianStates  = ({states}) => {
    let stateList = states.map((state , index) => (
        <li key={index}>{state}</li>
    ))
    return (
        <>
            <h1>States in Nigeria</h1>
            <ol>
                {stateList}
            </ol> 
        </>
    )
}

export default class App extends Component {
    state = {
        isOld : false , 
        value : "" , 
        result : ""
    }
    handleClick = e => {
        e.preventDefault() 
        let value = this.state.value
        if (!Object.is(typeof value , "number")) {
            this.setState({
                result : "Please , Enter a valid number"
            })
        }
        this.setState({
            result : value % 2 === 0 ? `${value} is even` : `${value} is Odd`
        })
    }
    handleChange = e => {
        let {value} = e.target
        this.setState({
            value : value
        })
    }
    render(){
        return (
            <Fragment>
                <NigerianStates states={currentStates} />
                <input 
                    type="text" 
                    value={this.state.value}
                    placeholder="Enter a number to check if it is odd" 
                    onChange={this.handleChange}
                />
                <button 
                    onClick={this.handleClick}
                    type="button" 
                    role="button"
                >
                    Check
                </button>
                <p>
                    {this.state.value ? 
                    <span>{this.state.result}</span>
                :
                    <span>Enter a number</span>
                }
                </p>
            </Fragment>
        )
    }
}
