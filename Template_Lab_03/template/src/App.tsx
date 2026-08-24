import { useState } from 'react';
import BakemonDisplay from './components/BakemonDisplay';
import BakemonList from './components/BakemonList';
import TeamBuilder from './components/TeamBuilder';
import bakemonData from './data/bakemon';
import type { Bakemon } from './types';

const bakemons = bakemonData as Bakemon[];

function App() {
  const [selectedBakemon, setSelectedBakemon] = useState<Bakemon | null>(null);
  const [team, setTeam] = useState<Bakemon[]>([]);

  // Agregar sin mutar el arreglo original (uso de spread)
  const handleAddToTeam = (bakemon: Bakemon) => {
    if (team.length < 6 && !team.some(m => m.id === bakemon.id)) {
      setTeam(prevTeam => [...prevTeam, bakemon]);
    }
  };

  // Quitar sin mutar el arreglo original (uso de .filter)
  const handleRemoveFromTeam = (bakemonId: number) => {
    setTeam(prevTeam => prevTeam.filter(m => m.id !== bakemonId));
  };

  return (
    <main className="app-container" style={{ padding: '20px' }}>
      {/* Celdas del equipo siempre visibles en la parte superior */}
      <TeamBuilder team={team} onRemoveFromTeam={handleRemoveFromTeam} />
      
      <hr style={{ margin: '20px 0' }} />

      {selectedBakemon ? (
        <BakemonDisplay 
          bakemon={selectedBakemon} 
          onBack={() => setSelectedBakemon(null)} 
        />
      ) : (
        <BakemonList 
          bakemons={bakemons} 
          team={team}
          onSelectBakemon={setSelectedBakemon} 
          onAddToTeam={handleAddToTeam}
          onRemoveFromTeam={handleRemoveFromTeam}
        />
      )}
    </main>
  );
}

export default App;