import { useState, useEffect, useMemo } from "react";
import useCardStore from "../../store/useCardStore";
import Tag from "../../components/Tag/Tag";
import './TagSearch.css';


const TagSearch = (props: {
  activeTags: string[],
  addHandler: Function,
  canCreate?: boolean,
}) => {
  const cards = useCardStore((state) => state.cards);

  const tags = useMemo(() => {
    return cards.reduce((results: string[], card: any) => {
      card.tags.forEach((tag: string) => {
        if (!results.includes(tag)) {
          results.push(tag);
        }
      });
      return results;
    }, []);
  }, [cards]);

  const filtered_tags = useMemo(() => {
    return tags.reduce((results: string[], tag: string) => {
      if (!props.activeTags.includes(tag)) {
        results.push(tag);
      }
      return results;
    }, []);
  }, [props.activeTags]);

  const [searchString, setSearchString] = useState('');
  const [searchTagResults, setSearchTagResults] = useState(filtered_tags);

  useEffect(() => {
    if (!searchString || searchString === '') {
      setSearchTagResults(filtered_tags);
    } else {
      setSearchTagResults(searchTagResults.reduce((results: string[], tag: string) => {
        if (tag.search(searchString) !== -1) results.push(tag);
        return results;
      }, []));
    }
  }, [searchString, props.activeTags]);

  const handleSearchKeyDown = (e: any) => {
    if (props.canCreate) {
      if ((e.key === 'Enter') && (searchString.length > 0) && (searchString !== '')) {
        if (props.addHandler) props.addHandler(searchString);
        setSearchString('');
      }
    }
  };

  return (
    <div className={'TagSearch'}>
      <div className="tag-search-results">
        {
          searchTagResults.map((tag) => (
            <Tag
              className={'tag-result'}
              label={tag}
              onClick={() => {
                if (props.addHandler) props.addHandler(tag);
                setSearchString('');
              }}
              canDelete
            />
          ))
        }
      </div>
      <input
        type="text"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        onKeyDown={handleSearchKeyDown}
      />
    </div>
  );
};

export default TagSearch;