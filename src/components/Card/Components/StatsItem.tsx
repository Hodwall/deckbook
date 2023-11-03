import { GiCrownCoin } from 'react-icons/gi';
import { FaWeightHanging } from 'react-icons/fa';
import '../Card.css';


const StatsItem = (props: {
  data: {
    value_platinum: number | null,
    value_gold: number | null,
    value_silver: number | null,
    value_copper: number | null,
    weight: number | null;
  };
}) => {
  return (
    <div className="StatsItem">
      <div className="value">
        {props.data.value_platinum && <div className="value-platinum"><GiCrownCoin />{props.data.value_platinum}</div>}
        {props.data.value_gold && <div className="value-gold"><GiCrownCoin />{props.data.value_gold}</div>}
        {props.data.value_silver && <div className="value-silver"><GiCrownCoin />{props.data.value_silver}</div>}
        {props.data.value_copper && <div className="value-copper"><GiCrownCoin />{props.data.value_copper}</div>}
      </div>
      {props.data.weight && <div className="weight"><FaWeightHanging />{props.data.weight}</div>}
    </div>
  );
};

export default StatsItem;