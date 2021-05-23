import React from "react" 
import Bright from "./images/bright.jpg"
import "./css/easyframer.css"

const Avatar =(props) =>{
    return (
        <figure>
            <img 
                src={props.user.avatarUrl} 
                alt={props.user.name} 
                style={{height : "auto" ,  width:"100%"}}
            />
        </figure>
    )
}

const UserInfo = (props) =>{
    return (
        <div className="user">
            <h2>{props.user.name}</h2> 
            <Avatar user={props.user} />
        </div>
    )
} 

const Comment = (props) => {
    return (
       <div className="fr-md-4">
            <div className="comment">
                <UserInfo user={props.author} />
                <p>{props.author.comment}</p>
                <p>{props.author.commentDate}</p>
            </div> 
        </div>
    )
}

const author = {
    name : "Adeleke Bright" , 
    comment : "React makes building of sleek user interface awesome" ,
    commentDate : "2021-05-12" , 
    avatarUrl : Bright 
}
export default function App(){
    return (
        <div className="framer">
            <div className="frame">
                <Comment author={author}/> 
            </div>
        </div>
    )
}