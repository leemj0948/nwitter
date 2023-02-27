import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService, isAuthChange, updateProfile } from "fbase";

function App() {
    const auth = authService;
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null); // 추후 전역변수로 관리할것
    const isAuth = isAuthChange(auth, (user) => {
        if (user) {
            setUserObj({
                displayName: user.displayName,
                uid: user.uid,
                updateProfiles: () =>
                    updateProfile(user, { displayName: user.displayName }),
            });
        } else {
            setUserObj(null);
        }
        setInit(true);
    });
    const refreshUser = () => {
        // profile 변경후 전체 userObj가 변경되서 적용되지 않아서 만든 함수
        // 전역변수를 사용
        const user = authService.currentUser;
        setUserObj((prv) => ({
            ...prv,
            updateProfiles: () =>
                updateProfile(user, { displayName: user.displayName }),
        }));
    };
    useEffect(isAuth, []);

    return (
        <>
            {init ? (
                <AppRouter
                    refreshUser={refreshUser}
                    isLoggedIn={Boolean(userObj)}
                    userObj={userObj}
                />
            ) : (
                "Initializeing"
            )}
        </>
    );
}

export default App;
