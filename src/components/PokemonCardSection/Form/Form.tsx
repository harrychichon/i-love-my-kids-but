import "./Form.scss"
import Checkboxes from './Checkboxes/Checkboxes.tsx';
import React from 'react';
import ResetButton from './ResetButton/ResetButton.tsx';

type FormProps = {
	searchQuery: string
	onChange:  React.ChangeEventHandler<HTMLInputElement>
	onClick: React.MouseEventHandler
}

export default function Form({searchQuery, onChange, onClick}: FormProps) {
	const allTypes = ["bug", "dark", "dragon", "electric", "fairy","fighting", "fire", "flying", "ghost", "grass", "ground", "ice", "normal", "poison", "psychic", "rock", "steel", "water"]
	
	return (

		<>
			<form className="Form">
				<div className="Name">
					<input
						className="SearchBar"
						type="text"
						placeholder="Search Pokemon name..."
						value={searchQuery}
						onChange={onChange}
					/>
				</div>
				<label htmlFor="shinyInput" id="shiny">
					Shiny
					<input type="checkbox" id="shinyInput" onChange={onChange} />
				</label>
				<Checkboxes array={allTypes} id={true} legend="Filter by type"
				            onChange={onChange} />
				<ResetButton onClick={onClick} />
			</form>
		</>
	)
}