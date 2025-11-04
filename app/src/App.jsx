import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Mail, Phone, MapPin, ExternalLink, GraduationCap, Wrench, ServerCog, Terminal, Shield, Cpu, Code2, Database, Globe2, Network, ChevronRight, FileDown } from "lucide-react";

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
  name: "Bilel Djenidi",
  title: "Étudiant BTS SIO – SLAM | Technicien support (alternance 2024–2026)",
  location: "Rennes, France",
  email: "bilel@mail.example",
  phone: "+33 6 00 00 00 00",
  links: [{ label: "GitHub", href: "https://github.com/", icon: Github }],
  pitch:
    "J'aime transformer des besoins concrets en solutions fiables : automatisation, support, CI/CD léger et développement web propre. Mon portfolio regroupe mes projets de cours, d'alternance et personnels.",
};

// --- Compétences ---
const skills = {
  techniques: [
    "Python",
    "Bash",
    "Batch",
    "PHP (PDO)",
    "HTML/CSS/JS",
    "Bootstrap",
    "WordPress",
    "MySQL/MariaDB",
    "Proxmox / VMware / VirtualBox",
    "Windows Server 2022/2025",
    "AD/GPO",
    "WSUS",
    "GLPI",
    "ServiceNow",
    "Intune / Autopilot",
    "Cisco (VLAN, DHCP, HSRP, SSH, NAT)",
  ],
  outils: [
    "VS Code / Cursor",
    "Git",
    "XAMPP/WAMP",
    "phpMyAdmin",
    "Wireshark",
    "Packet Tracer",
  ],
  soft: ["Rigueur", "Travail en équipe", "Communication", "Autonomie", "Curiosité"],
};

// --- Projets (résumés + détails) ---
const projects = [
  {
    id: "tp-clarisse",
    title: "TP Clarisse – Sauvegarde et automatisation Linux",
    badge: "Bash / Cron",
    summary:
      "Script de sauvegarde automatisée d’un serveur Minecraft avec rotation des archives et planification cron.",
    stack: ["Bash", "cron", "Linux"],
    details: [
      "Création du script backup.sh",
      "Sauvegarde toutes les 2h (0 */2 * * *)",
      "Rotation des archives + vérif espace disque",
    ],
  },
  {
    id: "crud-php",
    title: "CRUD PHP – Boutique",
    badge: "Web / PHP",
    summary:
      "Application CRUD avec tri par ID, prix ou nom, validation des champs et spinner d’ajout.",
    stack: ["PHP", "PDO", "MySQL", "Bootstrap", "JS"],
    details: [
      "PDO avec requêtes préparées",
      "Thème Bootstrap et pop-up JS de confirmation",
      "Fonctionnalité de tri dynamique",
    ],
  },
  {
    id: "glpi-proxmox",
    title: "GLPI sur Proxmox + Windows Server 2022",
    badge: "ITSM",
    summary:
      "Installation et configuration complète de GLPI dans une VM Proxmox, avec plugin d’inventaire et base MariaDB.",
    stack: ["Proxmox", "Windows Server", "GLPI", "MariaDB"],
    details: [
      "Installation et configuration réseau",
      "Connexion base de données GLPI",
      "Mise en place du plugin d’inventaire",
    ],
  },
  {
    id: "wordpress",
    title: "Site WordPress – La Cordée",
    badge: "CMS / Design",
    summary:
      "Création du site de l’association avec Elementor, palette personnalisée et typographies cohérentes.",
    stack: ["WordPress", "Elementor", "Figma"],
    details: [
      "Palette cohérente + hiérarchie typographique",
      "Pages : Accueil, Équipe, Projets, Contact",
      "Optimisation médias et responsive",
    ],
  },
];

// --- Petits composants ---
function Chip({ children }) {
  return (
    <span className="text-xs px-2 py-1 rounded-full border mr-2 mb-2 inline-block" style={{ borderColor: tokens.muted, color: tokens.muted }}>
      {children}
    </span>
  );
}

function Card({ children }) {
  return (
    <div className="rounded-2xl p-5 shadow-xl" style={{ background: tokens.card }}>
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
      <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
        <div className="h-full" style={{ width: `${((current + 1) / steps.length) * 100}%`, background: tokens.brand.primary }} />
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState(null);
  const activeProject = useMemo(() => projects.find((p) => p.id === active) || null, [active]);

  const steps = ["Accueil", "Compétences", "Projets", "Contact"];
  const currentIndex = useMemo(() => (active ? 2 : 0), [active]);

  return (
    <div style={{ background: tokens.bg }} className="min-h-screen text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 p-4 backdrop-blur" style={{ background: "rgba(11,16,32,0.7)" }}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="font-bold">B. Djenidi</span>
          <nav className="flex gap-4 text-sm opacity-80">
            <a href="#skills">Compétences</a>
            <a href="#projects">Projets</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <div className="max-w-6xl mx-auto mt-2">
          <ProgressBreadcrumb steps={steps} current={currentIndex} />
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-8">
        <h1 className="text-4xl font-bold">{profile.name}</h1>
        <p className="mt-2 text-lg text-gray-300">{profile.title}</p>
        <p className="mt-4 text-gray-400">{profile.pitch}</p>
      </section>

      {/* Compétences */}
      <section id="skills" className="max-w-6xl mx-auto px-4 py-10">
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

      {/* Projets */}
      <section id="projects" className="max-w-6xl mx-auto px-4 py-10">
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
                  <button onClick={() => setActive(p.id)} className="mt-4 px-3 py-1.5 rounded-xl text-sm bg-violet-600 hover:bg-violet-700 transition">
                    Voir le détail
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-10">
        <Card>
          <h3 className="text-xl font-semibold mb-2">Contact</h3>
          <p className="text-gray-400 mb-3">Intéressé par mon profil ou mes projets ?</p>
          <a href={`mailto:${profile.email}`} className="inline-block px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition">
            M’écrire
          </a>
        </Card>
      </section>

      {/* Modale projet */}
      <AnimatePresence>
        {activeProject && (
          <motion.div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
            <motion.div className="max-w-lg w-full bg-[#121734] rounded-2xl p-6" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-semibold mb-3">{activeProject.title}</h3>
              <p className="text-sm text-gray-300 mb-3">{activeProject.summary}</p>
              <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
                {activeProject.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
              <button onClick={() => setActive(null)} className="mt-4 px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 transition">
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
