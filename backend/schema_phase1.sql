CREATE TABLE IF NOT EXISTS soil_readings (
    id SERIAL PRIMARY KEY,
    farmer_id TEXT,
    n_value NUMERIC,
    p_value NUMERIC,
    k_value NUMERIC,
    ph_value NUMERIC,
    moisture NUMERIC,
    recommended_crop TEXT,
    suitability_score NUMERIC,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
