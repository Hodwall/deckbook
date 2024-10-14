import { useMemo, useState } from "react";
import { BiSolidLockAlt, BiSolidLockOpenAlt } from "react-icons/bi";
import { IoMdPricetag, IoMdSearch } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import TagSearch from "../../TagSearch/TagSearch";
import useDeckStore from "../../../store/useDeckStore";
import useTagStore from "../../../store/useTagStore";
import Dialog from "../../Dialog/Dialog";
import Tag from "../../Tag/Tag";
import styles from '../AppBar.module.css';


const TagsPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [active_tags, setActiveTags] = useTagStore((state) => [state.active_tags, state.setActiveTags]);
  const [decks, addTagToDeck, removeTagFromDeck] = useDeckStore((state) => [state.decks, state.addTagToDeck, state.removeTagFromDeck]);
  const [isTagsEditable, setIsTagsEditable] = useState(false);
  const [showSearchDialog, setShowSearchDialog] = useState(false);

  const deck = useMemo(() => {
    const deck_id = searchParams.get('deck');
    const deck = decks.find((d) => deck_id ? d.id === +deck_id : null);
    setIsTagsEditable(!deck);

    if (deck) setActiveTags(deck.tags);
    // setActiveTags(deck ? deck.tags : []);
    return deck;
  }, [searchParams]);

  const handleTagRemove = (tag: string) => {
    if (deck) {
      if (isTagsEditable) {
        removeTagFromDeck(deck.id, tag);
        setActiveTags([...active_tags.filter((t) => t !== tag)]);
      }
    } else {
      setActiveTags([...active_tags.filter((t) => t !== tag)]);
    }
  };

  const handleTagAdd = (tag: string) => {
    if (deck) {
      if (isTagsEditable) {
        if (deck) addTagToDeck(deck.id, tag);
        setActiveTags([...active_tags, tag]);
      }
    } else {
      setActiveTags([...active_tags, tag]);
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <IoMdPricetag />TAGS
        <div className={styles.panelHeader_end}>
          <Dialog
            label={'ADD TAGS'}
            height="20em"
            width="30em"
            disabled={!isTagsEditable}
            trigger={
              <button
                disabled={!isTagsEditable}
                onClick={() => setShowSearchDialog(true)}
              >
                <IoMdSearch />
              </button>
            }
          >
            <div className={styles.TagsPanel_dialog}>
              <TagSearch activeTags={active_tags} addHandler={handleTagAdd} />
            </div>
          </Dialog >
          {
            deck &&
            <button
              className={!isTagsEditable ? styles.locked : ''}
              onClick={() => setIsTagsEditable(!isTagsEditable)}
            >
              {isTagsEditable ? <BiSolidLockOpenAlt /> : <BiSolidLockAlt />}
            </button>
          }
        </div>
      </div>
      <div className={styles.TagsPanel_list}>
        {
          active_tags.map((tag) =>
            <Tag
              label={tag}
              className={isTagsEditable || !deck ? 'can-remove' : ''}
              onClick={() => handleTagRemove(tag)}
            />
          )
        }
      </div>
    </div>
  );
};

export default TagsPanel;