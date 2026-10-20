import React from 'react';
import { CITIES_DATA } from '../data/cityData.js';

export default function WeatherForecast({ location }) {
  const cityProfile = CITIES_DATA[location] || CITIES_DATA["Madurai, Tamil Nadu"];

  return (
    <div className="content-body">
      <div className="interactive-panel">
        <div className="panel-header">
          <h3>⛅ Open-Meteo 7-Day Weather & Agro-Meteorology ({cityProfile.city})</h3>
          <p>Pre-warmed hourly & daily meteorological forecast for {cityProfile.district}.</p>
        </div>

        {/* Current Highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '22px' }}>
          <div className="stat-card" style={{ background: '#f8fafc' }}>
            <div className="stat-details">
              <span className="stat-label">Current Temperature</span>
              <span className="stat-value">{cityProfile.weather.temp}</span>
              <span className="stat-subtext">{cityProfile.weather.condition}</span>
            </div>
          </div>

          <div className="stat-card" style={{ background: '#f8fafc' }}>
            <div className="stat-details">
              <span className="stat-label">Air Humidity</span>
              <span className="stat-value">{cityProfile.weather.humidity}</span>
              <span className="stat-subtext">Relative moisture</span>
            </div>
          </div>

          <div className="stat-card" style={{ background: '#f8fafc' }}>
            <div className="stat-details">
              <span className="stat-label">Wind Speed & Vector</span>
              <span className="stat-value">{cityProfile.weather.wind}</span>
              <span className="stat-subtext">Field Aeration Good</span>
            </div>
          </div>

          <div className="stat-card" style={{ background: '#f8fafc' }}>
            <div className="stat-details">
              <span className="stat-label">Rain Probability</span>
              <span className="stat-value">{cityProfile.weather.rainChance}</span>
              <span className="stat-subtext">48-Hour Forecast</span>
            </div>
          </div>
        </div>

        {/* 7-Day Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', marginBottom: '22px' }}>
          {cityProfile.weather.forecast.map((d, i) => (
            <div key={i} style={{ background: '#f8fafc', padding: '16px 12px', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{d.day}</div>
              <div style={{ fontSize: '15px', fontWeight: '800', color: '#059669', margin: '6px 0' }}>{d.max} / {d.min}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>{d.weather}</div>
              <div style={{ fontSize: '11px', color: '#2563eb', fontWeight: '700', marginTop: '4px' }}>💧 {d.rain}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '16px' }}>
          <h4 style={{ color: '#1e40af', fontSize: '14px', fontWeight: '700', marginBottom: '4px' }}>
            🌾 Weather-Based Agricultural Advisory for {cityProfile.city}:
          </h4>
          <p style={{ fontSize: '13px', color: '#1e3a8a', lineHeight: '1.5' }}>
            {cityProfile.advisories.items[0]?.desc}
          </p>
        </div>
      </div>
    </div>
  );
}
