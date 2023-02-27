import React from "react";
import { signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { authService } from "fbase";

const Profile =()=>{
    const history = useHistory();
    const auth = authService;
    // auth 를 전역변수로 관리하면 좋을것 같다. 
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