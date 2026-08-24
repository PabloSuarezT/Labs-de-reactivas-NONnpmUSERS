import type { BakemonListProps } from '../types';

export default function BakemonList({ 
  bakemons, 
  team, 
  onSelectBakemon, 
  onAddToTeam, 
  onRemoveFromTeam 
}: BakemonListProps) {
  const isTeamFull = team.length >= 6;

  return (
    <div className="bakemon-list-container">
      <h2>Listado de Bakemon</h2>
      <ul className="bakemon-list">
        {bakemons.map(b => {
          const isInTeam = team.some(member => member.id === b.id);

          return (
            <li 
              key={b.id} 
              className="info-box bakemon-card-item"
              style={{ marginBottom: '10px', padding: '10px' }}
            >
              <div 
                onClick={() => onSelectBakemon(b)} 
                style={{ cursor: 'pointer' }}
              >
                <span className="bakemon-number">#{String(b.id).padStart(3, '0')}</span>
                <strong className="bakemon-name"> {b.name}</strong>
              </div>

              <div className="team-actions" style={{ marginTop: '8px' }}>
                {isInTeam ? (
                  <button onClick={() => onRemoveFromTeam(b.id)}>
                    Quitar del equipo
                  </button>
                ) : (
                  !isTeamFull && (
                    <button onClick={() => onAddToTeam(b)}>
                      Agregar al equipo
                    </button>
                  )
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}