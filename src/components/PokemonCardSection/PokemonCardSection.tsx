import React, { useEffect } from 'react';
import { usePokemonContext } from '../../hooks/useContext.tsx';
import useFetch from '../../hooks/useFetch.tsx';
import mapTypes from '../../utils/MapTypes.tsx';
import Effectiveness from './Effectiveness/Effectiveness.tsx';
import Form from './Form/Form.tsx';
import Loading from './Loading/Loading.tsx';
import PokemonCard from './PokemonCard/PokemonCard.tsx';
import './PokemonCardSection.scss';

export type Pokemon = {
	abilities: Array<{
		ability: {
			name: string;
			url: string;
		};
		is_hidden: boolean;
		slot: number;
	}>;
	base_experience: number;
	cries: {
		latest: string;
		legacy: string;
	};
	forms: Array<{
		name: string;
		url: string;
	}>;
	game_indices: Array<{
		game_index: number;
		version: {
			name: string;
			url: string;
		};
	}>;
	height: number;
	held_items: Array<string>;
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	moves: Array<{
		move: {
			name: string;
			url: string;
		};
		version_group_details: Array<{
			level_learned_at: number;
			move_learn_method: {
				name: string;
				url: string;
			};
			version_group: {
				name: string;
				url: string;
			};
		}>;
	}>;
	name: string;
	order: number;
	past_abilities: Array<string>;
	past_types: Array<string>;
	species: {
		name: string;
		url: string;
	};
	sprites: {
		back_default: string;
		back_female: string;
		back_shiny: string;
		back_shiny_female: string;
		front_default: string;
		front_female: string;
		front_shiny: string;
		front_shiny_female: string;
		other: {
			dream_world: {
				front_default: string;
				front_female: string;
			};
			home: {
				front_default: string;
				front_female: string;
				front_shiny: string;
				front_shiny_female: string;
			};
			'official-artwork': {
				front_default: string;
				front_shiny: string;
			};
			showdown: {
				back_default: string;
				back_female: string;
				back_shiny: string;
				back_shiny_female: string;
				front_default: string;
				front_female: string;
				front_shiny: string;
				front_shiny_female: string;
			};
		};
		versions: {
			'generation-i': {
				'red-blue': {
					back_default: string;
					back_gray: string;
					back_transparent: string;
					front_default: string;
					front_gray: string;
					front_transparent: string;
				};
				yellow: {
					back_default: string;
					back_gray: string;
					back_transparent: string;
					front_default: string;
					front_gray: string;
					front_transparent: string;
				};
			};
			'generation-ii': {
				crystal: {
					back_default: string;
					back_shiny: string;
					back_shiny_transparent: string;
					back_transparent: string;
					front_default: string;
					front_shiny: string;
					front_shiny_transparent: string;
					front_transparent: string;
				};
				gold: {
					back_default: string;
					back_shiny: string;
					front_default: string;
					front_shiny: string;
					front_transparent: string;
				};
				silver: {
					back_default: string;
					back_shiny: string;
					front_default: string;
					front_shiny: string;
					front_transparent: string;
				};
			};
			'generation-iii': {
				emerald: {
					front_default: string;
					front_shiny: string;
				};
				'firered-leafgreen': {
					back_default: string;
					back_shiny: string;
					front_default: string;
					front_shiny: string;
				};
				'ruby-sapphire': {
					back_default: string;
					back_shiny: string;
					front_default: string;
					front_shiny: string;
				};
			};
			'generation-iv': {
				'diamond-pearl': {
					back_default: string;
					back_female: string;
					back_shiny: string;
					back_shiny_female: string;
					front_default: string;
					front_female: string;
					front_shiny: string;
					front_shiny_female: string;
				};
				'heartgold-soulsilver': {
					back_default: string;
					back_female: string;
					back_shiny: string;
					back_shiny_female: string;
					front_default: string;
					front_female: string;
					front_shiny: string;
					front_shiny_female: string;
				};
				platinum: {
					back_default: string;
					back_female: string;
					back_shiny: string;
					back_shiny_female: string;
					front_default: string;
					front_female: string;
					front_shiny: string;
					front_shiny_female: string;
				};
			};
			'generation-v': {
				'black-white': {
					animated: {
						back_default: string;
						back_female: string;
						back_shiny: string;
						back_shiny_female: string;
						front_default: string;
						front_female: string;
						front_shiny: string;
						front_shiny_female: string;
					};
					back_default: string;
					back_female: string;
					back_shiny: string;
					back_shiny_female: string;
					front_default: string;
					front_female: string;
					front_shiny: string;
					front_shiny_female: string;
				};
			};
			'generation-vi': {
				'omegaruby-alphasapphire': {
					front_default: string;
					front_female: string;
					front_shiny: string;
					front_shiny_female: string;
				};
				'x-y': {
					front_default: string;
					front_female: string;
					front_shiny: string;
					front_shiny_female: string;
				};
			};
			'generation-vii': {
				icons: {
					front_default: string;
					front_female: string;
				};
				'ultra-sun-ultra-moon': {
					front_default: string;
					front_female: string;
					front_shiny: string;
					front_shiny_female: string;
				};
			};
			'generation-viii': {
				icons: {
					front_default: string;
					front_female: string;
				};
			};
		};
	};
	stats: Array<{
		base_stat: number;
		effort: number;
		stat: {
			name: string;
			url: string;
		};
	}>;
	types: Array<{
		slot: number;
		type: {
			name: string;
			url: string;
		};
	}>;
	weight: number;
};

type PokemonResult = {
	name: string;
	url: string;
};

export default function PokemonCardSection() {
	const isPokemon = (data: unknown): data is Pokemon =>
		typeof data === 'object' && data !== null && 'weight' in data;

	const { loading, data: allPokemon } = useFetch<PokemonResult, Pokemon>(
		'https://pokeapi.co/api/v2/pokemon?limit=151',
		isPokemon
	);

	const {
		filteredPokemon,
		setFilteredPokemon,
		searchQuery,
		setSearchQuery,
		selectedTypes,
		setSelectedTypes,
		shiny,
		setShiny,
	} = usePokemonContext();

	const handleClick = () => {
		setFilteredPokemon((prev) => (prev === allPokemon ? prev : allPokemon));
		setSearchQuery('');
		setSelectedTypes([]);
		setShiny(false);

		const checkboxes = document.getElementsByClassName(
			'TypeCheckbox'
		) as HTMLCollectionOf<HTMLInputElement>;
		for (const checkbox of checkboxes) {
			checkbox.checked = false;
		}

		const shinyToggle = document.getElementById('toggle') as HTMLInputElement;
		if (shinyToggle) {
			shinyToggle.checked = false;
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { type, value, checked } = e.target;
		const lowercaseValue = value.toLowerCase();

		if (type === 'text') {
			setSearchQuery(lowercaseValue);
		} else if (type === 'checkbox') {
			if (e.target.id === 'toggle') {
				setShiny(!!checked);
			} else {
				setSelectedTypes((prevTypes) =>
					checked
						? [...prevTypes, lowercaseValue]
						: prevTypes.filter((t) => t !== lowercaseValue)
				);
			}
		}
	};

	useEffect(() => {
		if (!allPokemon) return;

		let filtered = allPokemon;

		if (searchQuery) {
			filtered = filtered.filter((pokemon) =>
				pokemon.name.toLowerCase().startsWith(searchQuery)
			);
		}

		if (selectedTypes.length > 0) {
			filtered = filtered.filter((pokemon) =>
				pokemon.types.some((type) =>
					selectedTypes.includes(type.type.name.toLowerCase())
				)
			);
		}

		setFilteredPokemon(filtered);
	}, [searchQuery, selectedTypes, allPokemon, setFilteredPokemon]);

	if (loading) return <Loading />;

	return (
		<div className='PokemonCardSection'>
			<header>
				<h2 className='Heading'>Pokémon</h2>
			</header>
			<section className='Filter'>
				<Form
					searchQuery={searchQuery}
					onChange={handleChange}
					onClick={handleClick}
				/>
			</section>
			{loading ? (
				<Loading />
			) : (
				<section className='FilteredResults'>
					{filteredPokemon?.map((pokemon) => (
						<PokemonCard
							key={pokemon.id.toString()}
							name={pokemon.name}
							sprite={
								shiny
									? pokemon.sprites.front_shiny
									: pokemon.sprites.front_default
							}
							types={() => mapTypes(pokemon)}
						/>
					))}
				</section>
			)}
			<section>
				<Effectiveness />
			</section>
		</div>
	);
}
