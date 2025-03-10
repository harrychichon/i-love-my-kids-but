import './SearchBar.scss';
import React from 'react';

type SearchBarProps = {
	searchQuery: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>
}


export default function SearchBar({searchQuery, onChange}: SearchBarProps) {
	return (
		<>
			<input
				className="SearchBar"
				type="text"
				placeholder="Search Pokémon name..."
				value={searchQuery}
				onChange={onChange}
			/>
		</>
	);
}