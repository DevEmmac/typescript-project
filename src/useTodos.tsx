import { create } from 'zustand';
import { createMachine, assign } from 'xstate';

const todoMachine = createMachine<{
 todos: Todo[];
}, { type: "SET_TODOS": todos: Todo[]}> ({
  id: "todoMachine",
  initial: "editing",
  context: {
    todos: [],
  },
  states: {
    editing: {
      on: {
        SET_TODO: {
          actions: assign({
            todos: (_, { todos }) => todos
          })
        }
      }
    },
     working: {},
  },
}); 

interface Todo {
  id: number,
  done: boolean,
  text: string,
}  

const useTodos = create<{
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (removeId: number) => void; 
}>((set) => ({
   todos: [{ id: 0, text: "hey there", done: false }],
   addTodo: (text: string) => set((state) => ({
    ...state,
    todos: [...state.todos,
      { 
        id: state.todos.length,
        text,
        done: false,
      },
    ]
   })),
   removeTodo: (removeId: number) => set((state) => ({
   ...state,
   todos: state.todos.filter(({ id }) => id !== removeId)

   })),
}));

export default useTodos;
