import {
    dbService,
    deleteDoc,
    deleteObject,
    doc,
    getStorage,
    ref,
    updateDoc,
} from "fbase";

import { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
    const nweetRef = doc(dbService, "nweets", `${nweetObj.id}`);
    const [newNweet, setNewNweet] = useState(nweetObj.nweet);
    const [editing, setEditing] = useState(false);
    const storageService = getStorage();
    const onDeleteClick = async () => {
        const isDelete = window.confirm("Are you sure you want to delete?");
        if (isDelete) {
            await deleteDoc(nweetRef);
            await deleteObject(ref(storageService, nweetObj.photoURL)); //사진 지우기
        }
    };
    const onEditClick = async (e) => {
        e.preventDefault();
        await updateDoc(nweetRef, { nweet: newNweet });
        toggleEditing();
    };
    const editNweet = (e) => {
        const { value } = e.target;
        setNewNweet(value);
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onEditClick}>
                        <input
                            onChange={editNweet}
                            type="text"
                            placeholder="Edit your Nweet"
                            value={newNweet}
                            required
                        />
                        <input type="submit" value="editNweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{nweetObj.nweet}</h4>
                    {nweetObj.photoURL && (
                        <img
                            src={nweetObj.photoURL}
                            width="50px"
                            height="50px"
                        />
                    )}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>delet</button>
                            <button onClick={toggleEditing}>edit</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Nweet;
