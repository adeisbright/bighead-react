import React , { Component} from "react" 
import "./css/easyframer.css" 
import "./css/style.css" 

export default class App extends Component {
    constructor(props){
        super(props) 
        this.state = {
            mode : "Light" , 
            bgColor : "#000"
        }
        this.handleClick = this.handleClick.bind(this)
    } 
    handleClick(){
        this.setState({
            mode : this.state.mode.startsWith("L") ? "Dark" : "Light" , 
            bgColor: this.state.bgColor === "#000" ? "#fff" : "#000"
        })
        document.body.style.backgroundColor = this.state.bgColor
    } 
    render(){
        return (
           <div style={{margin : "1.4rem"}}>
                <button  
                    onClick={this.handleClick}
                    className="button no-border no-outline bg-blue white-text" 
                >
                   {this.state.mode}
                </button> 
            </div>
        )
    }
}