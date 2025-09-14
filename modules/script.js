// Données des modules de formation
const modulesData = [
    {
        id: 1,
        title: "Introduction à la Cybersécurité",
        description: "Découvrez les bases de la cybersécurité, les menaces courantes et les bonnes pratiques pour protéger vos systèmes.",
        category: "base",
        difficulty: "beginner",
        duration: "2h",
        icon: "shield-halved",
        progress: 75
    },
    {
        id: 2,
        title: "Attaques par Injection SQL",
        description: "Apprenez comment fonctionnent les injections SQL et comment les prévenir dans vos applications web.",
        category: "web",
        difficulty: "intermediate",
        duration: "3h",
        icon: "database",
        progress: 30
    },
    {
        id: 3,
        title: "Chiffrement des Données",
        description: "Maîtrisez les concepts de chiffrement symétrique et asymétrique pour sécuriser vos communications.",
        category: "cryptographie",
        difficulty: "intermediate",
        duration: "2h30",
        icon: "lock",
        progress: 0
    },
    {
        id: 4,
        title: "Analyse Forensique Numérique",
        description: "Initiation aux techniques d'investigation numérique et de collecte de preuves numériques.",
        category: "forensique",
        difficulty: "advanced",
        duration: "4h",
        icon: "magnifying-glass",
        progress: 0
    },
    {
        id: 5,
        title: "Sécurisation des Réseaux",
        description: "Apprenez à sécuriser un réseau d'entreprise contre les attaques externes et internes.",
        category: "reseau",
        difficulty: "intermediate",
        duration: "3h30",
        icon: "network-wired",
        progress: 0
    },
    {
        id: 6,
        title: "Tests d'Intrusion Web",
        description: "Méthodologie et outils pour effectuer des tests d'intrusion sur des applications web.",
        category: "web",
        difficulty: "advanced",
        duration: "5h",
        icon: "bug",
        progress: 0
    }
];

// Fonction pour afficher les modules
function displayModules(modules) {
    const container = document.getElementById('modulesContainer');
    container.innerHTML = '';

    if (modules.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>Aucun module ne correspond à votre recherche.</p>
            </div>`;
        return;
    }

    modules.forEach(module => {
        const moduleElement = document.createElement('div');
        moduleElement.className = 'module-card';

        // Déterminer l'icône de progression
        let progressIcon = 'play-circle';
        let progressText = 'Commencer';
        let progressClass = '';

        if (module.progress > 0 && module.progress < 100) {
            progressIcon = 'sync-alt';
            progressText = 'Continuer';
            progressClass = 'in-progress';
        } else if (module.progress === 100) {
            progressIcon = 'check-circle';
            progressText = 'Terminé';
            progressClass = 'completed';
        }

        moduleElement.innerHTML = `
            <div class="module-header">
                <i class="fas fa-${module.icon}"></i>
                <h3>${module.title}</h3>
            </div>
            <div class="module-body">
                <p>${module.description}</p>
                <div class="module-meta">
                    <span><i class="far fa-clock"></i> ${module.duration}</span>
                    <span><i class="fas fa-tasks"></i> ${module.difficulty === 'beginner' ? 'Facile' : module.difficulty === 'intermediate' ? 'Intermédiaire' : 'Avancé'}</span>
                </div>
                ${module.progress > 0 ? `
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${module.progress}%;"></div>
                    <span>${module.progress}% complété</span>
                </div>` : ''}
            </div>
            <div class="module-footer">
                <span class="difficulty ${module.difficulty}">
                    ${getDifficultyText(module.difficulty)}
                </span>
                <button class="btn ${progressClass}" data-module-id="${module.id}">
                    <i class="fas fa-${progressIcon}"></i> ${progressText}
                </button>
            </div>
        `;
        container.appendChild(moduleElement);
    });
}

// Fonction utilitaire pour obtenir le texte de difficulté
function getDifficultyText(difficulty) {
    const difficulties = {
        'beginner': 'Débutant',
        'intermediate': 'Intermédiaire',
        'advanced': 'Avancé'
    };
    return difficulties[difficulty] || difficulty;
}

// Fonction de filtrage des modules
function filterModules() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;

    const filtered = modulesData.filter(module => {
        const matchesSearch = module.title.toLowerCase().includes(searchTerm) ||
            module.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || module.category === category;
        return matchesSearch && matchesCategory;
    });

    displayModules(filtered);
}

// Gestionnaires d'événements
document.addEventListener('DOMContentLoaded', () => {
    // Afficher tous les modules au chargement
    displayModules(modulesData);

    // Écouter les changements de recherche
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');

    searchInput.addEventListener('input', filterModules);
    categoryFilter.addEventListener('change', filterModules);

    // Ajouter un délai pour éviter de filtrer à chaque frappe
    let searchTimeout;
    searchInput.addEventListener('keyup', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(filterModules, 300);
    });

    // Gérer les clics sur les boutons "Commencer"
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn');
        if (btn && btn.hasAttribute('data-module-id')) {
            e.preventDefault();
            const moduleId = parseInt(btn.getAttribute('data-module-id'));
            startModule(moduleId);
        }
    });

    // Ajouter le style pour les notifications
    addNotificationStyles();
});

// Ajouter les styles pour les notifications
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #000000ff;
            color: #000000ff;
            padding: 15px 25px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            border-left: 4px solid var(--primary);
        }
        
        .notification i {
            color: var(--primary);
            font-size: 18px;
        }
        
        .progress-container {
            margin-top: 15px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 4px;
            height: 6px;
            position: relative;
            overflow: hidden;
        }
        
        .progress-bar {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            background: var(--primary);
            border-radius: 4px;
            transition: width 0.3s ease;
        }
        
        .progress-container span {
            position: absolute;
            right: 0;
            top: -20px;
            font-size: 11px;
            color: var(--muted);
        }
        
        .btn.in-progress {
            background: rgba(107, 76, 255, 0.1);
            color: var(--primary);
        }
        
        .btn.completed {
            background: rgba(46, 204, 113, 0.1);
            color: #2ecc71;
        }
        
        .btn.completed i {
            color: #2ecc71;
        }
    `;
    document.head.appendChild(style);
}

// Fonction pour démarrer un module
function startModule(moduleId) {
    const module = modulesData.find(m => m.id === moduleId);
    if (module) {
        // Simuler une progression pour la démo
        if (module.progress < 100) {
            module.progress += 25;
            if (module.progress > 100) module.progress = 100;

            // Mettre à jour l'affichage
            displayModules(modulesData);

            // Mettre à jour le filtre si actif
            filterModules();
        }

        // Pour la démo, on affiche une notification
        showNotification(`Module "${module.title}" mis à jour : ${module.progress}%`);
    }
}

// Fonction pour afficher une notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    // Animation d'apparition
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);

    // Disparaître après 3 secondes
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';

        // Supprimer après l'animation
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}