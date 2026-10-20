import React, { useState } from 'react';
import { CITIES_DATA } from '../data/cityData.js';

export default function MarketPrices({ location }) {
  const cityProfile = CITIES_DATA[location] || CITIES_DATA["Madurai, Tamil Nadu"];
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = cityProfile.marketPrice.prices.filter(p =>
    p.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.market.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content-body">
      <div className="interactive-panel">
        <div className="panel-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3>💰 {cityProfile.marketPrice.marketName} - Live Mandi Prices</h3>
              <p>Pre-warmed daily wholesale prices cached from Agmarknet / eNAM for {cityProfile.city} district.</p>
            </div>
            <input
              type="text"
              placeholder="🔍 Search commodity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '8px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '13px' }}
            />
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px 14px', fontSize: '13px', color: '#475569' }}>Commodity</th>
              <th style={{ padding: '12px 14px', fontSize: '13px', color: '#475569' }}>APMC Market</th>
              <th style={{ padding: '12px 14px', fontSize: '13px', color: '#475569' }}>Modal Price</th>
              <th style={{ padding: '12px 14px', fontSize: '13px', color: '#475569' }}>Min - Max Range</th>
              <th style={{ padding: '12px 14px', fontSize: '13px', color: '#475569' }}>Trend</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '14px', fontWeight: '700', fontSize: '14px' }}>{p.commodity}</td>
                <td style={{ padding: '14px', color: '#64748b', fontSize: '13.5px' }}>{p.market}</td>
                <td style={{ padding: '14px', fontWeight: '800', color: '#059669', fontSize: '15px' }}>{p.modalPrice}</td>
                <td style={{ padding: '14px', color: '#334155', fontSize: '13.5px' }}>{p.min} - {p.max}</td>
                <td style={{ padding: '14px', fontWeight: '700', color: p.trend.startsWith('+') ? '#16a34a' : '#dc2626', fontSize: '13px' }}>{p.trend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
