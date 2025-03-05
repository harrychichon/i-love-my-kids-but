import './PokemonCardSection.scss';
import React, {useEffect, useState} from 'react';
import PokemonCard from './PokemonCard/PokemonCard.tsx';
import useFetch from '../../hooks/useFetch.tsx';
import Form from './Form/Form.tsx';
import mapTypes from '../../utils/MapTypes.tsx';

type PokemonType = {
	abilities: Array<{
		ability: {
			name: string
			url: string
		}
		is_hidden: boolean
		slot: number
	}>
	base_experience: number
	cries: {
		latest: string
		legacy: string
	}
	forms: Array<{
		name: string
		url: string
	}>
	game_indices: Array<{
		game_index: number
		version: {
			name: string
			url: string
		}
	}>
	height: number
	held_items: Array<string>
	id: number
	is_default: boolean
	location_area_encounters: string
	moves: Array<{
		move: {
			name: string
			url: string
		}
		version_group_details: Array<{
			level_learned_at: number
			move_learn_method: {
				name: string
				url: string
			}
			version_group: {
				name: string
				url: string
			}
		}>
	}>
	name: string
	order: number
	past_abilities: Array<string>
	past_types: Array<string>
	species: {
		name: string
		url: string
	}
	sprites: {
		back_default: string
		back_female: string
		back_shiny: string
		back_shiny_female: string
		front_default: string
		front_female: string
		front_shiny: string
		front_shiny_female: string
		other: {
			dream_world: {
				front_default: string
				front_female: string
			}
			home: {
				front_default: string
				front_female: string
				front_shiny: string
				front_shiny_female: string
			}
			'official-artwork': {
				front_default: string
				front_shiny: string
			}
			showdown: {
				back_default: string
				back_female: string
				back_shiny: string
				back_shiny_female: string
				front_default: string
				front_female: string
				front_shiny: string
				front_shiny_female: string
			}
		}
		versions: {
			'generation-i': {
				'red-blue': {
					back_default: string
					back_gray: string
					back_transparent: string
					front_default: string
					front_gray: string
					front_transparent: string
				}
				yellow: {
					back_default: string
					back_gray: string
					back_transparent: string
					front_default: string
					front_gray: string
					front_transparent: string
				}
			}
			'generation-ii': {
				crystal: {
					back_default: string
					back_shiny: string
					back_shiny_transparent: string
					back_transparent: string
					front_default: string
					front_shiny: string
					front_shiny_transparent: string
					front_transparent: string
				}
				gold: {
					back_default: string
					back_shiny: string
					front_default: string
					front_shiny: string
					front_transparent: string
				}
				silver: {
					back_default: string
					back_shiny: string
					front_default: string
					front_shiny: string
					front_transparent: string
				}
			}
			'generation-iii': {
				emerald: {
					front_default: string
					front_shiny: string
				}
				'firered-leafgreen': {
					back_default: string
					back_shiny: string
					front_default: string
					front_shiny: string
				}
				'ruby-sapphire': {
					back_default: string
					back_shiny: string
					front_default: string
					front_shiny: string
				}
			}
			'generation-iv': {
				'diamond-pearl': {
					back_default: string
					back_female: string
					back_shiny: string
					back_shiny_female: string
					front_default: string
					front_female: string
					front_shiny: string
					front_shiny_female: string
				}
				'heartgold-soulsilver': {
					back_default: string
					back_female: string
					back_shiny: string
					back_shiny_female: string
					front_default: string
					front_female: string
					front_shiny: string
					front_shiny_female: string
				}
				platinum: {
					back_default: string
					back_female: string
					back_shiny: string
					back_shiny_female: string
					front_default: string
					front_female: string
					front_shiny: string
					front_shiny_female: string
				}
			}
			'generation-v': {
				'black-white': {
					animated: {
						back_default: string
						back_female: string
						back_shiny: string
						back_shiny_female: string
						front_default: string
						front_female: string
						front_shiny: string
						front_shiny_female: string
					}
					back_default: string
					back_female: string
					back_shiny: string
					back_shiny_female: string
					front_default: string
					front_female: string
					front_shiny: string
					front_shiny_female: string
				}
			}
			'generation-vi': {
				'omegaruby-alphasapphire': {
					front_default: string
					front_female: string
					front_shiny: string
					front_shiny_female: string
				}
				'x-y': {
					front_default: string
					front_female: string
					front_shiny: string
					front_shiny_female: string
				}
			}
			'generation-vii': {
				icons: {
					front_default: string
					front_female: string
				}
				'ultra-sun-ultra-moon': {
					front_default: string
					front_female: string
					front_shiny: string
					front_shiny_female: string
				}
			}
			'generation-viii': {
				icons: {
					front_default: string
					front_female: string
				}
			}
		}
	}
	stats: Array<{
		base_stat: number
		effort: number
		stat: {
			name: string
			url: string
		}
	}>
	types: Array<{
		slot: number
		type: {
			name: string
			url: string
		}
	}>
	weight: number
}

//TODO Flytta CSS till berörd komponent
//TODO Skapa variabler, mixins och forwards
//TODO Ta bort överflödig CSS
//TODO använd @Containers för active/inactive filters
//TODO använd display:contents;


export default function PokemonCardSection() {
	const {loading, allPokemon} = useFetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
	const [filteredPokemon, setFilteredPokemon] = useState<PokemonType[] | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
	const [shiny, setShiny] = useState(false);

	const handleClick = () => {
		setFilteredPokemon((prev) => (prev === allPokemon ? prev : allPokemon));
		setShiny(false);

		const shinyCheckbox = document.getElementById("shinyInput") as HTMLInputElement;
		if (shinyCheckbox) {
			shinyCheckbox.checked = false;
		}
	};


	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

		const {type, value, checked} = e.target;
		const lowercaseValue = value.toLowerCase();

		if (type === 'text') {
			setSearchQuery(lowercaseValue);
		} else if (type === 'checkbox') {

			if (e.target.id === "shinyInput") {
				setShiny(!!checked)

			} else {
				setSelectedTypes((prevTypes) =>
					checked
						? [...prevTypes, lowercaseValue]
						: prevTypes.filter((t) => t !== lowercaseValue),
				);
			}
		}
	}


	useEffect(() => {
		if (!allPokemon) return;

		let filtered = allPokemon;

		if (searchQuery) {
			filtered = filtered.filter((pokemon) =>
				pokemon.name.toLowerCase().startsWith(searchQuery),
			);
		}

		if (selectedTypes.length > 0) {
			filtered = filtered.filter((pokemon) =>
				pokemon.types.some((type) => selectedTypes.includes(type.type.name.toLowerCase())),
			);
		}

		setFilteredPokemon(filtered);
	}, [searchQuery, selectedTypes, allPokemon]);




	if (loading) return <p>Loading...</p>

	return (
		<>
			<div className="PokemonCardSection">
				<h2 className="Heading">Pokemon Card Collection</h2>
				<section className="Filter">
					<Form searchQuery={searchQuery} onChange={handleChange} onClick={handleClick}


					/>
				</section>
				{loading ? (
					<p>Loading...</p>
				) : (
					<section className="FilteredResults">
						{filteredPokemon?.map((pokemon) => (
							<PokemonCard
								key={pokemon.id.toString()}
								name={pokemon.name}
								sprite={shiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default}
								types={() => mapTypes(pokemon)}
							/>
						))}
					</section>
				)}
			</div>
		</>
	);
}