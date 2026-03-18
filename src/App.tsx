import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CoinPage from './pages/CoinPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/coin/:id" element={<CoinPage />} />
    </Routes>
  );
}
export default App;