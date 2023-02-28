import React from 'react';
import {MainScreen} from './components/MainScreen/MainScreen';
import {OperationScreen} from "./components/OperationScreen/OperationScreen";
import {OngoingScreen} from "./components/OngoingScreen/OngoingScreen";
import CallerInfo from "./components/CallerInfo/CallerInfo";
import CallIdentify from "./components/CallIdentify/CallIdentify";
import Progressbar from "./components/Progressbar/Progressbar";

export const Home = () => {
    return (
        <>
            {/*<CallerInfo callerId={'12'} name={'123'} phone={'123'} onClick={() => {*/}
            {/*    console.log('')*/}
            {/*}} duration={'1'}/>*/}
            <OngoingScreen lastCallerId='1'/>
            <OperationScreen/>
            {/*<ResultScreen counterTimeEnded={() => console.log('')} timeInSeconds={11} onUpdate={() => console.log('')}*/}
            {/*             screenType={'verify'} vadSeconds={1}/>*/}
            {/*<CallIdentify result={'voice-verified'}></CallIdentify>*/}
        </>
    )
};
