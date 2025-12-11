// 1. Gerekli HTML Elementlerini Seçme
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const videoContainer = document.getElementById('videoContainer');
const myVideo = document.getElementById('myVideo');
const buttonArea = document.querySelector('.button-area'); // Butonların kapsayıcısı
const mainContainer = document.querySelector('.main-container'); // Ana içerik kapsayıcısı

// Başlangıçta EVET butonunun boyutunu tutacak değişken
let yesButtonSize = 1; 

// Video URL'si (Bu kısmı kendi video dosyanın adıyla değiştir!)
const videoUrl = 'bitti_amk.mp4'; 
myVideo.src = videoUrl;

// HAYIR butonunun hareket etme fonksiyonu
function moveNoButton() {
    // 1. Yeni Konum Hesaplama: Ana kapsayıcının sınırları içinde kalmasını sağlıyoruz
    // Rastgele x ve y pozisyonlarını hesapla (0'dan 100'e kadar yüzdelik değerler)
    const newX = Math.random() * 80; // %0 ile %80 arası
    const newY = Math.random() * 80; // %0 ile %80 arası

    // Butonun CSS özelliklerini değiştirerek rastgele konuma taşı
    noButton.style.position = 'absolute'; // Position absolute olmalı ki hareket etsin
    noButton.style.left = `${newX}px`; // X konumu
    noButton.style.top = `${newY}px`; // Y konumu
    
    // Rastgele z-index vererek üstte kalmasını sağla
    noButton.style.zIndex = 50; 
    
    // 2. Buton Boyutlarını Manipüle Etme
    
    // HAYIR butonunu küçült (minimum %10 boyutuna kadar)
    let currentNoScale = parseFloat(noButton.style.transform.replace('scale(', '').replace(')', '')) || 1;
    let newNoScale = Math.max(0.1, currentNoScale - 0.1); // %10'dan daha fazla küçülmesin
    noButton.style.transform = `scale(${newNoScale})`;

    // EVET butonunu büyüt (maksimum %300 boyutuna kadar)
    yesButtonSize = Math.min(3, yesButtonSize + 0.2); // %300'den daha fazla büyümesin
    yesButton.style.transform = `scale(${yesButtonSize})`;
    
    // Büyüme ile orantılı olarak font boyutunu da ayarla
    yesButton.style.fontSize = `${1.1 * yesButtonSize}em`; 
    
    // HAYIR butonunu etkisizleştir (tıklanmasını engelle)
    noButton.style.pointerEvents = 'none'; 
    
    // Kısa bir süre sonra yeniden etkileşime izin ver (yeni konuma geçişten sonra)
    setTimeout(() => {
        noButton.style.pointerEvents = 'auto';
    }, 400); // 400ms CSS geçiş süremizle aynı olmalı
}

// -------------------------------------------------------------------------
// Olay Dinleyicileri (Event Listeners)

// 1. HAYIR Butonu Olayları
// Bilgisayarda fare butona yaklaştığında (hover)
noButton.addEventListener('mouseover', moveNoButton); 
// Mobilde (veya tıklamalarda)
noButton.addEventListener('click', moveNoButton); 

// 2. EVET Butonu Olayı (Final Anı)
yesButton.addEventListener('click', () => {
    // Tüm içeriği gizle
    mainContainer.style.display = 'none';
    
    // Video konteynerini göster
    videoContainer.classList.remove('hidden');
    
    // Videoyu tam ekranda oynatmak istersen alt satırdaki okuma parantezlerini kaldır.
    //myVideo.requestFullscreen();
    
    // Videoyu başlat
    myVideo.play(); 
});

// Videodan çıkıldığında veya bittiğinde
myVideo.addEventListener('ended', () => {
    // İsteğe bağlı: Video bittiğinde bir mesaj gösterebilirsin.
    alert("Artık yapabileceğin bir şey yok. Bitti.");
});