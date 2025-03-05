import "./ResetButton.scss"
import React from 'react';

type ResetButtonProps = {
	onClick: React.MouseEventHandler
}

export default function ResetButton({onClick}: ResetButtonProps) {

	return (
		<>
			<button className="ResetButton" onClick={onClick} type="button">Reset filters</button>
		</>
	)
}