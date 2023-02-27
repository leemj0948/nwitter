import Nweet from "components/Nweet";
import {
    dbCollection,
    dbService,
    query,
    orderBy,
    onSnapshot,
    authService,
} from "fbase";

import React, { useEffect, useState } from "react";
import NweetFactory from "components/NweetFactory";
import { onAuthStateChanged } from "firebase/auth";

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        getNweets();
    }, []);
    onAuthStateChanged(authService, (user) => {
        if (user === null) {
            getNweets();
        }
    });
    const getNweets = async () => {
        const q = query(
            dbCollection(dbService, "nweets"),
            orderBy("createAt", "desc")
        );
        // 가져오기 방법1
        // const dbSnapshot = await getDocs(q);

        // dbSnabpshot.forEach((doc)=>{
        //    const nweetObj = {
        //         ...doc.data(),
        //         id:doc.id,

        //     }
        //     setNweets(prv=>[nweetObj,...prv]);
        // })

        // 가져오기 방법2
        onSnapshot(q, (shot) => {
            const nweetArr = shot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArr);
        });
    };

    return (
        <div className="container">
            <NweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {nweets.map((data) => {
                    return (
                        <Nweet
                            nweetObj={data}
                            key={data.id}
                            isOwner={data.creatorId === userObj.uid}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
