import { useState } from "react";
import AppRouter from "./Router";
import {authService} from 'fbase';

function App() {
  const auth = authService;
  
  const [isLoggedIn,setIsLoggedIn] = useState(auth.currentUser);

  return (
    
   <AppRouter isLoggedIn={isLoggedIn}/>
  );
}

export default App;
