import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'
function UserProfile() {
    const [userprofile, setprofile] = useState(null)
    const [follow, setfollow] = useState(true)
    const {state, dispatch} = useContext(UserContext)
    const {userid} = useParams()
    console.log(userid)
    useEffect(() => {
        fetch(`/user/${userid}`,{
            headers: {
                "Authorization": "Bearer "+localStorage.getItem("jwt")
                }
        }).then(res => res.json())
            .then(result =>{
                console.log(result)
                setprofile(result)
        })
    },[])
    const followUser = () =>{
        fetch('/follow',{
            method:'put',
            headers:{
                "Content-Type":'application/json',
                'Authorization':'Bearer '+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data => {
            console.log(data)
            dispatch({type:'UPDATE',payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setprofile((prevState) => {
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }
                }
            })
            setfollow(false)
        })
    }
    const unfollowUser = () =>{
        fetch('/unfollow',{
            method:'put',
            headers:{
                "Content-Type":'application/json',
                'Authorization':'Bearer '+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data => {
            console.log(data)
            dispatch({type:'UPDATE',payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setprofile((prevState) => {
                const newFollower = prevState.user.followers.filter(item => item != data._id)
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })
            setfollow(true)
        })
    }
    return (
        <>
        {userprofile ? 
        <div style={{maxWidth: '550px',margin:'0px auto'}}>
            <div style={{display: 'flex',justifyContent: 'space-around', margin:'18px 0px', borderBottom:'1px solid black'}}>
                <div>
                    <img src="https://images.unsplash.com/photo-1550927312-3af3c565011f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" style={{width:'160px',height:'160px',borderRadius:'80px',}}/>
                </div>
                <div>
                    <h4>{userprofile.user.name}</h4>
                    <h5>{userprofile.user.email}</h5>
                    <div style={{display:'flex',justifyContent:'space-between',width:'118%'}}>
                        <h5>{userprofile.post.length} Posts</h5>
                        <h5>{userprofile.user.followers.length} Followers</h5>
                        <h5>{userprofile.user.following.length} Following</h5>
                        {follow ? <button style={{margin:"10px"}} onClick={followUser} className="waves-effect waves-light btn #ad1457 pink darken-3">Follow</button> : <button style={{margin:"10px"}} onClick={unfollowUser} className="waves-effect waves-light btn #ad1457 pink darken-3">Unfollow</button>}
                        
                        
                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                userprofile.post.map(item => {
                    return (
                    <img key={item._id} className="item" src={item.photo} />
                    )
                    })
                    }
                
            </div>
        </div>: <h2>Loading...</h2>}
        </>
    )
}

export default UserProfile
