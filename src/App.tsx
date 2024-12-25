import React, { useCallback, useRef } from "react";
import "./App.css";
import Increasement from "./Increasement";
import { useTodos } from "./useTodos";

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

 const { todos, addTodo, removeTodo} = useTodos ([
  { id: 0, text: "Hey there", done: false }
 ]);

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value);
       newTodoRef.current.value = "";
    }
  }, [addTodo]); 

  return ( 
    <div>
       <Increasement />
        <Heading title="Introduction" />
        <Box>Hello typescript</Box>

        <Heading title="Todos" />
        {todos.map((todo) => (
          <div key={todo.id}>
             {todo.text}
             <button onClick={() => removeTodo(todo.id)}>Remove</button>
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