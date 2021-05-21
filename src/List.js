import React from "react"

let users = ["Femi" , "Fuad" , "Mohammed" , "Promise" , "Ayo"] 

const StudentList = props => { 
    const  students = props.students.map((student , i) => 
        <li key={i}>
            {student} 
        </li>
    )
    return(
        <ol>
            {students}
        </ol>
    )
}

export default  function App(){
    return (
        <>
            <h1>Working with List</h1> 
            <StudentList students={users} />
        </>
    )
}