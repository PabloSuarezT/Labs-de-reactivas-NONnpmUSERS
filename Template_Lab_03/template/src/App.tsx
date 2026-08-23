import BakemonDisplay from './components/BakemonDisplay';
import bakemonData from './data/bakemon';
import type { Bakemon } from './types';

const testBakemon = (bakemonData as Bakemon[])[0]; // el primer Bakemon, ej. bulbasaur

function App() {
  return <BakemonDisplay bakemon={testBakemon} />;
}

export default App;