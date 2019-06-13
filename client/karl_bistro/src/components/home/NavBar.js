import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Logo from "../../images/download.jpeg";

class NavBar extends Component {
    render() {
        return (
            <nav className="nav-bar">
                <NavLink exact to="/"><img width="auto" height="100em" alt="Karl's Bistro" src={Logo}></img></NavLink>


                <NavLink exact activeClassName="active-link" className="link" to="/createbooking">New Booking</NavLink>
                <NavLink exact activeClassName="active-link" className="link" to="/bookingdetails">Manage Bookings</NavLink>
                <NavLink exact activeClassName="active-link" className="link" to="/managebookings">View Bookings</NavLink>
                <NavLink exact activeClassName="active-link" className="link" to="/managecustomers">Manage Customers</NavLink>
                <NavLink exact activeClassName="active-link" className="link" to="/currenttablestatus">Tables</NavLink>
                <NavLink exact activeClassName="active-link" className="link" to="/chart">Chart</NavLink>
                <NavLink exact to="/">Back</NavLink>
            </nav>
         );
    }
}

export default NavBar;
