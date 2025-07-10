// New enhanced clothing recommendation system
function getDetailedClothingRecommendations(
  baseTemp,
  condition,
  forecast,
  userProfile,
) {
  const style = userProfile.stylePreference;
  const isRainy = condition.includes("rain") || condition.includes("drizzle");
  const isSnowy = condition.includes("snow");
  const isWindy = condition.includes("wind");

  let recommendations = {
    top: "",
    bottom: "",
    footwear: "",
    accessories: "",
    alerts: [],
  };

  // Upper Body Recommendations
  if (baseTemp >= 80) {
    if (style === "professional") {
      recommendations.top =
        "Lightweight button-down, breathable blouse, or linen shirt";
    } else if (style === "sporty") {
      recommendations.top = "Moisture-wicking tank top or performance t-shirt";
    } else if (style === "fashion") {
      recommendations.top = "Stylish crop top, trendy tank, or flowy blouse";
    } else {
      recommendations.top = "Light cotton t-shirt, tank top, or sleeveless top";
    }
  } else if (baseTemp >= 70) {
    if (style === "professional") {
      recommendations.top =
        "Cotton button-down, polo shirt, or lightweight blouse";
    } else if (style === "sporty") {
      recommendations.top =
        "Athletic t-shirt, performance polo, or workout top";
    } else if (style === "fashion") {
      recommendations.top =
        "Trendy t-shirt, fashion top, or lightweight cardigan";
    } else {
      recommendations.top =
        "Comfortable t-shirt, casual button-down, or light sweater";
    }
  } else if (baseTemp >= 60) {
    if (style === "professional") {
      recommendations.top = "Long-sleeve shirt with light blazer or cardigan";
    } else if (style === "sporty") {
      recommendations.top = "Long-sleeve athletic shirt or lightweight hoodie";
    } else if (style === "fashion") {
      recommendations.top =
        "Stylish sweater, fashion cardigan, or layered look";
    } else {
      recommendations.top = "Long-sleeve shirt, light sweater, or thin hoodie";
    }
  } else if (baseTemp >= 50) {
    if (style === "professional") {
      recommendations.top =
        "Wool sweater, thick blazer, or professional cardigan";
    } else if (style === "sporty") {
      recommendations.top =
        "Fleece jacket, thick hoodie, or athletic sweatshirt";
    } else if (style === "fashion") {
      recommendations.top =
        "Trendy sweater, oversized cardigan, or stylish jacket";
    } else {
      recommendations.top = "Medium-weight sweater, hoodie, or casual jacket";
    }
  } else if (baseTemp >= 40) {
    recommendations.top = "Warm sweater or fleece with insulating layers";
  } else if (baseTemp >= 30) {
    recommendations.top = "Heavy sweater, thermal base layer, and warm coat";
  } else {
    recommendations.top =
      "Multiple layers: thermal underwear, heavy sweater, and winter coat";
  }

  // Lower Body Recommendations
  if (baseTemp >= 80) {
    if (style === "professional") {
      recommendations.bottom =
        "Lightweight dress pants, knee-length skirt, or professional shorts";
    } else if (style === "sporty") {
      recommendations.bottom =
        "Athletic shorts, performance leggings, or gym wear";
    } else if (style === "fashion") {
      recommendations.bottom =
        "High-waisted shorts, mini skirt, or trendy capris";
    } else {
      recommendations.bottom = "Shorts, lightweight pants, or summer dress";
    }
  } else if (baseTemp >= 70) {
    if (style === "professional") {
      recommendations.bottom = "Dress pants, midi skirt, or tailored trousers";
    } else if (style === "sporty") {
      recommendations.bottom = "Athletic pants, leggings, or joggers";
    } else if (style === "fashion") {
      recommendations.bottom = "Jeans, fashionable pants, or stylish skirt";
    } else {
      recommendations.bottom = "Jeans, casual pants, or comfortable skirt";
    }
  } else if (baseTemp >= 50) {
    if (style === "professional") {
      recommendations.bottom =
        "Wool pants, warm skirt with tights, or dress slacks";
    } else if (style === "sporty") {
      recommendations.bottom =
        "Thermal leggings, warm athletic pants, or fleece-lined joggers";
    } else {
      recommendations.bottom = "Jeans, warm pants, or thick leggings";
    }
  } else if (baseTemp >= 30) {
    recommendations.bottom =
      "Insulated pants, thermal leggings, or winter trousers";
  } else {
    recommendations.bottom =
      "Thermal underwear with heavy pants or insulated winter gear";
  }

  // Footwear Recommendations
  if (baseTemp >= 80) {
    if (style === "professional") {
      recommendations.footwear =
        "Breathable dress shoes, professional sandals, or loafers";
    } else if (style === "sporty") {
      recommendations.footwear =
        "Athletic shoes, running sandals, or sport slides";
    } else if (style === "fashion") {
      recommendations.footwear =
        "Stylish sandals, fashion sneakers, or trendy flats";
    } else {
      recommendations.footwear = "Sandals, flip-flops, or breathable sneakers";
    }
  } else if (baseTemp >= 70) {
    if (style === "professional") {
      recommendations.footwear = "Dress shoes, professional flats, or loafers";
    } else if (style === "sporty") {
      recommendations.footwear = "Sneakers, athletic shoes, or casual trainers";
    } else {
      recommendations.footwear = "Comfortable shoes, casual sneakers, or flats";
    }
  } else if (baseTemp >= 50) {
    if (style === "professional") {
      recommendations.footwear =
        "Closed-toe dress shoes or professional ankle boots";
    } else {
      recommendations.footwear = "Sneakers, boots, or warm closed-toe shoes";
    }
  } else if (baseTemp >= 30) {
    recommendations.footwear =
      "Insulated boots or warm winter shoes with good traction";
  } else {
    recommendations.footwear =
      "Waterproof winter boots with thermal insulation";
  }

  // Accessories Recommendations
  if (baseTemp >= 80) {
    recommendations.accessories = "Sunglasses, sun hat, and sunscreen";
  } else if (baseTemp >= 70) {
    recommendations.accessories = "Light accessories, sunglasses if sunny";
  } else if (baseTemp >= 60) {
    recommendations.accessories = "Light scarf or jacket you can remove";
  } else if (baseTemp >= 50) {
    recommendations.accessories = "Scarf, light gloves, or warm hat";
  } else if (baseTemp >= 40) {
    recommendations.accessories = "Warm scarf, gloves, and beanie or hat";
  } else if (baseTemp >= 30) {
    recommendations.accessories = "Insulated gloves, warm hat, thick scarf";
  } else {
    recommendations.accessories =
      "Full winter accessories: thermal gloves, warm hat, thick scarf";
  }

  // Weather-specific alerts and adjustments
  if (isRainy) {
    recommendations.alerts.push(
      "Rain expected - bring umbrella and waterproof footwear!",
    );
    if (
      recommendations.footwear.includes("sandals") ||
      recommendations.footwear.includes("flats")
    ) {
      recommendations.footwear = "Water-resistant shoes or rain boots";
    }
  }

  if (isSnowy) {
    recommendations.alerts.push(
      "Snow conditions - wear waterproof boots with good traction!",
    );
    recommendations.footwear = "Waterproof winter boots with anti-slip soles";
  }

  if (isWindy) {
    recommendations.alerts.push(
      "Windy conditions - secure loose clothing and accessories!",
    );
  }

  return recommendations;
}
