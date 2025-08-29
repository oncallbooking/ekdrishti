export default function WhatsAppFloat() {
  return (
    <div className="floating-chat">
      <a 
        href="https://wa.me/918090441419?text=Hi%20Team,%20I%20have%20a%20query" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
        data-testid="whatsapp-float-button"
      >
        <img src="https://img.icons8.com/ios-filled/32/ffffff/whatsapp.png" alt="WhatsApp" />
      </a>
    </div>
  );
}
