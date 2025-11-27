import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import Purchases from './pages/Purchases';
import User from './pages/User';
import Footer from './components/Footer';
import ProtectedRoutes from './components/ProtectedRoutes';
import { useSelector } from 'react-redux';
import LoadingScreen from './components/Loader';

import './App.css';

function App() {
  const isLoading = useSelector(state => state.isLoading);

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        {isLoading && <LoadingScreen />}

        {/* El flex-grow hace que el contenido empuje el footer hacia abajo */}
        <main className="flex-grow container mx-auto px-4 py-8 mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetail />} />

            {/* Rutas Protegidas */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/user" element={<User />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
