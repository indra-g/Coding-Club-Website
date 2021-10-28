import React from 'react'
import logo from '../../assets/img/logo1.png';
import hamburger from '../../assets/img/hamburger.jpg';
import '../../css/eventScreen.css';

function Navbar({username}) {
    return (
        <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
        <a className="navbar-brand" href="#">
            <img width="30" height="30" className="d-inline-block align-text-top" src={logo}/>
            PSG Tech Coding Club
        </a>
        <ul className="nav Nav-Tabs justify-content-end">
        <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Events</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="#">Scripts</a>
        </li>
        </ul>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <img width="40" height="40" className="d-inline-block align-text-top" src={hamburger}/>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            {
            username==''?
            <ul className="navbar-nav ms-auto">
            <li className="nav-item">
            <a className="nav-link" href="/">Contribute Scripts</a>
            </li>
            </ul> :
            
            <ul className="navbar-nav ms-auto">
            <li className="nav-item">
            <a className="nav-link" href="#">View Scripts</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#">Add Events</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#">Add Scripts</a>
            </li>
            </ul>
            }
        </div>
        </div>
        </nav>
        );
    }
    export default Navbar;
