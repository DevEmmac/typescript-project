import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";
import "./App.css";
import Increasement from "./Increasement";

const Heading = ({title}: {title: string}) => <h2>{title}</h2>;

const Box = ({children}: { children: React.ReactNode}) => (
  <div style={{
    padding: "1rem",
    fontWeight: "bold",
    }}> 
    {children} 
  </div>
);


const Button: React.FunctionComponent<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement & {title?:string}>
> = ({ title, children, style, ...rest }) => (
  <button
  {...rest}
  style={{...style,backgroundColor: "blue", color: "white", fontSize: "xx-large",}}> 
  {title ?? children}
  </button>)


function App() {
 
  // const [todos, dispatch] = useReducer(
  //   (state: Todo[], action: ActionType) => {
  //     switch (action.type) {
  //       case "ADD":
  //       return [
  //         ...state,
  //         { 
  //           id: state.length,
  //           text: action.text,
  //           done: false,
  //         },

  //       ];
  //       case "REMOVE": 
  //         return state.filter(({id}) => id !== action.id);
  //       default:
  //         throw new Error();
  //     }

  // }, []);

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value,
       })
       newTodoRef.current.value = "";
    }
  }, []); 

  return ( 
    <div>
       <Increasement />
        <Heading title="Introduction" />
        <Box>Hello typescript</Box>

        <Heading title="Todos" />
        {todos.map((todo) => (
          <div key={todo.id}>
             {todo.text}
             <button onClick={() => dispatch({
              type: "REMOVE",
              id: todo.id,
             })
             }>Remove</button>
          </div>
          ))}
          <div>
            <input type="text" ref={newTodoRef}/>
            <Button onClick={onAddTodo}>Add Todo</Button>
          </div>
    </div>  
  );
}

export default App;