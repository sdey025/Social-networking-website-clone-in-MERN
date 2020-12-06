import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
function CreatePost() {
    const history = useHistory()
    const [title, settitle] = useState('')
    const [body, setbody] = useState('')
    const [image, setimage] = useState('')
    const [url, seturl] = useState('')
    useEffect(() => {
        fetch('http://localhost:5000/posts',{
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Authorization": "Bearer "+localStorage.getItem('jwt') 
            },
            body: JSON.stringify({
                //we are writing on name because key and value both are same
                title,
                body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data => {
            console.log(data)
            if(data.error) {
                M.toast({html: data.error,classes:"#d81b60 pink darken-1"})
            }else{
                M.toast({html: "Post Updated",classes:"#d81b60 pink darken-1"})
                history.push('/')
            }
        }).catch(err => {
            console.log(err)
        })
    }, [url])
    const postdetails = () => {
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","socialhub")
        data.append("cloud_name","shivaish")
        fetch("	https://api.cloudinary.com/v1_1/shivasish/image/upload",{
            method: "POST",
            body: data,
        }).then(res=>res.json())
        .then(data => {
            seturl(data.url)
        }).catch(err => {
            console.log(err)
        })
        
    }
    return (
        <div className='card input-filed' style={{margin:'30px auto' , maxWidth:'500px' , padding:'20px',textAlign:'center'}}>
            <input type="text" value={title} onChange={(e) => settitle(e.target.value)} placeholder="title"/>
            <input type="text" value={body} onChange={(e) => setbody(e.target.value)} placeholder="Body"/>
            <div className="file-field input-field">
            <div className="btn">
                <span>Upload Image</span>
                <input type="file" onChange={(e) => setimage(e.target.files[0])}/>
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
            </div>
            </div>
            <button onClick={postdetails} className="waves-effect waves-light btn #ad1457 pink darken-3">Submit</button>
        </div>
    )
}

export default CreatePost
