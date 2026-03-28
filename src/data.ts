export const config: Record<string, any> = {
  A: { 
    label: "👤 Humain / Humanoïde",   
    role: "Expert Character Designer, Anatomy Expert", 
    layouts: { A0: "✦ Vue Unique", A1: "Turnaround Video IA", A2: "Model Sheet", A3: "Expression Sheet" },
    attrs: [
      { id: "skin", label: "Peau", type: "select", options: ["Porcelaine pâle", "Nordique clair", "Hâlé / Bronzé", "Olive doré", "Ébène profond", "Blanc albinos", "Chrome métallique"] },
      { id: "eyes", label: "Yeux", type: "select", options: ["Bleu perçant", "Vert émeraude", "Brun profond", "Noisette", "Gris acier", "Optique cybernétique"] },
      { id: "hair_style", label: "Coiffure", type: "select", options: ["Dreadlocks longs", "Locs bohème", "Crête iroquoise", "Pixie désordonné", "Longs et lisses", "Coupe militaire", "Chauve"] },
      { id: "hair_color", label: "Couleur Cheveux", type: "select", options: ["Blond", "Blond vénitien", "Noir", "Brun", "Roux", "Auburn", "Néon Bleu", "Rose Pastel"] },
      { id: "clothing", label: "Vêtements", type: "select", options: ["Toge", "Tenue antique", "Tenue médiévale", "Armure tactique", "Streetwear oversize", "Tunique cuir médiévale", "Costume victorien", "Techwear Cyberpunk", "Combinaison spatiale", "Costume cravate", "Robe de soirée", "Tenue de sport", "Uniforme", "Tenue décontractée", "Haute couture"] },
      { id: "shoes", label: "Chaussures", type: "select", options: ["Baskets", "Tongs", "Dr. Martens", "Bottes en cuir", "Talons hauts", "Mocassins", "Chaussures de ville", "Bottes de combat", "Pieds nus"] }
    ]
  },
  G: { 
    label: "🩺 Anatomie du corps humain",   
    role: "Scientific Medical Illustrator", 
    layouts: { G0: "✦ Vue Unique", G1: "Anatomical Cross-section", G2: "Exploded View", G3: "Skeletal Turnaround" },
    attrs: [
      { id: "system", label: "Système", type: "select", options: ["Musculaire", "Squelettique", "Nerveux", "Circulatoire", "Digestif", "Lymphatique"] },
      { id: "organs", label: "Organe Focus", type: "select", options: ["Cœur Humain", "Cerveau", "Poumons", "Foie", "Reins", "Yeux", "Estomac"] },
      { id: "view_type", label: "Rendu", type: "select", options: ["Rayons X", "IRM", "Écorché (Muscles)", "Transparence", "Microscopique"] }
    ]
  },
  B: { 
    label: "🐾 Animal / Créature",   
    role: "Wildlife Concept Artist", 
    layouts: { B0: "✦ Vue Unique", B1: "Creature Rotation", B2: "Motion Reference" },
    attrs: [
      { id: "surface", label: "Texture", type: "select", options: ["Fourrure épaisse", "Écailles lisses", "Peau tannée", "Plaques osseuses", "Plumage coloré", "Chitine", "Bioluminescence", "Cristal"] },
      { id: "pattern", label: "Motif", type: "select", options: ["Rayures tigre", "Taches léopard", "Uni", "Camouflage", "Zébrures", "Albinos", "Mélanique", "Magma"] },
      { id: "scars", label: "Vécu", type: "select", options: ["Intact", "Cicatrice œil", "Oreille déchirée", "Griffures", "Brûlures", "Implant cyber"] }
    ]
  },
  C: { 
    label: "📦 Objet / Prop", 
    role: "Senior Prop Artist", 
    layouts: { C0: "Vue Unique", C1: "Orthographic" }, 
    attrs: [{ id: "material", label: "Matériau", type: "select", options: ["Fer rouillé", "Chrome poli", "Bois patiné", "Carbone", "Or", "Pierre"] }] 
  },
  D: { 
    label: "🏛️ Architecture", 
    role: "Architectural Visualizer", 
    layouts: { D0: "Vue Unique", D1: "Elevation Plan" }, 
    attrs: [
      { id: "arch_mat", label: "Matériaux", type: "select", options: ["Béton brut", "Brique rouge", "Verre/Acier", "Bois", "Marbre"] }, 
      { id: "arch_style", label: "Style", type: "select", options: ["Minimaliste", "Gothique", "Victorien", "Industriel", "Cyberpunk", "Zen"] }
    ] 
  },
  E: { 
    label: "🌲 Paysage", 
    role: "Environment Artist", 
    layouts: { E0: "Vue Unique", E1: "Panoramic" }, 
    attrs: [
      { id: "flora", label: "Flore", type: "select", options: ["Pins", "Chênes", "Palmiers", "Arbres morts", "Sakura"] }, 
      { id: "terrain", label: "Sol", type: "select", options: ["Herbe", "Sable", "Neige", "Roche volcanique", "Boue"] }
    ] 
  },
  F: { 
    label: "🏎️ Véhicule",   
    role: "Vehicle Designer", 
    layouts: { F0: "✦ Vue Unique", F1: "Blueprint Tech" },
    attrs: [
      { id: "car_color", label: "Finition", type: "select", options: ["Noir Mat", "Chrome", "Candy Red", "Néon Bleu", "British Green", "Caméléon", "Carbone Forgé", "Or 24k", "Rouille (Mad Max)"] },
      { id: "car_state", label: "État", type: "select", options: ["Neuf", "Boueux", "Accidenté", "Abandonné", "Custom"] }
    ] 
  }
};

export const angles = [
  { id: "front", label: "Face", value: "front view 0°" },
  { id: "profile_l", label: "Profil G", value: "left profile 90°" },
  { id: "profile_r", label: "Profil D", value: "right profile -90°" },
  { id: "back", label: "Dos", value: "back view 180°" },
  { id: "perspective", label: "3/4", value: "3/4 perspective view" },
  { id: "top_down", label: "Haut", value: "top down view 90°" },
  { id: "high_view", label: "Ciel", value: "cinematic bird's eye view" },
  { id: "low", label: "Contre-plongée", value: "heroic low angle" },
  { id: "closeup", label: "Macro", value: "extreme close-up" },
  { id: "wide", label: "Large", value: "wide establishing shot" }
];

export const stylesData: Record<string, string> = { S1: "Photoréaliste", S2: "Unreal Engine 5", S3: "Pixar / Disney", S4: "Anime/Manga", S5: "Sketch/Crayon", S6: "Cyberpunk Neon", S7: "Cubisme", S8: "Van Gogh", S9: "Monet" };
export const stylesValue: Record<string, string> = { S1: "raw photo, 8k, dslr", S2: "Unreal Engine 5, lumen", S3: "Pixar style, 3d render", S4: "Studio Ghibli style", S5: "pencil sketch", S6: "cyberpunk, neon", S7: "cubism", S8: "Van Gogh style", S9: "Monet style" };

export const lightsData: Record<string, string> = { E1: "Sans Ombres", E2: "Studio", E3: "Dramatique", E4: "Naturel", E5: "Chaud", E6: "Froid" };
export const lightsValue: Record<string, string> = { E1: "flat lighting", E2: "soft studio lighting", E3: "dramatic rim light", E4: "natural sunlight", E5: "warm golden lighting", E6: "cold blue lighting" };

export const bgsData: Record<string, string> = { F1: "Blanc Pur", F2: "Green Screen", F3: "Gris Neutre", F4: "Noir", F9: "Rue Urbaine", F10: "Blockchain", F11: "Bureau", F12: "Baie Vitrée", F13: "Cheminée", F5: "Nature", F7: "Forêt", F6: "Sci-Fi" };
export const bgsValue: Record<string, string> = { F1: "pure white background", F2: "green screen", F3: "grey background", F4: "black background", F9: "urban street", F10: "blockchain data matrix", F11: "office interior", F12: "glass window view", F13: "fireplace", F5: "nature landscape", F7: "forest", F6: "spaceship interior" };
