// Complete Dynamic Agro-Climatic Dataset for Tamil Nadu Districts
export const CITIES_DATA = {
  "Madurai, Tamil Nadu": {
    city: "Madurai",
    district: "Madurai, Tamil Nadu",
    weather: {
      temp: "32°C",
      condition: "Partly Cloudy",
      humidity: "68%",
      wind: "14 km/h (SW)",
      rainChance: "65%",
      forecast: [
        { day: "Today", max: "32°C", min: "24°C", weather: "Partly Cloudy", rain: "10%" },
        { day: "Tomorrow", max: "31°C", min: "23°C", weather: "Light Rain", rain: "65%" },
        { day: "Day 3", max: "30°C", min: "23°C", weather: "Moderate Rain", rain: "80%" },
        { day: "Day 4", max: "29°C", min: "22°C", weather: "Cloudy", rain: "40%" },
        { day: "Day 5", max: "30°C", min: "22°C", weather: "Partly Cloudy", rain: "15%" },
        { day: "Day 6", max: "31°C", min: "23°C", weather: "Sunny", rain: "10%" },
        { day: "Day 7", max: "32°C", min: "24°C", weather: "Sunny", rain: "5%" }
      ]
    },
    soil: {
      type: "Clay Loam (Deltaic)",
      n: 90.0,
      p: 42.0,
      k: 43.0,
      ph: 6.5,
      moisture: 55.0,
      status: "Good",
      statusNote: "Soil is healthy"
    },
    cropRec: {
      recommendedCrop: "Paddy (Rice)",
      suitabilityScore: "98%",
      dashSuitabilityScore: "87%",
      whyThisCrop: [
        "Suitable for your soil type (Clay Loam)",
        "Good match with current weather conditions",
        "High yield probability in Madurai delta region",
        "Low disease risk for current Samba season"
      ],
      yieldEst: "24 - 28 Quintals / Acre",
      marketValue: "₹ 2,183 / Quintal"
    },
    marketPrice: {
      topCommodity: "Paddy (Rice)",
      modalPrice: "₹ 2,183 / Quintal",
      marketName: "Madurai APMC",
      prices: [
        { commodity: "Paddy (Dhan) Superfine", market: "Madurai APMC", modalPrice: "₹ 2,183 / Q", min: "₹ 2,050", max: "₹ 2,250", trend: "+2.9%" },
        { commodity: "Cotton (Kapas Shankar)", market: "Madurai Central", modalPrice: "₹ 7,350 / Q", min: "₹ 7,100", max: "₹ 7,600", trend: "+1.6%" },
        { commodity: "Tomato (Local Hybrid)", market: "Madurai Mandi", modalPrice: "₹ 2,800 / Q", min: "₹ 2,400", max: "₹ 3,200", trend: "+14.2%" },
        { commodity: "Red Chilli (Samba Dry)", market: "Madurai APMC", modalPrice: "₹ 18,500 / Q", min: "₹ 17,200", max: "₹ 19,800", trend: "+2.4%" }
      ]
    },
    advisories: {
      nextAdvisory: "Tomorrow",
      nextAdvisorySub: "Irrigation Advisory",
      items: [
        { type: "💧 Irrigation Advisory", time: "Today", desc: "Irrigate your field after 2 days. Soil moisture is adequate (55%), and rain is forecasted tomorrow." },
        { type: "🧴 Fertilizer Advisory", time: "24 hrs", desc: "Apply Urea 45 kg/acre in next 3 days during tillering stage for optimal vegetative growth." },
        { type: "🛡️ Plant Protection", time: "Ongoing", desc: "No major disease risk detected in Madurai district. Scout foliage regularly." }
      ]
    }
  },

  "Coimbatore, Tamil Nadu": {
    city: "Coimbatore",
    district: "Coimbatore, Tamil Nadu",
    weather: {
      temp: "28°C",
      condition: "Breezy & Overcast",
      humidity: "62%",
      wind: "22 km/h (W)",
      rainChance: "20%",
      forecast: [
        { day: "Today", max: "28°C", min: "20°C", weather: "Breezy Overcast", rain: "15%" },
        { day: "Tomorrow", max: "28°C", min: "21°C", weather: "Partly Cloudy", rain: "20%" },
        { day: "Day 3", max: "27°C", min: "20°C", weather: "Light Showers", rain: "35%" },
        { day: "Day 4", max: "29°C", min: "21°C", weather: "Partly Sunny", rain: "10%" },
        { day: "Day 5", max: "29°C", min: "21°C", weather: "Clear Breezy", rain: "5%" },
        { day: "Day 6", max: "30°C", min: "22°C", weather: "Sunny", rain: "5%" },
        { day: "Day 7", max: "30°C", min: "22°C", weather: "Sunny", rain: "5%" }
      ]
    },
    soil: {
      type: "Red Loam & Black Soil",
      n: 68.0,
      p: 58.0,
      k: 38.0,
      ph: 7.2,
      moisture: 42.0,
      status: "Optimal",
      statusNote: "Ideal for Cash Crops"
    },
    cropRec: {
      recommendedCrop: "Cotton (Bt-II)",
      suitabilityScore: "96%",
      dashSuitabilityScore: "92%",
      whyThisCrop: [
        "Well drained Red & Black soil profile in Coimbatore belt",
        "High phosphorus retention enhances cotton boll formation",
        "Breezy climate minimizes fungal foliar humidity",
        "Established spinning mills & ready market procurement"
      ],
      yieldEst: "14 - 18 Quintals / Acre",
      marketValue: "₹ 7,650 / Quintal"
    },
    marketPrice: {
      topCommodity: "Cotton (Bt Hybrid)",
      modalPrice: "₹ 7,650 / Quintal",
      marketName: "Coimbatore APMC",
      prices: [
        { commodity: "Cotton (Kapas Shankar)", market: "Coimbatore APMC", modalPrice: "₹ 7,650 / Q", min: "₹ 7,400", max: "₹ 7,900", trend: "+3.4%" },
        { commodity: "Maize (Hybrid Corn)", market: "Pollachi Mandi", modalPrice: "₹ 2,150 / Q", min: "₹ 2,080", max: "₹ 2,220", trend: "+0.8%" },
        { commodity: "Coconut (Matured)", market: "Anamalai Market", modalPrice: "₹ 32 / Kg", min: "₹ 28", max: "₹ 35", trend: "+5.0%" },
        { commodity: "Tapioca Raw", market: "Coimbatore Mandi", modalPrice: "₹ 1,950 / Q", min: "₹ 1,800", max: "₹ 2,100", trend: "-1.2%" }
      ]
    },
    advisories: {
      nextAdvisory: "In 2 Days",
      nextAdvisorySub: "Fertilizer Top-Dressing",
      items: [
        { type: "💧 Irrigation Advisory", time: "Today", desc: "Operate drip irrigation 6 liters/plant every alternate morning." },
        { type: "🧴 Fertilizer Advisory", time: "48 hrs", desc: "Apply DAP 60 kg/acre + Potassium to support square development in cotton." },
        { type: "🛡️ Plant Protection", time: "Weekly", desc: "Install 15 yellow sticky traps/acre to monitor whitefly vector movement." }
      ]
    }
  },

  "Thanjavur, Tamil Nadu": {
    city: "Thanjavur",
    district: "Thanjavur, Tamil Nadu",
    weather: {
      temp: "33°C",
      condition: "Humid & Showers",
      humidity: "82%",
      wind: "16 km/h (E)",
      rainChance: "80%",
      forecast: [
        { day: "Today", max: "33°C", min: "25°C", weather: "Showers", rain: "75%" },
        { day: "Tomorrow", max: "32°C", min: "24°C", weather: "Heavy Rain", rain: "85%" },
        { day: "Day 3", max: "31°C", min: "24°C", weather: "Rain", rain: "80%" },
        { day: "Day 4", max: "30°C", min: "23°C", weather: "Overcast", rain: "50%" },
        { day: "Day 5", max: "32°C", min: "24°C", weather: "Partly Cloudy", rain: "25%" },
        { day: "Day 6", max: "33°C", min: "25°C", weather: "Sunny", rain: "10%" },
        { day: "Day 7", max: "34°C", min: "25°C", weather: "Sunny", rain: "10%" }
      ]
    },
    soil: {
      type: "Deep Kaveri Alluvial Delta",
      n: 95.0,
      p: 48.0,
      k: 50.0,
      ph: 6.8,
      moisture: 68.0,
      status: "Fertile",
      statusNote: "High Delta Moisture"
    },
    cropRec: {
      recommendedCrop: "Samba Paddy (Ponni)",
      suitabilityScore: "99%",
      dashSuitabilityScore: "94%",
      whyThisCrop: [
        "Rich Kaveri river alluvial soil rich in natural sediments",
        "High water retention capacity ideal for standing water crops",
        "Favorable monsoon temperature in Thanjavur Rice Bowl",
        "High procurement MSP at direct purchase centers (DPC)"
      ],
      yieldEst: "28 - 32 Quintals / Acre",
      marketValue: "₹ 2,350 / Quintal"
    },
    marketPrice: {
      topCommodity: "Kuruvai / Samba Paddy",
      modalPrice: "₹ 2,350 / Quintal",
      marketName: "Thanjavur DPC / APMC",
      prices: [
        { commodity: "Paddy (Kuruvai / CR 1009)", market: "Thanjavur APMC", modalPrice: "₹ 2,350 / Q", min: "₹ 2,200", max: "₹ 2,450", trend: "+4.1%" },
        { commodity: "Blackgram (Urad ADT-5)", market: "Kumbakonam Mandi", modalPrice: "₹ 7,400 / Q", min: "₹ 7,100", max: "₹ 7,700", trend: "+2.2%" },
        { commodity: "Banana (Poovan)", market: "Papanasam Market", modalPrice: "₹ 1,750 / Q", min: "₹ 1,600", max: "₹ 1,900", trend: "-0.5%" }
      ]
    },
    advisories: {
      nextAdvisory: "Urgent",
      nextAdvisorySub: "Drainage Management",
      items: [
        { type: "💧 Irrigation Advisory", time: "Alert", desc: "Drain excess water from nursery beds. 35mm heavy rain predicted over next 36 hours." },
        { type: "🧴 Fertilizer Advisory", time: "Post-Rain", desc: "Delay urea broadcasting until heavy rain subsides to prevent fertilizer leaching." },
        { type: "🛡️ Plant Protection", time: "Active", desc: "High humidity triggers blast spores. Spray Pseudomonas fluorescens @ 10g/L." }
      ]
    }
  },

  "Dindigul, Tamil Nadu": {
    city: "Dindigul",
    district: "Dindigul, Tamil Nadu",
    weather: {
      temp: "31°C",
      condition: "Mild & Sunny",
      humidity: "58%",
      wind: "12 km/h (N)",
      rainChance: "15%",
      forecast: [
        { day: "Today", max: "31°C", min: "21°C", weather: "Sunny", rain: "5%" },
        { day: "Tomorrow", max: "30°C", min: "22°C", weather: "Partly Cloudy", rain: "15%" },
        { day: "Day 3", max: "29°C", min: "21°C", weather: "Light Rain", rain: "30%" },
        { day: "Day 4", max: "29°C", min: "21°C", weather: "Clear", rain: "10%" },
        { day: "Day 5", max: "31°C", min: "22°C", weather: "Sunny", rain: "5%" },
        { day: "Day 6", max: "31°C", min: "22°C", weather: "Sunny", rain: "5%" },
        { day: "Day 7", max: "32°C", min: "23°C", weather: "Sunny", rain: "5%" }
      ]
    },
    soil: {
      type: "Red Sandy Loam",
      n: 72.0,
      p: 45.0,
      k: 65.0,
      ph: 6.9,
      moisture: 48.0,
      status: "Good",
      statusNote: "Well Drained"
    },
    cropRec: {
      recommendedCrop: "Small Shallots (Onion)",
      suitabilityScore: "97%",
      dashSuitabilityScore: "89%",
      whyThisCrop: [
        "Dindigul red sandy loam soil is famous for high quality shallots",
        "High Potassium (K) level promotes bulb firmness and pungency",
        "Dry climate during bulb maturity prevents fungal basal rot",
        "Consistently high market demand across South India"
      ],
      yieldEst: "40 - 45 Quintals / Acre",
      marketValue: "₹ 4,300 / Quintal"
    },
    marketPrice: {
      topCommodity: "Small Shallots (Onion)",
      modalPrice: "₹ 4,300 / Quintal",
      marketName: "Dindigul Onion Market",
      prices: [
        { commodity: "Small Onion (Shallots)", market: "Dindigul Market", modalPrice: "₹ 4,300 / Q", min: "₹ 3,900", max: "₹ 4,700", trend: "+6.2%" },
        { commodity: "Moringa (Drumstick)", market: "Oddanchatram APMC", modalPrice: "₹ 3,200 / Q", min: "₹ 2,800", max: "₹ 3,600", trend: "+8.5%" },
        { commodity: "Cotton Kapas", market: "Dindigul APMC", modalPrice: "₹ 7,300 / Q", min: "₹ 7,000", max: "₹ 7,550", trend: "+1.1%" }
      ]
    },
    advisories: {
      nextAdvisory: "Tomorrow",
      nextAdvisorySub: "Bulb Sowing Check",
      items: [
        { type: "💧 Irrigation Advisory", time: "Today", desc: "Provide light irrigation at 5-day intervals; avoid water stagnation around shallot bulbs." },
        { type: "🧴 Fertilizer Advisory", time: "Scheduled", desc: "Apply Neem cake @ 150 kg/acre + Bio-fertilizers during final land preparation." },
        { type: "🛡️ Plant Protection", time: "Scouting", desc: "Check for thrips on inner leaf axils; spray Neem oil 3% if infestation appears." }
      ]
    }
  },

  "Salem, Tamil Nadu": {
    city: "Salem",
    district: "Salem, Tamil Nadu",
    weather: {
      temp: "34°C",
      condition: "Warm & Dry",
      humidity: "50%",
      wind: "10 km/h (SE)",
      rainChance: "10%",
      forecast: [
        { day: "Today", max: "34°C", min: "23°C", weather: "Warm Dry", rain: "5%" },
        { day: "Tomorrow", max: "34°C", min: "24°C", weather: "Sunny", rain: "5%" },
        { day: "Day 3", max: "33°C", min: "23°C", weather: "Partly Cloudy", rain: "15%" },
        { day: "Day 4", max: "32°C", min: "22°C", weather: "Clouds", rain: "20%" },
        { day: "Day 5", max: "33°C", min: "23°C", weather: "Sunny", rain: "5%" },
        { day: "Day 6", max: "34°C", min: "24°C", weather: "Sunny", rain: "5%" },
        { day: "Day 7", max: "35°C", min: "24°C", weather: "Hot Sunny", rain: "0%" }
      ]
    },
    soil: {
      type: "Red Gravelly Loam",
      n: 75.0,
      p: 35.0,
      k: 70.0,
      ph: 6.4,
      moisture: 38.0,
      status: "Moderate",
      statusNote: "Low Moisture"
    },
    cropRec: {
      recommendedCrop: "Tapioca / Cassava",
      suitabilityScore: "95%",
      dashSuitabilityScore: "88%",
      whyThisCrop: [
        "Highly drought resilient crop suited for Salem gravelly soils",
        "High starch content yield favored by local sago processing mills",
        "Low water requirement with good response to drip fertigation",
        "Assured factory purchase price agreements across Salem district"
      ],
      yieldEst: "12 - 15 Tonnes / Acre",
      marketValue: "₹ 2,050 / Quintal"
    },
    marketPrice: {
      topCommodity: "Tapioca / Sago Raw",
      modalPrice: "₹ 2,050 / Quintal",
      marketName: "Salem SagoServe APMC",
      prices: [
        { commodity: "Tapioca Raw Tuber", market: "Salem SagoServe", modalPrice: "₹ 2,050 / Q", min: "₹ 1,900", max: "₹ 2,200", trend: "+3.0%" },
        { commodity: "Turmeric (Finger)", market: "Attur APMC", modalPrice: "₹ 12,800 / Q", min: "₹ 12,000", max: "₹ 13,500", trend: "+4.8%" },
        { commodity: "Mango (Salem Gundu)", market: "Salem Fruit Mandi", modalPrice: "₹ 4,600 / Q", min: "₹ 4,200", max: "₹ 5,100", trend: "+1.5%" }
      ]
    },
    advisories: {
      nextAdvisory: "In 3 Days",
      nextAdvisorySub: "Drip Irrigation Cycle",
      items: [
        { type: "💧 Irrigation Advisory", time: "Today", desc: "Increase drip run duration by 20 minutes due to higher evapotranspiration in dry weather." },
        { type: "🧴 Fertilizer Advisory", time: "3 Days", desc: "Apply Potassium Chloride (MOP) @ 30 kg/acre to promote starch tuber thickening." },
        { type: "🛡️ Plant Protection", time: "Scouting", desc: "Monitor for cassava mealybug on growing shoots; spray Azadirachtin if needed." }
      ]
    }
  }
};
