import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'
function UserProfile() {
    const [userprofile, setprofile] = useState(null)
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
                /* console.log(result) */
                setprofile(result)
        })
    },[])
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
                        <h5>33 Followers</h5>
                        <h5>70 Following</h5>
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
