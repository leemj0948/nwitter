import { authService, GithubAuthProvider, GoogleAuthProvider, signIn, signInWithPopup, signup } from "fbase";
import React, { useState } from "react";

 const Auth = ()=>{
    const [form, setForm] = useState({ email: "", password: "" });
    const [newAccount,setNewAccount] = useState(true);
    const [error, setError] = useState('')
    const onChange = ({ target: { name, value } }) => setForm({ ...form, [name]: value });
    const toggleAccount = ()=>setNewAccount((prev)=>!prev);
    const auth = authService;
const onSubmit = async (e)=>{
    e.preventDefault();
    let data ;
   
    try{
        if(newAccount){
             data = await signup(auth,form.email,form.password);
    }else{
        // login 
             data = await signIn(auth,form.email,form.password);
    }
    } catch(err){
        setError(err.message);
    }
   
}
    const  onSocialClick = async (e)=>{
        const {target:{name}} = e;
        let provider ;
        if(name==='google'){
            provider = new GoogleAuthProvider();


        }else if(name === 'github'){
            provider = new GithubAuthProvider();
        }
        await signInWithPopup(authService,provider)
    };
    return (
<div>
    <form onSubmit={onSubmit}>
        <input name='email' type='email' placeholder="Email" required defaultValue={form.email} onChange={onChange} />
        <input name='password' type='password' placeholder="Password" required defaultValue={form.password}  onChange={onChange}/>
        <input type='submit' value={newAccount?'Create Account':'Log In'} onClick={toggleAccount}/>
    </form>
    {
       error&& <div>
    {error}
    </div>
    }
   
    <div>
        <button name='google' onClick={onSocialClick}>
            Continue with Google
        </button>
        <button name='github' onClick={onSocialClick}>
            Continue with Github
        </button>
    </div>
</div>
    )
 }
 


 export default Auth;