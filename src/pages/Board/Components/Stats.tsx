import Tracker from '../../../components/Tracker/Tracker';
import '../Board.css';


const Stats = () => {
  return (
    <div className="Stats">
      <div className="base">
        <Tracker label={'XP'} maxValue={100} />
        <Tracker label={'HP'} maxValue={60} />
        <Tracker label={'STAMINA'} maxValue={40} />
      </div>
      <div className="skills">
      </div>
    </div>
  );
};

export default Stats;