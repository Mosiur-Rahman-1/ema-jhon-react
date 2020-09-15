import React, { useState } from 'react';
import * as firebase from "firebase/app";
import 'firebase/auth';
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

function LogIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    photo: ''
  }
  );

  const [loggedInUser, setLoggedInUser] = useContext (UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleClickLogIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {email, displayName, photoURL} = res.user;
      const signInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signInUser);
    })
    .catch(error => {
      console.log(error);
    })
  }

  const handleFbSignIn = () => {
    firebase.auth().signInWithPopup(fbProvider)
    .then(result => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      console.log("Fb after sign in" , user, user.displayName);
    })
    .catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      // var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      // ...
      console.log (errorMessage, errorCode);
    });

  }

  const handleClickLogOut = () => {

    firebase.auth().signOut()
    .then(res => {
      const signOutUser = {
        isSignIn: false,
        newUser: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        userName: '',
        sucess: false
      }
      setUser(signOutUser);
    }).catch(error => {
      console.log('error occurd');
    });
    console.log('button clicked');
  }

  const handleOnChange = (event) => {

    let isFormValid = true;
    if(event.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
    }

    if (event.target.name === "password") {
      const isPasswordCorrectLength = event.target.value.length > 6;
      const isNumberUsed = /\d{2}/.test(event.target.value);
      isFormValid = isPasswordCorrectLength && isNumberUsed;
    }

    if (isFormValid){
      const newUserInfo ={...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {

    if ( newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = "";
        newUserInfo.sucess = true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        history.replace(from);
      })
      .catch(error => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.sucess = false;
        setUser(newUserInfo);
      });
    }
    e.preventDefault();
  }

  if (!newUser && user.email && user.password) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(res => {
      const newUserInfo = {...user};
      newUserInfo.error = "";
      newUserInfo.sucess = true;
      setUser(newUserInfo);
    })
    .catch(error => {
      const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.sucess = false;
      setUser(newUserInfo);
    })
  }
  return (
    <div style = {{textAlign: "center", paddingTop: '50px'}}>
      {
        user.isSignIn &&
        <div> 
          <p>Welcome: {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt="profile pic"/>
        </div>
      }

      <h1>Authintication Form</h1>
      <form action="">
        <input type="checkbox" onChange = {() => setNewUser (!newUser)} name="newUser" id=""/>
        <label htmlFor="newUser">New user? Sign up now!</label>
        <br/>
        {newUser && <input type="text" onBlur = {handleOnChange} name="userName" placeholder = "Type your user name"/>}
        <br/>
        <input type="email" onBlur = {handleOnChange} name="email" placeholder = "Type your email" required/>
        <br/>
        <input type="password" onBlur = {handleOnChange} name="password" placeholder = "Type your password" required/>
        <br/>
        <input type="submit" onClick = {handleSubmit} value="Submit"/>
      </form>
      {
        user.isSignIn ? <button onClick = {handleClickLogOut}>log out</button> :
        <button onClick = {handleClickLogIn}>log in with gmail</button>
    }
      <button onClick ={handleFbSignIn} style = {{marginTop: '10px', backgroundColor: "lightBlue"}}>Sign in with facebook</button>

      <p style ={{color: "red"}}>{user.error}</p>
      {user.sucess && <p style ={{color: "green"}}>User {newUser ? "created" : "logged in"} sucessfully</p>}
    </div>
  );
}

export default LogIn;
