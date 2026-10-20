import React from 'react';
import { CITIES_DATA } from '../data/cityData.js';

export default function SoilHealth({ location }) {
  const cityProfile = CITIES_DATA[location] || CITIES_DATA["Madurai, Tamil Nadu"];

  return (
    <div className="content-body">
      <div className="interactive-panel">
        <div className="panel-header">
          <h3>🧪 District Soil Health Card & Survey Baseline ({cityProfile.city})</h3>
          <p>Official ICAR / TNAU regional soil survey benchmarks for <strong>{cityProfile.soil.type}</strong>.</p>
        </div>

        {/* 4 Nutrient Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '22px' }}>
          {/* Nitrogen */}
          <div className="dashboard-card" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Available Nitrogen (N)</span>
            <div style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: '8px 0' }}>{cityProfile.soil.n} kg/ha</div>
            <span className="risk-pill" style={{ background: '#d1fae5', color: '#065f46' }}>Optimal Range (80-120)</span>
          </div>

          {/* Phosphorus */}
          <div className="dashboard-card" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Available Phosphorus (P)</span>
            <div style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: '8px 0' }}>{cityProfile.soil.p} kg/ha</div>
            <span className="risk-pill" style={{ background: '#d1fae5', color: '#065f46' }}>Optimal Range (30-60)</span>
          </div>

          {/* Potassium */}
          <div className="dashboard-card" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Available Potassium (K)</span>
            <div style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: '8px 0' }}>{cityProfile.soil.k} kg/ha</div>
            <span className="risk-pill" style={{ background: '#d1fae5', color: '#065f46' }}>Optimal Range (35-65)</span>
          </div>

          {/* pH */}
          <div className="dashboard-card" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Soil pH (Acidity / Alkalinity)</span>
            <div style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: '8px 0' }}>{cityProfile.soil.ph} pH</div>
            <span className="risk-pill" style={{ background: '#d1fae5', color: '#065f46' }}>Neutral & Productive</span>
          </div>
        </div>

        {/* Diagnostic Soil Maintenance Prescription */}
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '18px' }}>
          <h4 style={{ color: '#065f46', fontSize: '15px', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🌱 Soil Fertility Management for {cityProfile.city} ({cityProfile.soil.type}):
          </h4>
          <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: '1.6', marginBottom: '8px' }}>
            • <strong>Soil Classification:</strong> {cityProfile.soil.type} with natural baseline moisture retention of {cityProfile.soil.moisture}%.
          </p>
          <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: '1.6', marginBottom: '8px' }}>
            • <strong>Organic Amendment:</strong> Incorporate decomposed Farm Yard Manure (FYM) or vermicompost @ 5 tonnes/acre before basal tilling to maintain soil organic carbon.
          </p>
          <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: '1.6' }}>
            • <strong>Custom Field Testing:</strong> If you have conducted a personal laboratory soil test with different values, enter them in the <strong>Crop Recommendation</strong> tab to get a farm-specific suitability score.
          </p>
        </div>
      </div>
    </div>
  );
}
