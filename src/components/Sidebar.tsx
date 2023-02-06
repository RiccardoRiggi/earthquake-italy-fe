import React from 'react';
import { Link } from 'react-router-dom';


export default function Sidebar() {



    const handleClickSidebar = () => {
        if (document.getElementsByTagName("body")[0].classList.contains("sidebar-toggled")) {
            document.getElementById("accordionSidebar")?.classList.remove("toggled");
            document.getElementsByTagName("body")[0].classList.remove("sidebar-toggled");
            document.getElementById("logo")?.classList.add("pl-md-3");
        } else {
            document.getElementById("accordionSidebar")?.classList.add("toggled");
            document.getElementsByTagName("body")[0].classList.add("sidebar-toggled");
            document.getElementById("logo")?.classList.remove("pl-md-3");
        }
    };



    return (
        <>
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                    <div id="logo" className="sidebar-brand-icon ">
                        <i className="fas fa-globe-europe"></i>
                    </div>
                    <div className="sidebar-brand-text mx-2">Earthquake Italy</div>
                </Link>
                <hr className="sidebar-divider my-0" />




                <li className="nav-item">
                    <Link className="nav-link" to='/'>
                        <i className="fas fa-fw fa-rss"></i>
                        <span>Ultimi due giorni</span></Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to='/filtri'>
                        <i className="fas fa-fw fa-tags"></i>
                        <span>Filtri</span></Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to='/coordinate'>
                        <i className="fas fa-fw fa-map-pin"></i>
                        <span>Coordinate</span></Link>
                </li>







                <hr className="sidebar-divider d-none d-md-block" />

                <div className="text-center d-none d-md-inline">
                    <button onClick={handleClickSidebar} className="rounded-circle border-0" id="sidebarToggle"></button>
                </div>



            </ul>
        </>
    );

}