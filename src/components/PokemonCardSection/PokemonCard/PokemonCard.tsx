import './PokemonCard.scss';
import {JSX} from 'react';


type PokemonCardProps = {
	name: string
	sprite: string
	types: () => JSX.Element
	key: string
}


export default function PokemonCard({
	                                    name,
	                                    sprite,
	                                    types,
                                    }: PokemonCardProps) {


	return (
		<article className="PokemonCard" id={name}>
			<h2>{name.toUpperCase()}</h2>
			<img src={sprite}
			     alt="An image of the pokemon" />
			<table>
				<tbody>
				<tr>
					{types()}
				</tr>
				</tbody>
			</table>
		</article>

	);
}