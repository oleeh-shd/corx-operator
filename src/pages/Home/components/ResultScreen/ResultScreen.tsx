import React, {useEffect, useState, FC} from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Pixelify} from "react-pixelify";

import 'react-circular-progressbar/dist/styles.css';
import loaderImage from '../../../../assets/loader.png';
import cn from 'classnames';

type ProgressBarProps = {
    timeInSeconds: number;
}
const ResultScreen: FC<ProgressBarProps> = ({
   timeInSeconds,
}) => {

    return (
        <div className="result-face-wrapper">
            {/*<div className="speech-wrapper">*/}
            {/*    {result === 'fraud-detected' && <div className="speech-content">*/}
			{/*						<img src={warning} alt="warning"/>*/}
			{/*						<div className="speech-title">*/}
			{/*							Synthetic speech detected*/}
			{/*						</div>*/}
			{/*					</div>*/}
            {/*    }*/}

            {/*    {(result === 'fraud-detected') && isActiveGenFace && <div className="wr"></div>}*/}
            {/*    {<div className="image-wrapper" style={result !== 'fraud-detected' ? {*/}
            {/*        flexDirection: "row-reverse",*/}
            {/*        alignItems: "start",*/}
            {/*        width: '100%',*/}
            {/*        justifyContent: isActiveGenFace ? "space-between" : 'start'*/}
            {/*    } : {}}>*/}
            {/*        {result !== '/' && isActiveGenFace && <div className="image-container">*/}
            {/*            {genFace.img ? (genFace.default ?*/}
            {/*                    <img*/}
            {/*                        style={{border: "1px solid #C0C0C0"}}*/}
            {/*                        src={genFace.img}*/}
            {/*                        width={93}*/}
            {/*                        height={93}*/}
            {/*                    /> :*/}
            {/*                    <Pixelify*/}
            {/*                        src={genFace.img}*/}
            {/*                        width={93}*/}
            {/*                        height={93}*/}
            {/*                        centered={true}*/}
            {/*                        pixelSize={pixelSize}*/}
            {/*                        fillTransparencyColor="white"*/}
            {/*                    />) :*/}
            {/*                <img*/}
            {/*                    className="additional-loader"*/}
            {/*                    src={loaderImage}*/}
            {/*                    alt=""*/}
            {/*                />}*/}
			{/*							</div>}*/}
            {/*        {result !== '/' && isActiveAgeGender && (<div className="ageGender-wrapper">*/}
            {/*            <div className={cn('generated-ageGender-text', 'spacing')}>*/}
            {/*                <div className="content-text-wrapper">*/}
            {/*                    <div className="title-wrapper">Age</div>*/}
            {/*                    <div*/}
            {/*                        className="title-content">{ageGander?.age ? (period(+ageGander?.age?.substr(2, 2))) : '?'}</div>*/}
            {/*                </div>*/}
            {/*                <div className="content-text-wrapper">*/}
            {/*                    <div className="title-wrapper">Gender</div>*/}
            {/*                    <div*/}
            {/*                        className="title-content">{ageGander?.gender ? (ageGander.gender === "[0]" ? "male" : "female") : '?'}</div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>)}*/}
            {/*    </div>*/}
            {/*    }*/}
            {/*</div>*/}

            {/*{(result === 'fraud-detected' || result === 'timeout-exceeded' || result === 'voice-not-verified' || result === 'enroll-not-passed') &&*/}
			{/*				<div className="action-wrapper">*/}
			{/*					<div*/}
			{/*						className="action-container"*/}
			{/*						onClick={(value) => {*/}
            {/*          if (result !== 'enroll-not-passed') {*/}
            {/*              handleReset();*/}
            {/*              onClickVerifyVoiceprint(value);*/}
            {/*          } else {*/}
            {/*              handleReset();*/}
            {/*              onClickEnroll()*/}
            {/*          }*/}
            {/*      }}>*/}
			{/*						<img src={restart} alt="restart"/>*/}
			{/*						<div className="restart-title">*/}
			{/*							Restart verification*/}
			{/*						</div>*/}
			{/*					</div>*/}
			{/*					<div className="action-container"></div>*/}
			{/*					<div className="action-container"></div>*/}
			{/*				</div>}*/}
        </div>
    );
};

export default ResultScreen;
