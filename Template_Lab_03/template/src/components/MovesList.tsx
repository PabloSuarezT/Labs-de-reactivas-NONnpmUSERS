import type { BakemonMove } from '../types';
import movesData from '../data/moves';

const moves = movesData as BakemonMove[];

const movesById = new Map<number, BakemonMove>(moves.map(m => [m.id, m]));

export default function MovesList({ moveIds }: { moveIds: number[] }) {
  return (
    <ul className="moves-list">
      {moveIds.map(id => {
        const move = movesById.get(id); 

        if (!move) return null; 

        return (
          <li key={move.id} className="info-box move-card">
            <header className="move-header">
              <span className="move-name">{move.name}</span>
              <span className={`type-badge type-${move.type}`}>{move.type}</span>
            </header>
            <p className="move-power">
              <strong>Potencia:</strong> {move.power !== null ? move.power : 'Sin potencia'}
            </p>
            <p className="move-description">{move.effect_entry}</p>
          </li>
        );
      })}
    </ul>
  );
}
