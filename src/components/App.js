import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService, isAuthChange } from "fbase";

function App() {
    const auth = authService;
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null); // 추후 전역변수로 관리할것
    const isAuth = isAuthChange(auth, (user) => {
        if (user) {
            setUserObj(user);
        }
        setInit(true);
    });
    useEffect(isAuth, []);

    return (
        <>
            {init ? (
                <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
            ) : (
                "Initializeing"
            )}
        </>
    );
}

export default App;
