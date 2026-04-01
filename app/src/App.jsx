import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Mail, Phone, MapPin, ExternalLink, GraduationCap, Wrench, ServerCog, Terminal, Shield, Cpu, Code2, Database, Globe2, Network, ChevronRight, FileDown } from "lucide-react";

// CV : dépose ton fichier dans app/public/cv.pdf (ou crée un lien symbolique)
const cvPdfUrl = `${import.meta.env.BASE_URL}cv.pdf`;

// --- Couleurs principales (modifiable facilement)
const tokens = {
  brand: {
    primary: "#7C3AED", // violet
    secondary: "#06B6D4", // cyan
    accent: "#22C55E", // vert
  },
  bg: "#0B1020",
  card: "#121734",
  text: "#E6ECFF",
  muted: "#A7B3D1",
};

// --- Profil ---
const profile = {
  name: "coucou paul",
  title: "Étudiant BTS SIO – SLAM | Technicien support (alternance 2024–2026) & futur DevOps",
  location: "Rennes, France",
  email: "djenidi.bilal.29@gmail.com",
  phone: "+33 6 51 79 38 81",
  links: [
    { label: "GitHub", href: "https://github.com/Daweshh", icon: Github },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/bilal-djenidi-146128381/",
      icon: ExternalLink,
    },
  ],
  pitch:
    "Étudiant passionné de lecture, jeux-vidéos et sport, orienté DevOps (Linux, Git, conteneurisation, automatisation). Je recherche une alternance à Rennes pour contribuer à des projets de CI/CD, d’infrastructure virtualisée et de développement logiciel.",
};

// --- Compétences ---
const skills = {
  techniques: [
    "Virtualisation (Proxmox, VMware, VirtualBox, Hyper-V)",
    "Automatisation (Bash / PowerShell / Make)",
    "Linux / Windows",
    "Docker",
    "CI/CD (GitHub Actions)",
    "Java",
    "Python",
    "SQL",
    "HTML / CSS / JS / Vue.js",
    "PHP / Symfony",
  ],
  outils: [
    "Git / GitHub",
    "ServiceNow",
    "Intune / Autopilot",
    "Power Automate",
    "VS Code / Cursor",
  ],
  soft: ["Esprit d’analyse", "Travail en équipe", "Communication", "Autonomie", "Curiosité"],
};

// --- Parcours & profil détaillé ---
const experiences = [
  {
    company: "Capgemini",
    role: "Technicien support (alternance)",
    location: "Rennes",
    period: "Septembre 2024 - Aujourd’hui",
    items: [
      "MCO du parc : préparation automatisée, Intune, Autopilot",
      "Diagnostics avancés : TPM, MBR/boot, WiFi, HDD/SSD",
      "Automatisation de processus internes (Power Automate)",
      "Gestion d’incidents & demandes (ServiceNow)",
      "Gestion d’assets (PC, imprimantes, écrans…)",
      "Documentation technique et amélioration continue",
      "Bases réseau",
      "Cybersécurité : MFA, Bitlocker, conformité/quarantaine, Zscaler, Crowdstrike",
    ],
  },
];

const education = [
  {
    title: "BTS SIO SLAM",
    school: "Esup Rennes",
    period: "Septembre 2024 - Aujourd’hui",
  },
  {
    title: "Licence 1 Informatique et SI",
    school: "Université de Bretagne Occidentale",
    period: "2022 - 2024",
  },
  {
    title: "Baccalauréat général",
    school: "Spécialités NSI, Sciences de l’ingénieur, Maths complémentaires",
    period: "2022",
  },
];

const languages = ["Français (natif)", "Anglais (C1)", "Espagnol (A2)"];

const certifications = [
  "Angular – Udemy (2025)",
  "Certificat Voltaire – 749 pts (2025)",
  "Soft Skills Support – Udemy (2025)",
  "TOEIC Bridge – 100/100 (2025)",
  "Google IT Support (2025)",
  "SST",
];

// --- Projets (résumés + détails) ---
const projects = [
  {
    id: "php-crud-boutique",
    title: "Application CRUD PHP – Boutique",
    badge: "Web / PHP",
    summary:
      "Application web CRUD développée en local (PHP 8.0 / MySQL) pour gérer les produits d’une boutique, avec focus sur le backend et les bonnes pratiques PDO.",
    stack: ["PHP 8.0", "MySQL", "PDO", "JavaScript (vanilla)", "HTML", "CSS"],
    details: [
      "Implémentation complète des opérations Create / Read / Update / Delete avec PDO et requêtes préparées",
      "Schéma et données gérés via phpMyAdmin dans un environnement WAMP / XAMPP",
      "Validation côté serveur et gestion des erreurs en PHP",
      "Interface en JavaScript natif : spinner de chargement et confirmations avant actions sensibles",
      "Organisation simple des scripts PHP au niveau racine, sans framework, pour bien comprendre les bases",
    ],
  },
  {
    id: "ws2025-ad-lab",
    title: "Lab Windows Server 2025 & Active Directory",
    badge: "Infra / AD",
    summary:
      "Lab virtualisé Windows Server 2025 orienté Active Directory, DNS/DHCP et GPO pour tester des scénarios d’administration système.",
    stack: ["Windows Server 2025", "Active Directory", "DNS", "DHCP", "GPO", "VMware"],
    details: [
      "Installation de Windows Server 2025 et d’un poste client Windows dans un lab VMware (NAT / bridge selon les tests)",
      "Création du domaine Active Directory `local.lan` avec utilisateurs, groupes et OU dédiées",
      "Configuration et intégration des rôles DNS et DHCP au domaine",
      "Mise en place de GPO de sécurité, dont le blocage de l’accès à l’invite de commandes pour un groupe ciblé",
      "Validation de l’authentification au domaine depuis le poste client",
    ],
  },
  {
    id: "multi-env-infra",
    title: "Infrastructure multi-environnements (Dev / Test / Prod / Client)",
    badge: "Infra / DevOps",
    summary:
      "Conception d’une infrastructure multi-VM sur Proxmox simulant les environnements dev / test / prod / client, alignée sur une logique DevOps.",
    stack: ["Proxmox", "Debian", "Windows", "SSH", "Git", "Réseau"],
    details: [
      "Hébergement sur Proxmox bare-metal avec VMs Debian pour dev / test / prod et une VM Windows côté client",
      "Création manuelle de la première VM puis clonage pour les VMs suivantes",
      "Adressage IP statique et réseau en NAT pour l’ensemble des machines",
      "Accès SSH par clé avec un utilisateur standardisé sur tous les environnements",
      "Séparation logique des configs en cohérence avec une stratégie de branches Git (dev / test / prod)",
    ],
  },
  {
    id: "proxmox-lab",
    title: "Lab de virtualisation Proxmox",
    badge: "Virtualisation",
    summary:
      "Installation bare-metal de Proxmox VE utilisée comme lab personnel pour héberger et expérimenter des projets d’infrastructure.",
    stack: ["Proxmox VE", "Linux", "Réseau"],
    details: [
      "Installation de Proxmox VE sur machine physique avec stockage LVM (local-lvm)",
      "Création de VMs via ISO puis clonage pour accélérer les déploiements",
      "Utilisation de ponts Linux (Linux bridge) pour la connectivité réseau des VMs",
      "Hébergement de multiples projets d’infrastructure et de tests système sur la même plateforme",
    ],
  },
  {
    id: "powershell-admin-scripts",
    title: "Scripts d’administration PowerShell",
    badge: "Scripting / Automation",
    summary:
      "Développement de scripts PowerShell interactifs mêlant exercices pédagogiques et cas d’usage réels d’administration Windows.",
    stack: ["PowerShell", "Windows"],
    details: [
      "Création de menus interactifs avec boucles `do/while` et instructions `switch`",
      "Interaction utilisateur via `Read-Host` / `Write-Host` pour guider les actions",
      "Scripts d’extraction de Hardware ID (HWID) et d’export de données système en CSV",
      "Préparation de fichiers pour import Microsoft Intune et petits scripts anti-veilles / anti-standby",
    ],
  },
  {
    id: "wordpress-association",
    title: "Site WordPress & identité visuelle pour une association",
    badge: "Web / CMS / Design",
    summary:
      "Création d’un site WordPress local pour l’association “La Cordée”, avec identité visuelle dédiée et thème enfant personnalisé.",
    stack: ["WordPress", "PHP", "HTML", "CSS", "Elementor"],
    details: [
      "Mise en place d’un environnement WordPress local pour le développement",
      "Création d’un thème enfant et utilisation d’Elementor pour la mise en page",
      "Définition d’une identité visuelle (logo, couleurs, typographies) pour l’association",
      "Réalisation d’une structure de site complète et documentation d’installation / déploiement",
    ],
  },
  {
    id: "support-capgemini",
    title: "Support IT & gestion de tickets (Capgemini)",
    badge: "Support / ITSM",
    summary:
      "Expérience de support IT en environnement entreprise avec gestion des incidents et demandes via un outil de ticketing et respect des SLA.",
    stack: ["ServiceNow", "IT Support", "ITIL"],
    details: [
      "Prise en charge et suivi d’incidents et de demandes utilisateurs via ServiceNow",
      "Priorisation des tickets et respect des SLA en coordination avec l’équipe",
      "Communication claire avec les utilisateurs finaux et escalade quand nécessaire",
      "Participation à l’amélioration continue des processus de support",
    ],
  },
];

// --- Alignement : même largeur partout ---
const contentWidthClass = "max-w-6xl mx-auto px-4 sm:px-6 w-full";

// --- Aperçu / démo projet (preview au style de l’app) ---
function ProjectDemoPreview({ project }) {
  if (!project) return null;

  switch (project.id) {
    case "php-crud-boutique": {
      // Style Bootstrap / back-office
      return (
        <div className="rounded-lg overflow-hidden border border-white/10 bg-[#f8f9fa] text-gray-800 shadow-inner">
          <div className="bg-[#0d6efd] text-white px-3 py-2 text-sm font-medium">Boutique — Gestion produits</div>
          <div className="p-2">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-1 px-2">ID</th>
                  <th className="text-left py-1 px-2">Nom</th>
                  <th className="text-left py-1 px-2">Prix</th>
                  <th className="text-left py-1 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-blue-50"><td className="py-1 px-2">1</td><td>Produit A</td><td>19,99 €</td><td><span className="text-blue-600">Modifier</span> · <span className="text-red-600">Suppr.</span></td></tr>
                <tr className="border-b border-gray-100 hover:bg-blue-50"><td className="py-1 px-2">2</td><td>Produit B</td><td>24,50 €</td><td><span className="text-blue-600">Modifier</span> · <span className="text-red-600">Suppr.</span></td></tr>
              </tbody>
            </table>
            <button type="button" className="mt-2 px-2 py-1 rounded bg-[#0d6efd] text-white text-xs">+ Ajouter un produit</button>
          </div>
        </div>
      );
    }
    case "ws2025-ad-lab": {
      return (
        <div className="rounded-lg overflow-hidden border border-white/10 bg-[#1a1d21] text-gray-200 shadow-inner">
          <div className="bg-[#0078d4] text-white px-3 py-2 text-sm font-medium">Windows Server 2025 — local.lan</div>
          <div className="p-2 space-y-1 text-xs">
            <div className="flex items-center gap-2 py-1"><ServerCog size={12} className="text-green-400" /> Contrôleur de domaine</div>
            <div className="flex items-center gap-2 py-1"><Shield size={12} className="text-amber-400" /> GPO — Bloquer CMD</div>
            <div className="flex items-center gap-2 py-1"><Globe2 size={12} /> DNS · DHCP</div>
          </div>
        </div>
      );
    }
    case "multi-env-infra":
    case "proxmox-lab": {
      const vms = [
        { id: "vm-100", name: "debian-dev", status: "running", env: "dev" },
        { id: "vm-101", name: "debian-test", status: "running", env: "test" },
        { id: "vm-102", name: "debian-prod", status: "stopped", env: "prod" },
      ];
      return (
        <div className="rounded-lg overflow-hidden border border-white/10 bg-[#3c3c3c] text-gray-200 shadow-inner">
          <div className="bg-[#e57000] text-white px-3 py-2 text-sm font-medium flex items-center gap-2">
            <Cpu size={14} /> Proxmox VE — Datacenter
          </div>
          <div className="p-2 space-y-1 text-xs">
            {vms.map((vm) => (
              <div key={vm.id} className="flex items-center justify-between py-1.5 px-2 rounded bg-white/5 hover:bg-white/10">
                <span>{vm.name}</span>
                <span className={vm.status === "running" ? "text-green-400" : "text-gray-500"}>{vm.status}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    case "powershell-admin-scripts": {
      return (
        <div className="rounded-lg overflow-hidden border border-white/10 bg-[#012456] text-[#d4d4d4] font-mono text-xs shadow-inner p-2">
          <div className="text-[#4ec9b0]">PS C:\Scripts&gt; <span className="animate-pulse">_</span></div>
          <div className="mt-1 text-[#9cdcfe]">1. Extraire HWID</div>
          <div className="text-[#9cdcfe]">2. Exporter CSV</div>
          <div className="text-[#9cdcfe]">3. Quitter</div>
          <div className="mt-1 text-[#ce9178]">Choix :</div>
        </div>
      );
    }
    case "wordpress-association": {
      return (
        <div className="rounded-lg overflow-hidden border border-white/10 bg-[#fff] text-gray-800 shadow-inner">
          <div className="bg-[#2d5016] text-white px-3 py-2 text-sm font-medium">La Cordée</div>
          <div className="flex gap-4 px-3 py-2 border-b border-gray-200 text-xs text-gray-600">
            <span className="font-medium text-gray-900">Accueil</span> Équipe · Projets · Contact
          </div>
          <div className="p-3 text-xs text-gray-600">
            Bienvenue sur le site de l’association La Cordée…
          </div>
        </div>
      );
    }
    case "support-capgemini": {
      return (
        <div className="rounded-lg overflow-hidden border border-white/10 bg-[#f4f4f4] text-gray-800 shadow-inner">
          <div className="bg-[#062e59] text-white px-3 py-2 text-sm font-medium">ServiceNow — Tickets</div>
          <div className="p-2">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-300 text-left">
                  <th className="py-1 px-2">#</th>
                  <th className="py-1 px-2">Résumé</th>
                  <th className="py-1 px-2">État</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200"><td className="py-1 px-2">INC001</td><td>Accès refusé</td><td><span className="text-amber-600">En cours</span></td></tr>
                <tr className="border-b border-gray-200"><td className="py-1 px-2">REQ002</td><td>Nouveau poste</td><td><span className="text-green-600">Résolu</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    default:
      return (
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center text-sm text-gray-400">
          Aperçu du projet
        </div>
      );
  }
}

// --- Petits composants ---
function Chip({ children }) {
  return (
    <span
      className="text-xs px-2 py-1 rounded-full border mr-2 mb-2 inline-block transition-all duration-200 hover:border-violet-500/60 hover:text-white"
      style={{ borderColor: tokens.muted, color: tokens.muted }}
    >
      {children}
    </span>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl p-5 shadow-xl transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 hover:-translate-y-0.5 ${className}`}
      style={{ background: tokens.card }}
    >
      {children}
    </div>
  );
}

function ProgressBreadcrumb({ steps, current }) {
  const items = [];
  steps.forEach((s, i) => {
    items.push(
      <span key={`step-${i}`} className={i === current ? "font-semibold" : "opacity-70"}>{s}</span>
    );
    if (i < steps.length - 1) {
      items.push(<ChevronRight key={`chevron-${i}`} size={14} />);
    }
  });

  return (
    <div className="w-full">
      <div className="flex items-center text-xs gap-2 flex-wrap" style={{ color: tokens.muted }}>
        {items}
      </div>
      <div className="mt-2 h-2 rounded-full overflow-hidden transition-[width] duration-500" style={{ background: "rgba(255,255,255,0.1)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: tokens.brand.primary }}
          initial={false}
          animate={{ width: `${((current + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

const SECTION_IDS = ["accueil", "skills", "projects", "cv", "contact"];

export default function App() {
  const [active, setActive] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const activeProject = useMemo(() => projects.find((p) => p.id === active) || null, [active]);

  const steps = ["Accueil", "Compétences", "Projets", "CV", "Contact"];

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 900);
    return () => clearTimeout(t);
  }, []);

  // Barre de progression alignée sur le défilement : on détermine quelle section est "en vue"
  useEffect(() => {
    const handleScroll = () => {
      const viewportMid = window.innerHeight * 0.35;
      let index = 0;
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= viewportMid) {
            index = i;
            break;
          }
        }
      }
      setCurrentStepIndex(index);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ background: tokens.bg }} className="min-h-screen text-white overflow-x-hidden">
      {/* Chargement personnalisé */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6"
            style={{ background: tokens.bg }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="h-12 w-12 rounded-full border-2 border-t-transparent"
              style={{ borderColor: `${tokens.brand.primary}40`, borderTopColor: tokens.brand.primary }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span className="text-sm opacity-70" style={{ color: tokens.muted }}>
              Chargement…
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-30 p-4 backdrop-blur border-b border-white/5" style={{ background: "rgba(11,16,32,0.85)" }}>
        <div className={contentWidthClass + " flex justify-between items-center"}>
          <a href="#" className="font-bold transition-opacity hover:opacity-90" style={{ color: tokens.text }}>
            B. Djenidi
          </a>
          <nav className="flex flex-wrap gap-1 sm:gap-3 text-sm justify-end">
            <a
              href="#skills"
              className="px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-white/10 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
              style={{ color: tokens.muted }}
            >
              Compétences
            </a>
            <a
              href="#projects"
              className="px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-white/10 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
              style={{ color: tokens.muted }}
            >
              Projets
            </a>
            <a
              href="#cv"
              className="px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-white/10 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
              style={{ color: tokens.muted }}
            >
              CV
            </a>
            <a
              href="#contact"
              className="px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-white/10 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
              style={{ color: tokens.muted }}
            >
              Contact
            </a>
          </nav>
        </div>
        <div className={contentWidthClass + " mt-2"}>
          <ProgressBreadcrumb steps={steps} current={currentStepIndex} />
        </div>
      </header>

      <main className={contentWidthClass}>
      {/* Hero */}
      <section id="accueil" className="pt-12 pb-8 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-4xl font-bold">{profile.name}</h1>
          <p className="mt-2 text-lg text-gray-300">{profile.title}</p>
          <p className="mt-4 text-gray-400 max-w-3xl">{profile.pitch}</p>

        <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-300">
          <span className="flex items-center gap-2">
            <Mail size={16} />
            <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors underline-offset-2 hover:underline">
              {profile.email}
            </a>
          </span>
          <span className="flex items-center gap-2">
            <Phone size={16} />
            <a href="tel:+33651793881" className="hover:text-white transition-colors underline-offset-2 hover:underline min-h-[44px] min-w-[44px] inline-flex items-center">
              {profile.phone}
            </a>
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={16} />
            {profile.location}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {profile.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-violet-600 hover:bg-violet-500 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <link.icon size={16} />
              <span>{link.label}</span>
            </a>
          ))}
        </div>
        </motion.div>
      </section>

      {/* Compétences */}
      <section id="skills" className="py-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-4">Compétences</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <h3 className="font-semibold mb-2">Techniques</h3>
            {skills.techniques.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </Card>
          <Card>
            <h3 className="font-semibold mb-2">Outils</h3>
            {skills.outils.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </Card>
          <Card>
            <h3 className="font-semibold mb-2">Soft skills</h3>
            {skills.soft.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </Card>
        </div>
      </section>

      {/* Expériences */}
      <section className="py-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-4">Expériences professionnelles</h2>
        {experiences.map((exp) => (
          <Card key={exp.company}>
            <h3 className="text-lg font-semibold">
              {exp.role} — {exp.company}, {exp.location}
            </h3>
            <p className="text-sm text-gray-400 mt-1">{exp.period}</p>
            <ul className="mt-3 list-disc pl-5 text-sm text-gray-300 space-y-1">
              {exp.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        ))}
      </section>

      {/* Formation / Langues / Certifications */}
      <section className="py-10">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <h2 className="text-2xl font-semibold mb-4">Formation</h2>
            <ul className="space-y-3 text-sm text-gray-300">
              {education.map((e) => (
                <li key={e.title}>
                  <p className="font-semibold">{e.title}</p>
                  <p className="text-gray-400">{e.school}</p>
                  <p className="text-xs text-gray-500">{e.period}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-semibold mb-4">Langues</h2>
            <ul className="space-y-1 text-sm text-gray-300">
              {languages.map((lang) => (
                <li key={lang}>{lang}</li>
              ))}
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-semibold mb-4">Certifications</h2>
            <ul className="space-y-1 text-sm text-gray-300">
              {certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* Projets */}
      <section id="projects" className="py-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-6">Projets</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Card>
                <div>
                  <span className="text-xs text-green-400">{p.badge}</span>
                  <h3 className="text-lg font-semibold mt-1">{p.title}</h3>
                  <p className="text-sm text-gray-400 mt-2">{p.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>
                  <button
                    onClick={() => setActive(p.id)}
                    className="mt-4 px-3 py-1.5 rounded-xl text-sm bg-violet-600 hover:bg-violet-500 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Voir le détail
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CV */}
      <section id="cv" className="py-10 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold mb-2">CV</h2>
                <p className="text-gray-400">
                  Téléchargez mon curriculum vitae au format PDF pour avoir l’ensemble de mon parcours, compétences et expériences.
                </p>
              </div>
              <a
                href={cvPdfUrl}
                download="CV_Bilal_Djenidi.pdf"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium bg-cyan-500 hover:bg-cyan-400 text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shrink-0 min-h-[44px]"
              >
                <FileDown size={20} />
                Télécharger mon CV
              </a>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Diaporama de présentation</h3>
              <div className="rounded-xl overflow-hidden border border-white/10 bg-black/20">
                <iframe
                  src="https://gamma.app/embed/kzxvthlmepah3lc"
                  style={{ width: "100%", maxWidth: "100%", height: "450px" }}
                  allow="fullscreen"
                  title="BILAL DJENIDI"
                />
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-10 scroll-mt-24">
        <Card>
          <h3 className="text-xl font-semibold mb-2">Contact</h3>
          <p className="text-gray-400 mb-3">Intéressé par mon profil ou mes projets ?</p>
          <a
            href={`mailto:${profile.email}`}
            className="inline-block px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            M’écrire
          </a>
        </Card>
      </section>

      </main>

      {/* Modale projet : détail + aperçu démo */}
      <AnimatePresence>
        {activeProject && (
          <motion.div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 overflow-y-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
            <motion.div
              className="max-w-2xl w-full bg-[#121734] rounded-2xl p-6 my-8 shadow-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-2">{activeProject.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{activeProject.summary}</p>

              {/* Aperçu interactif (style de l’app / infra) */}
              <div className="mb-4">
                <p className="text-xs font-medium mb-2 flex items-center gap-2" style={{ color: tokens.muted }}>
                  Aperçu
                </p>
                <div className="rounded-xl overflow-hidden border border-white/10 bg-black/20 min-h-[120px] cursor-default">
                  <ProjectDemoPreview project={activeProject} />
                </div>
              </div>

              <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1 mb-4">
                {activeProject.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
              <button
                onClick={() => setActive(null)}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="text-center py-6 text-xs text-gray-500">
        © {new Date().getFullYear()} {profile.name} — Portfolio BTS SIO SLAM
      </footer>
    </div>
  );
}
