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
import {useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link as RouterLink} from 'react-router-dom';

function App() {
  const [currentTheme,setCurrentTheme] = useState('dark');
  const [themeObject,setThemeObject] = useState(darkTheme);

  const handleThemeChange = (event) => {
    if(event.target.value==='dark'){
      setThemeObject(darkTheme);
    }
    else if(event.target.value==='lofi'){
      setThemeObject(lofiTheme);
    }
    else if(event.target.value==='christmas'){
      setThemeObject(christmasTheme);
    }
    else if(event.target.value==='pink'){
      setThemeObject(millenialPinkTheme);
    }
    setCurrentTheme(event.target.value);
  }

  return (
    <ThemeProvider theme={themeObject}>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp 
                                          currentTheme={currentTheme} 
                                          handleThemeChange={handleThemeChange} 
                                      />} 
          />
          <Route path="/" element={<Home 
                                    currentTheme={currentTheme} 
                                    handleThemeChange={handleThemeChange} 
                                />} 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
