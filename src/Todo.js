import React , {Fragment , useState} from "react" 
import "./css/easyframer.css" 
import "./Todo.css"

const TodoItem = ({item , index , completeItem , removeItem}) => {
    return (
        <div
            className="todo"
            style={{ textDecoration: item.isCompleted ? "line-through" : "" }}
        >
            {item.text}
            <div>
                <button 
                    style={{marginRight:"5px"}}
                    className="button no-border no-outline bg-faint"
                    onClick={() => completeItem(index)}>
                    {item.status}
                </button>
                <button 
                    className="button no-border no-outline bg-faint"
                    onClick={() => removeItem(index)}>
                    x
                </button>
            </div>
        </div>
    )
}
const TodoForm = ({addItem}) => {
    const [value, setValue] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        let data = {
            text : value , 
            isCompleted : false , 
            status  : "Pending"
        }
        addItem(data);
        setValue("");
    };


    let inputClass = [
        "input " , 
        "input-border-faint " ,
        "pad-10 " ,
        "m-b-1"
    ]
    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={value}
                    placeholder="Enter your todo" 
                    className={inputClass.join("")}
                    onChange={e => setValue(e.target.value)}
                />
            </form>
        </Fragment>
    )
}

const App = () => {
    let [todos , setTodos] = useState([])

    const addTodo = item => {
        let allTodos = [...todos , item] 
        setTodos(allTodos)
    }

    const completeTodo = index => {
        const newTodos = [...todos];
        let {isCompleted  , status} =  [...todos][index] ;
        let statusText =  status === "Pending" ? "Done" : "Pending" ;
        [...todos][index].status = statusText ; 
        [...todos][index].isCompleted = !isCompleted ;
        setTodos(newTodos);
    };
    
    const removeTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };
    return (

        <Fragment>
            <div className="app">
                <h2 className="white-text font-2">Todo List Application </h2>
                <div className="todo-list">
               
                <TodoForm addItem={addTodo} />
                <div>
                    {todos.map((todo , i) => (
                        <TodoItem
                            item={todo} 
                            key={i} 
                            index={i}
                            completeItem={completeTodo}
                            removeItem={removeTodo}
                        />
                    ))}
                </div>
                </div>
            </div>
        </Fragment>
    )
}
export default App ; 
