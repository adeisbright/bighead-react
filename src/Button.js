import React , {Fragment , Component} from "react" 
import "./Button.css"

const button = {
    styleGuide : "button no-border no-input pad-10  bg-blue white-text radius-5" , 
    textContent : "Learn more"
}

const ButtonA = props => {
    return (
        <Fragment>
            <button 
                className={props.styleGuide}
                role="button" 
                aria-label="button" 
            >
                {props.textContent}
            </button>
        </Fragment>
    )
}

class ButtonB extends Component {
    render(){
        return (
            <Fragment>
            <button 
                className={this.props.styleGuide}
                role="button" 
                aria-label="button" 
            >
                {this.props.textContent}
            </button>
        </Fragment>
        )
    }
}

export {ButtonA , ButtonB , button}