import React,{useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import "./css/landing.css";
import {getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";

const Landing = () => {

    const navigte = useNavigate();

    const auth = getAuth();
    const theUser = auth.currentUser;
    console.log("the user is", theUser);

    useEffect(() => {
        let tabs = document.querySelectorAll('.tab-btn');
        let tab_contents = document.querySelectorAll('.content');

        tabs.forEach((tab,index)=>{
        tab.addEventListener("click",(e)=>{
        for(tab of tabs){
        tab.classList.remove("active");
        }
        e.target.classList.add("active");
            
        tab_contents.forEach((content, cont_index)=>{
            content.style.display = "none";
            if(index === cont_index){
                content.style.display = "block";
            }
        })    
        })
    });
    }, []);

    const [login, setLogin] = useState({email: "", password: ""});
    const [signup, setSignup] = useState({firstName: "", lastName: "", email: "", password: "", rePassword: ""});
    
    const handleSignupChange = (e) =>{
        setSignup({ ...signup, [e.target.name] : e.target.value })
        // console.log(signup);
}

    const handleLoginChange = (e) =>{
            setLogin({ ...login, [e.target.name] : e.target.value })
            // console.log(login);
    }

    // ---------- REGISTER USER ----------

    const handleSignup = (e) => {
            e.preventDefault();
            createUserWithEmailAndPassword(auth, signup.email, signup.password)
            .then((credential)=>{
                updateProfile(auth.currentUser, {
                    displayName: `${signup.firstName}`, 
                })
                setSignup({firstName: "", lastName: "", email: "", password: "", rePassword: ""});
                navigte("/todo");
                console.log(credential.user);
            })
            .catch((error)=>{
                console.log(error.message);
            })
    }

    // ---------- LOG IN ----------

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, login.email, login.password)
        .then(()=>{
            
            navigte("/todo");
            console.log("logged in successfully");
    

        

        })
        .catch((error)=>{
            console.log("Sign In Error:", error.message);
        })
    }



    return (
        <div className="landing-main">
            <div className="landing-header">
                <h1>Welcome, Register and Get Started</h1>
            </div>
            <div className="landing__body">
                <div className="landing__body__div">
                    <div className="landing__body__header">
                        <h2 className="active tab-btn">Login</h2>
                        <h2 className="tab-btn">Register</h2>
                        
                    </div>
                    <div className="landing__body__content content">
                         <form onSubmit={handleLogin} >
                             <label>Email</label>
                             <input type="email" required name="email" value={login.email} onChange={handleLoginChange} />
                             <label>Password</label>
                             <input type="password" required name="password" value={login.password} onChange={handleLoginChange}/>
                             <button type="submit">Login</button>
                             {/* <label>You don't have an account? <span>register here</span></label> */}
                         </form>   
                    </div>
                    <div className="landing__body__content content" style={{display: "none"}}>
                         <form onSubmit={handleSignup}>
                             <label>First Name</label>
                             <input required name="firstName" value={signup.firstName} onChange={handleSignupChange} />
                             <label>Last Name</label>
                             <input required name="lastName" value={signup.lastName} onChange={handleSignupChange} />
                             <label>Email</label>
                             <input type="email" required name="email" value={signup.email} onChange={handleSignupChange} />
                             <label>Password</label>
                             <input type="password" required name="password" value={signup.password} onChange={handleSignupChange} />
                             <label>Confirm Password</label>
                             <input type="password" required name="rePassword" value={signup.rePassword} onChange={handleSignupChange} />
                             <button type="submit">Sign Up</button>
                             {/* <label>Already have an account? <span>signup here</span></label> */}
                         </form>   
                    </div>
                </div>
       
            </div>
            <footer>
                 <h6>made with love by @KVZU</h6>
            </footer>
        </div>
    );
}

export default Landing;
