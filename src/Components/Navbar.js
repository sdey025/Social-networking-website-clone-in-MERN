import React from 'react'
import {Link} from 'react-router-dom'
function Navbar() {
    return (
        <div>
            <nav>
                <div className="nav-wrapper white">
                <Link to='/' className="brand-logo">SocialHub.</Link>
                <ul id="nav-mobile" className="right">
                    <li><Link to="/signin">Login</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/create">Create Post</Link></li>
                </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
