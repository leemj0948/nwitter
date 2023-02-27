import Nweet from "components/Nweet";
import { dbAddDoc, dbCollection, dbService,query,getDocs,orderBy,onSnapshot} from "fbase";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const Home= ({userObj})=>{
    const [nweet, setNweet] = useState('');
    const [nweets,setNweets]= useState([]);
    
    useEffect(()=>{
        getNweets();
    },[])
    const getNweets = async ()=>{
        const q = query(dbCollection(dbService,'nweets'),orderBy('createAt','desc'));
        // 가져오기 방법1 
        // const dbSnapshot = await getDocs(q);
        
        // dbSnapshot.forEach((doc)=>{
        //    const nweetObj = {
        //         ...doc.data(),
        //         id:doc.id,
                
        //     }
        //     setNweets(prv=>[nweetObj,...prv]);
        // })
        
        
        // 가져오기 방법2
        onSnapshot(q,(shot)=>{
            const nweetArr = shot.docs.map((doc)=>({id:doc.id,...doc.data()}));
            setNweets(nweetArr);
        })
      
    }

    const onSubmit = async (e)=>{
        e.preventDefault();
        try{
            // firebase 데이터에 데이터 삽입 dbAddDoc(dbCollection(dbService,'collection이름'),{document})  
            const twit = await dbAddDoc(dbCollection(dbService,'nweets'),{
                nweet,
                createAt:Date.now(),
                creatorId:userObj.uid
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
                   return (
                    <Nweet nweetObj={data} key={data.id} isOwner={data.creatorId===userObj.uid}/>
                   )
                   
                })}
            </div>
        </div>
    )
}

export default Home;