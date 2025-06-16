const Footer = () => {
  return (
    <footer className="mt-auto py-4 border-t border-text-accent">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <p className="text-primary">&copy; 2025 AntiSocialRed</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-accent">
              Términos
            </a>
            <a href="#" className="hover:text-accent">
              Privacidad
            </a>
            <a href="#" className="hover:text-accent">
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
