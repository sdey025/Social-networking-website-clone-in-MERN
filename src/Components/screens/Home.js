import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
function Home() {
    const {state, dispatch} = useContext(UserContext)
    const [data, setdata] = useState([])
    useEffect(() => {
        fetch('/allpost',{
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result => {
            console.log(result) 
            setdata(result.posts)
        })
    }, [])
    const likePost = (id) => {
        fetch('/like',{
            method:'put',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                postid:id
            })
        }).then(res => res.json())
        .then(result => {
            const newData = data.map(item => {
                if(item._id == result._id){
                    return result
                }else{
                    return item
                }
            })
            setdata(newData)
        }).catch(err => {
            console.log(err)
        })
    }
    const unlikePost = (id) => {
        fetch('/unlike',{
            method:'put',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                postid:id
            })
        }).then(res => res.json())
        .then(result => {
            const newData = data.map(item => {
                if(item._id == result._id){
                    return result
                }else{
                    return item
                }
            })
            setdata(newData)
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className='home'>
            {data.map(item => { 
                return (
                    
                    <div className="card homecard" key={item._id}> 
                        <h5>{item.postedby.name}</h5>
                        <div className="card-image">
                            <img src={item.photo}/>
                        </div>
                        <div className="card-content">
                            {item.likes.includes(state._id) ? <i className="material-icons" style={{cursor:'pointer'}} onClick={() => unlikePost(item._id)}>thumb_down</i> : <i className="material-icons" style={{cursor:'pointer'}} onClick={() => likePost(item._id)}>thumb_up</i> }
                        
                        

                            <h6>{item.title}</h6>
                            <h6>{item.likes.length} Likes</h6>
                            <p></p>
                            <input type="text" placeholder="add a comment" />
                        </div>
                    </div>        
                ) 
            })}
                  
        </div>
    )
}

export default Home
