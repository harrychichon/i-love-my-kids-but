import './Form.scss';
import Checkboxes from './Checkboxes/Checkboxes.tsx';
import React from 'react';
import ResetButton from './ResetButton/ResetButton.tsx';
import Toggle from './Toggle/Toggle.tsx';
import SearchBar from './SearchBar/SearchBar.tsx';

type FormProps = {
	searchQuery: string
	onChange: React.ChangeEventHandler<HTMLInputElement>
	onClick: React.MouseEventHandler
}

export default function Form({searchQuery, onChange, onClick}: FormProps) {
	const allTypes = ['bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting', 'fire', 'flying', 'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'steel', 'water'];

	return (

		<>
			<form className="Form">
				<div className="Name">
					<SearchBar searchQuery={searchQuery} onChange={onChange} />
				</div>
				<Toggle id="shiny" onChange={onChange} />
				<Checkboxes array={allTypes} id={true} legend="Filter by type"
				            onChange={onChange} />
				<ResetButton onClick={onClick} />
			</form>
		</>
	);
}