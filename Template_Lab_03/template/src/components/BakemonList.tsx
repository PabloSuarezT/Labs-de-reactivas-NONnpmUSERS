import type { BakemonListProps } from '../types';

export default function BakemonList({ bakemons, onSelectBakemon }: BakemonListProps) {
  return (
    <div className="bakemon-list-container">
      <h2>Selecciona un Bakemon</h2>
      <ul className="bakemon-list">
        {bakemons.map(b => (
          <li 
            key={b.id} 
            className="info-box bakemon-card-item"
            onClick={() => onSelectBakemon(b)}
            style={{ cursor: 'pointer', marginBottom: '10px' }}
          >
            <div className="bakemon-header">
              <span className="bakemon-number">#{String(b.id).padStart(3, '0')}</span>
              <strong className="bakemon-name">{b.name}</strong>
            </div>
            <div className="bakemon-types">
              {b.types.map(t => (
                <span key={t.slot} className={`type-badge type-${t.type}`}>
                  {t.type}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}