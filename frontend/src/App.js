import { BrowserRouter, Route } from "react-router-dom";
import Web3 from "web3";
import React, { useEffect, useState } from "react";
import {useCookies} from 'react-cookie';

import PalguNamu from './abis/PalguNamu.json';
import TreeFactory from './abis/TreeFactory.json';

import ProductContainer from "./containers/ProductContainer";
import BuyingTokenContainer from "./containers/BuyingTokenContainer";
import StakingContainer from "./containers/StakingContainer";
import SwapContainer from "./containers/SwapContainer";
import MakeTreeContanier from "./containers/MakeTreeContanier";
import MyPageContainer from "./containers/MyPageContainer";

import { useDispatch, useSelector } from "react-redux";
import { getAddress, getHOLOMI, getHTR, login_token } from "./modules/user";
import NoChrome from "./pages/NoChrome";
import Nav from "./containers/Nav";
export default function App() {
  const [loading, setLoading] = useState(true);
  let [account, setAccount] = useState('');
  const [palgunamu, setPalgunamu] = useState(null);
  const [treefactory, setTreefactory] = useState(null);

  const test = useSelector(state => state.user)


  useEffect(async()=>{
    if(window.ethereum || window.web3){

      await loadWeb3();
      await loadAccountData();
      await loadTreeFactoryData();
      setLoading(false);
    }
  },[]);

  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['Namu']);
  let token = cookies.Namu;

  useEffect(()=>{
    if(token){
      let body = {
        token : token
      }
      dispatch(login_token(body))
    }
  },[])

  window.ethereum.on('accountsChanged', async function (accounts) {
    if(window.ethereum || window.web3){
      await loadWeb3();
      await loadAccountData();
      await loadTreeFactoryData();
      setLoading(false);
    }
  })
  
  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');

    }
  };

  async function loadAccountData(){
    const web3 = window.web3
    // Load account
    let accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    
   
    const networkId = await web3.eth.net.getId();
    const networkData = PalguNamu.networks[networkId];

    if(networkData){
      const palguNamu = new web3.eth.Contract(PalguNamu.abi, networkData.address);
      setPalgunamu(palguNamu);
    }
  }

  async function loadTreeFactoryData(){
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    dispatch(getAddress(accounts[0]));
    // Load network / contract
    const networkId = await web3.eth.net.getId();
    const networkData = TreeFactory.networks[networkId];

    if(networkData){
      const treeFactory = new web3.eth.Contract(TreeFactory.abi, networkData.address);
      setTreefactory(treeFactory);
    }
  }

  
  async function setHTR() {
    let treeAMount = await treefactory.methods.balanceOf(account).call();
    dispatch(getHTR(treeAMount));
  }
  async function setHolomi() {
    let holomi = await palgunamu.methods.balanceOfHolomi(account).call();
    const realHolomi = holomi / 10 ** 18;
    dispatch(getHOLOMI(realHolomi));
  }

  return (
    <BrowserRouter>
      {loading? <NoChrome/>:
      <>
        <Nav palgunamu={palgunamu} account={account} treefactory={treefactory} setHolomi={setHolomi} setHTR={setHTR} setAccount={setAccount}/>
        <Route path="/" component={MainPage}  exact />

        <Route path="/shop" render={()=><ProductContainer palgunamu={palgunamu} account={account} setHolomi={setHolomi}/>} />
        <Route path="/mypage" render={()=><MyPageContainer palgunamu={palgunamu} account={account}/>} />
        <Route path="/buyingtoken" render={()=><BuyingTokenContainer palgunamu={palgunamu} account={account} setHolomi={setHolomi}/>}  />
        <Route path="/staking" render={()=><StakingContainer palgunamu={palgunamu} account={account} setHolomi={setHolomi}/>} />
        <Route path="/swap"  render={()=><SwapContainer palgunamu={palgunamu} account={account} setHolomi={setHolomi} setHTR={setHTR} />} />
        <Route path="/makeTree"  render={()=><MakeTreeContanier palgunamu={palgunamu} account={account} treefactory={treefactory}/>} />
      </>
      }
    </BrowserRouter>
  );
}
