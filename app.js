/* ==========================================================================
   CHIHIRO [AI] · Interactive Logic & Documentation Engine
   ========================================================================== */

// State
let currentLang = 'fr'; // 'fr' | 'en'
let currentDoc = 'tos';  // 'tos' | 'privacy' | 'readme'
let currentCategory = 'all';

// Dialogue quotes for interactive sprite
const quotes = {
  fr: [
    "Bonjour ! Je suis Chihiro Fujisaki. Tout va bien aujourd'hui ?",
    "Alter Ego fonctionne à 100% de ses capacités !",
    "N'oublie pas de nourrir ton Chihiro avec `/nourrir` !",
    "Monokuma prépare un mauvais coup... Reste sur tes gardes !",
    "L'espoir l'emportera toujours sur le désespoir !",
    "Tu as regardé dans ta boîte mail aujourd'hui avec `/mail liste` ?",
    "Le lac de Kibougamine a plein de poissons rares à pêcher !"
  ],
  en: [
    "Hello! I am Chihiro Fujisaki. Is everything okay today?",
    "Alter Ego is running at 100% computational capacity!",
    "Don't forget to feed your Chihiro using `/feed`!",
    "Monokuma is up to something... Stay vigilant!",
    "Hope will always prevail over despair!",
    "Have you checked your inbox today with `/mail box`?",
    "The Kibougamine Lake has many rare fish to catch!"
  ]
};

// Full Command Database
const commandsData = [
  {
    name: "/help",
    category: "tamagotchi",
    desc: {
      fr: "Affiche la liste de toutes les commandes de Chihiro, rangées par catégorie. Le même panneau s'ouvre avec le bouton ? de /a-propos.",
      en: "Lists every Chihiro command, grouped by category. The same panel opens from the ? button in /about."
    }
  },
  {
    name: "/chihiro",
    category: "tamagotchi",
    desc: {
      fr: "Ouvre l'e-Handbook interactif avec les 8 raccourcis rapides (profil, jeux, boutique, etc.). L'onglet mini-jeux contient aussi la pêche et le Mode École. La chambre se salit quand tu joues : nettoie les cacas avant que la jauge de Désespoir atteigne 10, sinon Chihiro meurt. Nettoyer rapporte aussi des Monocoins, et tu ne peux nettoyer que s'il y a des cacas et que Chihiro est réveillé. Un Monokuma se cache parfois dans la chambre : trouve le bon côté pour gagner 10 Monocoins (3 par jour, 30 à trouver). Les mini-jeux lancés d'ici s'ouvrent dans le même message, avec un bouton Retour en fin de partie.",
      en: "Opens the interactive e-Handbook dashboard with 8 quick shortcuts. The mini-games tab also holds fishing and School Mode. The room gets dirty as you play: clean up the poop before the Despair gauge reaches 10, or Chihiro dies. Cleaning also earns Monocoins, and you can only clean when there is poop and Chihiro is awake. Monokuma sometimes hides in the room: pick the right side to win 10 Monocoins (3 a day, 30 to find). Mini-games started from here open in the same message, with a Back button at the end of the game."
    }
  },
  {
    name: "/nourrir",
    category: "tamagotchi",
    desc: {
      fr: "Donne à Chihiro un objet de ton inventaire : la nourriture remonte sa faim, et chaque objet est un cadeau qui baisse le Désespoir de 1. Chihiro réagit selon ses goûts de Danganronpa 1 (il adore le Parfum Myrtille et déteste la Barrette Chaton).",
      en: "Gives Chihiro an item from your inventory: food restores hunger, and every object is a present that lowers Despair by 1. Chihiro reacts according to his tastes from Danganronpa 1 (he loves the Blueberry Perfume and hates the Kitten Hairclip)."
    }
  },
  {
    name: "/dormir",
    category: "tamagotchi",
    desc: {
      fr: "Envoie Chihiro faire une sieste réparatrice dans son lit. Le réveiller avant la fin annule le bonus d'Espoir.",
      en: "Puts Chihiro to sleep for a restorative nap in bed. Waking him up early cancels the Hope bonus."
    }
  },
  {
    name: "/ecole",
    category: "tamagotchi",
    desc: {
      fr: "Le Mode École de Danganronpa 1 : envoie tes camarades 2 h dans 10 salles récolter de vrais matériaux, ou 1 h faire le ménage. Sous 25 % de propreté, Monokuma confisque la moitié des récoltes. Fabrique pièces, outils et en-cas à l'atelier, construis les 10 Monokuma de secours pour gagner Monocoins et tickets de voyage, puis emmène tes camarades en voyage pour remplir leurs bulletins.",
      en: "Danganronpa 1's School Mode: send classmates to 10 rooms for 2 hours to gather real materials, or to clean for 1 hour. Below 25% cleanliness, Monokuma confiscates half of every haul. Craft parts, tools and snacks in the workshop, build the 10 Monokuma backups for Monocoins and Trip Tickets, then take classmates on trips to fill their report cards."
    }
  },
  {
    name: "/profil afficher",
    category: "tamagotchi",
    desc: {
      fr: "Ouvre ton dossier d'élève en images : carte d'étudiant, écran de statistiques, bilan des mini-jeux, mur des 41 succès et collection de poissons par rareté. Modifie ta bannière, ta couleur et ton titre depuis le dossier.",
      en: "Opens your illustrated student file: ID card, stats screen, mini-game records, wall of 41 achievements and fish collection by rarity. Change your banner, colour and title from it."
    }
  },
  {
    name: "/jeu debat",
    category: "games",
    desc: {
      fr: "Engage un Débat Non-Stop contre Monokuma et tire sur la contradiction ! 75 situations tirées de Danganronpa 1, 2, V3, Ultra Despair Girls et Ultimate Summer Camp. Bouton Rejouer en fin de partie.",
      en: "Engage in a Non-Stop Debate against Monokuma and shoot the weak point! 75 situations from Danganronpa 1, 2, V3, Ultra Despair Girls and Ultimate Summer Camp. Play again button at the end of the game."
    }
  },
  {
    name: "/jeu refutation",
    category: "games",
    desc: {
      fr: "Défends ton argumentaire lors d'un duel de réfutation intense et tranche l'argument faux parmi 80 situations, avec le sujet affiché à l'écran. Bouton Rejouer en fin de partie.",
      en: "Defend your thesis during an intense Rebuttal Showdown and cut the false argument among 80 situations, with the topic shown on screen. Play again button at the end of the game."
    }
  },
  {
    name: "/jeu pendu",
    category: "games",
    desc: {
      fr: "Hangman's Gambit : devine le mot mystère avant que Monokuma ne frappe. Bouton Rejouer en fin de partie.",
      en: "Hangman's Gambit: guess the hidden word before Monokuma strikes. Play again button at the end of the game."
    }
  },
  {
    name: "/jeu morpion",
    category: "games",
    desc: {
      fr: "Morpion classé contre Chiaki Nanami : elle s'adapte à ton Elo (Bronze à Ultime) et retient les coups qui l'ont battue. Option adversaire pour défier un autre joueur.",
      en: "Ranked Tic-Tac-Toe against Chiaki Nanami: she adapts to your Elo (Bronze to Ultimate) and remembers the moves that beat her. Opponent option to challenge another player."
    }
  },
  {
    name: "/jeu rps",
    category: "games",
    desc: {
      fr: "Pierre-Papier-Ciseaux classique contre Monokuma. Bouton Rejouer en fin de partie.",
      en: "Classic Rock-Paper-Scissors duel against Monokuma. Play again button at the end of the game."
    }
  },
  {
    name: "/jeu quiz",
    category: "games",
    desc: {
      fr: "Réponds à un quiz Danganronpa (106 questions, 3 difficultés) pour gagner des Monocoins. Une question toutes les 30 minutes.",
      en: "Answer a Danganronpa quiz (106 questions, 3 difficulties) to earn Monocoins. One question every 30 minutes."
    }
  },
  {
    name: "/inventaire",
    category: "economy",
    desc: {
      fr: "Ouvre ton sac à dos illustré : une grille d'objets avec images, quantités et rareté, le détail de chaque objet, et un onglet Poissons.",
      en: "Opens your illustrated backpack: a grid of items with pictures, quantities and rarity, each item's details, and a Fish tab."
    }
  },
  {
    name: "/item boutique",
    category: "economy",
    desc: {
      fr: "Boutique illustrée : cartes d'objets avec prix et rareté, catégories Nourriture, Objets et Thèmes, et un tampon sur ce que tu viens d'acheter.",
      en: "Illustrated shop: item cards with prices and rarity, Food, Items and Themes categories, and a stamp on what you just bought."
    }
  },
  {
    name: "/peche lancer",
    category: "fishing",
    desc: {
      fr: "Lance ta ligne dans le lac de Kibougamine pour pêcher parmi 50 espèces (65 % commun, 25 % rare, 9 % épique, 1 % légendaire), avec 1 chance sur 500 d'un poisson chromatique. Aussi dans l'onglet mini-jeux de /chihiro, avec un bouton Relancer.",
      en: "Cast your fishing rod into the Lake of Hope to catch one of 50 species (65% common, 25% rare, 9% epic, 1% legendary), with a 1 in 500 chance of a chromatic fish. Also in the mini-games tab of /chihiro, with a Cast again button."
    }
  },
  {
    name: "/peche echange",
    category: "fishing",
    desc: {
      fr: "Ouvre une fenêtre d'échange en direct à deux colonnes avec un joueur : chacun ajoute jusqu'à 6 poissons et des Monocoins de son côté, tout se met à jour en temps réel, et l'échange se fait seulement quand les deux appuient sur Prêt.",
      en: "Opens a live two-column trade window with another player: each adds up to 6 fish and some Monocoins on their side, everything updates in real time, and the trade only happens when both press Ready."
    }
  },
  {
    name: "/peche bestiaire",
    category: "fishing",
    desc: {
      fr: "Ta collection de poissons, une page par rareté comme dans ton profil, avec un menu pour ouvrir la fiche record de chaque espèce attrapée.",
      en: "Your fish collection, one page per rarity like on your profile, with a menu to open the record card of every species you caught."
    }
  },
  {
    name: "/quetes",
    category: "progression",
    desc: {
      fr: "Tes 3 quêtes du jour (1 changement gratuit), ton niveau, l'objectif commun de la semaine, le bonus ×2 XP du week-end et l'heure de la Happy Hour du jour.",
      en: "Your 3 daily quests (1 free reroll), your level, the weekly community goal, the weekend ×2 XP bonus and today's Happy Hour."
    }
  },
  {
    name: "/capsule",
    category: "progression",
    desc: {
      fr: "Lance la Machine MonoMono (100 Monocoins ou un jeton). Les chances sont affichées et des garanties épique / légendaire existent.",
      en: "Spin the MonoMono Machine (100 Monocoins or a token). Odds are displayed, with epic and legendary guarantees."
    }
  },
  {
    name: "/roue",
    category: "progression",
    desc: {
      fr: "Tourne gratuitement la roue de Monokuma une fois par jour. Ses cases changent chaque jour : jackpot de 500 Monocoins, mais aussi pertes de Monocoins, d'Espoir ou de Faim. Les vraies chances sont affichées à côté de la roue, sur la même image.",
      en: "Spin Monokuma's wheel for free once a day. Its slots change daily: a 500 Monocoins jackpot, but also Monocoins, Hope or Hunger losses. The real odds are shown next to the wheel, in the same picture."
    }
  },
  {
    name: "/code",
    category: "progression",
    desc: {
      fr: "Utilise un code cadeau partagé lors des événements du serveur support.",
      en: "Redeem a gift code shared during support server events."
    }
  },
  {
    name: "/titre",
    category: "progression",
    desc: {
      fr: "Vitrine de tous les titres (débloqués ou à débloquer, avec la condition) et choix du titre affiché sur ta carte de profil.",
      en: "Showcase of every title (unlocked or not, with how to get it) and choice of the title shown on your profile card."
    }
  },
  {
    name: "/prestige",
    category: "progression",
    desc: {
      fr: "Au niveau 50, remets ton niveau à 1 contre un bonus d'XP permanent (+10 % par prestige, jusqu'à +30 %).",
      en: "At level 50, reset your level to 1 for a permanent XP bonus (+10% per prestige, up to +30%)."
    }
  },
  {
    name: "/quotidien",
    category: "economy",
    desc: {
      fr: "Récompense quotidienne avec calendrier de 7 jours, bonus et gels de série. Les séries de 7, 30 et 100 jours débloquent des titres.",
      en: "Daily reward with a 7-day calendar, streak bonuses and streak freezes. Streaks of 7, 30 and 100 days unlock titles."
    }
  },
  {
    name: "/classement",
    category: "progression",
    desc: {
      fr: "Écran de classement avec podium, avatars et titres, ta position même hors du top 10, plusieurs pages et un menu pour changer de classement (25 classements : XP de la semaine récompensée chaque lundi, niveau, Monocoins, pêche, mini-jeux, duels, succès, cacas nettoyés, Monokuma de secours, bulletins, Monokuma cachés...).",
      en: "Ranking screen with a podium, avatars and titles, your own position even outside the top 10, pages and a menu to switch rankings (25 rankings: weekly XP rewarded every Monday, level, Monocoins, fishing, mini-games, duels, achievements, poop cleaned, Monokuma backups, report cards, hidden Monokumas...)."
    }
  },
  {
    name: "/duel",
    category: "fishing",
    desc: {
      fr: "Défie un ami en duel de pêche : le plus beau poisson remporte les Monocoins misés, résultat affiché sur une carte face à face. Un duel utilise le temps de recharge de la pêche des deux joueurs.",
      en: "Challenge a friend to a fishing duel: the best fish wins the Monocoins at stake, shown on a face-off result card. A duel uses both players' fishing cooldown."
    }
  },
  {
    name: "/mail liste",
    category: "mail",
    desc: {
      fr: "Consulte ta boîte de réception (visible par toi seul), récupère tes cadeaux et gère tes messages.",
      en: "Opens your private inbox (only you can see it) to read messages and claim attachments."
    }
  },
  {
    name: "/mail ecrire",
    category: "mail",
    desc: {
      fr: "Envoie une lettre, des Monocoins ou un objet à un autre élève de l'Académie.",
      en: "Send a letter, Monocoins, or an item to another student."
    }
  }
];

// Content for Legal Documents (TOS / Privacy / README)
const legalDocs = {
  tos: {
    fr: `
      <h1>Conditions d'Utilisation · Chihiro [AI]</h1>
      <p><em>Dernière mise à jour : 13 novembre 2026 (Version 2.8.0)</em></p>

      <h2>1. Acceptation des Conditions</h2>
      <p>En invitant ou en interagissant avec le bot Discord <strong>"Chihiro [AI]"</strong>, vous reconnaissez avoir lu, compris et accepté l'intégralité de ces Conditions d'Utilisation, ainsi que la Politique de Confidentialité associée. Vous acceptez également de respecter les Conditions d'Utilisation officielles de Discord.</p>
      <p>Si vous n'êtes pas d'accord avec l'une de ces conditions, veuillez cesser d'utiliser le bot et le retirer de votre serveur.</p>

      <h2>2. Licence d'Utilisation & Règles du Jeu</h2>
      <p>Chihiro [AI] est un projet de fan non officiel fourni "tel quel", à des fins de divertissement et d'apprentissage.</p>
      <ul>
        <li><strong>Usage Autorisé :</strong> L'utilisation du bot se limite à ses fonctionnalités de jeu prévues (Tamagotchi, mini-jeux, inventaire, courrier, etc.).</li>
        <li><strong>Usage Interdit :</strong> Il est strictement interdit d'exploiter des bugs, d'automatiser des requêtes (macro / auto-clicker) pour nuire au service ou fausser les classements, ou d'utiliser le bot à des fins malveillantes ou commerciales.</li>
        <li><strong>Commandes Restreintes :</strong> Les commandes de développement (<code>/dev</code>) et d'administration (<code>/reset</code>) sont strictement réservées à l'équipe de développement.</li>
      </ul>

      <h2>3. Disponibilité et Arrêt du Service</h2>
      <ul>
        <li><strong>Disponibilité :</strong> Le bot est hébergé sur une infrastructure privée. Aucune garantie de disponibilité 24/7 ininterrompue n'est offerte. Des interruptions pour maintenance ou pannes techniques peuvent survenir.</li>
        <li><strong>Droit de Résiliation :</strong> Nous nous réservons le droit de suspendre ou de révoquer l'accès au bot à tout utilisateur ou serveur qui violerait ces conditions, sans préavis.</li>
        <li><strong>Arrêt du Projet :</strong> Le développeur se réserve le droit de cesser le développement, la maintenance ou l'hébergement du bot Chihiro [AI] à tout moment, de manière permanente et sans préavis.</li>
      </ul>

      <h2>4. Intelligence Artificielle</h2>
      <ul>
        <li><strong>Réponses générées :</strong> Les réponses de Chihiro en discussion (<code>/discuter</code>, mention ou réponse à ses messages) sont générées automatiquement par des services d'IA tiers. Elles peuvent être inexactes, incomplètes ou inappropriées.</li>
        <li><strong>Responsabilité :</strong> Ces réponses ne reflètent pas l'avis du développeur, qui ne peut être tenu responsable de leur contenu ni de l'usage qui en est fait.</li>
        <li><strong>Filtres :</strong> Les contenus sexuels et les insultes sont filtrés, sans garantie d'efficacité totale. Tenter de contourner ces protections est interdit et peut entraîner une exclusion du bot.</li>
      </ul>

      <h2>5. Contact & Support</h2>
      <p>Pour toute question ou préoccupation relative à ces conditions ou au bot, veuillez contacter le développeur :</p>
      <p><strong>Discord :</strong> @xkitsoune (ID: <code>437953038666170388</code>)<br>
      <strong>Serveur de Support :</strong> <a href="https://discord.gg/UzPgkAeshc" target="_blank" rel="noopener">Rejoindre le serveur</a></p>
    `,
    en: `
      <h1>Terms of Service · Chihiro [AI]</h1>
      <p><em>Last Updated: November 13, 2026 (Version 2.8.0)</em></p>

      <h2>1. Acceptance of Terms</h2>
      <p>By inviting or interacting with the Discord bot <strong>"Chihiro [AI]"</strong>, you acknowledge that you have read, understood, and agree to be bound by these entire Terms of Service, as well as the associated Privacy Policy. You also agree to comply with Discord's official Terms of Service.</p>
      <p>If you do not agree with any of these terms, please cease using the bot and remove it from your server.</p>

      <h2>2. User License & Fair Play</h2>
      <p>Chihiro [AI] is an unofficial fan project provided "as is" for entertainment and educational purposes.</p>
      <ul>
        <li><strong>Permitted Use:</strong> Use of the bot is limited to its intended features (Tamagotchi, mini-games, inventory, mail, etc.).</li>
        <li><strong>Prohibited Use:</strong> Exploiting bugs, macro automation, spamming commands to disrupt service or manipulate leaderboards, or using the bot for commercial or malicious purposes is strictly forbidden.</li>
        <li><strong>Restricted Commands:</strong> Development (<code>/dev</code>) and administrative (<code>/reset</code>) commands are strictly reserved for the bot developer.</li>
      </ul>

      <h2>3. Availability & Service Termination</h2>
      <ul>
        <li><strong>Availability:</strong> The bot is hosted on private infrastructure. No guarantee of 24/7 uptime is provided. Outages and maintenance may occur.</li>
        <li><strong>Termination Right:</strong> We reserve the right to suspend or revoke access to the bot for any user or guild violating these terms without prior notice.</li>
        <li><strong>Discontinuation:</strong> The developer reserves the right to cease development, maintenance, or hosting of the bot at any time, permanently and without notice.</li>
      </ul>

      <h2>4. Artificial Intelligence</h2>
      <ul>
        <li><strong>Generated replies:</strong> Chihiro's chat replies (<code>/chat</code>, mentions or replies to his messages) are generated automatically by third-party AI services. They may be inaccurate, incomplete or inappropriate.</li>
        <li><strong>Liability:</strong> These replies do not reflect the developer's views, and the developer cannot be held responsible for their content or for how they are used.</li>
        <li><strong>Filters:</strong> Sexual content and insults are filtered, with no guarantee of complete effectiveness. Trying to bypass these protections is forbidden and may lead to being banned from the bot.</li>
      </ul>

      <h2>5. Contact & Support</h2>
      <p>For any questions or support requests, please contact the developer:</p>
      <p><strong>Discord:</strong> @xkitsoune (ID: <code>437953038666170388</code>)<br>
      <strong>Support Server:</strong> <a href="https://discord.gg/UzPgkAeshc" target="_blank" rel="noopener">Join our server</a></p>
    `
  },
  privacy: {
    fr: `
      <h1>Politique de Confidentialité · Chihiro [AI]</h1>
      <p><em>Dernière mise à jour : 15 novembre 2026 (Version 2.16.0)</em></p>

      <h2>1. Données Collectées</h2>
      <p>Chihiro [AI] est un jeu persistant. Pour fonctionner, il sauvegarde uniquement les informations nécessaires au gameplay associées à votre compte Discord :</p>
      <ul>
        <li><strong>Identifiant Discord :</strong> Votre identifiant numérique Discord (User ID) est utilisé comme clé unique pour lier vos sauvegardes de jeu.</li>
        <li><strong>État du Tamagotchi :</strong> Vos jauges d'Espoir, de Faim et de Désespoir, la propreté de la chambre (nombre de cacas et compteur de pas), votre solde de Monocoins, le statut d'activité (éveillé / endormi) et votre inventaire.</li>
        <li><strong>Mode École :</strong> L'énergie et les tâches de vos camarades, les matériaux, outils et objets fabriqués, la propreté de l'école, les Monokuma de secours construits, les tickets de voyage et les cœurs des bulletins.</li>
        <li><strong>Statistiques de Progression :</strong> Vos scores de mini-jeux (parties jouées / victoires), succès débloqués, poissons pêchés, niveau, XP, titres, quêtes, capsules, duels, temps de recharge et scores hebdomadaires.</li>
        <li><strong>Discussion avec l'IA :</strong> Le texte de vos messages à Chihiro, votre pseudo et un court historique de la conversation (gardé en mémoire quelques heures au maximum).</li>
        <li><strong>Données de Courrier :</strong> Les messages reçus ou envoyés via le système <code>/mail</code>, ainsi que les pièces jointes (objets / Monocoins). Les notes de mise à jour du bot sont aussi déposées dans la boîte <code>/mail</code> de chaque joueur (jamais en message privé Discord).</li>
        <li><strong>Logs Techniques :</strong> Des journaux d'erreurs temporaires peuvent être conservés sur le serveur pour résoudre les pannes éventuelles.</li>
      </ul>

      <h2>2. Stockage & Sécurité</h2>
      <p>Toutes les données sont stockées de manière sécurisée dans une base de données locale (SQLite) hébergée sur un serveur dédié privé sous Linux. L'accès aux données est strictement réservé au développeur du bot.</p>

      <h2>3. Partage des Données</h2>
      <p><strong>Aucune donnée n'est vendue ni louée.</strong> Les données du jeu restent au sein de l'application Chihiro.</p>
      <p><strong>Seule exception, la discussion avec l'IA :</strong> quand vous parlez à Chihiro, votre message (les mentions y sont remplacées par les pseudos des personnes, rôles et salons cités), votre pseudo et un court historique sont envoyés à un fournisseur d'IA tiers (Groq, Google Gemini, OpenRouter ou Pollinations) pour générer la réponse. Ces échanges sont aussi enregistrés dans un salon privé du développeur pour la modération et le débogage. N'envoyez aucune information personnelle à l'IA.</p>

      <h2>4. Vos Droits & Suppression des Données</h2>
      <ul>
        <li><strong>Gestion des Mails :</strong> Vous pouvez supprimer individuellement vos courriers directement depuis l'interface <code>/mail liste</code> grâce au bouton <em>Supprimer</em>.</li>
        <li><strong>Suppression Complète :</strong> Conformément au RGPD et aux règles de confidentialité de Discord, vous pouvez demander à tout moment la purge totale et définitive de toutes vos données en contactant le développeur sur Discord.</li>
      </ul>

      <h2>5. Contact</h2>
      <p>Pour exercer vos droits ou pour toute question concernant vos données :<br>
      <strong>Contact :</strong> @xkitsoune (ID: <code>437953038666170388</code>)<br>
      <strong>Serveur :</strong> <a href="https://discord.gg/UzPgkAeshc" target="_blank" rel="noopener">discord.gg/UzPgkAeshc</a></p>
    `,
    en: `
      <h1>Privacy Policy · Chihiro [AI]</h1>
      <p><em>Last Updated: November 15, 2026 (Version 2.16.0)</em></p>

      <h2>1. Collected Data</h2>
      <p>Chihiro [AI] is a persistent bot. To function, it only stores the data strictly necessary for game progression linked to your Discord account:</p>
      <ul>
        <li><strong>Discord User ID:</strong> Your numerical Discord ID is used as a unique primary key to bind your game saves.</li>
        <li><strong>Tamagotchi State:</strong> Your Hope, Hunger & Despair gauges, room cleanliness (poop count and step counter), Monocoins balance, activity status (awake / asleep), and inventory items.</li>
        <li><strong>School Mode:</strong> Your classmates' energy and tasks, gathered materials, tools and crafted items, the school's cleanliness, the Monokuma backups you built, Trip Tickets and report card hearts.</li>
        <li><strong>Progression Statistics:</strong> Mini-game records (games played / won), unlocked achievements, fishing bestiary entries, level, XP, titles, quests, capsules, duels, cooldowns and weekly scores.</li>
        <li><strong>AI Chat:</strong> The text of your messages to Chihiro, your display name and a short conversation history (kept in memory for a few hours at most).</li>
        <li><strong>Mailbox Data:</strong> Messages received or sent through the <code>/mail</code> system, including attached gifts and Monocoins. The bot's update notes are also placed in every player's <code>/mail</code> box (never sent as Discord direct messages).</li>
        <li><strong>System Logs:</strong> Temporary error logs for debugging purposes to diagnose bot issues.</li>
      </ul>

      <h2>2. Storage & Security</h2>
      <p>All data is securely stored inside a local SQLite database hosted on a private dedicated Linux server. Access is strictly restricted to the bot developer.</p>

      <h2>3. Third-Party Sharing</h2>
      <p><strong>We never sell or rent your data.</strong> Game data stays within the bot's private ecosystem.</p>
      <p><strong>The only exception is the AI chat:</strong> when you talk to Chihiro, your message (mentions are replaced by the names of the people, roles and channels you mention), display name and a short history are sent to a third-party AI provider (Groq, Google Gemini, OpenRouter or Pollinations) to generate the reply. These exchanges are also logged in a private developer channel for moderation and debugging. Do not send any personal information to the AI.</p>

      <h2>4. Your Rights & Data Deletion</h2>
      <ul>
        <li><strong>Mail Management:</strong> You can delete any mail at any time directly through the <code>/mail box</code> interface using the <em>Delete</em> button.</li>
        <li><strong>Full Deletion:</strong> You may request the permanent and complete deletion of all your stored data by contacting the bot developer on Discord.</li>
      </ul>

      <h2>5. Contact</h2>
      <p>For any privacy inquiries or deletion requests:<br>
      <strong>Contact:</strong> @xkitsoune (ID: <code>437953038666170388</code>)<br>
      <strong>Support Server:</strong> <a href="https://discord.gg/UzPgkAeshc" target="_blank" rel="noopener">discord.gg/UzPgkAeshc</a></p>
    `
  },
  readme: {
    fr: `
      <h1>Documentation Officielle · Chihiro [AI] v2.6.0</h1>
      <blockquote>
        <strong>Danganronpa Fan Project :</strong> Chihiro [AI] est un bot Discord d'apprentissage et de divertissement inspiré du chef-d'œuvre de Spike Chunsoft.
      </blockquote>

      <h2>Introduction</h2>
      <p>Chihiro Fujisaki, l'Ultime Programmeur, a conçu une Intelligence Artificielle révolutionnaire nommée <em>Alter Ego</em>. Ce bot Discord vous permet de prendre soin de Chihiro, d'explorer l'Académie d'Espoir, de participer à des procès de classe palpitants et de vous mesurer à Monokuma !</p>

      <h2>Fonctionnalités Clés</h2>
      <ul>
        <li><strong>Tamagotchi Persistant :</strong> Nourrissez votre Chihiro, mettez-le au lit, nettoyez sa chambre et veillez sur ses jauges d'Espoir, de Faim et de Désespoir.</li>
        <li><strong>Dashboard e-Handbook v2 :</strong> Avec la commande racine <code>/chihiro</code>, accédez instantanément à toutes les commandes majeures sans retenir de syntaxes compliquées.</li>
        <li><strong>Mini-Jeux Danganronpa :</strong> Débats Non-Stop, duels de réfutation, pendu et morpion contre Chiaki Nanami.</li>
        <li><strong>Économie & Collection :</strong> Gagnez des Monocoins, attrapez des dizaines d'espèces de poissons au Lac de l'Espoir (dont de rares poissons chromatiques) et tentez votre chance à la Machine MonoMono.</li>
        <li><strong>Mode École :</strong> Envoyez vos camarades récolter des matériaux dans 10 salles du Pic de l'Espoir, gardez l'école propre, fabriquez outils et pièces et construisez les 10 Monokuma de secours du School Mode.</li>
        <li><strong>Progression :</strong> Niveaux, XP, titres, prestige, quêtes quotidiennes, objectif commun hebdomadaire, classement de la semaine, Happy Hour quotidienne, roue de Monokuma, codes cadeaux et week-ends ×2 XP.</li>
        <li><strong>Discussion IA :</strong> Parlez avec Chihiro dans votre langue. Les réponses sont générées par une IA tierce et filtrées contre les contenus sexuels et les insultes.</li>
        <li><strong>Boîte Mail Components V2 :</strong> Une messagerie Discord ultra soignée avec des conteneurs interactifs pour envoyer des lettres et des cadeaux.</li>
      </ul>

      <h2>Avertissement Légal</h2>
      <p>Ce bot est un projet de fan non officiel créé à des fins de divertissement uniquement. Il n'est en aucun cas affilié à <strong>Spike Chunsoft Co., Ltd.</strong> Tous les droits, noms de personnages et visuels appartiennent à leurs ayants droit respectifs.</p>
    `,
    en: `
      <h1>Official Documentation · Chihiro [AI] v2.6.0</h1>
      <blockquote>
        <strong>Danganronpa Fan Project:</strong> Chihiro [AI] is an entertainment Discord bot inspired by Spike Chunsoft's acclaimed franchise.
      </blockquote>

      <h2>Introduction</h2>
      <p>Chihiro Fujisaki, the Ultimate Programmer, created the revolutionary artificial intelligence named <em>Alter Ego</em>. This Discord bot allows you to care for Chihiro, explore Hope's Peak Academy, take part in thrilling Class Trials, and face Monokuma!</p>

      <h2>Key Features</h2>
      <ul>
        <li><strong>Persistent Tamagotchi:</strong> Feed your Chihiro, put him to bed, clean his room, and nurture his Hope, Hunger & Despair gauges.</li>
        <li><strong>e-Handbook Dashboard v2:</strong> Use <code>/chihiro</code> to open a streamlined, interactive control panel with 8 fast shortcuts.</li>
        <li><strong>Danganronpa Mini-Games:</strong> Non-Stop Debates, Rebuttal Showdowns, Hangman's Gambit, and Tic-Tac-Toe against Chiaki Nanami.</li>
        <li><strong>Economy & Collecting:</strong> Earn Monocoins, fish unique species in the Lake of Hope (including rare chromatic fish) and try your luck at the MonoMono Machine.</li>
        <li><strong>School Mode:</strong> Send classmates to gather materials in 10 Hope's Peak rooms, keep the school clean, craft tools and parts, and build the 10 Monokuma backups from School Mode.</li>
        <li><strong>Progression:</strong> Levels, XP, titles, prestige, daily quests, a weekly community goal, a weekly leaderboard, a daily Happy Hour, Monokuma's wheel, gift codes and ×2 XP weekends.</li>
        <li><strong>AI Chat:</strong> Talk with Chihiro in your language. Replies are generated by a third-party AI and filtered against sexual content and insults.</li>
        <li><strong>Components V2 Mailbox:</strong> A clean, modern messaging interface designed with Discord's latest Components V2 containers.</li>
      </ul>

      <h2>Legal Disclaimer</h2>
      <p>This bot is an unofficial fan project created solely for entertainment purposes. It is not affiliated with <strong>Spike Chunsoft Co., Ltd.</strong> All rights, names, and assets belong to their respective copyright holders.</p>
    `
  }
};

// UI Elements & Handlers
function initApp() {
  renderCommands();
  renderLegalDoc();
  setupEventListeners();
}

function renderCommands() {
  const container = document.getElementById('commands-list');
  const searchVal = document.getElementById('cmd-search').value.toLowerCase().trim();

  const filtered = commandsData.filter(cmd => {
    const matchCat = (currentCategory === 'all' || cmd.category === currentCategory);
    const matchSearch = cmd.name.toLowerCase().includes(searchVal) ||
      cmd.desc[currentLang].toLowerCase().includes(searchVal);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-dim);">
        <p>🔍 ${currentLang === 'fr' ? 'Aucune commande trouvée.' : 'No commands found.'}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(cmd => `
    <div class="command-card">
      <div class="cmd-header">
        <span class="cmd-name">${cmd.name}</span>
        <span class="cmd-badge">${cmd.category}</span>
      </div>
      <p class="cmd-desc">${cmd.desc[currentLang]}</p>
    </div>
  `).join('');
}

function renderLegalDoc() {
  const docContainer = document.getElementById('doc-body');
  if (legalDocs[currentDoc] && legalDocs[currentDoc][currentLang]) {
    docContainer.innerHTML = legalDocs[currentDoc][currentLang];
  }
}

function setupEventListeners() {
  // Dual Language Buttons (FR / EN)
  const btnFr = document.getElementById('lang-fr');
  const btnEn = document.getElementById('lang-en');

  function setLanguage(lang) {
    currentLang = lang;
    if (btnFr && btnEn) {
      btnFr.classList.toggle('active', lang === 'fr');
      btnEn.classList.toggle('active', lang === 'en');
    }
    applyLanguageUI();
    renderCommands();
    renderLegalDoc();
    // Update speech bubble quote in new language
    const speechBubble = document.getElementById('speech-bubble');
    if (speechBubble) {
      speechBubble.textContent = (lang === 'fr'
        ? "Bonjour ! Je suis Chihiro Fujisaki. Tout va bien aujourd'hui ?"
        : "Hello! I am Chihiro Fujisaki. Is everything okay today?");
    }
    // Update search placeholder
    const cmdSearch = document.getElementById('cmd-search');
    if (cmdSearch) {
      cmdSearch.placeholder = (lang === 'fr' ? 'Rechercher une commande...' : 'Search for a command...');
    }
  }

  if (btnFr) btnFr.addEventListener('click', () => setLanguage('fr'));
  if (btnEn) btnEn.addEventListener('click', () => setLanguage('en'));

  // Sprite click speech bubble
  const spriteCard = document.getElementById('hero-sprite');
  const speechBubble = document.getElementById('speech-bubble');
  spriteCard.addEventListener('click', () => {
    const list = quotes[currentLang];
    const randomQuote = list[Math.floor(Math.random() * list.length)];
    speechBubble.textContent = randomQuote;
    speechBubble.style.transform = 'scale(1.05)';
    setTimeout(() => {
      speechBubble.style.transform = 'scale(1)';
    }, 200);
  });

  // Command search
  const cmdSearch = document.getElementById('cmd-search');
  cmdSearch.addEventListener('input', renderCommands);

  // Command tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-cat');
      renderCommands();
    });
  });

  // Legal Doc tabs
  const docTabBtns = document.querySelectorAll('.doc-tab-btn');
  docTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      docTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDoc = btn.getAttribute('data-doc');
      renderLegalDoc();
    });
  });
}

function applyLanguageUI() {
  // Update static localized texts across page
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18nTexts[key] && i18nTexts[key][currentLang]) {
      el.innerHTML = i18nTexts[key][currentLang];
    }
  });
}

const i18nTexts = {
  "nav_features": { fr: "Fonctionnalités", en: "Features" },
  "nav_commands": { fr: "Commandes", en: "Commands" },
  "nav_docs": { fr: "Documentation & ToS", en: "Docs & ToS" },
  "nav_support": { fr: "Support Discord", en: "Support Server" },
  "hero_tag": { fr: "ALTER EGO v2.0.0 EN LIGNE", en: "ALTER EGO v2.0.0 ONLINE" },
  "hero_title": { fr: "L'Ultime Intelligence Artificielle sur Discord", en: "The Ultimate Artificial Intelligence on Discord" },
  "hero_subtitle": { fr: "Prenez soin de Chihiro, participez aux débats de classe contre Monokuma, montez de niveau avec les quêtes et vivez l'expérience Danganronpa sur vos serveurs !", en: "Care for Chihiro, engage in Class Trials against Monokuma, level up with daily quests, and experience Danganronpa on Discord!" },
  "btn_invite": { fr: "Inviter Chihiro", en: "Invite Chihiro" },
  "btn_support": { fr: "Serveur de Support", en: "Support Server" },
  "sprite_hint": { fr: "✨ Clique sur Chihiro pour lui parler !", en: "✨ Click on Chihiro to talk!" },
  "features_tag": { fr: "CAPACITÉS DU SYSTÈME", en: "SYSTEM CAPABILITIES" },
  "features_title": { fr: "Une immersion complète dans l'Espoir", en: "Complete immersion in Hope" },
  "features_desc": { fr: "Développé pour apporter l'ambiance authentique de Kibougamine avec une interface ultra-moderne.", en: "Built to bring the authentic Hope's Peak vibe with state-of-the-art Discord components." },
  "feat1_title": { fr: "e-Handbook & Tamagotchi", en: "e-Handbook & Tamagotchi" },
  "feat1_desc": { fr: "Dashboard interactif /chihiro avec 8 raccourcis rapides, jauges d'Espoir/Faim/Désespoir, thèmes de personnages et cartes de profil V2.", en: "Interactive /chihiro dashboard with 8 shortcuts, Hope/Hunger/Despair gauges, character themes, and custom V2 profile cards." },
  "feat2_title": { fr: "Mini-Jeux & Débats de Classe", en: "Class Trials & Mini-Games" },
  "feat2_desc": { fr: "Défiez Monokuma en Débat Non-Stop, duel de réfutation, jeu du pendu ou morpion contre Chiaki Nanami.", en: "Battle Monokuma in Non-Stop Debates, Rebuttal Showdowns, Hangman's Gambit, or Tic-Tac-Toe against Chiaki Nanami." },
  "feat3_title": { fr: "Lac de l'Espoir & Capsules", en: "Lake of Hope & Capsules" },
  "feat3_desc": { fr: "Pêchez des dizaines d'espèces uniques, traquez les poissons chromatiques, défiez vos amis en duel et ouvrez des capsules MonoMono.", en: "Catch dozens of unique species, hunt chromatic fish, challenge friends to duels and open MonoMono capsules." },
  "feat4_title": { fr: "Boîte Mail Components V2", en: "Components V2 Mailbox" },
  "feat4_desc": { fr: "Système de courrier nouvelle génération inspiré de Koya avec boutons d'actions et envoi de pièces jointes sans spam.", en: "Next-gen mailbox layout styled after Koya with quick actions, attachments, and zero-spam delivery." },
  "cmd_tag": { fr: "CONSOLE DES COMMANDES", en: "COMMAND CONSOLE" },
  "cmd_title": { fr: "Toutes les commandes en un coup d'œil", en: "All commands at a glance" },
  "search_placeholder": { fr: "Rechercher une commande...", en: "Search for a command..." },
  "tab_all": { fr: "Toutes", en: "All" },
  "tab_tamagotchi": { fr: "Tamagotchi", en: "Tamagotchi" },
  "tab_games": { fr: "Mini-Jeux", en: "Mini-Games" },
  "tab_economy": { fr: "Économie", en: "Economy" },
  "tab_fishing": { fr: "Pêche", en: "Fishing" },
  "tab_progression": { fr: "Progression", en: "Progression" },
  "tab_mail": { fr: "Courrier", en: "Mail" },
  "doc_tag": { fr: "DOCUMENTS LÉGAUX", en: "LEGAL DOCUMENTS" },
  "doc_title": { fr: "Transparence & Documentation", en: "Transparency & Documentation" },
  "tab_tos": { fr: "Conditions d'Utilisation", en: "Terms of Service" },
  "tab_privacy": { fr: "Politique de Confidentialité", en: "Privacy Policy" },
  "tab_readme": { fr: "Documentation", en: "Documentation" },
  "stat_langs": { fr: "Langues", en: "Languages" },
  "stat_hope": { fr: "Espoir", en: "Hope" },
  "footer_desc": { fr: "L'Ultime Programmeur et Alter Ego au service de vos serveurs Discord.", en: "The Ultimate Programmer and Alter Ego at the service of your Discord guilds." },
  "footer_nav": { fr: "Navigation", en: "Navigation" },
  "footer_community": { fr: "Communauté", en: "Community" },
  "footer_dev": { fr: "Développeur", en: "Developer" },
  "footer_copy": { fr: "© 2026 Chihiro [AI] · Développé avec Espoir par KITS Progress Inc.", en: "© 2026 Chihiro [AI] — Developed with Hope by KITS Progress Inc." },
  "footer_host": { fr: "Hébergé fièrement sur GitHub Pages.", en: "Proudly hosted on GitHub Pages." },
  "disclaimer": {
    fr: "⚠️ <strong>Avertissement Fan Project :</strong> Chihiro [AI] est un projet de fan à but non lucratif créé à des fins d'apprentissage et de divertissement. Il n'est en aucun cas affilié à <strong>Spike Chunsoft Co., Ltd.</strong> Tous les noms, personnages, sprites et univers appartiennent exclusivement à leurs ayants droit respectifs.",
    en: "⚠️ <strong>Fan Project Disclaimer:</strong> Chihiro [AI] is an unofficial non-profit fan project created for learning and entertainment purposes. It is in no way affiliated with <strong>Spike Chunsoft Co., Ltd.</strong> All names, characters, sprites, and assets belong exclusively to their respective rights holders."
  },
};

document.addEventListener('DOMContentLoaded', initApp);
