/**
 * Base de données de mots pour le jeu "Guess It All"
 *
 * Catégories :
 * - Objets du quotidien (30%)
 * - Animaux (15%)
 * - Métiers (10%)
 * - Actions/Verbes (10%)
 * - Adjectifs (10%)
 * - Concepts abstraits (10%)
 * - Lieux (10%)
 * - Célébrités/Personnages (5%)
 */

import { generateWordsFromCategories } from './wordCategories.js';

export const wordDatabase = [
  // Objets du quotidien (30% - environ 300 mots)
  "Armoire", "Table", "Chaise", "Lit", "Canapé", "Lampe", "Télévision",
  "Ordinateur", "Téléphone", "Tablette", "Montre", "Lunettes", "Stylo",
  "Cahier", "Livre", "Journal", "Magazine", "Clavier", "Souris", "Écran",
  "Imprimante", "Scanner", "Casque", "Écouteurs", "Micro", "Webcam",
  "Tasse", "Verre", "Assiette", "Fourchette", "Couteau", "Cuillère",
  "Casserole", "Poêle", "Bouilloire", "Grille-pain", "Mixeur", "Blender",
  "Réfrigérateur", "Congélateur", "Four", "Micro-ondes", "Lave-vaisselle",
  "Lave-linge", "Sèche-linge", "Aspirateur", "Fer à repasser", "Balai",
  "Serpillière", "Éponge", "Torchon", "Savon", "Shampoing", "Dentifrice",
  "Brosse à dents", "Peigne", "Brosse à cheveux", "Sèche-cheveux",
  "Rasoir", "Miroir", "Serviette", "Drap", "Couverture", "Oreiller",
  "Rideau", "Tapis", "Coussin", "Horloge", "Réveil", "Calendrier",
  "Agenda", "Porte-clés", "Clé", "Cadenas", "Serrure", "Porte",
  "Fenêtre", "Volet", "Store", "Balcon", "Terrasse", "Jardin",
  "Plante", "Fleur", "Arbre", "Pot", "Vase", "Arrosoir",
  "Parapluie", "Parasol", "Chapeau", "Casquette", "Bonnet", "Écharpe",
  "Gants", "Manteau", "Veste", "Pull", "T-shirt", "Chemise",
  "Pantalon", "Jean", "Short", "Jupe", "Robe", "Chaussettes",
  "Chaussures", "Baskets", "Bottes", "Sandales", "Tongs", "Ceinture",
  "Sac", "Valise", "Cartable", "Portefeuille", "Porte-monnaie", "Carte",
  "Billet", "Pièce", "Monnaie", "Argent", "Chéquier", "Calculatrice",
  "Règle", "Compas", "Équerre", "Gomme", "Taille-crayon", "Crayon",
  "Feutre", "Marqueur", "Surligneu", "Peinture", "Pinceau", "Palette",
  "Toile", "Cadre", "Photo", "Album", "Appareil photo", "Caméra",
  "Trépied", "Flash", "Objectif", "Pellicule", "Négatif", "Diapositive",
  "Guitare", "Piano", "Violon", "Flûte", "Trompette", "Batterie",
  "Microphone", "Amplificateur", "Enceinte", "Platine", "Vinyle", "CD",
  "DVD", "Blu-ray", "Cassette", "Bande", "Clé USB", "Disque dur",
  "Carte mémoire", "Batterie", "Chargeur", "Câble", "Prise", "Interrupteur",
  "Ampoule", "Bougie", "Allumette", "Briquet", "Cendrier", "Cigarette",
  "Pipe", "Tabac", "Cigare", "Boîte", "Carton", "Sac plastique",
  "Papier", "Carton", "Bois", "Métal", "Plastique", "Verre",
  "Tissu", "Cuir", "Laine", "Coton", "Soie", "Velours",
  "Bouton", "Fermeture", "Zip", "Scratch", "Corde", "Ficelle",
  "Ruban", "Noeud", "Épingle", "Aiguille", "Fil", "Ciseaux",
  "Colle", "Scotch", "Pansement", "Bandage", "Thermomètre", "Médicament",
  "Pilule", "Sirop", "Pommade", "Comprimé", "Gélule", "Injection",
  "Seringue", "Stéthoscope", "Otoscope", "Tensiomètre", "Balance",
  "Marteau", "Tournevis", "Clé", "Pince", "Scie", "Perceuse",
  "Vis", "Clou", "Boulon", "Écrou", "Cheville", "Niveau",
  "Mètre", "Laser", "Échelle", "Escabeau", "Corde", "Poulie",
  "Ballon", "Balle", "Raquette", "Club", "Batte", "Crosse",
  "Filet", "Panier", "But", "Poteau", "Ligne", "Marquage",
  "Chronomètre", "Sifflet", "Carte jaune", "Carte rouge", "Trophée",
  "Médaille", "Coupe", "Diplôme", "Certificat", "Badge", "Insigne",
  "Drapeau", "Bannière", "Pancarte", "Affiche", "Poster", "Tableau",
  "Ardoise", "Craie", "Marqueur", "Efface", "Brosse", "Bureau",
  "Chaise de bureau", "Fauteuil", "Tabouret", "Banc", "Pouf",
  "Lampadaire", "Lustre", "Applique", "Spot", "Néon", "LED",
  "Bougeoir", "Chandelier", "Lanterne", "Torche", "Projecteur",
  "Jumelles", "Loupe", "Microscope", "Télescope", "Boussole", "GPS",
  "Carte", "Plan", "Atlas", "Globe", "Mappemonde", "Puzzle",
  "Jeu de société", "Cartes", "Dés", "Pion", "Plateau", "Figurine",
  "Poupée", "Peluche", "Voiture miniature", "Train", "Avion", "Bateau",
  "Vélo", "Trottinette", "Skateboard", "Rollers", "Skis", "Surf",
  "Planche à voile", "Cerf-volant", "Frisbee", "Yoyo", "Bille",

  // Animaux (15% - environ 150 mots)
  "Chien", "Chat", "Lapin", "Hamster", "Souris", "Rat", "Cochon d'Inde",
  "Furet", "Tortue", "Serpent", "Lézard", "Iguane", "Gecko",
  "Poisson", "Poisson rouge", "Carpe", "Truite", "Saumon", "Thon",
  "Requin", "Baleine", "Dauphin", "Orque", "Phoque", "Otarie",
  "Morse", "Manchot", "Pingouin", "Albatros", "Mouette", "Goéland",
  "Pélican", "Cormoran", "Héron", "Cigogne", "Flamant rose",
  "Canard", "Oie", "Cygne", "Poule", "Coq", "Poussin", "Dindon",
  "Paon", "Faisan", "Caille", "Perdrix", "Pigeon", "Tourterelle",
  "Colombe", "Corbeau", "Pie", "Geai", "Moineau", "Rouge-gorge",
  "Mésange", "Hirondelle", "Rossignol", "Alouette", "Perroquet",
  "Perruche", "Cacatoès", "Ara", "Toucan", "Aigle", "Faucon",
  "Vautour", "Hibou", "Chouette", "Autruche", "Émeu", "Kiwi",
  "Cheval", "Poney", "Âne", "Zèbre", "Vache", "Taureau", "Boeuf",
  "Veau", "Mouton", "Brebis", "Agneau", "Chèvre", "Bouc", "Chevreau",
  "Cochon", "Porc", "Sanglier", "Cerf", "Biche", "Faon", "Chevreuil",
  "Renne", "Élan", "Chamois", "Bouquetin", "Mouflon", "Chameau",
  "Dromadaire", "Lama", "Alpaga", "Girafe", "Éléphant", "Rhinocéros",
  "Hippopotame", "Lion", "Tigre", "Léopard", "Guépard", "Panthère",
  "Jaguar", "Puma", "Lynx", "Ours", "Ours polaire", "Panda",
  "Loup", "Renard", "Coyote", "Chacal", "Hyène", "Singe",
  "Gorille", "Chimpanzé", "Orang-outan", "Babouin", "Macaque",
  "Kangourou", "Koala", "Wombat", "Tasmanie", "Castor", "Loutre",
  "Écureuil", "Hérisson", "Taupe", "Blaireau", "Raton laveur",
  "Grenouille", "Crapaud", "Salamandre", "Triton", "Crocodile",
  "Alligator", "Caïman", "Gavial", "Papillon", "Coccinelle",
  "Abeille", "Guêpe", "Bourdon", "Frelon", "Mouche", "Moustique",
  "Libellule", "Sauterelle", "Criquet", "Cigale", "Fourmi",
  "Araignée", "Scorpion", "Mille-pattes", "Escargot", "Limace",

  // Métiers (10% - environ 100 mots)
  "Médecin", "Infirmier", "Chirurgien", "Dentiste", "Pharmacien",
  "Vétérinaire", "Kinésithérapeute", "Ostéopathe", "Psychologue",
  "Psychiatre", "Sage-femme", "Aide-soignant", "Ambulancier",
  "Professeur", "Instituteur", "Enseignant", "Éducateur", "Formateur",
  "Avocat", "Juge", "Procureur", "Notaire", "Huissier", "Greffier",
  "Policier", "Gendarme", "Pompier", "Militaire", "Douanier",
  "Ingénieur", "Architecte", "Dessinateur", "Géomètre", "Topographe",
  "Informaticien", "Développeur", "Programmeur", "Analyste", "Technicien",
  "Électricien", "Plombier", "Menuisier", "Charpentier", "Maçon",
  "Couvreur", "Peintre", "Carreleur", "Serrurier", "Vitrier",
  "Mécanicien", "Garagiste", "Carrossier", "Dépanneur", "Chauffeur",
  "Taxi", "Livreur", "Facteur", "Éboueur", "Balayeur",
  "Cuisinier", "Chef", "Pâtissier", "Boulanger", "Boucher",
  "Poissonnier", "Fromager", "Épicier", "Commerçant", "Vendeur",
  "Caissier", "Hôtesse", "Serveur", "Barman", "Sommelier",
  "Agriculteur", "Éleveur", "Berger", "Vigneron", "Jardinier",
  "Fleuriste", "Paysagiste", "Forestier", "Bûcheron", "Pêcheur",
  "Artiste", "Peintre", "Sculpteur", "Musicien", "Chanteur",
  "Danseur", "Acteur", "Comédien", "Réalisateur", "Scénariste",
  "Journaliste", "Reporter", "Présentateur", "Photographe", "Cameraman",
  "Coiffeur", "Esthéticienne", "Maquilleur", "Manucure", "Masseur",

  // Actions/Verbes (10% - environ 100 mots)
  "Courir", "Marcher", "Sauter", "Danser", "Nager", "Plonger",
  "Grimper", "Ramper", "Voler", "Tomber", "Glisser", "Rouler",
  "Manger", "Boire", "Dormir", "Rêver", "Penser", "Réfléchir",
  "Parler", "Écouter", "Regarder", "Voir", "Sentir", "Toucher",
  "Lire", "Écrire", "Dessiner", "Peindre", "Chanter", "Jouer",
  "Rire", "Pleurer", "Sourire", "Crier", "Chuchoter", "Hurler",
  "Aimer", "Détester", "Adorer", "Préférer", "Apprécier", "Mépriser",
  "Construire", "Détruire", "Réparer", "Casser", "Créer", "Inventer",
  "Ouvrir", "Fermer", "Allumer", "Éteindre", "Commencer", "Finir",
  "Partir", "Arriver", "Entrer", "Sortir", "Monter", "Descendre",
  "Pousser", "Tirer", "Lancer", "Attraper", "Jeter", "Ramasser",
  "Donner", "Prendre", "Offrir", "Recevoir", "Acheter", "Vendre",
  "Travailler", "Étudier", "Apprendre", "Enseigner", "Expliquer",
  "Comprendre", "Oublier", "Se souvenir", "Chercher", "Trouver",
  "Perdre", "Gagner", "Réussir", "Échouer", "Essayer", "Tenter",
  "Voyager", "Partir", "Revenir", "Visiter", "Explorer", "Découvrir",
  "Cuisiner", "Préparer", "Servir", "Goûter", "Déguster", "Avaler",

  // Adjectifs (10% - environ 100 mots)
  "Grand", "Petit", "Gros", "Maigre", "Long", "Court",
  "Large", "Étroit", "Haut", "Bas", "Profond", "Superficiel",
  "Chaud", "Froid", "Tiède", "Glacé", "Brûlant", "Gelé",
  "Rapide", "Lent", "Vite", "Lentement", "Léger", "Lourd",
  "Fort", "Faible", "Puissant", "Fragile", "Solide", "Résistant",
  "Dur", "Mou", "Rigide", "Souple", "Flexible", "Raide",
  "Lisse", "Rugueux", "Doux", "Piquant", "Pointu", "Émoussé",
  "Propre", "Sale", "Neuf", "Vieux", "Ancien", "Moderne",
  "Beau", "Laid", "Joli", "Mignon", "Élégant", "Gracieux",
  "Intelligent", "Bête", "Stupide", "Malin", "Rusé", "Naïf",
  "Gentil", "Méchant", "Bon", "Mauvais", "Agréable", "Désagréable",
  "Heureux", "Triste", "Joyeux", "Malheureux", "Gai", "Morose",
  "Calme", "Nerveux", "Tranquille", "Agité", "Serein", "Anxieux",
  "Courageux", "Peureux", "Brave", "Lâche", "Audacieux", "Timide",
  "Riche", "Pauvre", "Cher", "Bon marché", "Gratuit", "Payant",
  "Plein", "Vide", "Rempli", "Creux", "Complet", "Incomplet",
  "Ouvert", "Fermé", "Clos", "Béant", "Scellé", "Verrouillé",

  // Concepts abstraits (10% - environ 100 mots)
  "Amour", "Haine", "Joie", "Tristesse", "Peur", "Courage",
  "Bonheur", "Malheur", "Paix", "Guerre", "Liberté", "Prison",
  "Vérité", "Mensonge", "Justice", "Injustice", "Égalité", "Inégalité",
  "Beauté", "Laideur", "Sagesse", "Folie", "Raison", "Déraison",
  "Espoir", "Désespoir", "Confiance", "Méfiance", "Foi", "Doute",
  "Respect", "Mépris", "Honneur", "Honte", "Fierté", "Humilité",
  "Patience", "Impatience", "Calme", "Colère", "Sérénité", "Angoisse",
  "Silence", "Bruit", "Harmonie", "Discord", "Ordre", "Chaos",
  "Temps", "Éternité", "Instant", "Moment", "Durée", "Période",
  "Passé", "Présent", "Futur", "Hier", "Aujourd'hui", "Demain",
  "Vie", "Mort", "Naissance", "Décès", "Existence", "Néant",
  "Réalité", "Rêve", "Illusion", "Imagination", "Fantaisie", "Fiction",
  "Science", "Art", "Culture", "Nature", "Société", "Civilisation",
  "Progrès", "Régression", "Évolution", "Révolution", "Changement",
  "Tradition", "Innovation", "Modernité", "Antiquité", "Histoire",
  "Géographie", "Philosophie", "Psychologie", "Sociologie", "Politique",
  "Économie", "Finance", "Commerce", "Industrie", "Agriculture",

  // Lieux (10% - environ 100 mots)
  "Maison", "Appartement", "Immeuble", "Villa", "Château", "Cabane",
  "Chambre", "Salon", "Cuisine", "Salle de bain", "Toilettes", "Garage",
  "Cave", "Grenier", "Bureau", "Bibliothèque", "Salle à manger",
  "École", "Collège", "Lycée", "Université", "Crèche", "Garderie",
  "Hôpital", "Clinique", "Cabinet", "Pharmacie", "Laboratoire",
  "Église", "Cathédrale", "Mosquée", "Synagogue", "Temple", "Chapelle",
  "Restaurant", "Café", "Bar", "Brasserie", "Bistrot", "Cantine",
  "Magasin", "Boutique", "Supermarché", "Hypermarché", "Épicerie",
  "Boulangerie", "Pâtisserie", "Boucherie", "Poissonnerie", "Fromagerie",
  "Banque", "Poste", "Mairie", "Préfecture", "Tribunal", "Commissariat",
  "Gare", "Aéroport", "Port", "Station", "Arrêt", "Terminal",
  "Rue", "Avenue", "Boulevard", "Place", "Square", "Parc",
  "Jardin", "Forêt", "Bois", "Prairie", "Champ", "Pré",
  "Montagne", "Colline", "Vallée", "Plaine", "Plateau", "Sommet",
  "Mer", "Océan", "Lac", "Rivière", "Fleuve", "Ruisseau",
  "Plage", "Côte", "Falaise", "Rocher", "Grotte", "Caverne",
  "Ville", "Village", "Hameau", "Capitale", "Métropole", "Banlieue",
  "Pays", "Région", "Province", "Département", "Commune", "Quartier",
  "Continent", "Île", "Archipel", "Péninsule", "Presqu'île", "Cap",

  // Célébrités/Personnages (5% - environ 50 mots)
  "Superman", "Batman", "Spiderman", "Wonder Woman", "Iron Man",
  "Captain America", "Thor", "Hulk", "Black Widow", "Wolverine",
  "Harry Potter", "Hermione", "Ron Weasley", "Dumbledore", "Voldemort",
  "Luke Skywalker", "Dark Vador", "Yoda", "Han Solo", "Leia",
  "Sherlock Holmes", "James Bond", "Indiana Jones", "Tarzan", "Zorro",
  "Mickey", "Donald", "Dingo", "Minnie", "Pluto",
  "Astérix", "Obélix", "Panoramix", "Idéfix", "Tintin",
  "Lucky Luke", "Jolly Jumper", "Gaston Lagaffe", "Marsupilami",
  "Pikachu", "Mario", "Luigi", "Sonic", "Pac-Man", "Lara Croft",
  "Einstein", "Mozart", "Picasso", "Da Vinci", "Shakespeare",
];

/**
 * Génère un mot aléatoire depuis la base de données
 * @param {Array<string>} excludeWords - Mots à exclure de la sélection
 * @param {Array<string>} selectedCategories - Catégories sélectionnées (optionnel)
 * @returns {string|null} Un mot aléatoire ou null si aucun mot disponible
 */
export const generateRandomWord = (excludeWords = [], selectedCategories = null) => {
  // Si des catégories sont sélectionnées, utiliser le nouveau système
  if (selectedCategories && selectedCategories.length > 0) {
    const words = generateRandomWords(1, excludeWords, selectedCategories);
    return words.length > 0 ? words[0] : null;
  }

  // Sinon, utiliser l'ancienne base de données
  const availableWords = wordDatabase.filter(w => !excludeWords.includes(w));

  if (availableWords.length === 0) {
    console.error('Aucun mot disponible dans la base de données');
    return null;
  }

  const randomIndex = Math.floor(Math.random() * availableWords.length);
  return availableWords[randomIndex];
};

/**
 * Génère N mots aléatoires uniques
 * @param {number} count - Nombre de mots à générer
 * @param {Array<string>} excludeWords - Mots à exclure de la sélection
 * @param {Array<string>} selectedCategories - Catégories sélectionnées (optionnel, utilise wordDatabase par défaut)
 * @returns {Array<string>} Tableau de mots uniques
 */
export const generateRandomWords = (count, excludeWords = [], selectedCategories = null) => {
  // Si des catégories sont sélectionnées, utiliser le nouveau système
  if (selectedCategories && selectedCategories.length > 0) {
    const words = generateWordsFromCategories(selectedCategories, count + excludeWords.length);
    return words.filter(w => !excludeWords.includes(w)).slice(0, count);
  }

  // Sinon, utiliser l'ancienne base de données
  const availableWords = wordDatabase.filter(w => !excludeWords.includes(w));

  if (availableWords.length < count) {
    console.error(`Impossible de générer ${count} mots, seulement ${availableWords.length} disponibles`);
    return availableWords.slice(0, count);
  }

  // Mélanger et prendre les N premiers
  const shuffled = [...availableWords].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
