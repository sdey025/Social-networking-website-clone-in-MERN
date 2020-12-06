import React,{useState,useEffect,useContext} from 'react'
import M from 'materialize-css'
import {UserContext} from '../../App'
import {Link,useHistory} from 'react-router-dom'
function Login() {
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    /* s */
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    //to make a network request
 
    const Postdata = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid Email",classes:"#d81b60 pink darken-1"})
        }else{
        fetch('http://localhost:5000/signin',{
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                
            },
            body: JSON.stringify({
                //we are writing on name because key and value both are same
                password,
                email
            })
        }).then(res=>res.json())
        .then(data => {
            console.log(data)
            if(data.error) {
                M.toast({html: data.error,classes:"#d81b60 pink darken-1"})
            }else{
                localStorage.setItem('jwt',data.token)//storing jwt token into local storage
                localStorage.setItem('user',JSON.stringify(data.user)) // storing user details into local storage
                dispatch({type:"USER",payload:data.user})
                M.toast({html: "Successfully Loggedin",classes:"#d81b60 pink darken-1"})
                history.push('/')
            }
        }).catch(err => {
            console.log(err)
        })
    }
}
    return (
        <div className="mycard">
            <div className="card auth-card">
                <h2>SocialHub</h2>
                <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={Postdata} className="waves-effect waves-light btn #ad1457 pink darken-3">Login</button>
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Login
