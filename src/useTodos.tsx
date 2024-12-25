// import React from 'react';
import { useReducer } from "react";

type ActionType = | {type: "ADD", text: string } | {type: "REMOVE"; id: number};


interface Todo {
  id: number;
  done: boolean;
  text: string;
}

const useTodos = () => {
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

//   return (
//     <div>useTodos
        
//     </div>
//   )
}

export default useTodos;