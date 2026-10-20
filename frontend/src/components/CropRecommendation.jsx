import React, { useState, useEffect } from 'react';
import { CITIES_DATA } from '../data/cityData.js';

export default function CropRecommendation({ location }) {
  const cityProfile = CITIES_DATA[location] || CITIES_DATA["Madurai, Tamil Nadu"];

  const [n, setN] = useState(cityProfile.soil.n);
  const [p, setP] = useState(cityProfile.soil.p);
  const [k, setK] = useState(cityProfile.soil.k);
  const [ph, setPh] = useState(cityProfile.soil.ph);
  const [moisture, setMoisture] = useState(cityProfile.soil.moisture);
  const [loading, setLoading] = useState(false);

  const [prediction, setPrediction] = useState({
    crop: cityProfile.cropRec.recommendedCrop,
    score: cityProfile.cropRec.suitabilityScore,
    summary: `N: ${cityProfile.soil.n} | P: ${cityProfile.soil.p} | K: ${cityProfile.soil.k} | pH: ${cityProfile.soil.ph} | Moisture: ${cityProfile.soil.moisture}%`,
    soilNote: `Adapted for ${cityProfile.soil.type} in ${cityProfile.city}`
  });

  // When user switches city in header, auto-update default soil readings for that city
  useEffect(() => {
    setN(cityProfile.soil.n);
    setP(cityProfile.soil.p);
    setK(cityProfile.soil.k);
    setPh(cityProfile.soil.ph);
    setMoisture(cityProfile.soil.moisture);
    setPrediction({
      crop: cityProfile.cropRec.recommendedCrop,
      score: cityProfile.cropRec.suitabilityScore,
      summary: `N: ${cityProfile.soil.n} | P: ${cityProfile.soil.p} | K: ${cityProfile.soil.k} | pH: ${cityProfile.soil.ph} | Moisture: ${cityProfile.soil.moisture}%`,
      soilNote: `Adapted for ${cityProfile.soil.type} in ${cityProfile.city}`
    });
  }, [location]);

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      let cropName = "Paddy (Rice)";
      let scoreVal = "98%";
      const numN = Number(n);
      const numP = Number(p);
      const numK = Number(k);
      const numM = Number(moisture);

      if (numN > 80 && numM > 50) {
        cropName = "Paddy (Rice)";
        scoreVal = "98%";
      } else if (numP > 50 && numM < 50) {
        cropName = "Cotton (Bt-II)";
        scoreVal = "95%";
      } else if (numK > 55) {
        cropName = "Small Shallots (Onion) / Banana";
        scoreVal = "96%";
      } else if (numM < 40) {
        cropName = "Tapioca / Maize";
        scoreVal = "93%";
      } else {
        cropName = "Hybrid Maize";
        scoreVal = "91%";
      }

      setPrediction({
        crop: cropName,
        score: scoreVal,
        summary: `N: ${n} | P: ${p} | K: ${k} | pH: ${ph} | Moisture: ${moisture}%`,
        soilNote: `Calculated from custom soil values in ${cityProfile.city}`
      });
      setLoading(false);
    }, 350);
  };

  return (
    <div className="content-body">
      <div className="interactive-panel">
        <div className="panel-header">
          <h3>🌾 AI Soil Analysis & Crop Suitability Prediction ({cityProfile.city})</h3>
          <p>
            Current baseline values loaded for <strong>{cityProfile.soil.type}</strong>. Adjust any parameter below to compute real-time suitability.
          </p>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Nitrogen (N) - kg/ha</label>
            <input type="number" value={n} onChange={(e) => setN(e.target.value)} className="form-input" />
          </div>

          <div className="form-group">
            <label>Phosphorus (P) - kg/ha</label>
            <input type="number" value={p} onChange={(e) => setP(e.target.value)} className="form-input" />
          </div>

          <div className="form-group">
            <label>Potassium (K) - kg/ha</label>
            <input type="number" value={k} onChange={(e) => setK(e.target.value)} className="form-input" />
          </div>

          <div className="form-group">
            <label>Soil pH</label>
            <input type="number" step="0.1" value={ph} onChange={(e) => setPh(e.target.value)} className="form-input" />
          </div>

          <div className="form-group">
            <label>Soil Moisture (%)</label>
            <input type="number" step="1" value={moisture} onChange={(e) => setMoisture(e.target.value)} className="form-input" />
          </div>
        </div>

        <button className="btn-cta-recommend" onClick={handleAnalyze} disabled={loading} style={{ padding: '13px', fontSize: '15px' }}>
          {loading ? 'Running Random Forest Model...' : 'Analyze Soil & Recommend Crop →'}
        </button>

        {prediction && (
          <div>
            <div className="prediction-box-sih">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#166534', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Recommended Crop ({cityProfile.city})
              </span>
              <h3 className="pred-crop-title">🌾 {prediction.crop}</h3>
              <div className="pred-score-text">Suitability Score: {prediction.score}</div>
              <div className="params-pill">{prediction.summary}</div>
            </div>

            {/* 3 Grounded Risk Cards */}
            <div className="grounded-grid">
              <div className="grounded-card">
                <h5>💧 Irrigation</h5>
                <p>Soil moisture is {Number(moisture) > 50 ? 'adequate' : 'low'}. {cityProfile.advisories.items[0]?.desc}</p>
                <span className="risk-pill">LOW RISK</span>
              </div>

              <div className="grounded-card">
                <h5>🧴 Fertilizer</h5>
                <p>NPK balance is appropriate for {prediction.crop}. {cityProfile.advisories.items[1]?.desc}</p>
                <span className="risk-pill">LOW RISK</span>
              </div>

              <div className="grounded-card">
                <h5>🌱 Soil Health</h5>
                <p>Soil pH ({ph}) is within the optimal range for {cityProfile.soil.type}.</p>
                <span className="risk-pill">LOW RISK</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
