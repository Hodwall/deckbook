import AppBar from './components/AppBar/AppBar';
import AppContent from './components/AppContent/AppContent';
import './App.css';


function App() {
  return (
    <div className="App">
      <div className="border-top-left" />
      <div className="border-top-center" />
      <div className="border-top-right" />
      <AppBar />
      <AppContent />
      <div className="border-right" />
    </div>
  );
}

export default App;