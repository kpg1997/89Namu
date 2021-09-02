import React from 'react'
import Intro from '../containers/Intro'
import Explain from '../containers/Explain'
import BlockChain from '../containers/BlockChain'
import Block_explain from '../containers/Block_explain'
import Function_explain from '../containers/Function_explain'
import Footer from '../containers/Footer'
const MainPage = () => {
    return (
        <>
        <Intro/>
        <Explain/>
        <BlockChain/>
        <Block_explain/>
        <Function_explain/>
        <Footer/>
        </>  
    )
}

export default MainPage
