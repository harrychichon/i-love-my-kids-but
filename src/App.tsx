import './App.css';
import PokemonCardSection
	from './components/PokemonCardSection/PokemonCardSection.tsx';
import {PokemonContextProvider} from './contexts/PokemonContext.tsx';

function App() {

	return (
		<>
			<div id="app">
				<PokemonContextProvider>
					<PokemonCardSection />
				</PokemonContextProvider>
			</div>
		</>
	);
}

export default App;