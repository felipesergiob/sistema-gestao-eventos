import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            Sistema de Eventos
          </Link>
          
          <div className="flex space-x-4">
            <Link to="/eventos" className="hover:text-blue-200">
              Eventos
            </Link>
            <Link to="/participantes" className="hover:text-blue-200">
              Participantes
            </Link>
            <Link to="/apresentadores" className="hover:text-blue-200">
              Apresentadores
            </Link>
            <Link to="/locais" className="hover:text-blue-200">
              Locais
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 