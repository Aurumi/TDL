import React, { FunctionComponent } from "react";
import "./Button.css"


type Props = {

    inputValue:string,

    add:()=> void

}

const Button: FunctionComponent<Props> = ({add,inputValue})=>{

    return <div className = "container-button" onClick = {inputValue=="" ?  null: add}>
    
    <div className = "button" ></div>

</div>
}

export default Button;