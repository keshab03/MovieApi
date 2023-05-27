import React from 'react'
import { Link } from 'react-router-dom'
import './nav.css'
const Nav = () => {
    return (
        <div id='nav'>
            <Link to="/home"><i class="fa-sharp fa-solid fa-house"></i></Link>
            <Link to="/fev"><i class="fa-sharp fa-solid fa-heart"></i></Link>
        </div>
    )
}
export default Nav

