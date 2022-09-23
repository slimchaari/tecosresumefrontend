import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Dossiers from './pages/Dossiers';
import Competences from './pages/Competences';
import Dossier from './pages/Dossier';
import theme from './context/theme';
import { ThemeProvider } from '@mui/material';
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dossiers" element={<Dossiers />} />
            <Route path="competences" element={<Competences />} />
            <Route path="dossier/:id" element={<Dossier />} />
            <Route path="*" element={<Navigate to="/" replace/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
