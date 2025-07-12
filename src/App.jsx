import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CertificatePage from './components/CertificatePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/certificate/:certification" element={<CertificatePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;