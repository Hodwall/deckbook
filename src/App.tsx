import { Route, Routes, useLocation } from 'react-router-dom';
import ck3_ui_example from '../src/assets/img/ck3_ui_example.png';
import './App.css';
import AppBar from './components/AppBar/AppBar';
import BackgroundImage from './components/BackgroundImage/BackgroundImage';
import CardDisplay from './components/CardDisplay/CardDisplay';
import CardWideDisplay from './components/CardWideDisplay/CardWideDisplay';
import Cards from './pages/Cards/Cards';
import Sets from './pages/Sets/Sets';
import Decks from './pages/Decks/Decks';
import Generators from './pages/Generators/Generators';


function App() {
  const location = useLocation();
  return (
    <div className="App">
      <div className="app-content">
        <BackgroundImage />
        <div className="app-section">
          <Routes>
            <Route path="/" element={<div>base</div>} />
            <Route path="/deckbook/decks" element={<Decks />} />
            <Route path="/deckbook/sets" element={<Sets />} />
            <Route path="/deckbook/cards" element={<Cards />} />
            <Route path="/deckbook/maps" element={<div>maps</div>} />
            <Route path="/deckbook/generators" element={<Generators />} />
          </Routes>
        </div>
      </div>
      <div className="app-border" />
      <AppBar />
      <CardDisplay />
      <CardWideDisplay />
      <img className={'ck3-overlay'} src={ck3_ui_example} />
    </div>
  );
}

export default App;