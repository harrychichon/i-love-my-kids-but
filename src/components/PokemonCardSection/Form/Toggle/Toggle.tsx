import "./Toggle.scss";
import React from 'react';

type ToggleProps = {
	id: string
	onChange:  React.ChangeEventHandler<HTMLInputElement>
}

export default function Toggle({onChange}: ToggleProps) {
return (
	<>
		<div className="Container">
			<label className="Toggle" htmlFor="toggle">
				<span>Shiny</span>
				<input type="checkbox" id="toggle" onChange={onChange} />
				<span className="slider"></span>
			</label>
		</div>
	</>
)
}