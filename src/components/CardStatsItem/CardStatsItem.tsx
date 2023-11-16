import { useMemo } from 'react';
import useCardStore from '../../store/useCardStore';
import { GiCrownCoin } from 'react-icons/gi';
import { FaWeightHanging } from 'react-icons/fa';
import './CardStatsItem.css';


const CardStatsItem = (props: {
  cardId: number;
}) => {
  const [cards, setCardTypeData, active_card] = useCardStore((state) => [state.cards, state.setCardTypeData, state.active_card]);
  const card = useMemo(() => cards.find((c) => c.id === props.cardId), [active_card]);

  const handleUpdateValue = (key: string, value: number) => {
    setCardTypeData(props.cardId, { ...card?.type_data, [key]: value });
  };

  return (
    <div className="CardStatsItem">
      <div className="value">
        <div className="value-platinum">
          <GiCrownCoin />
          <input
            type="number"
            value={card?.type_data?.value_platinum || ''}
            onChange={(e: any) => handleUpdateValue('value_platinum', e.target.value)}
          />
        </div>
        <div className="value-gold">
          <GiCrownCoin />
          <input
            type="number"
            value={card?.type_data?.value_gold || ''}
            onChange={(e: any) => handleUpdateValue('value_gold', e.target.value)}
          />
        </div>
        <div className="value-silver">
          <GiCrownCoin />
          <input
            type="number"
            value={card?.type_data?.value_silver || ''}
            onChange={(e: any) => handleUpdateValue('value_silver', e.target.value)}
          />
        </div>
        <div className="value-copper">
          <GiCrownCoin />
          <input
            type="number"
            value={card?.type_data?.value_copper || ''}
            onChange={(e: any) => handleUpdateValue('value_copper', e.target.value)}
          />
        </div>
      </div >
      <div className="weight">
        <FaWeightHanging />
        <input
          type="number"
          value={card?.type_data?.weight || ''}
          onChange={(e: any) => handleUpdateValue('weight', e.target.value)}
        />
      </div>
    </div >
  );
};

export default CardStatsItem;