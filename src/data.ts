export const config: Record<string, any> = {
  A: { 
    label: "👤 Humain / Humanoïde",   
    role: "Expert Character Designer, Anatomy Expert", 
    layouts: { A0: "✦ Vue Unique", A1: "Turnaround Video IA", A2: "Model Sheet", A3: "Expression Sheet" },
    attrs: [
      { id: "ethnicity", label: "Origine / Ethnie", type: "select", options: ["Caucasien", "Afro-descendant", "Est-Asiatique", "Sud-Asiatique", "Latino / Hispanique", "Moyen-Oriental", "Amérindien", "Polynésien / Océanien", "Inuit / Arctique", "Aborigène", "Nordique", "Celtique", "Slave", "Méditerranéen", "Métis / Mixte", "Mélanésien", "Caribéen", "Andin", "Balkanique", "Extraterrestre / Fantaisie", "Hybride Animal/Humain", "Être de Lumière"] },
      { id: "age", label: "Âge", type: "select", options: ["Nouveau-né", "Nourrisson / Bébé", "Bambin", "Jeune Enfant", "Enfant", "Pré-adolescent", "Adolescent", "Jeune Adulte", "Adulte (30-40)", "Âge Moyen (40-60)", "Senior (60-70)", "Septuagénaire (70-80)", "Octogénaire (80-90)", "Nonagénaire (90-100)", "Centenaire", "Ancien / Vénérable", "Immortel / Intemporel", "Entité Cosmique"] },
      { id: "body_type", label: "Morphologie", type: "select", options: ["Mince / Athlétique", "Musclé / Bodybuilder", "Rond / Curvy", "Généreux / Plus-size", "Svelte / Élancé", "Élancé / Longiligne", "Trapu / Massif", "Courtaud", "Androgyne", "Squelettique", "Gringalet", "Obèse", "Acrobate / Flexible", "Petite", "Grand(e)", "Difforme / Monstrueux", "Cyborg Augmenté", "Giant", "Tiny", "Amorphous", "Éthéré / Fantomatique", "Mécanique / Robotique"] },
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
  },
  L: {
    label: "✒️ Logo & Branding",
    role: "Expert Graphic Designer & Brand Identity Specialist",
    layouts: { L0: "Vector Logo", L1: "Mascot Logo", L2: "Emblem/Badge", L3: "Minimalist Lettermark" },
    attrs: [
      { id: "logo_style", label: "Style Graphique", type: "select", options: ["Flat Design", "3D Render", "Neon", "Vintage/Retro", "Origami", "Line Art", "Watercolor", "Esport/Gaming"] },
      { id: "color_palette", label: "Palette de Couleurs", type: "select", options: ["Monochrome", "Pastel", "Neon/Cyberpunk", "Gold & Black", "Vibrant/Colorful", "Earthy Tones"] },
      { id: "background_type", label: "Fond", type: "select", options: ["Fond Blanc Pur", "Fond Noir", "Dégradé", "Mockup sur Papier", "Mockup 3D Enseigne"] }
    ]
  },
  H: {
    label: "🐉 Fantasy Creature",
    role: "Master Fantasy Concept Artist and Creature Designer",
    layouts: { H0: "Full Body Concept", H1: "Action Pose", H2: "Habitat Scene", H3: "Anatomical Study" },
    attrs: [
      { id: "creature_type", label: "Type", type: "select", options: ["Dragon", "Griffin", "Chimera", "Sea Monster", "Beast", "Elemental"] },
      { id: "creature_element", label: "Element", type: "select", options: ["Fire", "Ice", "Shadow", "Light", "Earth", "Lightning", "Arcane"] },
      { id: "creature_scale", label: "Scale", type: "select", options: ["Colossal", "Giant", "Human-sized", "Small", "Microscopic"] }
    ]
  },
  I: {
    label: "⚡ Mythological Being",
    role: "Expert Mythological Illustrator and Lore Master",
    layouts: { I0: "Heroic Portrait", I1: "Divine Manifestation", I2: "Epic Battle Scene", I3: "Statue/Idol" },
    attrs: [
      { id: "myth_origin", label: "Pantheon", type: "select", options: ["Greek", "Norse", "Egyptian", "Celtic", "Japanese", "Aztec", "Mesopotamian"] },
      { id: "myth_nature", label: "Nature", type: "select", options: ["Deity", "Demigod", "Spirit", "Demon", "Titan", "Nymph"] },
      { id: "myth_aura", label: "Aura", type: "select", options: ["Radiant", "Menacing", "Ethereal", "Chaotic", "Serene", "Corrupted"] }
    ]
  },
  J: {
    label: "🌌 Abstract Concept",
    role: "Visionary Abstract Artist and Visual Metaphor Expert",
    layouts: { J0: "Surreal Composition", J1: "Geometric Abstraction", J2: "Fluid Dynamics", J3: "Minimalist Symbolism" },
    attrs: [
      { id: "abstract_theme", label: "Theme", type: "select", options: ["Time", "Love", "Chaos", "Order", "Dreams", "Consciousness", "Infinity", "Decay"] },
      { id: "abstract_color", label: "Color Palette", type: "select", options: ["Monochrome", "Neon Contrast", "Muted Pastels", "Primary Colors", "Iridescent", "Void/Black"] },
      { id: "abstract_shape", label: "Dominant Shape", type: "select", options: ["Spheres", "Fractals", "Sharp Angles", "Flowing Waves", "Spirals", "Shattered Glass"] }
    ]
  },
  K: {
    label: "👗 Costume Design",
    role: "Expert Costume Designer and Fashion Historian",
    layouts: { K0: "Full Body Mannequin", K1: "Fabric Detail Shot", K2: "Historical Context Scene", K3: "Layered Breakdown" },
    attrs: [
      { id: "costume_era", label: "Historical Era", type: "select", options: ["Victorian", "Renaissance", "Cyberpunk", "1920s Flapper", "Sci-Fi Future", "Medieval", "Ancient Egyptian"] },
      { id: "costume_material", label: "Primary Material", type: "select", options: ["Silk & Lace", "Heavy Leather", "Velvet & Gold", "Holographic Synthetic", "Woven Linen", "Chainmail"] },
      { id: "costume_vibe", label: "Aesthetic/Vibe", type: "select", options: ["Royal / Regal", "Peasant / Commoner", "Tactical / Combat", "Ceremonial", "Nomadic / Wasteland"] }
    ]
  },
  M: {
    label: "🎬 Set Design",
    role: "Master Production Designer and Theatrical Set Artist",
    layouts: { M0: "Wide Establishing Shot", M1: "Stage Front View", M2: "Top-Down Floor Plan", M3: "Dramatic Lighting Focus" },
    attrs: [
      { id: "set_theme", label: "Theme", type: "select", options: ["Sci-Fi Bridge", "Victorian Parlor", "Post-Apocalyptic Ruin", "Fantasy Tavern", "Modern Minimalist", "Haunted Mansion"] },
      { id: "set_lighting", label: "Stage Lighting", type: "select", options: ["Spotlight Focus", "Dim & Moody", "Neon Glow", "Natural Daylight", "Cinematic High Contrast", "Eerie Bioluminescence"] },
      { id: "set_scale", label: "Scale", type: "select", options: ["Intimate Room", "Massive Arena", "Outdoor Landscape", "Claustrophobic Corridor", "Grand Hall"] }
    ]
  },
  N: {
    label: "🗡️ Props",
    role: "Lead Prop Concept Artist and 3D Modeler",
    layouts: { N0: "Studio Hero Shot", N1: "Orthographic Views", N2: "In-Hand Scale Reference", N3: "Weathered Detail Close-up" },
    attrs: [
      { id: "prop_type", label: "Type", type: "select", options: ["Melee Weapon", "Magical Artifact", "Sci-Fi Gadget", "Everyday Item", "Vehicle Part", "Ancient Relic"] },
      { id: "prop_condition", label: "Condition", type: "select", options: ["Pristine / Mint", "Battle-Damaged", "Ancient / Rusted", "Cybernetically Enhanced", "Overgrown with Nature"] },
      { id: "prop_material", label: "Material", type: "select", options: ["Scrap Metal", "Obsidian", "Glowing Crystal", "Carved Bone", "Damascus Steel", "Matte Plastic", "Polished Wood", "Rusted Iron", "Ethereal Energy"] }
    ]
  },
  O: {
    label: "🧊 3D Models",
    role: "Expert 3D Modeler and Asset Creator",
    layouts: { O0: "Single Model View", O1: "Orthographic Views", O2: "Wireframe View", O3: "Turntable Render" },
    attrs: [
      { id: "model_material", label: "Material", type: "select", options: ["Matte Plastic", "Brushed Metal", "Glossy Ceramic", "Rough Stone", "Clear Glass", "Holographic"] },
      { id: "model_polycount", label: "Poly Count", type: "select", options: ["Low Poly", "Mid Poly", "High Poly", "Sculpted Detail", "Voxel"] },
      { id: "model_texture", label: "Texture Resolution", type: "select", options: ["Pixel Art (Pixelated)", "Stylized (Hand-painted)", "PBR Realistic (4K)", "Untextured (Clay Render)"] }
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

export const stylesData: Record<string, string> = { 
  S1: "Photoréaliste", 
  S2: "Unreal Engine 5", 
  S3: "Pixar / Disney", 
  S4: "Anime/Manga", 
  S5: "Sketch/Crayon", 
  S6: "Cyberpunk Neon", 
  S7: "Cubisme", 
  S8: "Van Gogh", 
  S9: "Monet",
  S10: "Synthwave / Retrowave",
  S11: "Aquarelle (Watercolor)",
  S12: "Origami",
  S13: "Steampunk",
  S14: "Low Poly 3D",
  S15: "Pop Art",
  S16: "Art Nouveau",
  S17: "Gothique Sombre",
  S18: "Minimaliste Vectoriel",
  S19: "Pixel Art",
  S20: "Ukiyo-e (Estampe Japonaise)",
  S21: "Vaporwave",
  S22: "Art Déco",
  S23: "Impressionnisme Abstrait",
  S24: "Gravure sur Bois (Woodcut)"
};

export const stylesValue: Record<string, string> = { 
  S1: "raw photo, 8k, dslr", 
  S2: "Unreal Engine 5, lumen", 
  S3: "Pixar style, 3d render", 
  S4: "Studio Ghibli style", 
  S5: "pencil sketch", 
  S6: "cyberpunk, neon", 
  S7: "cubism", 
  S8: "Van Gogh style", 
  S9: "Monet style",
  S10: "synthwave, retrowave, 80s aesthetic, neon grid",
  S11: "watercolor painting, fluid colors, artistic",
  S12: "papercraft, origami, folded paper art, tactile",
  S13: "steampunk, brass, gears, victorian era, clockwork",
  S14: "low poly 3d render, geometric, flat shading",
  S15: "pop art, Andy Warhol style, comic book dots, vibrant colors",
  S16: "art nouveau, Alphonse Mucha style, intricate floral patterns",
  S17: "dark gothic, macabre, moody lighting, highly detailed",
  S18: "minimalist vector art, flat colors, clean lines",
  S19: "16-bit pixel art, retro gaming style, isometric",
  S20: "ukiyo-e, traditional japanese woodblock print, flat colors, elegant lines",
  S21: "vaporwave aesthetic, pastel colors, glitch art, retro 90s, surreal",
  S22: "art deco, geometric shapes, gold and black, luxurious, 1920s style",
  S23: "abstract expressionism, Jackson Pollock style, chaotic paint splatters, emotional",
  S24: "woodcut print, bold black and white lines, rough texture, medieval style"
};

export const lightsData: Record<string, string> = { E1: "Sans Ombres", E2: "Studio", E3: "Dramatique", E4: "Naturel", E5: "Chaud", E6: "Froid" };
export const lightsValue: Record<string, string> = { E1: "flat lighting", E2: "soft studio lighting", E3: "dramatic rim light", E4: "natural sunlight", E5: "warm golden lighting", E6: "cold blue lighting" };

export const bgsData: Record<string, string> = { 
  F1: "Blanc Pur", F2: "Green Screen", F3: "Gris Neutre", F4: "Noir", 
  F9: "Rue Urbaine", F10: "Blockchain", F11: "Bureau", F12: "Baie Vitrée", F13: "Cheminée", 
  F5: "Nature", F7: "Forêt", F6: "Sci-Fi",
  F14: "Désert", F15: "Océan", F16: "Montagnes", F17: "Ville Cyberpunk", F18: "Village Médiéval", 
  F19: "Station Spatiale", F20: "Sous-marin", F21: "Ville en Ruines",
  F22: "Dégradé Abstrait", F23: "Motifs Géométriques", F24: "Lumières Bokeh", F25: "Grille Néon", 
  F26: "Tourbillons Liquides", F27: "Formes Minimalistes"
};
export const bgsValue: Record<string, string> = { 
  F1: "pure white background", F2: "green screen", F3: "grey background", F4: "black background", 
  F9: "urban street", F10: "blockchain data matrix", F11: "office interior", F12: "glass window view", F13: "fireplace", 
  F5: "nature landscape", F7: "forest", F6: "spaceship interior",
  F14: "desert landscape with dunes", F15: "vast ocean view", F16: "snowy mountain peaks", F17: "neon-lit cyberpunk city street", F18: "medieval fantasy village", 
  F19: "futuristic space station interior", F20: "underwater coral reef", F21: "post-apocalyptic ruined city",
  F22: "smooth abstract color gradient background", F23: "abstract geometric patterns background", F24: "soft bokeh lights background", F25: "retro 80s neon grid background", 
  F26: "abstract liquid swirls background", F27: "minimalist abstract shapes background"
};
