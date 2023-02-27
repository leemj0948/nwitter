import { useEffect, useState } from "react";
import AppRouter from "./Router";
import {authService, isAuthChange} from 'fbase';

function App() {
  const auth = authService;
  const [init,setInit] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  useEffect(()=>isAuth,[])
  const isAuth = isAuthChange(auth,(user)=>{
    if(user){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
    setInit(true);
  });
  return (
    <>
     {init? <AppRouter isLoggedIn={isLoggedIn}/>:'Initializeing'}
    </>
   
  
  );
}

export default App;
