const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Sistema de Gestão de Eventos
          </p>
          <p className="text-xs mt-2 text-gray-400">
            Desenvolvido com React, TypeScript e Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 