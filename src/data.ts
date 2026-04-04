import {
  Globe, User, Activity, Palette, Eye, Scissors, PaintBucket, Shirt, Footprints,
  Heart, Scan, Layers, Trees, Flame, Box, Building, Hammer, Sun, Car, Wrench, Map,
  Mountain, CloudRain, Clock, Utensils, ChefHat, Lightbulb, Microscope, ZoomIn, Zap,
  Brain, Hexagon, Hourglass, Sparkles, Clapperboard, Maximize, Sword, ShieldAlert,
  Gem, Triangle, Image as ImageIcon, PenTool, Layout, Ghost, Paintbrush, Home, Sofa
} from 'lucide-react';

export const config: Record<string, any> = {
  A: { 
    label: "👤 Humain / Humanoïde",   
    role: "Expert Character Designer, Anatomy Expert", 
    layouts: { A0: "✦ Vue Unique", A1: "Turnaround Video IA", A2: "Model Sheet", A3: "Expression Sheet" },
    attrs: [
      { id: "ethnicity", label: "Origine / Ethnie", type: "select", icon: Globe, options: ["Caucasien", "Afro-descendant", "Est-Asiatique", "Sud-Asiatique", "Latino / Hispanique", "Moyen-Oriental", "Amérindien", "Polynésien / Océanien", "Inuit / Arctique", "Aborigène", "Nordique", "Celtique", "Slave", "Méditerranéen", "Métis / Mixte", "Mélanésien", "Caribéen", "Andin", "Balkanique", "Extraterrestre / Fantaisie", "Hybride Animal/Humain", "Être de Lumière"] },
      { id: "age", label: "Âge", type: "select", icon: User, options: ["Nouveau-né", "Nourrisson / Bébé", "Bambin", "Jeune Enfant", "Enfant", "Pré-adolescent", "Adolescent", "Jeune Adulte", "Adulte (30-40)", "Âge Moyen (40-60)", "Senior (60-70)", "Septuagénaire (70-80)", "Octogénaire (80-90)", "Nonagénaire (90-100)", "Centenaire", "Ancien / Vénérable", "Immortel / Intemporel", "Entité Cosmique"] },
      { id: "body_type", label: "Morphologie", type: "select", icon: Activity, options: ["Mince / Athlétique", "Musclé / Bodybuilder", "Rond / Curvy", "Généreux / Plus-size", "Svelte / Élancé", "Élancé / Longiligne", "Trapu / Massif", "Courtaud", "Androgyne", "Squelettique", "Gringalet", "Obèse", "Acrobate / Flexible", "Petite", "Grand(e)", "Difforme / Monstrueux", "Cyborg Augmenté", "Giant", "Tiny", "Amorphous", "Éthéré / Fantomatique", "Mécanique / Robotique"] },
      { id: "skin", label: "Peau", type: "select", icon: Palette, options: ["Porcelaine pâle", "Nordique clair", "Hâlé / Bronzé", "Olive doré", "Ébène profond", "Blanc albinos", "Chrome métallique"] },
      { id: "eyes", label: "Yeux", type: "select", icon: Eye, options: ["Bleu perçant", "Vert émeraude", "Brun profond", "Noisette", "Gris acier", "Optique cybernétique"] },
      { id: "hair_style", label: "Coiffure", type: "select", icon: Scissors, options: ["Dreadlocks longs", "Locs bohème", "Crête iroquoise", "Pixie désordonné", "Longs et lisses", "Coupe militaire", "Chauve", "Crépu", "Long ondulé", "Court", "Rasé sur les côtés"] },
      { id: "hair_color", label: "Couleur Cheveux", type: "select", icon: PaintBucket, options: ["Blond", "Blond vénitien", "Noir", "Brun", "Roux", "Auburn", "Néon Bleu", "Rose Pastel"] },
      { id: "clothing", label: "Vêtements", type: "select", icon: Shirt, options: ["Toge", "Tenue antique", "Tunique égyptienne antique", "Tenue de gladiateur", "Tenue médiévale", "Tunique cuir médiévale", "Robe à la française (18ème siècle)", "Costume victorien", "Corset époque victorienne", "Robe Empire", "Costume 3 pièces rétro", "Kimono traditionnel", "Armure tactique", "Streetwear oversize", "Techwear Cyberpunk", "Combinaison spatiale", "Costume cravate", "Robe de soirée", "Tenue de sport", "Uniforme", "Tenue décontractée", "Haute couture"] },
      { id: "shoes", label: "Chaussures", type: "select", icon: Footprints, options: ["Baskets", "Tongs", "Dr. Martens", "Bottes en cuir", "Talons hauts", "Mocassins", "Chaussures de ville", "Bottes de combat", "Sandales spartiates", "Poulaines médiévales", "Bottines victoriennes à lacets", "Chaussures Richelieu vintage", "Sabots en bois", "Escarpins rétro 1920", "Pieds nus"] },
      { id: "accessories", label: "Accessoires", type: "multi-select", icon: Gem, options: ["Aucun", "Boucles d'oreilles en perles", "Montre à gousset", "Collier victorien", "Lunettes d'aviateur vintage", "Couronne de lauriers", "Gants en dentelle", "Chapeau haut-de-forme", "Éventail en soie", "Broche camée", "Lunettes rondes rétro", "Bague chevalière", "Piercing septum", "Tatouage facial", "Masque cyberpunk", "Casque audio", "Bandana", "Écharpe en soie", "Sac à dos en cuir", "Ceinture à clous", "Collier ras-de-cou"] },
      { id: "skin_material", label: "Skin Material", type: "select", icon: Paintbrush, options: ["Pristine", "Weathered", "Cybernetic", "Ethereal", "Scratched", "Scaled", "Metallic sheen", "Glows faintly"] }
    ]
  },
  G: { 
    label: "💀 Anatomie du corps humain",   
    role: "Scientific Medical Illustrator", 
    layouts: { G0: "✦ Vue Unique", G1: "Anatomical Cross-section", G2: "Exploded View", G3: "Skeletal Turnaround", G4: "Planche anatomique vintage", G5: "Schéma interactif avec légendes", G6: "Schéma interactif sans légendes" },
    attrs: [
      { id: "anatomy_subject", label: "Sujet", type: "select", icon: User, options: ["Homme", "Femme", "Enfant", "Animal", "Extraterrestre"] },
      { id: "system", label: "Système", type: "select", icon: Activity, options: ["Musculaire", "Squelettique", "Nerveux", "Circulatoire", "Digestif", "Lymphatique", "Endocrinien", "Reproducteur", "Respiratoire", "Tégumentaire (Peau)", "Immunitaire", "Urinaire"] },
      { id: "organs", label: "Organe Focus", type: "select", icon: Heart, options: ["Cœur Humain", "Cerveau", "Poumons", "Foie", "Reins", "Yeux", "Estomac", "Pancréas", "Intestins", "Peau", "Glandes", "Vaisseaux sanguins"] },
      { id: "view_type", label: "Rendu", type: "select", icon: Scan, options: ["Rayons X", "IRM", "Écorché (Muscles)", "Transparence", "Microscopique"] }
    ]
  },
  B: { 
    label: "🐾 Animal / Creature",   
    role: "Wildlife Concept Artist", 
    layouts: { B0: "✦ Single View", B1: "Creature Rotation", B2: "Motion Reference" },
    attrs: [
      { id: "texture", label: "Texture", type: "select", icon: Layers, options: ["Fur", "Scales", "Feathers", "Leathery Skin", "Bone Plates", "Chitin", "Bioluminescent", "Crystal"] },
      { id: "habitat", label: "Habitat", type: "select", icon: Trees, options: ["Forest", "Arctic", "Desert", "Jungle", "Ocean", "Volcanic", "Urban", "Alien Planet"] },
      { id: "temperament", label: "Temperament", type: "select", icon: Flame, options: ["Aggressive", "Docile", "Playful", "Territorial", "Curious", "Skittish", "Majestic", "Predatory"] }
    ]
  },
  C: { 
    label: "📦 Objet / Prop", 
    role: "Senior Prop Artist", 
    layouts: { C0: "Vue Unique", C1: "Orthographic" }, 
    attrs: [{ id: "material", label: "Matériau", type: "select", icon: Box, options: ["Fer rouillé", "Chrome poli", "Bois patiné", "Carbone", "Or", "Pierre"] }] 
  },
  D: { 
    label: "🏛️ Architecture", 
    role: "Architectural Visualizer", 
    layouts: { D0: "Vue Unique", D1: "Elevation Plan" }, 
    attrs: [
      { id: "arch_mat", label: "Matériaux", type: "select", icon: Hammer, options: ["Béton brut", "Brique rouge", "Verre/Acier", "Bois", "Marbre"] }, 
      { id: "arch_style", label: "Style", type: "select", icon: Building, options: ["Minimaliste", "Gothique", "Victorien", "Industriel", "Cyberpunk", "Zen"] }
    ] 
  },
  INT: {
    label: "🛋️ Design d'Intérieur",
    role: "Expert Interior Designer and Architectural Visualizer",
    layouts: { INT0: "Vue d'ensemble", INT1: "Détail Mobilier", INT2: "Plan au sol", INT3: "Vue Isométrique", INT4: "Vue depuis la porte", INT5: "Vue en plongée sur le mobilier", INT6: "Rendu 360°" },
    attrs: [
      { id: "room_type", label: "Type de pièce", type: "select", icon: Home, options: ["Salon", "Cuisine", "Salle de bain", "Chambre à coucher", "Bureau", "Bibliothèque", "Véranda", "Hall d'entrée", "Loft", "Chambre d'hôpital"] },
      { id: "interior_style", label: "Style décoratif", type: "select", icon: Palette, options: ["Moderne", "Minimaliste", "Industriel", "Bohème", "Scandinave", "Art Déco", "Classique", "Rustique", "Mid-Century Modern", "Cyberpunk", "Victorien", "Japandi"] },
      { id: "furniture_era", label: "Époque du mobilier", type: "select", icon: Hourglass, options: ["Contemporain", "Années 70", "Années 50", "Antique", "Renaissance", "Futuriste", "Médiéval"] },
      { id: "color_scheme", label: "Palette de couleurs", type: "select", icon: PaintBucket, options: ["Tons neutres", "Couleurs chaudes", "Couleurs froides", "Pastel", "Contrasté", "Monochrome", "Tons terreux", "Néon"] },
      { id: "material_focus", label: "Matériaux dominants", type: "select", icon: Box, options: ["Bois naturel", "Marbre et pierre", "Métal et verre", "Velours et tissus riches", "Béton brut", "Bambou et rotin", "Plastique et chrome"] }
    ]
  },
  E: { 
    label: "🌲 Paysage", 
    role: "Environment Artist", 
    layouts: { E0: "Vue Unique", E1: "Panoramic" }, 
    attrs: [
      { id: "flora", label: "Flore", type: "select", icon: Trees, options: ["Pins", "Chênes", "Palmiers", "Arbres morts", "Sakura"] }, 
      { id: "terrain", label: "Sol", type: "select", icon: Mountain, options: ["Herbe", "Sable", "Neige", "Roche volcanique", "Boue"] }
    ] 
  },
  F: { 
    label: "🚗 Véhicule",   
    role: "Vehicle Designer", 
    layouts: { F0: "✦ Vue Unique", F1: "Blueprint Tech" },
    attrs: [
      { id: "car_color", label: "Finition", type: "select", icon: PaintBucket, options: ["Noir Mat", "Chrome", "Candy Red", "Néon Bleu", "British Green", "Caméléon", "Carbone Forgé", "Or 24k", "Rouille (Mad Max)"] },
      { id: "car_material", label: "Material", type: "select", icon: PaintBucket, options: ["Chrome", "Matte Black", "Carbon Fiber", "Brushed Aluminum", "Painted Steel"] },
      { id: "car_state", label: "État", type: "select", icon: Wrench, options: ["Neuf", "Boueux", "Accidenté", "Abandonné", "Custom"] }
    ] 
  },
  L: {
    label: "✒️ Logo & Branding",
    role: "Lead Brand Designer and Corporate Identity Specialist",
    layouts: { L0: "Vector Logo", L1: "Mascot Logo", L2: "Emblem/Badge", L3: "Minimalist Lettermark" },
    attrs: [
      { id: "logo_style", label: "Style", type: "select", icon: PenTool, options: ["Flat Design", "3D Render", "Neon", "Vintage/Retro", "Origami", "Line Art", "Watercolor", "Esport/Gaming"] },
      { id: "logo_color", label: "Color Palette", type: "select", icon: Palette, options: ["Monochrome", "Pastel", "Neon/Cyberpunk", "Gold & Black", "Vibrant/Colorful", "Earthy Tones"] },
      { id: "logo_background", label: "Background", type: "select", icon: Layout, options: ["Transparent/White", "Dark/Black", "Gradient", "Mockup on Paper", "Mockup 3D Sign"] }
    ]
  },
  H: {
    label: "🐉 Fantasy Creature",
    role: "Master Fantasy Concept Artist and Creature Designer",
    layouts: { H0: "Full Body Concept", H1: "Action Pose", H2: "Habitat Scene", H3: "Anatomical Study" },
    attrs: [
      { id: "creature_type", label: "Type", type: "select", icon: Ghost, options: ["Dragon", "Griffin", "Chimera", "Sea Monster", "Beast", "Elemental"] },
      { id: "creature_element", label: "Element", type: "select", icon: Flame, options: ["Fire", "Ice", "Shadow", "Light", "Earth", "Lightning", "Arcane"] },
      { id: "creature_scale", label: "Scale", type: "select", icon: Maximize, options: ["Colossal", "Giant", "Human-sized", "Small", "Microscopic"] }
    ]
  },
  I: {
    label: "⚡ Mythological Being",
    role: "Expert Mythological Illustrator and Lore Master",
    layouts: { I0: "Centered Full Body", I1: "Bust Shot with Dramatic Lighting", I2: "Action Pose with Background Elements", I3: "Statue/Idol" },
    attrs: [
      { id: "myth_origin", label: "Pantheon", type: "select", icon: Globe, options: ["Greek", "Norse", "Egyptian", "Celtic", "Japanese", "Aztec", "Mesopotamian"] },
      { id: "myth_nature", label: "Nature", type: "select", icon: Sparkles, options: ["Deity", "Demigod", "Spirit", "Demon", "Titan", "Nymph"] },
      { id: "myth_aura", label: "Aura", type: "select", icon: Sun, options: ["Radiant", "Menacing", "Ethereal", "Chaotic", "Serene", "Corrupted"] }
    ]
  },
  J: {
    label: "🌌 Abstract Concept",
    role: "Visionary Abstract Artist and Visual Metaphor Expert",
    layouts: { J0: "Surreal Composition", J1: "Geometric Abstraction", J2: "Fluid Dynamics", J3: "Minimalist Symbolism" },
    attrs: [
      { id: "abstract_theme", label: "Theme", type: "select", icon: Brain, options: ["Time", "Love", "Chaos", "Order", "Dreams", "Consciousness", "Infinity", "Decay"] },
      { id: "abstract_color", label: "Color Palette", type: "select", icon: Palette, options: ["Monochrome", "Neon Contrast", "Muted Pastels", "Primary Colors", "Iridescent", "Void/Black"] },
      { id: "abstract_shape", label: "Dominant Shape", type: "select", icon: Hexagon, options: ["Spheres", "Fractals", "Sharp Angles", "Flowing Waves", "Spirals", "Shattered Glass"] }
    ]
  },
  K: {
    label: "👗 Costume Design",
    role: "Expert Costume Designer and Fashion Historian",
    layouts: { K0: "Full Body Mannequin", K1: "Fabric Detail Shot", K2: "Historical Context Scene", K3: "Layered Breakdown" },
    attrs: [
      { id: "costume_era", label: "Historical Era", type: "select", icon: Hourglass, options: ["Victorian", "Renaissance", "Cyberpunk", "1920s Flapper", "Sci-Fi Future", "Medieval", "Ancient Egyptian"] },
      { id: "costume_material", label: "Primary Material", type: "select", icon: Scissors, options: ["Silk & Lace", "Heavy Leather", "Velvet & Gold", "Holographic Synthetic", "Woven Linen", "Chainmail"] },
      { id: "costume_vibe", label: "Aesthetic/Vibe", type: "select", icon: Sparkles, options: ["Royal / Regal", "Peasant / Commoner", "Tactical / Combat", "Ceremonial", "Nomadic / Wasteland"] }
    ]
  },
  CUL: {
    label: "🍔 Photographie Culinaire",
    role: "Expert Food Photographer and Culinary Stylist",
    layouts: { CUL0: "Plat principal centré", CUL1: "Vue de dessus (Flat lay)", CUL2: "Gros plan texture (Macro)", CUL3: "Scène de table complète", CUL4: "Action (Sauce qui coule, fumée)" },
    attrs: [
      { id: "food_type", label: "Type de plat", type: "select", icon: Utensils, options: ["Gastronomique", "Street Food", "Dessert / Pâtisserie", "Boisson / Cocktail", "Plat traditionnel", "Vegan / Healthy", "Fast Food", "Boulangerie"] },
      { id: "presentation", label: "Dressage", type: "select", icon: ChefHat, options: ["Minimaliste", "Généreux / Rustique", "Déstructuré", "Artistique", "En mouvement (coulure, fumée)", "Symétrique"] },
      { id: "props", label: "Accessoires de table", type: "select", icon: Box, options: ["Argenterie antique", "Planches en bois brut", "Céramique artisanale", "Nappe en lin", "Feuilles / Herbes fraîches", "Verres en cristal", "Marbre élégant"] },
      { id: "food_lighting", label: "Éclairage culinaire", type: "select", icon: Lightbulb, options: ["Lumière naturelle douce", "Clair-obscur (Dark mood)", "Studio brillant (High key)", "Lumière directionnelle dure", "Néon / Ambiance bar"] }
    ]
  },
  FASH: {
    label: "👠 Mode & Fashion",
    role: "High-End Fashion Photographer and Stylist",
    layouts: { FASH0: "Lookbook (Plein pied)", FASH1: "Portrait Éditorial", FASH2: "Détail vêtement/texture", FASH3: "Défilé (Runway)", FASH4: "Campagne publicitaire" },
    attrs: [
      { id: "fashion_style", label: "Style vestimentaire", type: "select", icon: Shirt, options: ["Haute Couture", "Streetwear", "Avant-Garde", "Vintage / Rétro", "Minimaliste", "Techwear", "Éco-responsable", "Androgyne", "Y2K"] },
      { id: "fabric", label: "Tissu / Matière", type: "select", icon: Layers, options: ["Soie / Satin", "Cuir / Vinyle", "Denim brut", "Laine / Tricot", "Dentelle / Transparence", "Matières synthétiques / Plastique", "Velours", "Lin naturel"] },
      { id: "pose", label: "Pose du mannequin", type: "select", icon: User, options: ["Dynamique / En mouvement", "Statique / Éditoriale", "Assise élégante", "Regard par-dessus l'épaule", "Interaction avec le vêtement", "Pose asymétrique"] },
      { id: "fashion_setting", label: "Décor / Set", type: "select", icon: Building, options: ["Studio fond uni", "Rue urbaine", "Nature sauvage", "Architecture brutaliste", "Intérieur luxueux", "Décor surréaliste"] }
    ]
  },
  M: {
    label: "🎬 Set Design",
    role: "Master Production Designer and Theatrical Set Artist",
    layouts: { M0: "Wide Establishing Shot", M1: "Stage Front View", M2: "Top-Down Floor Plan", M3: "Dramatic Lighting Focus" },
    attrs: [
      { id: "set_theme", label: "Theme", type: "select", icon: Clapperboard, options: ["Sci-Fi Bridge", "Victorian Parlor", "Post-Apocalyptic Ruin", "Fantasy Tavern", "Modern Minimalist", "Haunted Mansion"] },
      { id: "set_lighting", label: "Stage Lighting", type: "select", icon: Lightbulb, options: ["Spotlight Focus", "Dim & Moody", "Neon Glow", "Natural Daylight", "Cinematic High Contrast", "Eerie Bioluminescence"] },
      { id: "set_scale", label: "Scale", type: "select", icon: Maximize, options: ["Intimate Room", "Massive Arena", "Outdoor Landscape", "Claustrophobic Corridor", "Grand Hall"] }
    ]
  },
  N: {
    label: "🗡️ Props",
    role: "Lead Prop Concept Artist and 3D Modeler",
    layouts: { N0: "Studio Hero Shot", N1: "Orthographic Views", N2: "In-Hand Scale Reference", N3: "Weathered Detail Close-up" },
    attrs: [
      { id: "prop_type", label: "Prop Type", type: "select", icon: Sword, options: ["Melee Weapon", "Magical Artifact", "Sci-Fi Gadget", "Everyday Item", "Vehicle Part", "Ancient Relic"] },
      { id: "prop_condition", label: "Condition", type: "select", icon: ShieldAlert, options: ["Pristine / Mint", "Battle-Damaged", "Ancient / Rusted", "Cybernetically Enhanced", "Overgrown with Nature"] },
      { id: "prop_material", label: "Material", type: "select", icon: Gem, options: ["Scrap Metal", "Obsidian", "Glowing Crystal", "Carved Bone", "Damascus Steel", "Matte Plastic", "Polished Wood", "Rusted Iron", "Ethereal Energy", "Glossy"] }
    ]
  },
  O: {
    label: "🧊 3D Models",
    role: "Expert 3D Modeler and Asset Creator",
    layouts: { O0: "Single Model View", O1: "Orthographic Views", O2: "Wireframe View", O3: "Turntable Render" },
    attrs: [
      { id: "model_material", label: "Material", type: "select", icon: Box, options: ["Matte Plastic", "Brushed Metal", "Glossy Ceramic", "Rough Stone", "Clear Glass", "Holographic"] },
      { id: "model_polycount", label: "Poly Count", type: "select", icon: Triangle, options: ["Low Poly", "Mid Poly", "High Poly", "Sculpted Detail", "Voxel"] },
      { id: "model_texture", label: "Texture Resolution", type: "select", icon: ImageIcon, options: ["Pixel Art (Pixelated)", "Stylized (Hand-painted)", "PBR Realistic (4K)", "Untextured (Clay Render)"] }
    ]
  },
  P: {
    label: "✨ Logo & Branding",
    role: "Lead Brand Designer and Corporate Identity Specialist",
    layouts: { P0: "Centered Logo on Solid Background", P1: "Logo with Typography/Wordmark", P2: "App Icon Design", P3: "Brand Identity Mockup (Business Cards, Letterhead)" },
    attrs: [
      { id: "logo_style", label: "Style", type: "select", icon: PenTool, options: ["Minimalist", "Vintage / Retro", "Mascot / Character", "Abstract / Geometric", "Hand-drawn / Organic", "Corporate / Professional", "3D / Embossed", "Cyberpunk / Neon", "Neon"] },
      { id: "logo_color", label: "Color Palette", type: "select", icon: Palette, options: ["Monochrome", "Black and White", "Pastel", "Neon / Vibrant", "Earthy / Natural", "Gradient", "Gold / Luxury", "Primary Colors"] },
      { id: "logo_background", label: "Background", type: "select", icon: Layout, options: ["Transparent / White", "Dark / Black", "Textured Paper", "Gradient Backdrop", "Contextual Mockup"] }
    ]
  },
  V: {
    label: "🎥 Video",
    role: "AI Video Director",
    layouts: { V0: "Short Clip", V1: "Explainer Video Scene", V2: "Animated Logo Intro" },
    attrs: [
      { id: "video_style", label: "Video Style", type: "select", icon: Clapperboard, options: ["Cinematic", "Animated", "Abstract", "Photorealistic", "Cartoon", "Stop Motion"] },
      { id: "video_duration", label: "Duration", type: "select", icon: Clock, options: ["Short (5s)", "Medium (15s)", "Long (30s)"] }
    ]
  },
  VA: {
    label: "🎞️ Video Animation",
    role: "AI Animation Director",
    layouts: { VA0: "Short Animation Loop", VA1: "Character Animation Scene", VA2: "Abstract Motion Graphic" },
    attrs: [
      { id: "animation_style", label: "Animation Style", type: "select", icon: Clapperboard, options: ["2D Toon", "3D Realistic", "Stop Motion", "Motion Graphics"] },
      { id: "animation_length", label: "Length", type: "select", icon: Clock, options: ["Short (2s)", "Looping", "Medium (10s)", "Long (20s)"] }
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
  { id: "zenith", label: "Zénithale (Flat Lay)", value: "zenithal overhead flat lay view, 90 degrees looking down" },
  { id: "high_view", label: "Ciel", value: "cinematic bird's eye view" },
  { id: "low", label: "Contre-plongée", value: "heroic low angle" },
  { id: "dramatic_low", label: "Contre-plongée Dramatique", value: "dramatic extreme low angle shot, worm's-eye view" },
  { id: "closeup", label: "Macro", value: "extreme close-up" },
  { id: "wide", label: "Large", value: "wide establishing shot" },
  { id: "dutch", label: "Plan Hollandais", value: "dutch angle, tilted camera" }
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
  S24: "Gravure sur Bois (Woodcut)",
  S25: "Renaissance",
  S26: "Baroque",
  S27: "Rococo",
  S28: "Art Déco (Vintage)",
  S29: "Polaroid",
  S30: "Cinématique 35mm"
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
  S24: "woodcut print, bold black and white lines, rough texture, medieval style",
  S25: "Renaissance painting style, oil on canvas, chiaroscuro, masterpiece",
  S26: "Baroque art style, dramatic lighting, rich colors, highly detailed, ornate",
  S27: "Rococo art style, pastel colors, ornate, elegant, soft lighting, romantic",
  S28: "Vintage Art Deco poster style, geometric, elegant, symmetrical",
  S29: "Polaroid photo, vintage photography, soft focus, retro colors, light leaks",
  S30: "35mm film photography, cinematic lighting, film grain, anamorphic lens"
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
  F26: "Tourbillons Liquides", F27: "Formes Minimalistes", F28: "Abstract Geometric Patterns", F29: "Abstract",
  F30: "Salle de bain", F31: "Cuisine", F32: "Chambre d'hôpital", F33: "Salon"
};
export const bgsValue: Record<string, string> = { 
  F1: "pure white background", F2: "green screen", F3: "grey background", F4: "black background", 
  F9: "urban street", F10: "blockchain data matrix", F11: "office interior", F12: "glass window view", F13: "fireplace", 
  F5: "nature landscape", F7: "forest", F6: "spaceship interior",
  F14: "desert landscape with dunes", F15: "vast ocean view", F16: "snowy mountain peaks", F17: "neon-lit cyberpunk city street", F18: "medieval fantasy village", 
  F19: "futuristic space station interior", F20: "underwater coral reef", F21: "post-apocalyptic ruined city",
  F22: "smooth abstract color gradient background", F23: "abstract geometric patterns background", F24: "soft bokeh lights background", F25: "retro 80s neon grid background", 
  F26: "abstract liquid swirls background", F27: "minimalist abstract shapes background", F28: "abstract geometric patterns background", F29: "abstract background",
  F30: "bathroom interior, modern bathroom, tiles, mirror", F31: "kitchen interior, modern kitchen, countertops, appliances", F32: "hospital room interior, medical equipment, clinical lighting", F33: "living room interior, cozy sofa, coffee table, warm lighting"
};
