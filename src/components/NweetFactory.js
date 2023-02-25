import {
    dbAddDoc,
    dbCollection,
    dbService,
    getDownloadURL,
    getStorage,
    ref,
    uploadString,
} from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import { useCallback, useState } from "react";

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const storageService = getStorage();
    const onSubmit = async (e) => {
        e.preventDefault();
        if (nweet === "") {
            return;
        }
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
    const clearAttachment = () => setAttachment("");
    const uploadFile = async () => {
        const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(fileRef, attachment, "data_url");
        const attachmentURL = await getDownloadURL(response.ref);
        return attachmentURL;
    };
    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="what's on your mind"
                    maxLength={120}
                    className="factoryInput__input"
                />
                <input
                    type="submit"
                    value="&rarr;"
                    className="factoryInput__arrow"
                />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onfile}
                style={{
                    opacity: 0,
                }}
            />
            {attachment && (
                <div className="factoryForm__attachment">
                    <img
                        src={attachment}
                        style={{
                            backgroundImage: attachment,
                        }}
                    />
                    <div
                        className="factoryForm__clear"
                        onClick={clearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    );
};
export default NweetFactory;
