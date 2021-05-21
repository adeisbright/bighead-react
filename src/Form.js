import React , {Component} from "react" 
import "./css/easyframer.css" 
import "./css/style.css" 

export default class App extends Component {
    constructor(props){
        super(props) 
        this.state = {
            message: ""
        } 
        this.handleBlur = this.handleBlur.bind(this)
    } 
    handleBlur(e){
        const {value} = e.target
        this.setState({
            message : `Your name is ${value}`
        })
    }
    render(){
        return (
                <div className="frame">
                    <div className="fr-4">
                        <form className="shadow bg-white pad-20 radius-5 m-b-1">
                            <label htmlFor="userName">Username</label> 
                            <input 
                                type="text" 
                                placeholder="Enter your name" 
                                className="input input-border-faint pad-10 m-b-1"
                                onBlur = {this.handleBlur}
                            />
                            <p>{this.state.message}</p>
                        </form>
                    </div>
                </div>
        )
    }
} 