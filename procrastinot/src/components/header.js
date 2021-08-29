import React, {Component} from "react";

export default class Header extends Component {


    render() {
        return (
            <div className="header">
                <img className="logo" src="logo.png" alt="logo goes here" />
                <h2 className="tag">Taking the mental work out of scheduling</h2>

                <a href="" className="header-button" > &#43; </a>
                <a href="" className="header-button">&#x1f514;</a>
                <a href="" className={`header-button profile-picture`}><img src="prof.jpg" alt="profile picture" /></a>
            </div>
        )
    }
}