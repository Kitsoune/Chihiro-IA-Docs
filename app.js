/* ==========================================================================
   CHIHIRO [IA] — Interactive Logic & Documentation Engine
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
    name: "/chihiro",
    category: "tamagotchi",
    desc: {
      fr: "Ouvre l'e-Handbook interactif avec les 8 raccourcis rapides (profil, jeux, boutique, etc.).",
      en: "Opens the interactive e-Handbook dashboard with 8 quick shortcuts."
    }
  },
  {
    name: "/nourrir",
    category: "tamagotchi",
    desc: {
      fr: "Nourrit Chihiro avec un aliment de ton inventaire pour remonter sa jauge de faim.",
      en: "Feeds Chihiro with an item from your inventory to restore hunger."
    }
  },
  {
    name: "/dormir",
    category: "tamagotchi",
    desc: {
      fr: "Envoie Chihiro faire une sieste réparatrice dans son lit.",
      en: "Puts Chihiro to sleep for a restorative nap in bed."
    }
  },
  {
    name: "/profil afficher",
    category: "tamagotchi",
    desc: {
      fr: "Génère ta carte d'étudiant e-Handbook personnalisée avec ton niveau, stats et succès.",
      en: "Generates your custom e-Handbook student ID card with level, stats, and badges."
    }
  },
  {
    name: "/jeu debat",
    category: "games",
    desc: {
      fr: "Engage un Débat Non-Stop contre Monokuma et tire sur la contradiction !",
      en: "Engage in a Non-Stop Debate against Monokuma and shoot the weak point!"
    }
  },
  {
    name: "/jeu refutation",
    category: "games",
    desc: {
      fr: "Défends ton argumentaire lors d'un duel de réfutation intense.",
      en: "Defend your thesis during an intense Rebuttal Showdown."
    }
  },
  {
    name: "/jeu pendu",
    category: "games",
    desc: {
      fr: "Hangman's Gambit : devine le mot mystère avant que Monokuma ne frappe.",
      en: "Hangman's Gambit: guess the hidden word before Monokuma strikes."
    }
  },
  {
    name: "/jeu morpion",
    category: "games",
    desc: {
      fr: "Partie amicale de morpion contre Chiaki Nanami.",
      en: "Friendly game of Tic-Tac-Toe against Chiaki Nanami."
    }
  },
  {
    name: "/jeu rps",
    category: "games",
    desc: {
      fr: "Pierre-Papier-Ciseaux classique contre Monokuma.",
      en: "Classic Rock-Paper-Scissors duel against Monokuma."
    }
  },
  {
    name: "/inventaire",
    category: "economy",
    desc: {
      fr: "Ouvre l'inventaire centralisé avec ses 3 onglets : Sac, Poissons et Fichiers.",
      en: "Opens the centralized inventory with 3 tabs: Backpack, Fish, and Files."
    }
  },
  {
    name: "/item boutique",
    category: "economy",
    desc: {
      fr: "Achète des objets, de la nourriture ou des thèmes visuels avec tes Monocoins.",
      en: "Purchase items, food, or visual themes with your Monocoins."
    }
  },
  {
    name: "/peche lancer",
    category: "fishing",
    desc: {
      fr: "Lance ta ligne dans le lac de Kibougamine pour pêcher des espèces uniques.",
      en: "Cast your fishing rod into the Lake of Hope to catch rare species."
    }
  },
  {
    name: "/peche bestiaire",
    category: "fishing",
    desc: {
      fr: "Consulte le guide encyclopédique de tous les poissons répertoriés.",
      en: "View your fishing encyclopedia and discovery progress."
    }
  },
  {
    name: "/reseau scanner",
    category: "fishing",
    desc: {
      fr: "Scanne le réseau de l'Académie pour intercepter et décrypter des paquets classifiés.",
      en: "Scans the Academy's network to intercept and decrypt classified files."
    }
  },
  {
    name: "/mail liste",
    category: "mail",
    desc: {
      fr: "Consulte ta boîte de réception Components V2, récupère tes cadeaux et gère tes messages.",
      en: "Opens your Components V2 inbox to read messages and claim attachments."
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
      <h1>Conditions d'Utilisation — Chihiro [IA]</h1>
      <p><em>Dernière mise à jour : 28 août 2026 (Version 2.0.0)</em></p>

      <h2>1. Acceptation des Conditions</h2>
      <p>En invitant ou en interagissant avec le bot Discord <strong>"Chihiro [IA]"</strong>, vous reconnaissez avoir lu, compris et accepté l'intégralité de ces Conditions d'Utilisation, ainsi que la Politique de Confidentialité associée. Vous acceptez également de respecter les Conditions d'Utilisation officielles de Discord.</p>
      <p>Si vous n'êtes pas d'accord avec l'une de ces conditions, veuillez cesser d'utiliser le bot et le retirer de votre serveur.</p>

      <h2>2. Licence d'Utilisation & Règles du Jeu</h2>
      <p>Chihiro [IA] est un projet de fan non officiel fourni "tel quel", à des fins de divertissement et d'apprentissage.</p>
      <ul>
        <li><strong>Usage Autorisé :</strong> L'utilisation du bot se limite à ses fonctionnalités de jeu prévues (Tamagotchi, mini-jeux, inventaire, courrier, etc.).</li>
        <li><strong>Usage Interdit :</strong> Il est strictement interdit d'exploiter des bugs, d'automatiser des requêtes (macro / auto-clicker) pour nuire au service ou fausser les classements, ou d'utiliser le bot à des fins malveillantes ou commerciales.</li>
        <li><strong>Commandes Restreintes :</strong> Les commandes de développement (<code>/dev</code>) et d'administration (<code>/reset</code>) sont strictement réservées à l'équipe de développement.</li>
      </ul>

      <h2>3. Disponibilité et Arrêt du Service</h2>
      <ul>
        <li><strong>Disponibilité :</strong> Le bot est hébergé sur une infrastructure privée. Aucune garantie de disponibilité 24/7 ininterrompue n'est offerte. Des interruptions pour maintenance ou pannes techniques peuvent survenir.</li>
        <li><strong>Droit de Résiliation :</strong> Nous nous réservons le droit de suspendre ou de révoquer l'accès au bot à tout utilisateur ou serveur qui violerait ces conditions, sans préavis.</li>
        <li><strong>Arrêt du Projet :</strong> Le développeur se réserve le droit de cesser le développement, la maintenance ou l'hébergement du bot Chihiro [IA] à tout moment, de manière permanente et sans préavis.</li>
      </ul>

      <h2>4. Contact & Support</h2>
      <p>Pour toute question ou préoccupation relative à ces conditions ou au bot, veuillez contacter le développeur :</p>
      <p><strong>Discord :</strong> @xkitsoune (ID: <code>437953038666170388</code>)<br>
      <strong>Serveur de Support :</strong> <a href="https://discord.gg/UzPgkAeshc" target="_blank" rel="noopener">Rejoindre le serveur</a></p>
    `,
    en: `
      <h1>Terms of Service — Chihiro [AI]</h1>
      <p><em>Last Updated: August 28, 2026 (Version 2.0.0)</em></p>

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

      <h2>4. Contact & Support</h2>
      <p>For any questions or support requests, please contact the developer:</p>
      <p><strong>Discord:</strong> @xkitsoune (ID: <code>437953038666170388</code>)<br>
      <strong>Support Server:</strong> <a href="https://discord.gg/UzPgkAeshc" target="_blank" rel="noopener">Join our server</a></p>
    `
  },
  privacy: {
    fr: `
      <h1>Politique de Confidentialité — Chihiro [IA]</h1>
      <p><em>Dernière mise à jour : 28 août 2026 (Version 2.0.0)</em></p>

      <h2>1. Données Collectées</h2>
      <p>Chihiro [IA] est un jeu persistant. Pour fonctionner, il sauvegarde uniquement les informations nécessaires au gameplay associées à votre compte Discord :</p>
      <ul>
        <li><strong>Identifiant Discord :</strong> Votre identifiant numérique Discord (User ID) est utilisé comme clé unique pour lier vos sauvegardes de jeu.</li>
        <li><strong>État du Tamagotchi :</strong> Vos jauges d'Espoir et de Faim, votre solde de Monocoins, le statut d'activité (éveillé / endormi) et votre inventaire.</li>
        <li><strong>Statistiques de Progression :</strong> Vos scores de mini-jeux (parties jouées / victoires), succès débloqués, poissons pêchés et fichiers réseau décryptés.</li>
        <li><strong>Données de Courrier :</strong> Les messages reçus ou envoyés via le système <code>/mail</code>, ainsi que les pièces jointes (objets / Monocoins).</li>
        <li><strong>Logs Techniques :</strong> Des journaux d'erreurs temporaires peuvent être conservés sur le serveur pour résoudre les pannes éventuelles.</li>
      </ul>

      <h2>2. Stockage & Sécurité</h2>
      <p>Toutes les données sont stockées de manière sécurisée dans une base de données locale (SQLite) hébergée sur un serveur dédié privé sous Linux. L'accès aux données est strictement réservé au développeur du bot.</p>

      <h2>3. Partage des Données</h2>
      <p><strong>Aucune donnée n'est vendue, louée ou partagée avec des tiers.</strong> Vos données restent à 100% confidentielles au sein de l'application Chihiro.</p>

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
      <h1>Privacy Policy — Chihiro [AI]</h1>
      <p><em>Last Updated: August 28, 2026 (Version 2.0.0)</em></p>

      <h2>1. Collected Data</h2>
      <p>Chihiro [AI] is a persistent bot. To function, it only stores the data strictly necessary for game progression linked to your Discord account:</p>
      <ul>
        <li><strong>Discord User ID:</strong> Your numerical Discord ID is used as a unique primary key to bind your game saves.</li>
        <li><strong>Tamagotchi State:</strong> Your Hope & Hunger gauges, Monocoins balance, activity status (awake / asleep), and inventory items.</li>
        <li><strong>Progression Statistics:</strong> Mini-game records (games played / won), unlocked achievements, fishing bestiary entries, and network files.</li>
        <li><strong>Mailbox Data:</strong> Messages received or sent through the <code>/mail</code> system, including attached gifts and Monocoins.</li>
        <li><strong>System Logs:</strong> Temporary error logs for debugging purposes to diagnose bot issues.</li>
      </ul>

      <h2>2. Storage & Security</h2>
      <p>All data is securely stored inside a local SQLite database hosted on a private dedicated Linux server. Access is strictly restricted to the bot developer.</p>

      <h2>3. Third-Party Sharing</h2>
      <p><strong>None.</strong> We do not sell, rent, or share any user data with third parties. Your data remains strictly within the bot's private ecosystem.</p>

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
      <h1>Documentation Officielle — Chihiro [IA] v2.0.0</h1>
      <blockquote>
        <strong>Danganronpa Fan Project :</strong> Chihiro [IA] est un bot Discord d'apprentissage et de divertissement inspiré du chef-d'œuvre de Spike Chunsoft.
      </blockquote>

      <h2>Introduction</h2>
      <p>Chihiro Fujisaki, l'Ultime Programmeur, a conçu une Intelligence Artificielle révolutionnaire nommée <em>Alter Ego</em>. Ce bot Discord vous permet de prendre soin de Chihiro, d'explorer l'Académie d'Espoir, de participer à des procès de classe palpitants et de vous mesurer à Monokuma !</p>

      <h2>Fonctionnalités Clés</h2>
      <ul>
        <li><strong>Tamagotchi Persistant :</strong> Nourrissez votre Chihiro, mettez-le au lit et veillez sur ses jauges d'Espoir et de Faim.</li>
        <li><strong>Dashboard e-Handbook v2 :</strong> Avec la commande racine <code>/chihiro</code>, accédez instantanément à toutes les commandes majeures sans retenir de syntaxes compliquées.</li>
        <li><strong>Mini-Jeux Danganronpa :</strong> Débats Non-Stop, duels de réfutation, pendu et morpion contre Chiaki Nanami.</li>
        <li><strong>Économie & Collection :</strong> Gagnez des Monocoins, attrapez des dizaines d'espèces de poissons au Lac de l'Espoir, et interceptez des fichiers classifiés sur le réseau.</li>
        <li><strong>Boîte Mail Components V2 :</strong> Une messagerie Discord ultra soignée avec des conteneurs interactifs pour envoyer des lettres et des cadeaux.</li>
      </ul>

      <h2>Avertissement Légal</h2>
      <p>Ce bot est un projet de fan non officiel créé à des fins de divertissement uniquement. Il n'est en aucun cas affilié à <strong>Spike Chunsoft Co., Ltd.</strong> Tous les droits, noms de personnages et visuels appartiennent à leurs ayants droit respectifs.</p>
    `,
    en: `
      <h1>Official Documentation — Chihiro [AI] v2.0.0</h1>
      <blockquote>
        <strong>Danganronpa Fan Project:</strong> Chihiro [AI] is an entertainment Discord bot inspired by Spike Chunsoft's acclaimed franchise.
      </blockquote>

      <h2>Introduction</h2>
      <p>Chihiro Fujisaki, the Ultimate Programmer, created the revolutionary artificial intelligence named <em>Alter Ego</em>. This Discord bot allows you to care for Chihiro, explore Hope's Peak Academy, take part in thrilling Class Trials, and face Monokuma!</p>

      <h2>Key Features</h2>
      <ul>
        <li><strong>Persistent Tamagotchi:</strong> Feed your Chihiro, put him to bed, and nurture his Hope & Hunger gauges.</li>
        <li><strong>e-Handbook Dashboard v2:</strong> Use <code>/chihiro</code> to open a streamlined, interactive control panel with 8 fast shortcuts.</li>
        <li><strong>Danganronpa Mini-Games:</strong> Non-Stop Debates, Rebuttal Showdowns, Hangman's Gambit, and Tic-Tac-Toe against Chiaki Nanami.</li>
        <li><strong>Economy & Collecting:</strong> Earn Monocoins, fish unique aquatic species in the Lake of Hope, and decrypt classified network packets.</li>
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
  "hero_subtitle": { fr: "Prenez soin de Chihiro, participez aux débats de classe contre Monokuma, explorez le réseau et vivez l'expérience Danganronpa sur vos serveurs !", en: "Care for Chihiro, engage in Class Trials against Monokuma, explore the network, and experience Danganronpa on Discord!" },
  "btn_invite": { fr: "Inviter Chihiro", en: "Invite Chihiro" },
  "btn_support": { fr: "Serveur de Support", en: "Support Server" },
  "sprite_hint": { fr: "✨ Clique sur Chihiro pour lui parler !", en: "✨ Click on Chihiro to talk!" },
  "features_tag": { fr: "CAPACITÉS DU SYSTÈME", en: "SYSTEM CAPABILITIES" },
  "features_title": { fr: "Une immersion complète dans l'Espoir", en: "Complete immersion in Hope" },
  "features_desc": { fr: "Développé pour apporter l'ambiance authentique de Kibougamine avec une interface ultra-moderne.", en: "Built to bring the authentic Hope's Peak vibe with state-of-the-art Discord components." },
  "feat1_title": { fr: "e-Handbook & Tamagotchi", en: "e-Handbook & Tamagotchi" },
  "feat1_desc": { fr: "Dashboard interactif /chihiro avec 8 raccourcis rapides, jauges d'Espoir/Faim, thèmes de personnages et cartes de profil V2.", en: "Interactive /chihiro dashboard with 8 shortcuts, Hope/Hunger gauges, character themes, and custom V2 profile cards." },
  "feat2_title": { fr: "Mini-Jeux & Débats de Classe", en: "Class Trials & Mini-Games" },
  "feat2_desc": { fr: "Défiez Monokuma en Débat Non-Stop, duel de réfutation, jeu du pendu ou morpion contre Chiaki Nanami.", en: "Battle Monokuma in Non-Stop Debates, Rebuttal Showdowns, Hangman's Gambit, or Tic-Tac-Toe against Chiaki Nanami." },
  "feat3_title": { fr: "Lac de l'Espoir & Réseau", en: "Lake of Hope & Network" },
  "feat3_desc": { fr: "Pêchez des dizaines d'espèces de poissons uniques, interceptez des paquets de données et échangez des fichiers rares.", en: "Catch dozens of unique fish species, intercept encrypted data packets, and trade rare files." },
  "feat4_title": { fr: "Boîte Mail Components V2", en: "Components V2 Mailbox" },
  "feat4_desc": { fr: "Système de courrier nouvelle génération inspiré de Koya avec boutons d'actions et envoi de pièces jointes sans spam.", en: "Next-gen mailbox layout styled after Koya with quick actions, attachments, and zero-spam delivery." },
  "cmd_tag": { fr: "CONSOLE DES COMMANDES", en: "COMMAND CONSOLE" },
  "cmd_title": { fr: "Toutes les commandes en un coup d'œil", en: "All commands at a glance" },
  "search_placeholder": { fr: "Rechercher une commande...", en: "Search for a command..." },
  "tab_all": { fr: "Toutes", en: "All" },
  "tab_tamagotchi": { fr: "Tamagotchi", en: "Tamagotchi" },
  "tab_games": { fr: "Mini-Jeux", en: "Mini-Games" },
  "tab_economy": { fr: "Économie", en: "Economy" },
  "tab_fishing": { fr: "Pêche & Réseau", en: "Fishing & Network" },
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
  "footer_copy": { fr: "© 2026 Chihiro [IA] — Développé avec Espoir par KITS Progress Inc.", en: "© 2026 Chihiro [AI] — Developed with Hope by KITS Progress Inc." },
  "footer_host": { fr: "Hébergé fièrement sur GitHub Pages.", en: "Proudly hosted on GitHub Pages." },
  "disclaimer": {
    fr: "⚠️ <strong>Avertissement Fan Project :</strong> Chihiro [IA] est un projet de fan à but non lucratif créé à des fins d'apprentissage et de divertissement. Il n'est en aucun cas affilié à <strong>Spike Chunsoft Co., Ltd.</strong> Tous les noms, personnages, sprites et univers appartiennent exclusivement à leurs ayants droit respectifs.",
    en: "⚠️ <strong>Fan Project Disclaimer:</strong> Chihiro [AI] is an unofficial non-profit fan project created for learning and entertainment purposes. It is in no way affiliated with <strong>Spike Chunsoft Co., Ltd.</strong> All names, characters, sprites, and assets belong exclusively to their respective rights holders."
  },
};

document.addEventListener('DOMContentLoaded', initApp);
