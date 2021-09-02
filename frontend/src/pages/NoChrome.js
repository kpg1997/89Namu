import React from 'react'
import useScript from '../hook/useScript';
import '../style/game.css';
const NoChrome = () => {

    useScript('http://132.226.231.97:3000/js/game.js');
    return (
		<div className="game-holder" id="gameHolder">
			<div className="header">
				<h1>89NAMU</h1>
				<h2>MetaMask를 연결해주세요</h2>
				<div className="score" id="score">
					<div className="score__content" id="level">
						<div className="score__label">level</div>
						<div className="score__value score__value--level" id="levelValue">1</div>
						<svg className="level-circle" id="levelCircle" viewBox="0 0 200 200">
							<circle id="levelCircleBgr" r="80" cx="100" cy="100" fill="none" stroke="#d1b790" strokeWidth="24px" />
							<circle id="levelCircleStroke" r="80" cx="100" cy="100" fill="none"  stroke="#68c3c0" strokeWidth="14px" strokeDasharray="502" />
						</svg>
					</div>
					<div className="score__content" id="dist">
						<div className="score__label">distance</div>
						<div className="score__value score__value--dist" id="distValue">000</div>
					</div>
					<div className="score__content" id="energy">
						<div className="score__label">energy</div>
						<div className="score__value score__value--energy" id="energyValue">
							<div className="energy-bar" id="energyBar"></div>
						</div>
					</div>
				</div>
			</div>
			<div className="world" id="world"></div>
			<div className="message message--replay" id="replayMessage">Click to Replay</div>
		</div>
    )
}

export default NoChrome
