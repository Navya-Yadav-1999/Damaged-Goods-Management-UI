import './App.css';
import Dashboard from './components/Dashboard';
import theme from './components/Theme';
import { ThemeProvider } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard/>
    </ThemeProvider>
  );
}

export default App;
