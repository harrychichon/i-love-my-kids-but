import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useMemo,
	useState,
} from 'react';
import {Pokemon} from '../components/PokemonCardSection/PokemonCardSection.tsx';
import {
	Type,
} from '../components/PokemonCardSection/Effectiveness/Effectiveness.tsx';

type PokemonContextType = {
	loading: boolean,
	setLoading: Dispatch<SetStateAction<boolean>>,
	error: string | null,
	setError: Dispatch<SetStateAction<string | null>>,
	filteredPokemon: Pokemon[] | null
	setFilteredPokemon: Dispatch<SetStateAction<Pokemon[] | null>>
	searchQuery: string,
	setSearchQuery: Dispatch<SetStateAction<string>>
	selectedTypes: string[],
	setSelectedTypes: Dispatch<SetStateAction<string[]>>
	shiny: boolean
	setShiny: Dispatch<SetStateAction<boolean>>
	selectedEffectivity: Type | null
	setSelectedEffectivity: Dispatch<SetStateAction<Type | null>>
};

type PokemonContextProviderProps = {
	children: ReactNode;
};

const PokemonContext = createContext<PokemonContextType | null>(null);

export const usePokemonContext = (): PokemonContextType => {
	const context = useContext(PokemonContext);
	if (!context) {
		throw new Error('GameContext must be used with a provider');
	}
	return context;
};

export function PokemonContextProvider({
	                                       children,
                                       }: Readonly<PokemonContextProviderProps>) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[] | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
	const [shiny, setShiny] = useState(false);
	const [selectedEffectivity, setSelectedEffectivity] = useState<Type | null>(null);


	const value = useMemo(() => ({
			loading,
			setLoading,
			error,
			setError,
			filteredPokemon,
			setFilteredPokemon,
			searchQuery,
			setSearchQuery,
			selectedTypes,
			setSelectedTypes,
			shiny,
			setShiny,
			selectedEffectivity,
			setSelectedEffectivity,

		}),
		[error, filteredPokemon, loading, searchQuery, selectedEffectivity, selectedTypes, shiny],
	);

	return <PokemonContext.Provider
		value={value}>{children}</PokemonContext.Provider>;
}