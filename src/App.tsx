import React, { useCallback, useRef, useMemo } from "react";
import { useTodos } from "./useTodos";
import "./App.css";

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

const Box = ({children}: { children: React.ReactNode}) => (
  <div style={{
    padding: "1rem",
    fontWeight: "bold",
    }}> 
    {children} 
  </div>
);


const Button: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    title?: string;
  }
> = ({ title, children, style, ...rest }) => (
  <button
    {...rest}
    style={{
      ...style,
      backgroundColor: "red",
      color: "white",
      fontSize: "xx-large",
    }}
  >
    {title ?? children}
  </button>
);

function UL<T>({
  items,
  render,
  itemClick,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> & {
  items: T[];
  render: (item: T) => React.ReactNode;
  itemClick: (item: T) => void;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li onClick={() => itemClick(item)} key={index}>
          {render(item)}
        </li>
      ))}
    </ul>
  );
}

function App() {
  const initialTodos = useMemo(
    () => [{ id: 0, text: "Hey there", done: false }],
    []
  );
  const { isEditing, todos, addTodo, removeTodo, startWorking, endWorking } =
    useTodos(initialTodos);

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value);
      newTodoRef.current.value = "";
    }
  }, [addTodo]);

  return (
    <div>
      <Heading title="Introduction" />
      <Box>Hello there</Box>

      <Heading title="Todos" />
      {isEditing && (
        <>
          <UL
            items={todos}
            itemClick={(item) => alert(item.id)}
            render={(todo) => (
              <>
                ({todo.done ? "Done" : "Not Done"}){todo.text}
                <button onClick={() => removeTodo(todo.id)}>Remove</button>
              </>
            )}
          />
          <div>
            <input type="text" ref={newTodoRef} />
            <Button onClick={onAddTodo}>Add Todo</Button>
          </div>
          <Button onClick={startWorking}>Start Working</Button>
        </>
      )}
      {!isEditing && <Button onClick={endWorking}>Stop Working</Button>}
    </div>
  );
}

export default App;

// import React, { useCallback, useMemo, useRef } from "react";
// import "./App.css";
// import Increasement from "./Increasement";
// // import useTodos from "./useTodos";
// import store from './store';
// import { Provider } from 'react-redux';
// // import { render } from "@testing-library/react";

// const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

// const Box = ({children}: { children: React.ReactNode}) => (
//   <div style={{
//     padding: "1rem",
//     fontWeight: "bold",
//     }}> 
//     {children} 
//   </div>
// );


// const Button: React.FunctionComponent<
//   React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>,
//   HTMLButtonElement & {title?: string}>
// > = ({ title, children, style, ...rest }) => (
//   <button
//   {...rest}
//   style={{...style,backgroundColor: "blue", color: "white", fontSize: "xx-large",}}> 
//   {title ?? children}
//   </button>)

// // Creating ageneric component  
// function UL<T>({ items, render, itemClick}:  
//   React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>,
//   HTMLUListElement >
//   & { items: T[]; render: (item: T) => React.ReactNode; itemClick: (item: T) => void;}) {
//   return (
//     <ul>
//       {items.map((item, index) => (
//         <li onClick={() => itemClick(item)} key={index}>{render(item)}</li>
//       ))}
//     </ul>
//   );  
// }



// function App() {
//   const initialTodos = useMemo(
//     () => [{id: 0, text: "hey there", done: false }],
//     []
//   );
//   const { isEditing, todos, addTodo, removeTodo, startWorking, endWorking } = useTodos(initialTodos);

//   const newTodoRef = useRef<HTMLInputElement>(null);
 
//   const onAddTodo = useCallback(() => {
//     if (newTodoRef.current) {
//       addTodo(newTodoRef.current.value);
//       newTodoRef.current.value = "";
//     }
//   }, [addTodo]);

//   return ( 
//     <div>
//        <Increasement />
//         <Heading title="Introduction" />
//         <Box>Hello typescript</Box>

//         <Heading title="Todos" />
//         {isEditing && ( 
//           <>
//             <UL
//             items={todos}
//             itemClick={(item) => alert(items.id)}
//             render={(todo) => (
//               <>
//                 ({todo.done ? "Done" : "Not Done"}){todo.text}
//                 <button onClick={() => removeTodo(todo.id)}> Remove </button>
//               </>
//             )}
//           />

//               <div>
//                 <input type="text" ref={newTodoRef} />
//                 <Button onClick={onAddTodo}>Add Todo</Button>
//               </div> 
//               <Button onClick={startWorking}>Start Working</Button> 
//           </>
//         )} 
//         {!isEditing && (
//           <Button onClick={endWorking}>Stop working</Button>
//         )}
//     </div>  
//   );
// }


// const JustTheTodos = () => {
//   const todos = useTodos((state) => state.todos);
//   return (
//     <UL
//       items={todos}
//       itemClick={() => {}}
//       render={(todo) => <>{todo.text}</>}
//     />
//   );
// };

// const Appwrapper = () => (
//   <Provider store={store}>
//     <div style={{
//       display: "grid",
//       gridTemplateColumns: "50% 50%"
//     }}>
//       <App />
//       {/* <JustTheTodos /> */}
//     </div>
//     </Provider>
// )

// export default Appwrapper;

