import type { Bakemon } from '../types';

export default function BakemonDisplay({ bakemon }: { bakemon: Bakemon }) {
  const totalStats = bakemon.stats.reduce((sum, s) => sum + s.base_value, 0);

  return (
    <div className="bakemon-display-card">
      <header className="bakemon-header">
        <h2 className="bakemon-title">
          <span className="bakemon-number">#{String(bakemon.id).padStart(3, '0')}</span>
          <span className="bakemon-name">{bakemon.name}</span>
        </h2>
        <div className="bakemon-types">
          {bakemon.types.map(t => ( /* //map para recorrer los tipos y almacenarlos  */
            <span key={t.slot} className={`type-badge type-${t.type}`}>{t.type}</span>
          ))}
        </div>
      </header>

      <section className="bakemon-info-grid">
        <div className="info-box bakemon-physical">
          <h3>Dimensiones</h3>
          <p><strong>Altura:</strong> {bakemon.height / 10} m</p> {/* //divisiones para que quede en las medidas respectivas */}
          <p><strong>Peso:</strong> {bakemon.weight / 10} kg</p>
        </div>
        <div className="info-box bakemon-abilities">
          <h3>Habilidades</h3>
          <ul>
            {bakemon.abilities.map(a => (
              <li key={a.slot} className="ability-item">
                {a.name}{a.is_hidden && <span className="hidden-tag"> (Oculta)</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="info-box bakemon-stats">
        <h3>Estadísticas Base</h3>
        <div className="stats-list">
          {bakemon.stats.map(s => (
            <div key={s.name} className="stat-row">
              <span className="stat-name">{s.name}</span>
              <div className="stat-bar-container"> {/* //barrita para visualizar */}
                <div className="stat-bar-fill" style={{ width: `${(s.base_value / 255) * 100}%` }} />
              </div>
              <span className="stat-value">{s.base_value}</span>
            </div>
          ))}
        </div>
        <div className="total-stats-row">
          <strong>Total:</strong>
          <span className="total-stats-value">{totalStats}</span>
        </div>
      </section>
    </div>
  );
}
