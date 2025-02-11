import './App.css';
import Dashboard from './components/Dashboard';
import theme from './components/Theme';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Dashboard />
      </Router>
    </ThemeProvider>
  );
}

export default App;
