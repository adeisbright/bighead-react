import React ,  {Fragment , Component} from "react"  
import "./css/easyframer.css" 

function TodoList(props){ 
    let todos = props.todos.map((todo , i) =>
        <li key={i}>{todo}</li>
    )
    return( 
        <Fragment>
            <ul>
                {todos}
            </ul> 
        </Fragment>
        
    ) 
}

export default class App extends Component {
    constructor(props){
        super(props) 
        this.state ={
            todos : []  , 
            content  : ""
        } 
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this) 

    } 
    handleChange(e){
        this.setState({
            content : e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault() 
        let todo = this.state.content
        this.setState({
            todos : this.state.todos.concat(todo) , 
            content : ""
        })
    }
    render() {
        return(
            <section className="framer" style={{background:"#f2f2f2" , height:"100vw"}}>
                <h1>Todo</h1>
                <TodoList todos={this.state.todos} /> 
                <form 
                    className="fr-4 shadow bg-white pad-20 radius-5 m-b-1" 
                    onSubmit={this.handleSubmit}
                    >
                    <label htmlFor="userName">What needs to be done</label> 
                    <input 
                        type="text" 
                        value={this.state.content} 
                        onChange={this.handleChange}
                        className="input input-border-faint pad-10 m-b-1"
                    />
                    <input 
                        type="submit" 
                        className="input input-border-faint pad-10 bg-dark white-text"
                        id="submit" 
                        value="Add"
                    />
                </form>
                <p>{this.state.todos.length} item(s) created</p>
            </section>
        )
    }
}