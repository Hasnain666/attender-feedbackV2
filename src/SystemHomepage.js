import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './systemhome.css';
import Signup from './signup.js';
import Signinbody from './signin.js';
// import './images/feedbacksmileys.png';

function SysHome () {
    const [visible, setVisible] = useState(false); 
    let navigate = useNavigate();

    const handleLogIn = () => {
        navigate("/Signinbody");
    };

    const handleSignUp = () => {
        navigate("/Signup");
    };

    const scrollVisible = () => { 
        const scrolled = document.documentElement.scrollTop; 
        if (scrolled > 200){ 
        setVisible(true) 
        }  
        else if (scrolled <= 200){ 
        setVisible(false) 
        } 
    }; 
        
        const scrollToTop = () => {
            window.scrollTo ({ top: 0, behaviour: "smooth" });
        }; 
        
        window.addEventListener('scroll', scrollVisible); 

    
    return (
        <>
        <div className="header-container">
            <h2 className="header-text">Welcome to the Event Attender Feedback System</h2>
        </div>

        <div>
            <img src="/images/feedbacksmileys.png" alt="image feedback smileys" className="top-image" />
        </div>

        <div className="quote">
                <p><em>" There is no failure, only feedback" - Robert Allen</em></p>
        </div>

        <div className="main">
            <br/ >
            <p>This is a feedback system for event organisers.</p> 
            <p>It allows event organisers to collect constructive feedback from event attendees, digitally.</p>
            <br/ >
            <p>You can view all your events in your account, add a new event, edit and delete your event.</p>
            <p>Create a new form and view a summary of the feedback, all in your account.</p> 
            <br/ >
            <p>Please <a href="#" onClick={handleLogIn}>log in</a> to continue.</p>
            <br/ >
            <p>Or else, <a href="#" onClick={handleSignUp}> sign up</a>. Glad you could join us!</p> 
            <p className="mini-text"><em>
                Please sign up using the email address provided by your organisation</em>
            </p>
            <br/>
            <img className="bottom-image" src="/images/feedbackhands.png" alt="image feedback smileys" />
            <br/> <br/>
        </div>

        <div>
            <button className="button-scroll" onClick={scrollToTop} style={{display: visible ? 'inline':'none'}} >
                Scroll to Top</button> 
        </div>

        <div className="footer">
            <p><em>All rights reserved. Developed by Group_3_COMP7029</em></p>
        </div>
        </>
         
    );
};

export default SysHome;
