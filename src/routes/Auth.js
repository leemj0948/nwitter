import AuthForm from "components/AuthForm";
import {
    authService,
    GithubAuthProvider,
    GoogleAuthProvider,
    signIn,
    signInWithPopup,
    signup,
} from "fbase";
import React, { useState } from "react";

const Auth = () => {
    const onSocialClick = async (e) => {
        const {
            target: { name },
        } = e;
        let provider;
        if (name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            provider = new GithubAuthProvider();
        }
        await signInWithPopup(authService, provider);
    };
    return (
        <div>
            <AuthForm />
            <div>
                <button name="google" onClick={onSocialClick}>
                    Continue with Google
                </button>
                <button name="github" onClick={onSocialClick}>
                    Continue with Github
                </button>
            </div>
        </div>
    );
};

export default Auth;
