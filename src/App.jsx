import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './features/auth/Login';
import Dashboard from './pages/Dashboard';
import ProductManagement from './features/products/ProductManagement';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/products" element={
          <PrivateRoute>
            <ProductManagement />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;
