import { TbCardsFilled } from "react-icons/tb";
import useCardStore from "../../../store/useCardStore";
import useDeckStore from "../../../store/useDeckStore";
import { useNavigate } from "react-router-dom";

const GlobalSearchResults = (props: {
  searchText: string,
}) => {
  const [cards, setActiveCard, setActiveWideCard] = useCardStore((state) => [state.cards, state.setActiveCard, state.setActiveWideCard]);
  const decks = useDeckStore((state) => state.decks);
  const navigate = useNavigate();

  const results: any = [];

  if (props.searchText !== '') {
    const lowercase_search_text = props.searchText.toLowerCase();
    decks.forEach((deck) => {
      if (deck.label.toLowerCase().includes(lowercase_search_text)) {
        results.push({
          type: 'deck',
          id: deck.id,
          label: deck.label,
          background: deck.background
        });
      }
    });
    cards.forEach((card) => {
      if (card.label.toLowerCase().includes(lowercase_search_text)) {
        results.push({
          type: 'card',
          id: card.id,
          label: card.label,
          background: card.background,
          is_wide: card.isWide
        });
      }
    });
  }

  return (
    <div>
      {
        results.map((item: any) => item.type === 'card'
          ? <div className="card-link" onClick={() => item.is_wide ? setActiveWideCard(item.id) : setActiveCard(item.id)}> <TbCardsFilled />{item.label} </div>
          : <div className="deck-link" onClick={() => navigate(`/deckbook/cards?deck=${item.id}`)} > <TbCardsFilled />{item.label} </div>
        )
      }
    </div>
  );
};

export default GlobalSearchResults;