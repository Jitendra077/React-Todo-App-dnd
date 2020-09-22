import React,{useState} from 'react';
import "../Components/Todo.css";
import TodoList from "./TodoList";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Todo = () => {
    const[inputList, setInputList] = useState("");
    const[items, setItems] = useState([])

    const itemEvent = (event) => {
        setInputList(event.target.value)

    }

    const addItem = () => {
            setItems((oldItems) => {
                return [ ...oldItems, inputList]

            })
            setInputList("")
    }

    const removeItem = (id) => {
        console.log("deleted")
        setItems((oldItems) => {
            return oldItems.filter((arrElement , index) => {
                return index !== id ;
            } )
        })
      
    }
    
   
    return (
        <div className = "main_div">
            <div className = "center_div">
                <br/>
                <h1> Todo List </h1>
                <br/>
                <input type = "text" placeholder = "Add a Item " 
                        value = {inputList}
                        onChange = {itemEvent} />

            {(inputList)  ? <button onClick = {addItem}> + </button> : <></> }       

            <DragDropContext onDragEnd = {(...props) => {console.log(props)}}>
               <Droppable droppableId="droppable">
                   {(provided, snapshot) => (
                        <div   ref={provided.innerRef} style={{ backgroundColor: snapshot.isDraggingOver ? 'white' : 'skyblue' }}
                        {...provided.droppableProps}> 
                            <ol>
                              {items.map((value,index) => {
                                  return (
                                  <Draggable key = {index} draggableId = {`draggable-${index}`}>
                                      {
                                          (provided,_) => (
                                              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <TodoList text = {value} 
                                                     key = {index} 
                                                     id = {index}
                                                     onSelect ={removeItem} /> 
                                                     {/* {provided.placeholder} */}
                                              </div>
                                          )
                                   
                                      }
                                    </Draggable>
                                    )
                                      }) }
                            </ol>
                         </div>
                       )}  
                </Droppable>
            </DragDropContext>
            </div>
            
        </div>
    )
}

export default Todo
