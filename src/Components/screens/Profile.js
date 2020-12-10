import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
function Profile() {
    const [pics, setpics] = useState([])
    const [followers, setfollowers] = useState([])
    const [following, setfollowing] = useState([])
    const {state, dispatch} = useContext(UserContext)
    useEffect(() => {
        fetch('/mypost',{
            headers: {
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
            }).then(res => res.json())
            .then(result =>{
                 console.log(result) 
               /*  setfollowers(result.result.followers)
                setfollowing(result.result.following) */
                setpics(result.posts)
        })
    },[])

    return (
        <div style={{maxWidth: '550px',margin:'0px auto'}}>
            <div style={{display: 'flex',justifyContent: 'space-around', margin:'18px 0px', borderBottom:'1px solid black'}}>
                <div>
                    <img src="https://images.unsplash.com/photo-1550927312-3af3c565011f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" style={{width:'160px',height:'160px',borderRadius:'80px',}}/>
                </div>
                <div>
                    <h4>{state ? state.name : null}</h4>
                    <div style={{display:'flex',justifyContent:'space-between',width:'118%'}}>
                        <h5>{pics.length} Posts</h5>
                        <h5>{state.result.followers.length} Followers</h5>
                        <h5>{state.result.following.length} Following</h5>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                pics.map(item => {
                    return (
                    <img key={item._id} className="item" src={item.photo} />
                    )
                    })
                    }
                
            </div>
        </div>
    )
}

export default Profile
