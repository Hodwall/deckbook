import AppBar from './components/AppBar/AppBar';
import AppContent from './components/AppContent/AppContent';
import './App.css';


function App() {
  return (
    <div className="App">
      <div className="border-top-main" />
      <div className="border-top-right" />
      <div className="border-top-appbar" />
      <AppContent />
      <div className="border-right" />
      <AppBar />
    </div>
  );
}

export default App;