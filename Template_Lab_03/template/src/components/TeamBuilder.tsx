import type { Bakemon } from '../types';

interface TeamBuilderProps {
  team: Bakemon[];
  onRemoveFromTeam: (bakemonId: number) => void;
}

export default function TeamBuilder({ team, onRemoveFromTeam }: TeamBuilderProps) {
  const maxSlots = 6;
  const slots = Array.from({ length: maxSlots });

  return (
    <section className="team-builder-section">
      <h2>Mi Equipo Bakemon ({team.length}/{maxSlots})</h2>
      <div className="team-slots-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
        {slots.map((_, index) => {
          const member = team[index];
          return (
            <div 
              key={index} 
              className="info-box team-slot" 
              style={{ padding: '10px', textAlign: 'center', minHeight: '80px', border: '1px dashed #ccc' }}
            >
              {member ? (
                <div>
                  <p><strong>{member.name}</strong></p>
                  <button onClick={() => onRemoveFromTeam(member.id)}>Quitar</button>
                </div>
              ) : (
                <p style={{ color: '#888' }}>Vacío</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}