import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import Web3 from "web3";
import MakeTree from "../components/MakeTree";
import {putX,putY,putAmount,putImg,setTreeToekn} from "../modules/treeToken";
import {create} from 'ipfs-http-client';
//Declare IPFS
const ipfsClient = create('https://ipfs.infura.io:5001/api/v0');
function MakeTreeContanier({palgunamu,account,treefactory}){
    const [imgBuffer, setImgBuffer] = useState(null);
    const [imgString, setImgString] = useState(null);
    const [imgLoading, setImgLoading] = useState(0);
    const dispatch = useDispatch()
    
    const treefactoryinit = useSelector(state => state.tree)

    const CaptureFile = async(e) =>{
        e.preventDefault();
        dispatch(putImg(e.target.value));
        const file = e.target.files[0];
        const reader = new window.FileReader();
        //reader.readAsArrayBuffer(file);
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const imgstring = Buffer(reader.result);
            setImgString(imgstring);
        }
    }

    const changeX =(e) =>{
        dispatch(putX(e));
    }
     const changeY =(e) =>{
        dispatch(putY(e));
    }
     const changeAmount =(e) =>{
        dispatch(putAmount(e.target.value))
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            const file = e.target.img.files[0];
            const reader = new window.FileReader();
            reader.readAsArrayBuffer(file);
            reader.onloadend = async () => {
                const imgbuffer = Buffer(reader.result);
                setImgBuffer(imgbuffer);
                
                const beforeCountHTR = await treefactory.methods.getHTRCount().call();
                const added = await ipfsClient.add(imgbuffer);
                let coordinateX = Math.floor(e.target.x.value);
                let coordinateY = Math.floor(e.target.y.value);
                await treefactory.methods.createHTR(coordinateX, coordinateY, added.path, e.target.amount.value).send({from:account});
                const goDB = {
                    tokenId : parseInt(beforeCountHTR) + 1,
                    x : e.target.x.value,
                    y : e.target.y.value,
                    amount : e.target.amount.value,
                    imgHash : added.path
                }
                dispatch(setTreeToekn(goDB));
            }
        } catch (e) {
            console.log(e.message);
        }


    }

    return <MakeTree 
        CaptureFile={CaptureFile} 
        onSubmit={onSubmit} 
        treefactoryinit={treefactoryinit} 
        changeX={changeX} changeY={changeY} 
        changeAmount={changeAmount}
        imgLoading={imgLoading}
        imgBuffer={imgBuffer}
        imgString={imgString}
    />
}


export default MakeTreeContanier;