import React from "react";
import { signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { authService } from "fbase";

const Profile =()=>{
    const history = useHistory();
    const auth = authService;
    const onLogOutClick = ()=> {
        signOut(auth);
        history.push('/');
    };
    return (
        <>
        <button onClick={onLogOutClick}>Log Out </button>
        </>
    )
}

export default Profile;