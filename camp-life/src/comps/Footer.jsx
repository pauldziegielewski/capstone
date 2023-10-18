import { NavLink } from "react-router-dom";
import React from "react";



export default function Footer() {
    
    return (
        <div className="footer">
             <nav>
            <ul className="ul-list">
                <li>
                    <NavLink className="link" to="/">Home       
                    </NavLink>
                </li>
                <li>
                    <NavLink className="link" to="/Privacy">Privacy Policy     
                    </NavLink>
                </li>
                <li>
                    <NavLink className="link" to="/Terms">Terms & Conditions    
                    </NavLink>
                </li>
               
            </ul>
        </nav>
        </div>
    );
}