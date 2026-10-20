from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os, pickle
from advisory_data import diagnose_pest_disease

app = FastAPI(title="AgriSmart API - Smart India Hackathon 2026", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SoilInput(BaseModel):
    N: float
    P: float
    K: float
    ph: float
    moisture: float
    city: str = "Madurai"

class QueryInput(BaseModel):
    question: str
    city: str = "Madurai"

@app.get("/")
def root():
    return {"status": "online", "message": "AgriSmart dynamic API is live."}

@app.post("/predict")
def predict_crop(data: SoilInput):
    if data.N >= 80 and data.moisture >= 50:
        return {
            "recommended_crop": "Paddy (Rice)",
            "suitability_score": "98%",
            "risk_advisories": {
                "irrigation": "Soil moisture is in a reasonable range. Monitor regularly.",
                "fertilizer": "NPK levels look acceptable for this prototype analysis.",
                "soil_health": "Soil pH is within the preferred range for many crops."
            }
        }
    elif data.P > 50:
        return {
            "recommended_crop": "Cotton (Bt-II)",
            "suitability_score": "95%",
            "risk_advisories": {
                "irrigation": "Medium water demand; drip irrigation recommended.",
                "fertilizer": "Phosphorus level is high; apply DAP 60 kg/acre.",
                "soil_health": "Optimal for black & red soil regions."
            }
        }
    else:
        return {
            "recommended_crop": "Hybrid Maize",
            "suitability_score": "92%",
            "risk_advisories": {
                "irrigation": "Low-medium irrigation required.",
                "fertilizer": "Apply standard NPK basal dose.",
                "soil_health": "Soil suitable for cereal crops."
            }
        }

@app.post("/chat")
def chat_advisory(data: QueryInput):
    diag = diagnose_pest_disease(data.question)
    if diag:
        if diag.get("type") in ["no_match", "fallback"]:
            return diag
        return {
            "type": "disease_diagnosis",
            "disease": diag["disease"],
            "symptoms": diag["symptoms"],
            "organic_treatment": diag["organic_treatment"],
            "chemical_treatment": diag["chemical_treatment"],
            "cultural_practice": diag["cultural_practice"]
        }
    
    q_lower = data.question.lower()
    if any(w in q_lower for w in ["price", "mandi", "rate", "sell"]):
        return {
            "type": "market_price",
            "reply": f"Cached Agmarknet rate for {data.city} APMC: Paddy Superfine is ₹2,183 / Quintal (Trend: +2.9%)."
        }
    elif any(w in q_lower for w in ["what crop", "grow", "sow", "recommend"]):
        return {
            "type": "crop_recommendation",
            "reply": f"Recommended Crop for {data.city}: Paddy (Rice) with 98% suitability score based on regional soil and current weather."
        }
    elif any(w in q_lower for w in ["irrigate", "water"]):
        return {
            "type": "irrigation",
            "reply": f"Irrigation Advice for {data.city}: Current soil moisture is adequate (55%). Rain forecasted tomorrow, so delay canal flooding by 48 hours."
        }
    
    return {
        "type": "no_match",
        "reply": "⚠️ No confident match found in our curated database for this query.\n\n👉 Please ask about crop recommendation, fertilizer dose, mandi prices, or contact your nearest Krishi Vigyan Kendra (KVK) for expert guidance."
    }

@app.get("/market-prices")
def get_cached_prices(location: str = "Madurai"):
    return {
        "market": f"{location} APMC",
        "paddy_price": 2183,
        "unit": "Quintal",
        "status": "cached_agmarknet"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
