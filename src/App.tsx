import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";
import "./App.css";

const Heading = ({title}: {title: string}) => <h2>{title}</h2>;

const Box = ({children}: { children: React.ReactNode}) => (
  <div style={{
    padding: "1rem",
    fontWeight: "bold",
    }}> 
    {children} 
  </div>
);

const List: React.FunctionComponent<{
  items: string[];
  onClick?: (item: string) => void;}> = 
  ({items, onClick }) => (
  <ul>
     {items.map((item, index) => (
      <li key={index} onClick={() => onClick?.(item)}>{item}</li>
     ))}
  </ul>
);

interface Payload {
  text: string;
}

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

const Button: React.FunctionComponent<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement & {title?:string}>
> = ({ title, children, style, ...rest }) => (
  <button
  {...rest}
  style={{...style,backgroundColor: "blue", color: "white", fontSize: "xx-large",}}> 
  {title ?? children}
  </button>)


type ActionType = | {type: "ADD", text: string } | {type: "REMOVE"; id: number};


const useNumber = (initialValue: number) => useState<number>(initialValue);
type UseNumberValue = ReturnType<typeof useNumber>[0];
type UseNumberSetValue = ReturnType<typeof useNumber>[1];


// increment function
const Incrementer:React.FunctionComponent<{
  value: UseNumberValue;
  setValue: UseNumberSetValue;
}> = ({value, setValue}) => (
  <Button onClick={() => setValue(value + 1)}
     title={`Add - ${value}`}/>
);


function App() {
  const onListClick = useCallback((item: string) => {
    alert(item);
  }, []);

  const [payload, setPayload] = useState<Payload | null>(null);

  useEffect(() => {
    fetch("/data.json")
     .then((resp) => resp.json())
     .then((data) => {
        setPayload(data)
        // console.log(payload)
     });
  }, []);

  const [todos, dispatch] = useReducer(
    (state: Todo[], action: ActionType) => {
      switch (action.type) {
        case "ADD":
        return [
          ...state,
          { 
            id: state.length,
            text: action.text,
            done: false,
          },
        ];
        case "REMOVE": 
          return state.filter(({id}) => id !== action.id);
        default:
          throw new Error();
      }

  }, []);

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

  const [value, setvalue] = useNumber(0);
     
  return ( 
    <div>
        <Heading title="Introduction" />
        <Box>Hello typescript</Box>
        <List items={["one", "two", "three"]} onClick={onListClick} />

        <Box>{JSON.stringify(payload)}</Box> 

        <Incrementer value={value} setValue={setvalue} />
         
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