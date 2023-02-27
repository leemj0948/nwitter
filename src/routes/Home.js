import { dbAddDoc, dbCollection, dbService,query,getDocs } from "fbase";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const Home= ()=>{
    const [nweet, setNweet] = useState('');
    const [nweets,setNweets]= useState([]);
    
    useEffect(()=>{
        getNweets();
    },[])
    const getNweets = async ()=>{
        const q = query(dbCollection(dbService,'nweets'));
        
        const dbSnapshot = await getDocs(q);
        
        dbSnapshot.forEach((doc)=>{
           const nweetObj = {
                ...doc.data(),
                id:doc.id,
            }
            setNweets(prv=>[nweetObj,...prv]);
        })
      
    }
    const onSubmit = async (e)=>{
        e.preventDefault();
        try{
            // firebase 데이터에 데이터 삽입 dbAddDoc(dbCollection(dbService,'collection이름'),{document})  
            const twit = await dbAddDoc(dbCollection(dbService,'nweets'),{
                nweet,
                createAt:Date.now(),
            })
        }catch(err){
            console.error('Error',err)
        }
        setNweet('');
    };

    const onChange = useCallback((e) =>{
        const {target:{value}} = e;
        setNweet(value);
    })
    return (
        <div>
            <form>
                <input value={nweet} onChange={onChange} type= 'text' placeholder="what's on your mind" maxLength={120} />
                <input onClick={onSubmit} type='submit' value='Nweet'/>
            </form>
            <div>
                {nweets.map(data=>{
                    console.log(data)
                   return (
                    <div key={data.id}>
                    <h4>{data.nweet}</h4>    
                </div>
                   )
                   
                })}
            </div>
        </div>
    )
}

export default Home;