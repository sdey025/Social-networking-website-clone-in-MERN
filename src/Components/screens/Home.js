import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom' 
import M from 'materialize-css'
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
    const makecomment = (text,postid) => {
        fetch('/comment',{
            method:'put',
            headers:{
                "Content-type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postid,
                text
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
    const deletepost = (postid) => {
        fetch(`/deletepost/${postid}`,{
            method:'delete',
            headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result => {
            /* console.log(result) */
            M.toast({html: "Post Deleted",classes:"#d81b60 pink darken-1"})
            const newData = data.filter(item => {
                return item._id !== result._id
            })
            setdata(newData)
        })
    }
/*     const deletecomment = (commentid) => {
        fetch(`/deletecomment/${commentid}`,{
            method:'delete',
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            M.toast({html: "Comment Deleted",classes:"#d81b60 pink darken-1"})
            
        })
    } */
    return (
        <div className='home'>
            {data.map(item => { 
                return (
                    
                    <div className="card homecard" key={item._id}> 
                        <h5><Link to={state._id != item.postedby._id ? '/profile/'+item.postedby._id : '/profile'}>{item.postedby.name}</Link> {state._id == item.postedby._id ? <i className="material-icons" title="delete post" onClick={()=>deletepost(item._id)} style={{float:'right',cursor:'pointer'}}>close</i> : <i className="material-icons" title="delete post" style={{float:'right',cursor:'pointer'}}>report_problem</i>}</h5>
                        <div className="card-image">
                            <img src={item.photo}/>
                        </div>
                        <div className="card-content">
                            {item.likes.includes(state._id) ? <i className="material-icons" style={{cursor:'pointer'}} onClick={() => unlikePost(item._id)}>thumb_down</i> : <i className="material-icons" style={{cursor:'pointer'}} onClick={() => likePost(item._id)}>thumb_up</i> }
                            <h6>{item.title}</h6>
                            <h6>{item.likes.length} Likes</h6>
                            {item.comments.map(record =>{
                                return(
                                <h6 key={record._id}><span style={{fontWeight:'bold'}}>{record.postedBy.name}</span> {record.text} {/* {state._id == record.postedBy._id ? <i className="material-icons" title="Delete comment" onClick={()=>deletecomment(item._id)} style={{float:'right',cursor:'pointer'}}>close</i> : <i className="material-icons" title="Report comment" style={{float:'right',cursor:'pointer'}}>report_problem</i>} */}</h6>
                                )
                            })}
                            <form onSubmit ={(e)=>{
                                e.preventDefault()
                                makecomment(e.target[0].value,item._id)
                            }}>
                            <input type="text" placeholder="add a comment" />
                            </form>
                            
                        </div>
                    </div>        
                ) 
            })}
                  
        </div>
    )
}

export default Home
