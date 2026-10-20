import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard.jsx';
import CropRecommendation from './components/CropRecommendation.jsx';
import SoilHealth from './components/SoilHealth.jsx';
import WeatherForecast from './components/WeatherForecast.jsx';
import Advisories from './components/Advisories.jsx';
import MarketPrices from './components/MarketPrices.jsx';
import Chat from './Chat.jsx';
import AuthModal from './components/AuthModal.jsx';
import { CITIES_DATA } from './data/cityData.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [location, setLocation] = useState('Madurai, Tamil Nadu');
  const [showProfileCard, setShowProfileCard] = useState(false);

  // Active authenticated farmer state - defaults to NULL on fresh visit
  const [farmer, setFarmer] = useState(() => {
    const session = localStorage.getItem('krishimitra_farmer_session');
    if (session) {
      try {
        const parsed = JSON.parse(session);
        if (parsed && parsed.isLoggedIn) return parsed;
      } catch (e) {}
    }
    return null;
  });

  // Prompt Login/Registration modal on first entry if not logged in
  const [isAuthOpen, setIsAuthOpen] = useState(() => {
    const session = localStorage.getItem('krishimitra_farmer_session');
    return !session;
  });

  useEffect(() => {
    if (farmer && farmer.location) {
      setLocation(farmer.location);
    }
  }, [farmer]);

  const handleLoginSuccess = (profile) => {
    setFarmer(profile);
    if (profile.location) setLocation(profile.location);
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setFarmer(null);
    localStorage.removeItem('krishimitra_farmer_session');
    setShowProfileCard(false);
    setIsAuthOpen(true);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'crop', label: 'Crop Recommendation', icon: '🌾' },
    { id: 'soil', label: 'Soil Health', icon: '🧪' },
    { id: 'weather', label: 'Weather & Forecast', icon: '☁️' },
    { id: 'advisories', label: 'Advisories', icon: '💡' },
    { id: 'market', label: 'Market Prices', icon: '💰' },
    { id: 'chat', label: 'AI Krishi Assistant', icon: '💬' },
  ];

  const renderView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} location={location} setLocation={setLocation} farmer={farmer} onOpenAuth={() => setIsAuthOpen(true)} />;
      case 'crop':
        return <CropRecommendation location={location} />;
      case 'soil':
        return <SoilHealth location={location} />;
      case 'weather':
        return <WeatherForecast location={location} />;
      case 'advisories':
        return <Advisories location={location} />;
      case 'market':
        return <MarketPrices location={location} />;
      case 'chat':
        return <Chat location={location} farmer={farmer} />;
      default:
        return <Dashboard setActiveTab={setActiveTab} location={location} setLocation={setLocation} farmer={farmer} onOpenAuth={() => setIsAuthOpen(true)} />;
    }
  };

  const getPageTitle = () => {
    const current = navItems.find(n => n.id === activeTab);
    return current ? current.label : 'Dashboard';
  };

  return (
    <div className="app-container">
      {/* Real Login & Sign-Up Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Farmer Profile Card Popover */}
      {showProfileCard && farmer && farmer.isLoggedIn && (
        <div style={{
          position: 'fixed',
          top: '70px',
          right: '30px',
          background: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          border: '1px solid #e2e8f0',
          zIndex: 90,
          width: '280px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#059669', textTransform: 'uppercase' }}>Farmer Profile ID</span>
            <button onClick={() => setShowProfileCard(false)} style={{ background: 'none', border: 'none', fontSize: '14px', cursor: 'pointer' }}>✕</button>
          </div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>{farmer.name}</div>
          <div style={{ fontSize: '13px', color: '#64748b', margin: '2px 0 10px' }}>📱 {farmer.phone || 'No Mobile Linked'}</div>
          
          <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', fontSize: '12.5px', display: 'flex', flexDirection: 'column', gap: '4px', color: '#334155' }}>
            <div><strong>Location:</strong> {farmer.location}</div>
            <div><strong>Cultivated Land:</strong> {farmer.acres} Acres</div>
            <div><strong>Primary Crop:</strong> {farmer.crop || 'Paddy (Rice)'}</div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
            <button
              onClick={() => { setShowProfileCard(false); setIsAuthOpen(true); }}
              style={{ flex: 1, padding: '7px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
            >
              Switch Account
            </button>
            <button
              onClick={handleLogout}
              style={{ flex: 1, padding: '7px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
            >
              Log Out
            </button>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon-box">🌱</div>
          <div className="brand-text">
            <h1>AgriSmart</h1>
            <p>Smart Crop Advisory System</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p className="empower-badge">
            Empowering Farmers with<br />
            <strong>Smart Decisions</strong>
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-wrapper">
        <header className="top-header">
          <div className="header-left">
            <button className="toggle-sidebar-btn" onClick={() => setActiveTab('dashboard')} title="Home">
              ☰
            </button>
            <div className="page-title-box">
              <h2>{getPageTitle()}</h2>
            </div>
          </div>

          <div className="header-right">
            {/* Dynamic District Selector */}
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="location-chip"
            >
              {Object.keys(CITIES_DATA).map((loc, i) => (
                <option key={i} value={loc}>📍 {loc}</option>
              ))}
            </select>

            {/* Authentic Authentication State in Header */}
            {farmer && farmer.isLoggedIn ? (
              <div
                className="user-profile-chip"
                onClick={() => setShowProfileCard(!showProfileCard)}
                style={{ cursor: 'pointer' }}
                title="View Farmer Profile"
              >
                <span>👤 Hi, {farmer.name}</span>
                <span style={{ color: '#059669', fontSize: '11px', fontWeight: '700', background: '#d1fae5', padding: '2px 6px', borderRadius: '4px' }}>Verified</span>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                style={{
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 18px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(5, 150, 105, 0.25)'
                }}
              >
                <span>🔑</span> Log In / Sign Up
              </button>
            )}
          </div>
        </header>

        {renderView()}
      </main>
    </div>
  );
}
