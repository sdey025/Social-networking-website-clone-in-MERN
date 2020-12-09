import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
function Navbar() {
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const renderList = () => {
        if (state){
            return[<li><Link to="/profile">Profile</Link></li>,
            <li><Link to="/create">Create Post</Link></li>,
                <li><button onClick={() =>{ localStorage.clear()
                     dispatch({type:"CAR"})
                     history.push('/signin')}} 
                     className="waves-effect waves-light btn #ad1457 pink darken-3">Logout</button></li>]
        }else{
            return[ <li><Link to="/signin">Login</Link></li>,
            <li><Link to="/signup">Signup</Link></li>]
        }
    }
    return (
        <div>
            <nav>
                <div className="nav-wrapper white">
                <Link to={state ? '/' : '/signin'} className="brand-logo" style={{marginLeft:'20px'}}>SocialHub.</Link>
                <ul id="nav-mobile" className="right" style={{marginRight:'20px'}}>
                    {renderList()}
                </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
