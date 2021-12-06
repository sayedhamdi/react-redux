import logo from './logo.svg';
import './App.css';
import {useReducer ,createContext, useState,useContext } from "react";
// context api
// //sharing state across components without prop drilling

const ThemeContext = createContext({});

function ThemeProvider({children }){
    let [theme,setTheme] = useState("dark")
    return (
        <ThemeContext.Provider value={[theme,setTheme]} >
            {children}
        </ThemeContext.Provider>
    );
}

function App(){
    return <ReduxApp />
}
function ContextApp() {
  return (
    <div className="App">
        <ThemeProvider>
            <Navbar />
            <Home />
        </ThemeProvider>
    </div>
  );
}
function Navbar(){

    let [theme,setTheme] = useContext(ThemeContext);
    console.log(theme)
    function handleClick (){
        if (theme =="dark")
                setTheme("light")
        else if (theme=="light")
                setTheme("dark")
    }
    return (
        <div>
            <button onClick={handleClick}>switch to {theme}</button>
        </div>
    )

}
function Home(){
    return (

        <>
            <Element />
        </>
    )
    
}

function Element(){
    let [theme,setTheme] = useContext(ThemeContext);
    return (

        <div style={{width:'250px',height:'400px',background:(theme=="light")?"yellow":"darkblue",color:(theme=="light")?"black":"white"}}>
            bonjourat
        </div>
    );
}
//redux app 
//
//
//
//Store 
const initialState = {
    todos:[],
    count: 0
};
function ReduxApp(){
    return (
        <>
        <TodoApp />
        <Counter/>
        </>
    )
}

function reducer(state, action) {
    console.log(state,"action",action)
  switch (action.type) {
    case 'increment':
      return {...state,count: state.count + 1};
    case 'decrement':
      return {...state,count: state.count - 1};
    case 'ADD_TODO':{
        console.log( {...state,todos:[...state.todos,action.payload]})       
          return {...state,todos:[...state.todos,action.payload]};

    }
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement',payload : "data"})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
function TodoApp(){
    
    return  (
        <div>
            <AddTodo />
            <TodoList />
        </div>
    )
}

function AddTodo(){
        let  [todo,setTodo] = useState("")
        let [state,dispatch] = useReducer(reducer,initialState)
        return (
            <div> <input type="text" value={todo} onChange={(e)=>setTodo(e.target.value)}/> 
            <button onClick={()=>{dispatch({type:'ADD_TODO',payload:todo})}}> add todo </button></div>
        )
}

function TodoList(){
    let [state,dispatch] = useReducer(reducer,initialState)
    let [todos,setTodos] = useState(state.todos)
    console.log("state",state)
    return (
        <ul>
        {todos.map(todo=><li>{todo}</li>)}
        </ul>
    )
}
export default App;
