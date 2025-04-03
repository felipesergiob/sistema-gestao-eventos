import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import './styles/global.css';

// Pages
import Eventos from './pages/Eventos';
import Participantes from './pages/Participantes';
import Apresentadores from './pages/Apresentadores';
import Locais from './pages/Locais';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Eventos />} />
              <Route path="/eventos" element={<Eventos />} /> 
              <Route path="/participantes" element={<Participantes />} />
              <Route path="/apresentadores" element={<Apresentadores />} />
              <Route path="/locais" element={<Locais />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
