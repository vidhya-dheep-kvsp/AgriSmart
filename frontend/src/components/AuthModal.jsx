import React, { useState } from 'react';

// Pre-seeded demo farmer database
const DEFAULT_ACCOUNTS = [
  {
    id: "FARM-TN-01",
    name: "Srinivasan",
    phone: "9876543210",
    pin: "1234",
    location: "Madurai, Tamil Nadu",
    acres: "3.5",
    crop: "Paddy (Rice)"
  },
  {
    id: "FARM-TN-02",
    name: "Navya Sri",
    phone: "9123456780",
    pin: "1234",
    location: "Coimbatore, Tamil Nadu",
    acres: "5.0",
    crop: "Cotton (Bt-II)"
  },
  {
    id: "FARM-TN-03",
    name: "Ramasamy",
    phone: "9443322110",
    pin: "1234",
    location: "Thanjavur, Tamil Nadu",
    acres: "4.0",
    crop: "Samba Paddy"
  }
];

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  // Login form state
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPin, setLoginPin] = useState('');
  
  // Register form state
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPin, setRegPin] = useState('');
  const [regAcres, setRegAcres] = useState('2.5');
  const [regDistrict, setRegDistrict] = useState('Madurai, Tamil Nadu');
  const [regCrop, setRegCrop] = useState('Paddy (Rice)');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const getUsers = () => {
    const stored = localStorage.getItem('agrismart_registered_users');
    if (stored) {
      try { return JSON.parse(stored); } catch (e) {}
    }
    return DEFAULT_ACCOUNTS;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const users = getUsers();
    const cleanPhone = loginPhone.trim();
    const cleanPin = loginPin.trim();

    const user = users.find(u => u.phone === cleanPhone);
    if (!user) {
      setErrorMsg('❌ No farmer account found with this mobile number. Please register under New Registration tab.');
      return;
    }

    if (user.pin && user.pin !== cleanPin) {
      setErrorMsg('❌ Incorrect 4-Digit Security PIN / Password. Try "1234".');
      return;
    }

    const sessionUser = { ...user, isLoggedIn: true };
    localStorage.setItem('krishimitra_farmer_session', JSON.stringify(sessionUser));
    setSuccessMsg('✅ Logged in successfully! Loading your farm dashboard...');
    setTimeout(() => {
      onLoginSuccess(sessionUser);
    }, 350);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanPhone = regPhone.trim();
    if (cleanPhone.length < 10) {
      setErrorMsg('❌ Please enter a valid 10-digit mobile number.');
      return;
    }

    const users = getUsers();
    if (users.some(u => u.phone === cleanPhone)) {
      setErrorMsg('❌ An account with this mobile number already exists. Please log in.');
      return;
    }

    const newUser = {
      id: `FARM-TN-${Math.floor(10 + Math.random() * 90)}`,
      name: regName.trim(),
      phone: cleanPhone,
      pin: regPin.trim() || '1234',
      location: regDistrict,
      acres: regAcres,
      crop: regCrop,
      isLoggedIn: true
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem('agrismart_registered_users', JSON.stringify(updatedUsers));
    localStorage.setItem('krishimitra_farmer_session', JSON.stringify(newUser));

    setSuccessMsg('🎉 Registration successful! Logged in automatically.');
    setTimeout(() => {
      onLoginSuccess(newUser);
    }, 400);
  };

  const fillDemoAccount = (acc) => {
    setIsLoginMode(true);
    setLoginPhone(acc.phone);
    setLoginPin(acc.pin);
    setErrorMsg('');
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(3, 43, 30, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(6px)',
      padding: '20px'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '460px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)',
          color: '#ffffff',
          padding: '22px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '20px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🌱 AgriSmart Farmer Portal
            </h3>
            <p style={{ fontSize: '12px', color: '#a7f3d0', marginTop: '2px' }}>
              {isLoginMode ? 'Please log in to manage your farm' : 'Register your land and crop profile'}
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', color: '#fff', fontSize: '16px', cursor: 'pointer' }} title="Close">✕</button>
        </div>

        {/* Tab Selector: Login vs Sign Up */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <button
            type="button"
            onClick={() => { setIsLoginMode(true); setErrorMsg(''); setSuccessMsg(''); }}
            style={{
              flex: 1,
              padding: '13px',
              border: 'none',
              background: isLoginMode ? '#ffffff' : 'transparent',
              fontWeight: '700',
              fontSize: '14px',
              color: isLoginMode ? '#065f46' : '#64748b',
              borderBottom: isLoginMode ? '3px solid #10b981' : 'none',
              cursor: 'pointer'
            }}
          >
            🔑 Log In
          </button>
          <button
            type="button"
            onClick={() => { setIsLoginMode(false); setErrorMsg(''); setSuccessMsg(''); }}
            style={{
              flex: 1,
              padding: '13px',
              border: 'none',
              background: !isLoginMode ? '#ffffff' : 'transparent',
              fontWeight: '700',
              fontSize: '14px',
              color: !isLoginMode ? '#065f46' : '#64748b',
              borderBottom: !isLoginMode ? '3px solid #10b981' : 'none',
              cursor: 'pointer'
            }}
          >
            📝 Sign Up / Register
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          {errorMsg && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '14px' }}>
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '14px' }}>
              {successMsg}
            </div>
          )}

          {/* 1. LOGIN FORM */}
          {isLoginMode ? (
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Registered Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                  4-Digit Security PIN / Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="e.g. 1234"
                  value={loginPin}
                  onChange={(e) => setLoginPin(e.target.value)}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '14px' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  marginTop: '4px',
                  boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
                }}
              >
                Log In →
              </button>

              {/* Demo Quick Logins */}
              <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                  💡 Demo Profiles (Click to prefill for presentation):
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                  {DEFAULT_ACCOUNTS.map((acc, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => fillDemoAccount(acc)}
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        padding: '7px 10px',
                        fontSize: '12px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span style={{ fontWeight: '600', color: '#0f172a' }}>{acc.name} ({acc.location.split(',')[0]})</span>
                      <span style={{ color: '#059669' }}>📱 {acc.phone} (PIN: 1234)</span>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          ) : (
            /* 2. REGISTRATION FORM */
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '3px' }}>
                  Farmer Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Navya Sri / Srinivasan"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '13.5px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '3px' }}>
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '13.5px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '3px' }}>
                    PIN (4 Digits)
                  </label>
                  <input
                    type="password"
                    required
                    maxLength="4"
                    placeholder="e.g. 1234"
                    value={regPin}
                    onChange={(e) => setRegPin(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '13.5px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '3px' }}>
                    Land Area (Acres)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={regAcres}
                    onChange={(e) => setRegAcres(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '13.5px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '3px' }}>
                    Main Crop
                  </label>
                  <select
                    value={regCrop}
                    onChange={(e) => setRegCrop(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '13.5px', background: '#fff' }}
                  >
                    <option value="Paddy (Rice)">Paddy (Rice)</option>
                    <option value="Cotton (Bt-II)">Cotton (Bt-II)</option>
                    <option value="Maize">Maize / Corn</option>
                    <option value="Banana">Banana</option>
                    <option value="Shallots (Onion)">Shallots (Onion)</option>
                    <option value="Tapioca">Tapioca</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '3px' }}>
                  Farm District (Tamil Nadu)
                </label>
                <select
                  value={regDistrict}
                  onChange={(e) => setRegDistrict(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '13.5px', background: '#fff' }}
                >
                  <option value="Madurai, Tamil Nadu">Madurai, Tamil Nadu</option>
                  <option value="Coimbatore, Tamil Nadu">Coimbatore, Tamil Nadu</option>
                  <option value="Thanjavur, Tamil Nadu">Thanjavur, Tamil Nadu</option>
                  <option value="Dindigul, Tamil Nadu">Dindigul, Tamil Nadu</option>
                  <option value="Salem, Tamil Nadu">Salem, Tamil Nadu</option>
                </select>
              </div>

              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  marginTop: '4px',
                  boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
                }}
              >
                Register & Sign In →
              </button>
            </form>
          )}

          {/* Skip / Continue as Guest Option */}
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748b',
                fontSize: '12.5px',
                fontWeight: '600',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Skip and explore dashboard as Guest →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
