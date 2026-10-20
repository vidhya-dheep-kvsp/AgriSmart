CREATE TABLE IF NOT EXISTS cached_market_prices (
    id SERIAL PRIMARY KEY,
    market_name TEXT,
    commodity TEXT,
    modal_price NUMERIC,
    min_price NUMERIC,
    max_price NUMERIC,
    fetched_at DATE DEFAULT CURRENT_DATE
);
