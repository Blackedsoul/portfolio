// Funzione per mostrare il popup
function showCookiePopup() {
    var popup = document.getElementById('cookie-popup');
    popup.style.display = 'block';
}

// Funzione per accettare i cookie e nascondere il popup
function acceptCookies() {
    var popup = document.getElementById('cookie-popup');
    popup.style.display = 'none';

    // Puoi aggiungere qui la logica per impostare un cookie che indica l'accettazione
    // Ad esempio, utilizzando document.cookie o una libreria come js-cookie
}

// Mostra il popup al caricamento della pagina
window.onload = showCookiePopup;
