import React, { ChangeEvent, FunctionComponent, KeyboardEvent,  useState } from "react";
import  {itemArray} from "../data"
import  trashCan from "../image/trashCan.png";
import pen from "../image/pen.png";
import ReactLogo from "../ReactLogo/ReactLogo";
import Button from "../Button/Button";
import "./ToDoList.css"

 



const ToDoList:FunctionComponent=()=>{

  
    const [items, setItems] = useState  (itemArray)

    const [inputValue, setInputValue] = useState <string> ("")

    const [search, setSearch] = useState <string> ("")

    
    
    const add = ()=>{

            setItems([...items, {text:inputValue, update:false, cheked:false, lineThrough:false}])
    }

    const Delete = ( index:number):void =>{

        let newItems = items.filter((item, indexx)=> index !== indexx)

        setItems(newItems)

    }

    const edit = ( index:number ):void=>{
         
     let newArray = items.map((item,indexx)=>{

            if(index === indexx){

               return {...item,update:true}
    
            } else return item
               
    })
    setItems( newArray )
    }

    const offBlur = ():void =>{

     let  newArray = items.map((item)=>{
             return {...item,update:false}
    })
           
    setItems(newArray)

    
   }

   const Enters =(e:KeyboardEvent):void=>{

       if(e.code === "Enter" ){add()}
       
     }

   const onChange =( e:ChangeEvent<HTMLInputElement>, index:number ):void=>{

     let newArray = items.map((item,indexx)=>{


        
         if(index===indexx){

             return {...item,text:e.target.value}

         }else return item

         
     })
     setItems(newArray)

     
   }

   const checked = (e:ChangeEvent<HTMLInputElement>, index:number)=>{

   let newArray = items.map((item , indexx)=>{


      if(index===indexx && e.target.checked === true){

         return  {...item,cheked:true ,lineThrough:true}

      }else if(index===indexx && e.target.checked === false){

       return {...item,cheked:false ,lineThrough:false}   
       
      } else return item


  

   })
   setItems(newArray)
   }


    return <div className="main-page">
          
        <header className="header">
            
        <ReactLogo/>

        <input  className="search-bar" type="text" value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search..." /> 
       
        <input  className="add-bar"   autoFocus={true} type="text" placeholder="Add..." value={inputValue} onKeyPress={Enters} onChange={(e)=>{ setInputValue(e.target.value)}}/>

        <Button add={add}  inputValue={inputValue}/>
          
        </header>

        <main className="main-container">

        {items.filter(item=>{

        if (item.text.toLowerCase().includes(search.toLowerCase())){

            return item

        } else if( search == "" ){

            return item

        }}).map((item, index)=>{

            return <div key = { index } >

                <div className = "item" >

                {item.update ? <input  autoFocus = { true } onBlur = { offBlur } className = "item__update" type = "text" value = { item.text } onChange={(e)=>{ onChange( e,index ) }}></input> :<div style = {{ textDecoration: item.lineThrough ? "line-through"  :""}} className = "item__info"><div className="ellipsis">{ item.text }</div></div>} 

                <div className = "item__tools">

                <input className = "item__check" type = "checkbox"  onChange = {( e ) => { checked( e, index ) }} checked = { item.cheked } />

                <img src = { pen } title = "edit item" onClick={ () => { edit( index ) }}/> 

                <img src = { trashCan } onClick = { () => { Delete( index ) }}  title = "delete item"/>
                   
              </div>

            </div>

          </div>
       })}

        </main>
 
    </div>


    }
export default ToDoList