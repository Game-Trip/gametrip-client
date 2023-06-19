import { useEffect, useRef, useState } from 'react';
import './logoutButton.css';
import { DoorSvg } from './DoorSvg';
import { PlayerSvg } from './PlayerSvg';

export default function LogoutButton() {
	const logoutButtonStates: any = {
		default: {
			'--figure-duration': '100',
			'--transform-figure': 'none',
			'--walking-duration': '100',
			'--transform-arm1': 'none',
			'--transform-wrist1': 'none',
			'--transform-arm2': 'none',
			'--transform-wrist2': 'none',
			'--transform-leg1': 'none',
			'--transform-calf1': 'none',
			'--transform-leg2': 'none',
			'--transform-calf2': 'none',
		},
		hover: {
			'--figure-duration': '100',
			'--transform-figure': 'translateX(1.5px)',
			'--walking-duration': '100',
			'--transform-arm1': 'rotate(-5deg)',
			'--transform-wrist1': 'rotate(-15deg)',
			'--transform-arm2': 'rotate(5deg)',
			'--transform-wrist2': 'rotate(6deg)',
			'--transform-leg1': 'rotate(-10deg)',
			'--transform-calf1': 'rotate(5deg)',
			'--transform-leg2': 'rotate(20deg)',
			'--transform-calf2': 'rotate(-20deg)',
		},
		walking1: {
			'--figure-duration': '300',
			'--transform-figure': 'translateX(11px)',
			'--walking-duration': '300',
			'--transform-arm1': 'translateX(-4px) translateY(-2px) rotate(120deg)',
			'--transform-wrist1': 'rotate(-5deg)',
			'--transform-arm2': 'translateX(4px) rotate(-110deg)',
			'--transform-wrist2': 'rotate(-5deg)',
			'--transform-leg1': 'translateX(-3px) rotate(80deg)',
			'--transform-calf1': 'rotate(-30deg)',
			'--transform-leg2': 'translateX(4px) rotate(-60deg)',
			'--transform-calf2': 'rotate(20deg)',
		},
		walking2: {
			'--figure-duration': '400',
			'--transform-figure': 'translateX(17px)',
			'--walking-duration': '300',
			'--transform-arm1': 'rotate(60deg)',
			'--transform-wrist1': 'rotate(-15deg)',
			'--transform-arm2': 'rotate(-45deg)',
			'--transform-wrist2': 'rotate(6deg)',
			'--transform-leg1': 'rotate(-5deg)',
			'--transform-calf1': 'rotate(10deg)',
			'--transform-leg2': 'rotate(10deg)',
			'--transform-calf2': 'rotate(-20deg)',
		},
		falling1: {
			'--figure-duration': '1600',
			'--walking-duration': '400',
			'--transform-arm1': 'rotate(-60deg)',
			'--transform-wrist1': 'none',
			'--transform-arm2': 'rotate(30deg)',
			'--transform-wrist2': 'rotate(120deg)',
			'--transform-leg1': 'rotate(-30deg)',
			'--transform-calf1': 'rotate(-20deg)',
			'--transform-leg2': 'rotate(20deg)',
		},
		falling2: {
			'--walking-duration': '300',
			'--transform-arm1': 'rotate(-100deg)',
			'--transform-arm2': 'rotate(-60deg)',
			'--transform-wrist2': 'rotate(60deg)',
			'--transform-leg1': 'rotate(80deg)',
			'--transform-calf1': 'rotate(20deg)',
			'--transform-leg2': 'rotate(-60deg)',
		},
		falling3: {
			'--walking-duration': '500',
			'--transform-arm1': 'rotate(-30deg)',
			'--transform-wrist1': 'rotate(40deg)',
			'--transform-arm2': 'rotate(50deg)',
			'--transform-wrist2': 'none',
			'--transform-leg1': 'rotate(-30deg)',
			'--transform-leg2': 'rotate(20deg)',
			'--transform-calf2': 'none',
		},
	};

	const [state, setState] = useState('default');
	const buttonRef = useRef(null);

	const updateButtonState = (newState: string) => {
		if (logoutButtonStates[newState]) {
			for (let key in logoutButtonStates[newState]) {
				(buttonRef.current as any)!.style.setProperty(
					key,
					logoutButtonStates[newState][key],
				);
			}
			setState(newState);
		}
	};

	const buttonClick = () => {
		(buttonRef.current as any)!.classList.add('clicked');
		updateButtonState('walking1');
		setTimeout(() => {
			(buttonRef.current as any)!.classList.add('door-slammed');
			updateButtonState('walking2');
			setTimeout(() => {
				(buttonRef.current as any)!.classList.add('falling');
				updateButtonState('falling1');
				setTimeout(() => {
					updateButtonState('falling2');
					setTimeout(() => {
						updateButtonState('falling3');
						setTimeout(() => {
							(buttonRef.current as any)!.classList.remove('clicked');
							(buttonRef.current as any)!.classList.remove('door-slammed');
							(buttonRef.current as any)!.classList.remove('falling');
							updateButtonState('default');
						}, 1000);
					}, logoutButtonStates['falling2']['--walking-duration']);
				}, logoutButtonStates['falling1']['--walking-duration']);
			}, logoutButtonStates['walking2']['--figure-duration']);
		}, logoutButtonStates['walking1']['--figure-duration']);
	};

	return (
		<>
			<button
				className="logoutButton logoutButton--light"
				ref={buttonRef}
				onMouseEnter={() => state === 'default' && updateButtonState('hover')}
				onMouseLeave={() => state === 'hover' && updateButtonState('default')}
				onClick={() =>
					(state === 'default' || state === 'hover') && buttonClick()}
			>
				<DoorSvg />
        <PlayerSvg />
				<span className="button-text">Log Out</span>
			</button>
		</>
	);
}
