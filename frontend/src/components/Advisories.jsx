import React from 'react';
import { CITIES_DATA } from '../data/cityData.js';

export default function Advisories({ location }) {
  const cityProfile = CITIES_DATA[location] || CITIES_DATA["Madurai, Tamil Nadu"];

  return (
    <div className="content-body">
      <div className="interactive-panel">
        <div className="panel-header">
          <h3>💡 Grounded ICAR / KVK Farm Advisories ({cityProfile.city})</h3>
          <p>Verified agricultural recommendations tailored for {cityProfile.district} ("Grounded, Not Guessed").</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {cityProfile.advisories.items.map((item, i) => (
            <div key={i} className="grounded-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <h5 style={{ fontSize: '16px', color: '#0f172a' }}>{item.type}</h5>
                <span className="risk-pill">{item.time}</span>
              </div>
              <p style={{ fontSize: '13.5px', color: '#334155' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
