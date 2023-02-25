import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService, query, signOut, updateProfile } from "fbase";
import { collection, getDoc, where } from "firebase/firestore";

const Profile = ({ userObj, refreshUser }) => {
    // TODO: 프로파일 이미지 변경하는것 만들기
    const history = useHistory();
    const auth = authService;
    // auth 를 전역변수로 관리하면 좋을것 같다.
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    useEffect(() => {}, []);
    const onLogOutClick = () => {
        signOut(auth);
        history.push("/");
    };
    const getMyNweet = async () => {
        const q = query(
            collection(dbService, "nweets"),
            where("creatorld", "==", userObj.uid)
        ); // dbService의 컬렉션 중 "nweets" Docs에서 userObj의 uid와 동일한 creatorID를 가진 모든 문서를 가져오는 쿼리(요청) 생성

        const querySnapshot = await getDoc(q);
        querySnapshot.forEach((doc) => {});
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(auth.currentUser, {
                displayName: newDisplayName,
            });
            refreshUser();
        }
    };
    const onChange = (e) => {
        const { value } = e.target;

        setNewDisplayName(value);
    };
    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input
                    onChange={onChange}
                    autoFocus
                    type="text"
                    placeholder="Display name"
                    value={newDisplayName}
                    className="formInput"
                />
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    );
};

export default Profile;
