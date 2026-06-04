document.addEventListener('DOMContentLoaded', () => {
    // Configuración estructural de la fidelización
    const TOTAL_STAMPS = 6;
    
    // Aquí conectarás tu lógica de backend (ej. Firebase Realtime Database)
    // Por ahora, simulamos el estado actual del cliente
    let userState = {
        name: "Martín",
        currentStamps: 2 
    };

    const stampsGrid = document.getElementById('stampsGrid');
    const remainingText = document.getElementById('remainingStamps');
    const userNameEl = document.getElementById('userName');
    
    // Función para renderizar la UI basada en el estado de la base de datos
    function renderApp() {
        userNameEl.textContent = userState.name;
        stampsGrid.innerHTML = ''; // Limpiar grilla
        
        for (let i = 1; i <= TOTAL_STAMPS; i++) {
            const stampEl = document.createElement('div');
            stampEl.classList.add('stamp');
            
            if (i <= userState.currentStamps) {
                stampEl.classList.add('active');
                stampEl.innerHTML = '☕'; // Sello marcado
            } else if (i === TOTAL_STAMPS) {
                stampEl.innerHTML = '🎁'; // Indicador de premio final
            }
            
            stampsGrid.appendChild(stampEl);
        }
        
        // Actualizar texto de cafés restantes
        const remaining = TOTAL_STAMPS - userState.currentStamps;
        remainingText.textContent = remaining > 0 ? remaining : 0;
    }

    // Listener para interactuar con la app
    document.getElementById('btnAction').addEventListener('click', () => {
        if (userState.currentStamps < TOTAL_STAMPS) {
            // Lógica temporal para probar la UI. 
            // Esto luego se reemplaza con la función que actualiza la DB.
            userState.currentStamps++;
            renderApp();
        } else {
            alert('¡El cliente ya completó la tarjeta! Listo para canjear.');
        }
    });

    // Carga inicial
    renderApp();
});
