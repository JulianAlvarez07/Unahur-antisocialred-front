const Footer = () => {
  return (
    <footer className="mt-auto py-4 md:py-6 border-t border-text-accent bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <p className="text-primary text-sm md:text-base text-center md:text-left">
            &copy; 2025 UnaHur Anti-Social Net - Los CRUDos
          </p>
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center md:justify-end">
            <a href="#" className="text-primary hover:text-accent transition-colors text-sm md:text-base">
              Términos
            </a>
            <a href="#" className="text-primary hover:text-accent transition-colors text-sm md:text-base">
              Privacidad
            </a>
            <a href="#" className="text-primary hover:text-accent transition-colors text-sm md:text-base">
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
