import { useState, useEffect, useMemo } from "react";
import useTagStore, { ITag } from "../store/useTagStore";
import useCollectionStore from "../store/useCollectionStore";
import Tag from "../components/Tag/Tag";
import './TagSearch.css';


const TagSearch = (props: {
  type: 'card' | 'deck',
  taggableElement: any,
  addHandler: Function,
}) => {
  const [tags, createTag] = useTagStore((state) => [state.tags, state.createTag]);
  const active_collection = useCollectionStore((state) => state.active_collection);

  const collection_tags = tags.filter((tag) => tag.collection_id === active_collection);

  const filteredTags = collection_tags.reduce((results: any[], item: any) => {
    let tag_found = false;
    props.taggableElement?.tags.forEach((t: any) => {
      if (t.id === item.id) {
        tag_found = true;
      }
    });
    if (!tag_found) {
      results.push(item);
    }
    return results;
  }, []);

  const [searchString, setSearchString] = useState('');
  const [searchTagResults, setSearchTagResults] = useState(filteredTags);

  useEffect(() => {
    if (!searchString || searchString === '') {
      setSearchTagResults(filteredTags);
    } else {
      setSearchTagResults(searchTagResults.reduce((results: ITag[], item: ITag) => {
        if (item.label.search(searchString) !== -1) results.push(item);
        return results;
      }, []));
    }
  }, [searchString, props.taggableElement?.tags]);

  const handleSearchKeyDown = (e: any) => {
    if ((e.key === 'Enter') && (searchString.length > 0) && (searchString !== '')) {
      if (props.type === 'card') {
        createTag(searchString, props.taggableElement.id);
      } else {
        createTag(searchString, undefined, props.taggableElement.id);
      }
      setSearchString('');
    }
  };

  return (
    <div className={'TagSearch'}>
      <div className="tag-search-results">
        {
          searchTagResults.map((tag) => (
            <Tag
              id={tag.id}
              label={tag.label}
              className={'tag-result'}
              onClick={() => {
                setSearchTagResults(searchTagResults.filter((t) => t.label != tag.label));
                props.addHandler(props.taggableElement.id, { id: tag.id, label: tag.label });
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