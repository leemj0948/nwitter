import { authService, signIn, signup } from "fbase";
import React, { useState } from "react";

 const Auth = ()=>{
    const [form, setForm] = useState({ email: "", password: "" });
    const [newAccount,setNewAccount] = useState(true);
    const onChange = ({ target: { name, value } }) => setForm({ ...form, [name]: value });
const onSubmit = async (e)=>{
    e.preventDefault();
    let data ;
    const auth = authService
    try{
        if(newAccount){
             data = await signup(auth,form.email,form.password);
    }else{
        // login 
             data = await signIn(auth,form.email,form.password);
    }
    } catch(err){
        console.error(err);
        alert(err.message);
    }
   
}
    return (
<div>
    <form onSubmit={onSubmit}>
        <input name='email' type='email' placeholder="Email" required defaultValue={form.email} onChange={onChange} />
        <input name='password' type='password' placeholder="Password" required defaultValue={form.password}  onChange={onChange}/>
        <input type='submit' value={newAccount?'Create Account':'Log In'}/>
    </form>
    <div>
        <button>
            Continue with Google
        </button>
        <button>
            Continue with Github
        </button>
    </div>
</div>
    )
 }
 


 export default Auth;