obtenerSvgBakery() {
        return `
        <svg class="stamp-bakery" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path class="bakery-main" d="m20.725 17.825 -2.775 -1 2.075 -5.125 2.125 4.375c0.33335 0.66665 0.325 1.17915 -0.025 1.5375 -0.35 0.35835 -0.81665 0.42915 -1.4 0.2125Zm-6.15 -0.45 1.55 -9.575c0.0667 -0.38335 0.2125 -0.65 0.4375 -0.8 0.225 -0.15 0.5292 -0.15 0.9125 0l1.65 0.65c0.3167 0.13335 0.5375 0.32085 0.6625 0.5625 0.125 0.24165 0.1125 0.54585 -0.0375 0.9125l-3.375 8.25h-1.8Zm-6.7 0 -3.37499 -8.25c-0.13333 -0.33335 -0.14583 -0.62915 -0.0375 -0.8875 0.108335 -0.25835 0.32917 -0.45415 0.66249 -0.5875l1.65 -0.65c0.33335 -0.13335 0.62085 -0.14165 0.8625 -0.025 0.2417 0.11665 0.4042 0.39165 0.4875 0.825l1.55 9.575h-1.8Zm-4.34999 0.45c-0.58333 0.21665 -1.05 0.14585 -1.4 -0.2125 -0.35 -0.35835 -0.35833 -0.87085 -0.025 -1.5375l2.125 -4.375L6.3 16.825l-2.77499 1Zm7.39999 -0.45 -1.65 -10.7c-0.0833 -0.55 0.025 -0.96665 0.325 -1.25s0.725 -0.425 1.275 -0.425h2.5c0.55 0 0.975 0.14165 1.275 0.425 0.3 0.28335 0.40835 0.7 0.325 1.25l-1.65 10.7h-2.4Z"></path>
        </svg>`;
    }

    obtenerSvgBolt() {
        return `
        <svg class="stamp-bolt" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path class="bolt-main" d="m11.4251 14.3501 -6.80002 -0.8c-0.31667 -0.03335 -0.525 -0.20415 -0.625 -0.5125 -0.1 -0.30835 -0.033335 -0.57085 0.2 -0.7875l11.00002 -10.1c0.06665 -0.05 0.1375 -0.09167 0.2125 -0.125 0.075 -0.033335 0.1875 -0.05 0.3375 -0.05 0.25 0 0.44165 0.104165 0.575 0.3125 0.1333 0.20833 0.1333 0.42083 0 0.6375l-3.75 6.725 6.8 0.8c0.31665 0.03335 0.525 0.20415 0.625 0.5125 0.1 0.30835 0.0333 0.57085 -0.2 0.7875l-11 10.1c-0.0667 0.05 -0.1375 0.09165 -0.2125 0.125 -0.075 0.03335 -0.1875 0.05 -0.3375 0.05 -0.25 0 -0.4417 -0.10415 -0.575 -0.3125 -0.13335 -0.20835 -0.13335 -0.42085 0 -0.6375l3.75 -6.725Zm-0.1 3 6.3 -5.575 -7.425 -0.9 2.475 -4.225 -6.325 5.6 7.425 0.875 -2.45 4.225Z"></path>
        </svg>`;
    }

    obtenerSvgTaza() {
        return `
        <svg class="stamp-cup" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path class="steam-path" d="M38,30 V12 M50,32 V8 M62,30 V16" stroke-linecap="round"/>
            <path class="cup-path" d="M20,35 H80 V75 Q80,90 65,90 H35 Q20,90 20,75 Z" />
            <path class="coffee-fill" d="M22,37 H78 V73 Q78,88 63,88 H37 Q22,88 22,73 Z" />
            <path class="cup-handle" d="M80,45 Q95,45 95,60 T80,75" />
        </svg>`;
    }

    cerrarSesion() {
        if (this.unsubscribe) this.unsubscribe(); 
        localStorage.removeItem('miTarjetaRamblaTEL');
        location.reload();
    }
}

new RamblaApp();

// --- LÓGICA DE INSTALACIÓN PWA ---
let eventoInstalacion = null;
const btnInstalar = document.getElementById('btnInstalarApp');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); 
    eventoInstalacion = e;
    if(btnInstalar) btnInstalar.style.display = 'block'; 
});

if(btnInstalar) {
    btnInstalar.addEventListener('click', async () => {
        if (!eventoInstalacion) return;
        eventoInstalacion.prompt(); 
        const { outcome } = await eventoInstalacion.userChoice;
        if (outcome === 'accepted') {
            btnInstalar.style.display = 'none'; 
        }
        eventoInstalacion = null;
    });
}

window.addEventListener('appinstalled', () => {
    if(btnInstalar) btnInstalar.style.display = 'none';
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker registrado con éxito', reg.scope))
            .catch(err => console.error('Error al registrar el Service Worker', err));
    });
}
