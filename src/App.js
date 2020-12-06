import React, {useReducer,useEffect,createContext,useContext} from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import {BrowserRouter as Router, useHistory ,Switch, Route} from 'react-router-dom'
import Home from './Components/screens/Home';
import Login from './Components/screens/Login';
import Signup from './Components/screens/Signup';
import Profile from './Components/screens/Profile';
import CreatePost from './Components/screens/CreatePost';
import {reducer,initialState} from './reducers/userReducer'
export const UserContext = createContext();
//we are doing this to access the history of routing
const Routing = () => {
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user) {
      dispatch({type:'USER',payload:user})
      history.push('/')
    }else{
      history.push('/signin')
    }
  }, [])
  return (
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/signin">
        <Login/>
      </Route>
      <Route path="/signup">
        <Signup/>
      </Route>
      <Route path="/profile">
        <Profile/>
      </Route>
      <Route path="/create">
        <CreatePost/>
      </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state,dispatch}} >
      <Router>
        <Navbar/>
        <Routing/>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
