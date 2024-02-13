import { useState } from "react";

const CharacterSheetPF2 = () => {
  const [level, setLevel] = useState(0);
  const [experience, setExperience] = useState(0);

  const [characterClass, setCharacterClass] = useState('');
  const [size, setSize] = useState('');
  const [alignment, setAlignment] = useState('');
  const [traits, setTraits] = useState('');

  const [ancestry, setAncestry] = useState('');
  const [heritage, setHeritage] = useState('');
  const [background, setBackground] = useState('');
  const [deity, setDeity] = useState('');


  return (
    <div className="CharacterSheetPF2">
      <div className={'cs-level'}>
        <label><span>Experience Points</span><input value={experience} onChange={(e: any) => setExperience(e.target.value)} type="number" /></label>
        <label><span>Level</span><input value={level} onChange={(e: any) => setLevel(e.target.value)} type="number" /></label>
      </div>
      <div className={'cs-base'}>
        <div>
          <label><span>Class</span><input value={characterClass} onChange={(e: any) => setCharacterClass(e.target.value)} type="text" /></label>
          <div>
            <label><span>Size</span><input value={size} onChange={(e: any) => setSize(e.target.value)} type="text" /></label>
            <label><span>Alignment</span><input value={alignment} onChange={(e: any) => setAlignment(e.target.value)} type="text" /></label>
          </div>
          <label><span>Traits</span><input value={traits} onChange={(e: any) => setTraits(e.target.value)} type="text" /></label>
        </div>
        <div>
          <div>
            <label><span>Ancestry</span><input value={ancestry} onChange={(e: any) => setAncestry(e.target.value)} type="text" /></label>
            <label><span>Heritage</span><input value={heritage} onChange={(e: any) => setHeritage(e.target.value)} type="text" /></label>
          </div>
          <label><span>Background</span><input value={background} onChange={(e: any) => setBackground(e.target.value)} type="text" /></label>
          <label><span>Deity</span><input value={deity} onChange={(e: any) => setDeity(e.target.value)} type="text" /></label>
        </div>
      </div>
      <div className={'cs-abilities'}>
        <label>
          <input value={experience} onChange={(e: any) => setExperience(e.target.value)} type="number" />
          <input value={experience} onChange={(e: any) => setExperience(e.target.value)} type="number" />
          <span>STR</span>
        </label>
        <label>
          <input value={experience} onChange={(e: any) => setExperience(e.target.value)} type="number" />
          <input value={experience} onChange={(e: any) => setExperience(e.target.value)} type="number" />
          <span>DEX</span>
        </label>
        <label>
          <input value={experience} onChange={(e: any) => setExperience(e.target.value)} type="number" />
          <input value={experience} onChange={(e: any) => setExperience(e.target.value)} type="number" />
          <span>CON</span>
        </label>
        <label>
          <input value={experience} onChange={(e: any) => setExperience(e.target.value)} type="number" />
          <input value={experience} onChange={(e: any) => setExperience(e.target.value)} type="number" />
          <span>INT</span>
        </label>
        <label>
          <input value={experience} onChange={(e: any) => setExperience(e.target.value)} type="number" />
          <input value={experience} onChange={(e: any) => setExperience(e.target.value)} type="number" />
          <span>WIS</span>
        </label>
        <label>
          <input value={experience} onChange={(e: any) => setExperience(e.target.value)} type="number" />
          <input value={experience} onChange={(e: any) => setExperience(e.target.value)} type="number" />
          <span>CHA</span>
        </label>
      </div>

    </div>
  );
};

export default CharacterSheetPF2;