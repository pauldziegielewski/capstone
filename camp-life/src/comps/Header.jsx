import React from "react";
import Nav from "./Nav";


export default function Header({isAuthenticated}) {

    const headerClassName = `logo-nav ${isAuthenticated ? "header-registered" : "header-guest"}`;

    return (
        <div className={headerClassName}>
            <h1 className="logo">CampLife</h1>
            <Nav/>
        </div>
    );
}