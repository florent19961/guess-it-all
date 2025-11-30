/**
 * Catégories de mots pour la génération aléatoire
 * Architecture extensible : facile d'ajouter/supprimer des catégories
 */

export const WORD_CATEGORIES = {
  // ========== CATÉGORIES CLASSIQUES ==========

  films: {
    id: 'films',
    name: 'Films',
    icon: '🎬',
    words: [
      'Titanic', 'Avatar', 'Le Parrain', 'Star Wars', 'Jurassic Park',
      'Matrix', 'Forrest Gump', 'Pulp Fiction', 'Inception', 'Gladiator',
      'Le Seigneur des Anneaux', 'Harry Potter', 'Retour vers le futur',
      'Indiana Jones', 'Pirates des Caraïbes', 'Terminator', 'Alien',
      'Rocky', 'Le Roi Lion', 'Toy Story', 'Shrek', 'La La Land',
      'Interstellar', 'Le Silence des Agneaux', 'Les Évadés', 'Scarface',
      'Breaking Bad', 'Game of Thrones', 'Friends', 'The Office',
      'Stranger Things', 'La Casa de Papel', 'Narcos', 'Peaky Blinders',
      'Titanic', 'E.T.', 'Jaws', 'Casablanca', 'Citizen Kane',
      'Psycho', 'Vertigo', 'Apocalypse Now', '2001 Odyssée de l\'espace',
      'Blade Runner', 'Mad Max', 'Die Hard', 'Predator', 'Rambo',
      'Top Gun', 'Fast and Furious', 'Mission Impossible', 'James Bond',
      'Batman', 'Superman', 'Spider-Man', 'Iron Man', 'Avengers',
      'Black Panther', 'Joker', 'Deadpool', 'Guardians of the Galaxy',
      'Thor', 'Doctor Strange', 'Captain America', 'Ant-Man', 'Hulk'
    ]
  },

  pays: {
    id: 'pays',
    name: 'Pays',
    icon: '🌍',
    words: [
      'France', 'Japon', 'Brésil', 'Australie', 'Canada',
      'Italie', 'Espagne', 'Mexique', 'Égypte', 'Inde',
      'Chine', 'États-Unis', 'Allemagne', 'Royaume-Uni', 'Russie',
      'Argentine', 'Pérou', 'Colombie', 'Chili', 'Venezuela',
      'Grèce', 'Portugal', 'Pays-Bas', 'Belgique', 'Suisse',
      'Autriche', 'Pologne', 'Roumanie', 'Hongrie', 'Tchéquie',
      'Suède', 'Norvège', 'Finlande', 'Danemark', 'Islande',
      'Irlande', 'Écosse', 'Pays de Galles', 'Turquie', 'Israël',
      'Arabie Saoudite', 'Iran', 'Irak', 'Jordanie', 'Liban',
      'Maroc', 'Algérie', 'Tunisie', 'Libye', 'Afrique du Sud',
      'Kenya', 'Éthiopie', 'Nigeria', 'Ghana', 'Sénégal',
      'Thaïlande', 'Vietnam', 'Indonésie', 'Philippines', 'Malaisie',
      'Singapour', 'Corée du Sud', 'Corée du Nord', 'Mongolie', 'Kazakhstan',
      'Nouvelle-Zélande', 'Fidji', 'Cuba', 'Jamaïque', 'Haïti'
    ]
  },

  animaux: {
    id: 'animaux',
    name: 'Animaux',
    icon: '🦁',
    words: [
      'Éléphant', 'Tigre', 'Lion', 'Dauphin', 'Aigle',
      'Girafe', 'Panda', 'Kangourou', 'Pingouin', 'Renard',
      'Koala', 'Ours', 'Loup', 'Serpent', 'Crocodile',
      'Requin', 'Baleine', 'Tortue', 'Papillon', 'Abeille',
      'Coccinelle', 'Fourmi', 'Araignée', 'Scorpion', 'Sauterelle',
      'Cheval', 'Zèbre', 'Rhinocéros', 'Hippopotame', 'Guépard',
      'Léopard', 'Panthère', 'Jaguar', 'Hyène', 'Chacal',
      'Singe', 'Gorille', 'Chimpanzé', 'Orang-outan', 'Babouin',
      'Chameau', 'Dromadaire', 'Lama', 'Alpaga', 'Bison',
      'Buffle', 'Antilope', 'Gazelle', 'Cerf', 'Renne',
      'Écureuil', 'Lapin', 'Hérisson', 'Castor', 'Loutre',
      'Phoque', 'Morse', 'Otarie', 'Lion de mer', 'Manchot',
      'Flamant rose', 'Perroquet', 'Hibou', 'Faucon', 'Vautour',
      'Colibri', 'Pigeon', 'Corbeau', 'Pie', 'Mouette'
    ]
  },

  objets: {
    id: 'objets',
    name: 'Objets du quotidien',
    icon: '🔧',
    words: [
      'Téléphone', 'Ordinateur', 'Chaise', 'Table', 'Stylo',
      'Lampe', 'Miroir', 'Couteau', 'Fourchette', 'Cuillère',
      'Clavier', 'Souris', 'Écran', 'Casque', 'Enceinte',
      'Canapé', 'Lit', 'Oreiller', 'Couverture', 'Matelas',
      'Armoire', 'Étagère', 'Bureau', 'Fauteuil', 'Tabouret',
      'Télévision', 'Radio', 'Horloge', 'Réveil', 'Montre',
      'Brosse à dents', 'Dentifrice', 'Savon', 'Shampoing', 'Serviette',
      'Peigne', 'Rasoir', 'Sèche-cheveux', 'Maquillage', 'Parfum',
      'Vêtements', 'Pantalon', 'T-shirt', 'Pull', 'Veste',
      'Chaussures', 'Baskets', 'Bottes', 'Sandales', 'Chaussettes',
      'Lunettes', 'Chapeau', 'Casquette', 'Écharpe', 'Gants',
      'Sac', 'Valise', 'Portefeuille', 'Clés', 'Parapluie',
      'Livre', 'Cahier', 'Crayon', 'Gomme', 'Règle',
      'Assiette', 'Verre', 'Tasse', 'Bol', 'Marmite'
    ]
  },

  metiers: {
    id: 'metiers',
    name: 'Métiers',
    icon: '💼',
    words: [
      'Médecin', 'Infirmier', 'Chirurgien', 'Dentiste', 'Pharmacien',
      'Professeur', 'Instituteur', 'Directeur', 'Psychologue', 'Éducateur',
      'Pompier', 'Policier', 'Gendarme', 'Militaire', 'Garde du corps',
      'Boulanger', 'Pâtissier', 'Boucher', 'Poissonnier', 'Épicier',
      'Architecte', 'Ingénieur', 'Scientifique', 'Chercheur', 'Biologiste',
      'Plombier', 'Électricien', 'Menuisier', 'Peintre', 'Maçon',
      'Avocat', 'Juge', 'Notaire', 'Greffier', 'Huissier',
      'Journaliste', 'Reporter', 'Présentateur', 'Écrivain', 'Auteur',
      'Chef', 'Cuisinier', 'Serveur', 'Sommelier', 'Barman',
      'Acteur', 'Chanteur', 'Musicien', 'Danseur', 'Artiste',
      'Photographe', 'Vidéaste', 'Graphiste', 'Designer', 'Illustrateur',
      'Développeur', 'Programmeur', 'Informaticien', 'Webmaster', 'Hacker',
      'Comptable', 'Banquier', 'Trader', 'Économiste', 'Financier',
      'Pilote', 'Hôtesse de l\'air', 'Capitaine', 'Marin', 'Chauffeur'
    ]
  },

  sports: {
    id: 'sports',
    name: 'Sports',
    icon: '⚽',
    words: [
      'Football', 'Tennis', 'Basketball', 'Volleyball', 'Handball',
      'Natation', 'Plongée', 'Water-polo', 'Surf', 'Voile',
      'Cyclisme', 'VTT', 'BMX', 'Motocross', 'Formule 1',
      'Boxe', 'Karaté', 'Judo', 'Taekwondo', 'Kung-fu',
      'Ski', 'Snowboard', 'Ski de fond', 'Biathlon', 'Luge',
      'Golf', 'Baseball', 'Cricket', 'Rugby', 'Football américain',
      'Escalade', 'Alpinisme', 'Randonnée', 'Trail', 'Marathon',
      'Gymnastique', 'Athlétisme', 'Saut en hauteur', 'Saut en longueur', 'Sprint',
      'Haltérophilie', 'Musculation', 'Crossfit', 'Yoga', 'Pilates',
      'Équitation', 'Polo', 'Course de chevaux', 'Dressage', 'Saut d\'obstacles',
      'Escrime', 'Tir à l\'arc', 'Tir sportif', 'Biathlon', 'Pentathlon',
      'Hockey sur glace', 'Patinage artistique', 'Curling', 'Bobsleigh', 'Skeleton',
      'Aviron', 'Canoë', 'Kayak', 'Stand-up paddle', 'Kitesurf',
      'Badminton', 'Tennis de table', 'Squash', 'Padel', 'Racquetball'
    ]
  },

  celebrites: {
    id: 'celebrites',
    name: 'Célébrités',
    icon: '⭐',
    words: [
      'Einstein', 'Mozart', 'Picasso', 'Shakespeare', 'Elvis Presley',
      'Michael Jackson', 'Madonna', 'Beatles', 'Marilyn Monroe', 'Charlie Chaplin',
      'Napoléon', 'Jules César', 'Cléopâtre', 'Gandhi', 'Nelson Mandela',
      'Martin Luther King', 'Einstein', 'Newton', 'Darwin', 'Marie Curie',
      'Leonardo da Vinci', 'Michel-Ange', 'Van Gogh', 'Monet', 'Dali',
      'Pelé', 'Maradona', 'Messi', 'Ronaldo', 'Zinedine Zidane',
      'Michael Jordan', 'Kobe Bryant', 'LeBron James', 'Tiger Woods', 'Roger Federer',
      'Muhammad Ali', 'Mike Tyson', 'Floyd Mayweather', 'Usain Bolt', 'Simone Biles',
      'Steve Jobs', 'Bill Gates', 'Elon Musk', 'Mark Zuckerberg', 'Jeff Bezos',
      'Barack Obama', 'Donald Trump', 'Joe Biden', 'Vladimir Poutine', 'Xi Jinping',
      'Queen Elizabeth', 'Lady Diana', 'Prince William', 'Kate Middleton', 'Meghan Markle',
      'Beyoncé', 'Rihanna', 'Taylor Swift', 'Lady Gaga', 'Ariana Grande',
      'Brad Pitt', 'Leonardo DiCaprio', 'Tom Cruise', 'Will Smith', 'Johnny Depp',
      'Meryl Streep', 'Scarlett Johansson', 'Jennifer Lawrence', 'Emma Watson', 'Angelina Jolie'
    ]
  },

  // ========== CATÉGORIES FUN ==========

  musiques: {
    id: 'musiques',
    name: 'Noms de musiques',
    icon: '🎵',
    words: [
      'Bohemian Rhapsody', 'Imagine', 'Billie Jean', 'Smells Like Teen Spirit', 'Hey Jude',
      'Hotel California', 'Stairway to Heaven', 'Sweet Child O Mine', 'Wonderwall', 'Thriller',
      'Like a Rolling Stone', 'Let It Be', 'Yesterday', 'Come Together', 'Here Comes the Sun',
      'What a Wonderful World', 'Hallelujah', 'Bridge Over Troubled Water', 'Sound of Silence', 'Creep',
      'Karma Police', 'No Surprises', 'Fake Plastic Trees', 'High and Dry', 'Street Spirit',
      'One', 'Enter Sandman', 'Master of Puppets', 'Nothing Else Matters', 'The Unforgiven',
      'November Rain', 'Don\'t Cry', 'Patience', 'Knockin\' on Heaven\'s Door', 'Welcome to the Jungle',
      'Purple Haze', 'All Along the Watchtower', 'Voodoo Child', 'Hey Joe', 'Little Wing',
      'Born to Run', 'Thunder Road', 'Dancing in the Dark', 'The River', 'Streets of Philadelphia',
      'Lose Yourself', 'Stan', 'Without Me', 'The Real Slim Shady', 'Not Afraid',
      'Blinding Lights', 'Starboy', 'The Hills', 'Can\'t Feel My Face', 'Earned It',
      'Shape of You', 'Perfect', 'Thinking Out Loud', 'Photograph', 'Castle on the Hill',
      'Uptown Funk', 'Happy', 'Get Lucky', 'One More Time', 'Harder Better Faster Stronger',
      'Despacito', 'Bailando', 'La Bicicleta', 'Vivir Mi Vida', 'Danza Kuduro'
    ]
  },

  pokemon: {
    id: 'pokemon',
    name: 'Pokémon',
    icon: '⚡',
    words: [
      // Génération 1
      'Pikachu', 'Raichu', 'Évoli', 'Aquali', 'Voltali',
      'Pyroli', 'Mentali', 'Noctali', 'Phyllali', 'Givrali',
      'Salamèche', 'Reptincel', 'Dracaufeu', 'Bulbizarre', 'Herbizarre',
      'Florizarre', 'Carapuce', 'Carabaffe', 'Tortank', 'Chenipan',
      'Chrysacier', 'Papilusion', 'Roucool', 'Roucoups', 'Roucarnage',
      'Rattata', 'Rattatac', 'Piafabec', 'Rapasdepic', 'Abo',
      'Arbok', 'Nidoran♀', 'Nidorina', 'Nidoqueen', 'Nidoran♂',
      'Nidorino', 'Nidoking', 'Mélofée', 'Mélodelfe', 'Goupix',
      'Feunard', 'Rondoudou', 'Grodoudou', 'Nosferapti', 'Nosferalto',
      'Mystherbe', 'Ortide', 'Rafflesia', 'Paras', 'Parasect',
      'Mimitoss', 'Aéromite', 'Taupiqueur', 'Triopikeur', 'Miaouss',
      'Persian', 'Psykokwak', 'Akwakwak', 'Férosinge', 'Colossinge',
      'Caninos', 'Arcanin', 'Ptitard', 'Têtarte', 'Tartard',
      'Abra', 'Kadabra', 'Alakazam', 'Machoc', 'Machopeur',
      'Mackogneur', 'Chétiflor', 'Boustiflor', 'Empiflor', 'Tentacool',
      'Tentacruel', 'Racaillou', 'Gravalanch', 'Grolem', 'Ponyta',
      'Galopa', 'Ramoloss', 'Flagadoss', 'Magnéti', 'Magnéton',
      'Canarticho', 'Doduo', 'Dodrio', 'Otaria', 'Lamantine',
      'Tadmorv', 'Grotadmorv', 'Kokiyas', 'Crustabri', 'Fantominus',
      'Spectrum', 'Ectoplasma', 'Onix', 'Soporifik', 'Hypnomade',
      'Krabby', 'Krabboss', 'Voltorbe', 'Électrode', 'Noeunoeuf',
      'Noadkoko', 'Osselait', 'Ossatueur', 'Kicklee', 'Tygnon',
      'Excelangue', 'Smogo', 'Smogogo', 'Rhinocorne', 'Rhinoféros',
      'Leveinard', 'Saquedeneu', 'Kangourex', 'Hypotrempe', 'Hypocéan',
      'Poissirène', 'Poissoroy', 'Stari', 'Staross', 'M.Mime',
      'Insécateur', 'Lippoutou', 'Elektek', 'Magmar', 'Scarabrute',
      'Tauros', 'Magicarpe', 'Léviator', 'Lokhlass', 'Métamorph',
      'Évoli', 'Porygon', 'Amonita', 'Amonistar', 'Kabuto',
      'Kabutops', 'Ptéra', 'Ronflex', 'Artikodin', 'Électhor',
      'Sulfura', 'Minidraco', 'Draco', 'Dracolosse', 'Mewtwo',
      'Mew',
      // Légendaires et populaires d'autres générations
      'Lugia', 'Ho-Oh', 'Celebi', 'Suicune', 'Entei',
      'Raikou', 'Kyogre', 'Groudon', 'Rayquaza', 'Latias',
      'Latios', 'Dialga', 'Palkia', 'Giratina', 'Arceus',
      'Reshiram', 'Zekrom', 'Kyurem', 'Xerneas', 'Yveltal',
      'Zygarde', 'Solgaleo', 'Lunala', 'Necrozma', 'Zacian',
      'Zamazenta', 'Eternatus', 'Lucario', 'Gardevoir', 'Draco',
      'Darkrai', 'Cresselia', 'Shaymin', 'Victini', 'Zoroark'
    ]
  },

  clashRoyale: {
    id: 'clashRoyale',
    name: 'Cartes Clash Royale',
    icon: '👑',
    words: [
      // Troupes communes
      'Chevalier', 'Archers', 'Goblins', 'Géant', 'P.E.K.K.A',
      'Mini P.E.K.K.A', 'Valkyrie', 'Squelettes', 'Armée de squelettes', 'Gobelins à sarbacane',
      'Chevaucheur de cochon', 'Barbares', 'Barbare d\'élite', 'Mousquetaire', 'Géant royal',
      'Gardes', 'Princesse', 'Prince', 'Prince noir', 'Sorcière',
      'Sorcier', 'Bébé dragon', 'Ballon', 'Gargouilles', 'Golem',
      'Géant squelette', 'Lave-hound', 'Dragon infernal', 'Tour inferno', 'Fournaise',
      'Bûcheron', 'Bandit', 'Électrocuteur', 'Bourreau', 'Méga chevalier',
      'Chasseuse', 'Maman sorcière', 'Mineur', 'Fossoyeur', 'Chevaucheur de bélier',
      'Gobelin géant', 'Sparky', 'Archer magique', 'Bombe géante', 'Canonnier',
      'Garde royale', 'Recrue royale', 'Hog rider', 'Ballons', 'Dragons',
      // Sorts
      'Flèches', 'Boule de feu', 'Zap', 'Foudre', 'Fusée',
      'Gel', 'Rage', 'Miroir', 'Clone', 'Poison',
      'Tremblement de terre', 'Grêle', 'Tornade', 'Barbare', 'Guérison',
      // Bâtiments
      'Canon', 'Tesla', 'Tour de l\'enfer', 'Cabane de gobelins', 'Tombeau',
      'Collecteur d\'élixir', 'Cabane de barbare', 'Four', 'Tourelle de l\'enfer', 'Foreuse de gobelins',
      // Champions et cartes rares
      'Chevalier doré', 'Princesse d\'or', 'Archer reine', 'Roi squelette', 'Pêcheur',
      'Mère sorcière', 'Electro dragon', 'Bombardier', 'Chevalier garde', 'Mega Knight',
      'Ram Rider', 'Electro Giant', 'Électro-géant', 'Golem de glace', 'Boulet de canon',
      'Flying Machine', 'Canon sur roues', 'Barbare évoluée', 'Mousquetaire évoluée', 'Archers évoluées'
    ]
  },
};

/**
 * Retourne la liste de toutes les catégories disponibles
 * @returns {Array} Tableau d'objets catégorie
 */
export const getCategoryList = () => {
  return Object.values(WORD_CATEGORIES);
};

/**
 * Génère un nombre spécifique de mots aléatoires depuis les catégories sélectionnées
 * @param {Array<string>} selectedCategories - IDs des catégories sélectionnées
 * @param {number} count - Nombre de mots à générer
 * @returns {Array<string>} Tableau de mots uniques
 */
export const generateWordsFromCategories = (selectedCategories, count) => {
  // Si aucune catégorie sélectionnée, utiliser toutes les catégories
  const categoriesToUse = selectedCategories && selectedCategories.length > 0
    ? selectedCategories
    : Object.keys(WORD_CATEGORIES);

  // Pool de mots combinés depuis toutes les catégories sélectionnées
  const combinedWords = categoriesToUse.reduce((acc, categoryId) => {
    const category = WORD_CATEGORIES[categoryId];
    if (category) {
      return [...acc, ...category.words];
    }
    return acc;
  }, []);

  // Mélanger le pool de mots
  const shuffled = [...combinedWords].sort(() => Math.random() - 0.5);

  // Retirer les doublons (au cas où certains mots existent dans plusieurs catégories)
  const uniqueWords = [...new Set(shuffled)];

  // Retourner le nombre demandé de mots
  return uniqueWords.slice(0, Math.min(count, uniqueWords.length));
};

/**
 * Compte le nombre total de mots disponibles dans les catégories sélectionnées
 * @param {Array<string>} selectedCategories - IDs des catégories sélectionnées
 * @returns {number} Nombre total de mots uniques disponibles
 */
export const getTotalWordsCount = (selectedCategories) => {
  const categoriesToUse = selectedCategories && selectedCategories.length > 0
    ? selectedCategories
    : Object.keys(WORD_CATEGORIES);

  const combinedWords = categoriesToUse.reduce((acc, categoryId) => {
    const category = WORD_CATEGORIES[categoryId];
    if (category) {
      return [...acc, ...category.words];
    }
    return acc;
  }, []);

  // Compter les mots uniques
  return new Set(combinedWords).size;
};
