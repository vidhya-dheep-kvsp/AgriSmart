"""
Seed initial sample market prices into the cache.
"""
SAMPLE_PRICES = [
    {"market": "Madurai APMC", "commodity": "Paddy (Dhan)", "modal_price": 2183, "recorded_date": "2026-08-21"},
    {"market": "Dindigul Market", "commodity": "Cotton", "modal_price": 7350, "recorded_date": "2026-08-21"},
    {"market": "Tiruchirappalli APMC", "commodity": "Maize", "modal_price": 2120, "recorded_date": "2026-08-21"}
]

def seed_prices():
    print(f"Seeded {len(SAMPLE_PRICES)} sample price records into cache table.")

if __name__ == "__main__":
    seed_prices()
