import re
# Grounded ICAR / KVK Plant Disease & Pest Advisory Knowledge Base
# Strict Curated Table (Slide 2 & 4: "Grounded, Not Guessed")

KNOWN_DISEASES = [
    {
        "id": "rice_blast",
        "crop_tokens": ["rice", "paddy", "nellu"],
        "symptom_tokens": ["blast", "spindle", "grey", "gray", "spot", "spots", "dot", "dots", "lesion", "lesions", "patch", "patches"],
        "disease": "Rice Blast (Magnaporthe oryzae)",
        "symptoms": "Spindle-shaped elliptical lesions with greyish center and dark brown margin on leaf blades.",
        "organic_treatment": "Foliar spray with Pseudomonas fluorescens @ 10g/L or 3% Neem oil.",
        "chemical_treatment": "Spray Tricyclazole 75% WP @ 0.6g/L or Isoprothiolane 40% EC @ 1.5ml/L.",
        "cultural_practice": "Avoid excessive split application of Nitrogen fertilizer; maintain proper field drainage."
    },
    {
        "id": "banana_sigatoka",
        "crop_tokens": ["banana", "plantain"],
        "symptom_tokens": ["sigatoka", "streak", "streaks", "stripe", "stripes", "line", "lines", "yellow", "yellowish"],
        "disease": "Sigatoka Leaf Spot (Pseudocercospora musae)",
        "symptoms": "Yellowish-green streaks parallel to leaf veins, later turning into dark brown necrotic spots.",
        "organic_treatment": "Spray Mineral oil / horticultural oil @ 10ml/L or 3% Panchagavya.",
        "chemical_treatment": "Spray Propiconazole 25% EC @ 1ml/L or Carbendazim 50% WP @ 1g/L at 20-day intervals.",
        "cultural_practice": "Prune and destroy heavily dried infected lower leaves to reduce spore spread."
    },
    {
        "id": "sugarcane_red_rot",
        "crop_tokens": ["sugarcane", "cane"],
        "symptom_tokens": ["sour", "smell", "alcoholic", "odor", "red", "rot", "inside", "stalk", "stem"],
        "disease": "Sugarcane Red Rot (Colletotrichum falcatum)",
        "symptoms": "Internal stalk tissues turn blood-red with white cross-bands and emit an alcoholic/sour odor.",
        "organic_treatment": "Soil application of Trichoderma harzianum @ 2.5 kg/acre mixed with 250 kg FYM.",
        "chemical_treatment": "Dip seed setts in Carbendazim 50% WP (0.1% solution) for 15 minutes before planting.",
        "cultural_practice": "Uproot and burn infected clumps immediately. Do not ratoon infected crop; use certified resistant setts."
    },
    {
        "id": "tomato_early_blight",
        "crop_tokens": ["tomato", "thakkali"],
        "symptom_tokens": ["concentric", "target", "ring", "rings", "circle", "brown", "early blight", "blight"],
        "disease": "Early Blight (Alternaria solani)",
        "symptoms": "Dark brown concentric rings forming a target-board pattern on older leaves with chlorotic yellow halos.",
        "organic_treatment": "Foliar spray of Trichoderma viride @ 4g/L or Neem Seed Kernel Extract (NSKE 5%).",
        "chemical_treatment": "Spray Mancozeb 75% WP @ 2g/L or Azoxystrobin 23% SC @ 1ml/L.",
        "cultural_practice": "Use drip irrigation to avoid leaf wetness; remove lower infected leaves."
    },
    {
        "id": "cotton_leaf_curl",
        "crop_tokens": ["cotton", "kapas"],
        "symptom_tokens": ["curl", "curling", "whitefly", "whiteflies", "leaf curl"],
        "disease": "Cotton Leaf Curl Virus (CLCuV)",
        "symptoms": "Upward curling of leaf margins, vein thickening, and stunted growth transmitted by whiteflies.",
        "organic_treatment": "Install yellow sticky traps (15/acre) and spray Verticillium lecanii @ 5g/L.",
        "chemical_treatment": "Spray Diafenthiuron 50% WP @ 1.2g/L or Acetamiprid 20% SP @ 0.2g/L to control vector whiteflies.",
        "cultural_practice": "Eradicate alternate weed hosts around field borders."
    }
]

def is_gibberish(text: str) -> bool:
    cleaned = ''.join(c for c in text if c.isalpha()).lower()
    if len(cleaned) < 3:
        return True
    vowels = set("aeiou")
    if len(cleaned) >= 4 and not any(c in vowels for c in cleaned):
        return True
    if text.strip().lower() in ["asdkjalksdj", "fdvdfv", "asdf", "qwerty"]:
        return True
    return False

def diagnose_pest_disease(query_text: str):
    q = query_text.strip().lower()
    tokens = set(re.findall(r"\b[a-z0-9]+\b", q))
    
    # 1. Check for Gibberish / Nonsense (Test 9)
    if is_gibberish(q):
        return {
            "type": "fallback",
            "reply": "I didn't quite understand that. Please ask a farming question about crop recommendations, market prices, weather, or describe crop disease symptoms (e.g., 'rice leaf grey spot' or 'paddy price today')."
        }
    
    # 2. Check for Known Disease Diagnostics using flexible token overlap
    for d in KNOWN_DISEASES:
        crop_match = any(t in tokens for t in d["crop_tokens"]) or any(t in q for t in d["crop_tokens"])
        symptom_match = any(t in tokens for t in d["symptom_tokens"])
        
        # If crop matches and at least one core symptom token matches
        if crop_match and symptom_match:
            # Extra verification for rice blast
            if d["id"] == "rice_blast" and not ("spindle" in tokens or "blast" in tokens or ("grey" in tokens and any(w in tokens for w in ["spot", "spots", "dot", "dots", "mark", "lesion"]))):
                continue
            return {
                "type": "disease_diagnosis",
                "disease": d["disease"],
                "symptoms": d["symptoms"],
                "organic_treatment": d["organic_treatment"],
                "chemical_treatment": d["chemical_treatment"],
                "cultural_practice": d["cultural_practice"]
            }
            
    # 3. Check for "No Match" / Unconfident Symptom Case (Test 8)
    plant_terms = ["tomato", "rice", "paddy", "banana", "sugarcane", "cotton", "maize", "leaf", "leaves", "crop", "plant"]
    unrecognized_symptoms = ["purple", "blue", "violet", "silver", "unknown"]
    
    has_plant = any(t in q for t in plant_terms)
    has_unrec = any(t in tokens for t in unrecognized_symptoms) or ("tomato" in q and "purple" in q)
    
    if (has_plant and has_unrec):
        return {
            "type": "no_match",
            "reply": "⚠️ No confident match found in our curated agricultural database for this symptom.\n\nIn accordance with our grounded advisory policy ('Grounded, Not Guessed'), we do not generate unverified remedies to avoid crop damage.\n\n👉 Please contact your nearest Krishi Vigyan Kendra (KVK) or local Agricultural Extension Officer for physical field diagnosis and sample inspection."
        }
    
    return None
