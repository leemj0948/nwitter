import { dbAddDoc, dbCollection, dbService } from "fbase";
import React, { useState } from "react";

const Home= ()=>{
    const [nweet, setNweet] = useState('');
    const onSubmit = async (e)=>{
        e.preventDefault();
        try{
            // firebase 데이터에 데이터 삽입 dbAddDoc(dbCollection(dbService,'collection이름'),{document})  
            const docRef = await dbAddDoc(dbCollection(dbService,'nweets'),{
                nweet,
                createAt:Date.now(),
            })
        }catch(err){
            console.error('Error',err)
        }
        setNweet('');
    };
    const onChange = (e) =>{
        const {target:{value}} = e;
        setNweet(value);
    }
    return (
        <div>
            <form>
                <input value={nweet} onChange={onChange} type= 'text' placeholder="what's on your mind" maxLength={120} />
                <input onClick={onSubmit} type='submit' value='Nweet'/>
            </form>
        </div>
    )
}

export default Home;