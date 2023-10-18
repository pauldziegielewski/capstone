import React from 'react';
import { NavLink } from "react-router-dom";

export default function Nav() {
    return(
        <nav>
            <ul className="ul-list">
                <li>
                    <NavLink className="link" to="/">Home 
                    <ion-icon name="home-outline"></ion-icon>      
                    </NavLink>
                </li>
                <li>
                    <NavLink className="link" to="/About">About  
                    <ion-icon name="help-circle-outline"></ion-icon>   
                    </NavLink>
                </li>
                <li>
                    <NavLink className="link" to="/Search">Search   
                    <ion-icon name="search-outline"></ion-icon>  
                    </NavLink>
                </li>
                <li>
                    <NavLink className="link" to="/Profile">Profile 
                    <ion-icon name="accessibility-outline"></ion-icon>     
                    </NavLink>
                </li>
               
            </ul>
        </nav>
      
        
    );
}