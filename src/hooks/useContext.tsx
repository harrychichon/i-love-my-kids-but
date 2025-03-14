import { createContext, useContext } from 'react';
import { PokemonContextType } from '../contexts/PokemonContext';

export const PokemonContext = createContext<PokemonContextType | null>(null);

export const usePokemonContext = (): PokemonContextType => {
	const context = useContext(PokemonContext);
	if (!context) {
		throw new Error('GameContext must be used with a provider');
	}
	return context;
};
