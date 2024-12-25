import { useState } from "react";


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

// interface Payload {
//   text: string;
// }


const useNumber = (initialValue: number) => useState<number>(initialValue);
type UseNumberValue = ReturnType<typeof useNumber>[0];
type UseNumberSetValue = ReturnType<typeof useNumber>[1];

const Button: React.FunctionComponent<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement & {title?:string}>
> = ({ title, children, style, ...rest }) => (
  <button
  {...rest}
  style={{...style,backgroundColor: "blue", color: "white", fontSize: "xx-large",}}> 
  {title ?? children}
  </button>)


// increment function
const Incrementer:React.FunctionComponent<{
  value: UseNumberValue;
  setValue: UseNumberSetValue;
}> = ({value, setValue}) => (
  <Button onClick={() => setValue(value + 1)}
     title={`Add - ${value}`}/>
);

function App() {
//       const onListClick = useCallback((item: string) => {
//     alert(item);
//   }, []);

//   const [payload, setPayload] = useState<Payload | null>(null);


  const [value, setvalue] = useNumber(0);

  return (
    <div>
        {/* <List items={["one", "two", "three"]} onClick={onListClick} /> */}

        {/* <Box>{JSON.stringify(payload)}</Box>  */}

        <Incrementer value={value} setValue={setvalue} />
        <h1>j</h1>
    </div>       
  );
};

export default App;