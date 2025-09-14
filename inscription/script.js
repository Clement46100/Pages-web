document.addEventListener('DOMContentLoaded', function () {
    // Fonction pour basculer la visibilité du mot de passe
    function togglePasswordVisibility(inputId, iconElement) {
        const passwordInput = document.getElementById(inputId);
        if (!passwordInput) return;

        // Bascher entre type="password" et type="text"
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Mettre à jour l'icône
        if (iconElement) {
            const isPasswordVisible = type === 'text';
            iconElement.setAttribute('data-visible', isPasswordVisible);

            // Changer l'icône en fonction de l'état
            const eyeIcon = iconElement.querySelector('svg');
            if (eyeIcon) {
                if (isPasswordVisible) {
                    // Icône œil barré
                    eyeIcon.innerHTML = `
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a4 4 0 1 1-5.56-5.56m9.06 9.06L3 3" 
                          stroke="#111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    `;
                } else {
                    // Icône œil normal
                    eyeIcon.innerHTML = `
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" 
                              stroke="#111" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="12" cy="12" r="3" 
                                stroke="#111" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                    `;
                }
            }
        }
    }

    // Ajouter les gestionnaires d'événements pour les icônes d'œil
    document.querySelectorAll('.eye-icon').forEach(icon => {
        icon.addEventListener('click', function (e) {
            e.preventDefault();
            const inputId = this.getAttribute('data-target');
            if (inputId) {
                togglePasswordVisibility(inputId, this);
            }
        });

        // Ajouter un style de curseur pour indiquer que c'est cliquable
        icon.style.cursor = 'pointer';
    });
});