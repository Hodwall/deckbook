import { useState } from "react";
import './Generators.css';
import rollTerritory from "./rollTerritory";
import rollTreasure from "./rollTreasure";
import Territory from "./Territory";
import Treasure from "./Treasure";
import Selector from "../../components/Selector/Selector";


const Generators = () => {
  const [territories, setTerritories] = useState<any[]>([]);
  const [treasures, setTreasures] = useState<any[]>([]);
  const [treasureType, setTreasureType] = useState(0);

  const deleteTerritory = (index: number) => {
    setTerritories(territories.toSpliced(index, 1));
  };
  const deleteTreasure = (index: number) => {
    setTreasures(treasures.toSpliced(index, 1));
  };

  return (
    <div className="Generators">
      generators
      <div className="toolbar">
        <button onClick={() => setTerritories([...territories, rollTerritory()])}>ROLL A LOCATION</button>
        <button onClick={() => setTerritories([])}>DELETE ALL LOCATIONS</button>
        <Selector
          options={[
            'Hovel (brass)',
            'House (silver)',
            '-- Estate (gold)',
            '-- Shrine (brass)',
            '-- Temple (gold)',
            '-- Workshop (silver)',
            '-- Wizard Home (gold)',
            'Chest - Open (silver)',
            'Chest - Secure (gold)',
            '-- Chest - Vault (gold)',
            '-- Peasant (brass)',
            '-- Citizen (silver)',
            '-- Noble (gold)',
            '-- Wizard (gold)',
            '-- Small Monster (silver)',
            '-- Large Monster (gold)',
          ]}
          onSelect={(val) => setTreasureType(val)}
        />
        <button onClick={() => setTreasures([...treasures, rollTreasure(treasureType)])}>ROLL A TREASURE</button>
        <button onClick={() => setTreasures([])}>DELETE ALL TREASURES</button>
      </div>
      <div className="results">
        {
          territories.map((territory, index) => <Territory data={territory} deleteHandler={() => deleteTerritory(index)} />)
        }
        {
          treasures.map((treasure, index) => <Treasure data={treasure} deleteHandler={() => deleteTreasure(index)} />)
        }
      </div>
    </div>
  );
};

export default Generators;