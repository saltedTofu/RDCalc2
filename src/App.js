import './App.css';
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../node_modules/react-grid-layout/css/styles.css';
import {ThemeProvider } from '@mui/material/styles';
import darkTheme from './themes/dark';
import lofiTheme from './themes/lofi.js';
import christmasTheme from './themes/christmas.js';
import millenialPinkTheme from './themes/millenialPink.js';
import {BrowserRouter as Router, Routes, Route, Link as RouterLink} from 'react-router-dom';

function App() {


   

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
