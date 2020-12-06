import React,{useState} from 'react'
import {Link , useHistory} from 'react-router-dom'
import M from 'materialize-css'
function Signup() {
    const history = useHistory()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    //to make a network request
    const Postdata = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid Email",classes:"#d81b60 pink darken-1"})
        }else{
        fetch('http://localhost:5000/signup',{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name, //we are writing on name because key and value both are same
                password,
                email
            })
        }).then(res=>res.json())
        .then(data => {
            if(data.error) {
                M.toast({html: data.error,classes:"#d81b60 pink darken-1"})
            }else{
                M.toast({html: "Successfully Registered",classes:"#d81b60 pink darken-1"})
                history.push('/signin')
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
                <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
                <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className="waves-effect waves-light btn #ad1457 pink darken-3" onClick={Postdata}>Signup</button>
                <h5>
                    <Link to="/signin">Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup
