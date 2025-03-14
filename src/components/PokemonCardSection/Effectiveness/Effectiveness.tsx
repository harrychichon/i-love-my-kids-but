import { usePokemonContext } from '../../../hooks/useContext.tsx';
import useFetch from '../../../hooks/useFetch.tsx';
import './Effectiveness.scss';

//TODO exportera fetchade types till Form
//TODO flytta isType till useFetch

type TypeResult = {
	name: string;
	url: string;
};

export type Type = {
	damage_relations: {
		double_damage_from: Array<{
			name: string;
			url: string;
		}>;
		double_damage_to: Array<{
			name: string;
			url: string;
		}>;
		half_damage_from: Array<{
			name: string;
			url: string;
		}>;
		half_damage_to: Array<{
			name: string;
			url: string;
		}>;
		no_damage_from: Array<{
			name: string;
			url: string;
		}>;
		no_damage_to: Array<{
			name: string;
			url: string;
		}>;
	};
	game_indices: Array<{
		game_index: number;
		generation: {
			name: string;
			url: string;
		};
	}>;
	generation: {
		name: string;
		url: string;
	};
	id: number;
	move_damage_class: {
		name: string;
		url: string;
	};
	moves: Array<{
		name: string;
		url: string;
	}>;
	name: string;
	names: Array<{
		language: {
			name: string;
			url: string;
		};
		name: string;
	}>;
	past_damage_relations: Array<string>;
	pokemon: Array<{
		pokemon: {
			name: string;
			url: string;
		};
		slot: number;
	}>;
	sprites: {
		'generation-iii': {
			colosseum: {
				name_icon: string;
			};
			emerald: {
				name_icon: string;
			};
			'firered-leafgreen': {
				name_icon: string;
			};
			'ruby-saphire': {
				name_icon: string;
			};
			xd: {
				name_icon: string;
			};
		};
		'generation-iv': {
			'diamond-pearl': {
				name_icon: string;
			};
			'heartgold-soulsilver': {
				name_icon: string;
			};
			platinum: {
				name_icon: string;
			};
		};
		'generation-ix': {
			'scarlet-violet': {
				name_icon: string;
			};
		};
		'generation-v': {
			'black-2-white-2': {
				name_icon: string;
			};
			'black-white': {
				name_icon: string;
			};
		};
		'generation-vi': {
			'omega-ruby-alpha-sapphire': {
				name_icon: string;
			};
			'x-y': {
				name_icon: string;
			};
		};
		'generation-vii': {
			'lets-go-pikachu-lets-go-eevee': {
				name_icon: string;
			};
			'sun-moon': {
				name_icon: string;
			};
			'ultra-sun-ultra-moon': {
				name_icon: string;
			};
		};
		'generation-viii': {
			'brilliant-diamond-and-shining-pearl': {
				name_icon: string;
			};
			'legends-arceus': {
				name_icon: string;
			};
			'sword-shield': {
				name_icon: string;
			};
		};
	};
};

export default function Effectiveness() {
	const isType = (data: unknown): data is Type =>
		typeof data === 'object' && data !== null && 'damage_relations' in data;

	const { data: allTypes } = useFetch<TypeResult, Type>(
		'https://pokeapi.co/api/v2/type',
		isType
	);

	const { selectedEffectivity, setSelectedEffectivity } = usePokemonContext();

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selected = allTypes?.find(
			(type) => type.name.toUpperCase() === e.target.value
		);
		setSelectedEffectivity(selected ?? null);
	};

	return (
		<>
			<section className='Effectiveness'>
				<h2>Damage multipliers</h2>
				<div className='FilterContainer'>
					<select
						className={selectedEffectivity?.name.toLowerCase()}
						name='types'
						id='types-drop-down'
						onChange={handleChange}
					>
						<option value='Choose a type'>Choose a type</option>
						{allTypes?.map((type) =>
							type.name === 'stellar' ? null : type.name ===
							  'unknown' ? null : (
								<option
									key={type.name}
									className={type.name.toLowerCase()}
									value={type.name.toUpperCase()}
								>
									{type.name.toUpperCase()}
								</option>
							)
						)}
					</select>
				</div>
				{selectedEffectivity ? (
					<div className='ActiveType'>
						<fieldset className='Attacking'>
							<legend>Attacking</legend>
							<ul className='Double'>
								x2
								{selectedEffectivity.damage_relations.double_damage_to.map(
									(doubleDamageTo) => (
										<li
											key={doubleDamageTo.name}
											className={doubleDamageTo.name}
										>
											{doubleDamageTo.name.toUpperCase()}
										</li>
									)
								)}
							</ul>
							<ul className='Half'>
								x½
								{selectedEffectivity.damage_relations.half_damage_to.map(
									(halfDamageTo) => (
										<li
											key={halfDamageTo.name}
											className={halfDamageTo.name}
										>
											{halfDamageTo.name.toUpperCase()}
										</li>
									)
								)}
							</ul>
							<ul className='Zero'>
								x0
								{selectedEffectivity.damage_relations.no_damage_to.map(
									(noDamageTo) => (
										<li
											key={noDamageTo.name}
											className={noDamageTo.name}
										>
											{noDamageTo.name.toUpperCase()}
										</li>
									)
								)}
							</ul>
						</fieldset>
						<fieldset className='Defending'>
							<legend>Defending</legend>
							<ul className='Double'>
								x2
								{selectedEffectivity.damage_relations.double_damage_from.map(
									(doubleDamageFrom) => (
										<li
											key={doubleDamageFrom.name}
											className={doubleDamageFrom.name}
										>
											{doubleDamageFrom.name.toUpperCase()}
										</li>
									)
								)}
							</ul>
							<ul className='Half'>
								x½
								{selectedEffectivity.damage_relations.half_damage_from.map(
									(halfDamageFrom) => (
										<li
											key={halfDamageFrom.name}
											className={halfDamageFrom.name}
										>
											{halfDamageFrom.name.toUpperCase()}
										</li>
									)
								)}
							</ul>
							<ul className='Zero'>
								x0
								{selectedEffectivity.damage_relations.no_damage_from.map(
									(noDamageFrom) => (
										<li
											key={noDamageFrom.name}
											className={noDamageFrom.name}
										>
											{noDamageFrom.name.toUpperCase()}
										</li>
									)
								)}
							</ul>
						</fieldset>
					</div>
				) : null}
			</section>
		</>
	);
}
