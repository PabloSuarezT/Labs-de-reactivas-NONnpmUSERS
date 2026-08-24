import { useState } from 'react';
import BakemonDisplay from './components/BakemonDisplay';
import BakemonList from './components/BakemonList';
import bakemonData from './data/bakemon';
import type { Bakemon } from './types';

const bakemons = bakemonData as Bakemon[];

function App() {
  // Estado para controlar qué Bakemon está seleccionado (null = muestra lista)
  const [selectedBakemon, setSelectedBakemon] = useState<Bakemon | null>(null);

  const handleSelectBakemon = (bakemon: Bakemon) => {
    setSelectedBakemon(bakemon);
  };

  const handleBackToList = () => {
    setSelectedBakemon(null);
  };

  return (
    <main className="app-container">
      {selectedBakemon ? (
        <BakemonDisplay 
          bakemon={selectedBakemon} 
          onBack={handleBackToList} 
        />
      ) : (
        <BakemonList 
          bakemons={bakemons} 
          onSelectBakemon={handleSelectBakemon} 
        />
      )}
    </main>
  );
}

export default App;