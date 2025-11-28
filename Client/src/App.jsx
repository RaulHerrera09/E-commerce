import { HashRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Importación de Componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/Loader';
import ProtectedRoutes from './components/ProtectedRoutes';

// Importación de Páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import Purchases from './pages/Purchases';
import User from './pages/User';
import Checkout from './pages/Checkout';

import './App.css';

function App() {
  const isLoading = useSelector(state => state.isLoading);

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">

        <Navbar />

        {isLoading && <LoadingScreen />}

        <main className="flex-grow container mx-auto px-4 py-8 mt-16">
          { }
          <Routes>

            {/* Rutas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetail />} />

            {/* Rutas Protegidas */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/user" element={<User />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>

          </Routes>
          { }
        </main>

        <Footer />

      </div>
    </HashRouter>
  );
}

export default App;
