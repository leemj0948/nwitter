import {
    dbAddDoc,
    dbCollection,
    dbService,
    getDownloadURL,
    getStorage,
    ref,
    uploadString,
} from "fbase";
import { v4 as uuidv4 } from "uuid";
import { useCallback, useState } from "react";

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const storageService = getStorage();
    const onSubmit = async (e) => {
        e.preventDefault();
        const photoURL = attachment ? await uploadFile() : "";
        try {
            // firebase 데이터에 데이터 삽입 dbAddDoc(dbCollection(dbService,'collection이름'),{document})
            const twit = await dbAddDoc(dbCollection(dbService, "nweets"), {
                nweet,
                createAt: Date.now(),
                creatorId: userObj.uid,
                photoURL,
            });
        } catch (err) {
            console.error("Error", err);
        }
        setNweet("");
        setAttachment("");
    };

    const onChange = useCallback((e) => {
        const {
            target: { value },
        } = e;
        setNweet(value);
    });
    const onfile = (e) => {
        const { files } = e.target;
        if (!files.length) {
            return;
        }
        const theFile = files[0];
        const reader = new FileReader(); //파일 읽기 API
        reader.onloadend = (finishedEvent) => {
            const { result } = finishedEvent.currentTarget;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile); //이미지 URL로 변경
    };
    const clearAttachment = () => {
        setAttachment("");
    };

    const uploadFile = async () => {
        const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(fileRef, attachment, "data_url");
        const attachmentURL = await getDownloadURL(response.ref);
        return attachmentURL;
    };
    return (
        <form>
            <input
                value={nweet}
                onChange={onChange}
                type="text"
                placeholder="what's on your mind"
                maxLength={120}
            />
            <input type="file" accept="image/*" onChange={onfile} />
            <input onClick={onSubmit} type="submit" value="Nweet" />
            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={clearAttachment}>Clear</button>
                </div>
            )}
        </form>
    );
};
export default NweetFactory;
