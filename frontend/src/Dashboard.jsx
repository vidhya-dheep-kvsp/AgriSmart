import React from 'react';
import { CITIES_DATA } from './data/cityData.js';

export default function Dashboard({ setActiveTab, location, setLocation, farmer, onOpenAuth }) {
  const current = CITIES_DATA[location] || CITIES_DATA["Madurai, Tamil Nadu"];

  return (
    <div className="content-body">
      {/* Welcome Banner */}
      <div className="welcome-hero">
        <div className="welcome-title-group">
          <h2>
            {farmer && farmer.isLoggedIn ? `Welcome, ${farmer.name}! 🌱` : 'Welcome to AgriSmart! 🌱'}
          </h2>
          <p>
            {farmer && farmer.isLoggedIn
              ? `Personalized AI recommendations and real-time insights for your ${farmer.acres || '3.5'}-acre farm in ${current.city}.`
              : `Real-time agricultural insights and AI crop advisories for ${current.city}. Please log in or register to track your farm.`}
          </p>
        </div>
      </div>

      {/* 5 Dynamic Stat Cards */}
      <div className="stats-ribbon">
        {/* 1. Location */}
        <div className="stat-card">
          <div className="stat-icon-wrapper blue">📍</div>
          <div className="stat-details">
            <span className="stat-label">Current Location</span>
            <span className="stat-value">{current.district}</span>
            <span className="stat-subtext" onClick={onOpenAuth} style={{ cursor: 'pointer', color: '#059669', fontWeight: '600' }}>
              {farmer && farmer.isLoggedIn ? 'Manage Farm Profile' : 'Sign In to Customize'}
            </span>
          </div>
        </div>

        {/* 2. Weather */}
        <div className="stat-card">
          <div className="stat-icon-wrapper amber">⛅</div>
          <div className="stat-details">
            <span className="stat-label">Weather ({current.city})</span>
            <span className="stat-value">{current.weather.temp}</span>
            <span className="stat-subtext">{current.weather.condition}</span>
          </div>
        </div>

        {/* 3. Soil Health */}
        <div className="stat-card">
          <div className="stat-icon-wrapper emerald">🌱</div>
          <div className="stat-details">
            <span className="stat-label">Soil Health</span>
            <span className="stat-value">{current.soil.status}</span>
            <span className="stat-subtext">{current.soil.statusNote}</span>
          </div>
        </div>

        {/* 4. Next Advisory */}
        <div className="stat-card">
          <div className="stat-icon-wrapper red">📅</div>
          <div className="stat-details">
            <span className="stat-label">Next Advisory</span>
            <span className="stat-value">{current.advisories.nextAdvisory}</span>
            <span className="stat-subtext">{current.advisories.nextAdvisorySub}</span>
          </div>
        </div>

        {/* 5. Market Price */}
        <div className="stat-card">
          <div className="stat-icon-wrapper gold">₹</div>
          <div className="stat-details">
            <span className="stat-label">Market Price ({current.marketPrice.topCommodity})</span>
            <span className="stat-value">{current.marketPrice.modalPrice}</span>
            <span className="stat-subtext" onClick={() => setActiveTab('market')} style={{ cursor: 'pointer', color: '#d97706', fontWeight: '600' }}>
              View {current.city} Mandi
            </span>
          </div>
        </div>
      </div>

      {/* 3 Column Middle Layout (Dynamic for City) */}
      <div className="core-grid">
        {/* Left: Dynamic Crop Recommendation */}
        <div className="dashboard-card">
          <div className="card-header">
            <span className="card-title">🌾 Crop Recommendation</span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>
            Recommended Crop for {current.city} ({current.soil.type}):
          </p>
          <div className="crop-preview-box">
            <div className="crop-avatar">🌾</div>
            <div className="crop-details">
              <h4>{current.cropRec.recommendedCrop}</h4>
              <span>Suitability Score: {current.cropRec.dashSuitabilityScore}</span>
            </div>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>Why this crop in {current.city}?</span>
            <ul className="why-list" style={{ marginTop: '8px' }}>
              {current.cropRec.whyThisCrop.map((reason, i) => (
                <li key={i}>✓ {reason}</li>
              ))}
            </ul>
          </div>

          <button className="btn-cta-recommend" onClick={() => setActiveTab('crop')}>
            Analyze Soil & Run Prediction →
          </button>
        </div>

        {/* Middle: Dynamic AI Advisory for City */}
        <div className="dashboard-card">
          <div className="card-header">
            <span className="card-title">💡 AI Advisory for You</span>
            <span className="card-header-action" onClick={() => setActiveTab('advisories')}>View All →</span>
          </div>
          <div className="advisory-list">
            {current.advisories.items.map((adv, i) => (
              <div key={i} className="advisory-item">
                <div className="advisory-top">
                  <span className="advisory-topic">{adv.type}</span>
                  <span className="advisory-time">{adv.time}</span>
                </div>
                <p className="advisory-desc">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Dynamic 7-Day Forecast for City */}
        <div className="dashboard-card">
          <div className="card-header">
            <span className="card-title">⛅ 7-Day Weather ({current.city})</span>
            <span className="card-header-action" onClick={() => setActiveTab('weather')}>Details →</span>
          </div>
          <table className="forecast-table">
            <tbody>
              {current.weather.forecast.map((row, i) => (
                <tr key={i}>
                  <td>{row.day}</td>
                  <td>{row.max} / {row.min}</td>
                  <td style={{ color: '#64748b' }}>{row.weather}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom 4 Feature Cards */}
      <div className="feature-cards-grid">
        <div className="feature-card">
          <span className="feature-card-title">🧪 Soil Health Report</span>
          <p className="feature-card-desc">Check {current.city} NPK parameters and nutrient analysis.</p>
          <button className="btn-small-card" onClick={() => setActiveTab('soil')}>Check Now</button>
        </div>

        <div className="feature-card">
          <span className="feature-card-title">💡 Grounded Advisories</span>
          <p className="feature-card-desc">Curated ICAR advisories for {current.cropRec.recommendedCrop}.</p>
          <button className="btn-small-card" onClick={() => setActiveTab('advisories')}>View Advisories</button>
        </div>

        <div className="feature-card">
          <span className="feature-card-title">💰 {current.city} Mandi Prices</span>
          <p className="feature-card-desc">Check live cached wholesale prices at {current.marketPrice.marketName}.</p>
          <button className="btn-small-card" onClick={() => setActiveTab('market')}>View Prices</button>
        </div>

        <div className="feature-card">
          <span className="feature-card-title">💬 AI Krishi Assistant</span>
          <p className="feature-card-desc">Conversational assistance tailored to {current.city}.</p>
          <button className="btn-small-card" onClick={() => setActiveTab('chat')}>Open Chat</button>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-sih">
        © 2026 AgriSmart - Smart Crop Advisory System. All rights reserved. | Designed for Farmers, Powered by Technology. (Cyber Harvest - SIH 2026)
      </div>
    </div>
  );
}
