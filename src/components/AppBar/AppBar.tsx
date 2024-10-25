import { useEffect, useState } from 'react';
import { FaDiceD20, FaMap } from "react-icons/fa";
import { MdAutoStories, MdHelp, MdLayers, MdMenu, MdSettings, MdWebStories } from 'react-icons/md';
import { PiCodeFill, PiLockLaminatedOpenDuotone } from "react-icons/pi";
import { SiBuymeacoffee } from "react-icons/si";
import { NavLink, useLocation } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';
import styles from './AppBar.module.css';
import DeckPanel from './panels/DeckPanel';
import PinnedCardsPanel from './panels/PinnedCardsPanel';
import TagsPanel from './panels/TagsPanel';
import CreateSetDialog from './components/CreateSetDialog';
import CreateCardDialog from './components/CreateCardDialog';
import CreateDeckDialog from './components/CreateDeckDialog';
import PinnedDecksPanel from './panels/PinnedDecksPanel';
import { MdSearch } from "react-icons/md";
import GlobalSearchResults from './components/GlobalSearchResults';


const AppBar = () => {
  const location = useLocation();
  const [isPanelHidden, setIsPanelHidden] = useState(false);
  const [section, setSection] = useState('base');
  const [globalSearchText, setGlobalSearchText] = useState('');

  let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  let panel_open_width = vw < 1500 ? 290 : 430;

  const animation = useSpring({
    width: isPanelHidden ? 0 : panel_open_width,
    opacity: isPanelHidden ? 0 : 1,
    config: { mass: 15, friction: 300, tension: 2000 }
  });

  useEffect(() => {
    setIsPanelHidden(false);
  }, [location]);

  const getSectionContent = () => {
    switch (section) {
      case 'base':
        if (location.pathname === '/deckbook/cards') {
          return <>
            <DeckPanel />
            <CreateCardDialog />
            <TagsPanel />
            <PinnedCardsPanel />
          </>;
        } else if (location.pathname === '/deckbook/sets') {
          return <>
            <CreateSetDialog />
            <span>LOAD / SAVE SETS</span>
          </>;
        } else if (location.pathname === '/deckbook/decks') {
          return <>
            <CreateDeckDialog />
            <PinnedDecksPanel />
          </>;
        }
      case 'combat':
        return 'COMBAT TOOLS AND INITIATIVE TRACKER';
      case 'party':
        return 'NETWORK PARTY CHAT AND TOOLS.';
      case 'calendar':
        return 'CALENDAR, TRACKERS AND JOURNAL ENTRIES (NOTES)';
    }
  };

  return (
    <div className={styles.AppBar}>
      <animated.div className={`${styles.content} ${isPanelHidden && 'hidden'}`} style={{ ...animation }}>
        <div className={styles.logo}>· DECKBOOK ·</div>
        <div className={styles.global_search}>
          <MdSearch />
          <input type="text" placeholder={'Find anything ...'} value={globalSearchText} onChange={(e) => setGlobalSearchText(e.target.value)} />
          <span onClick={() => setGlobalSearchText('')}>CLEAR</span>
        </div>
        {
          !isPanelHidden &&
            globalSearchText !== ''
            ? <GlobalSearchResults searchText={globalSearchText} />
            : <>
              <div className={styles.contentNav}>
                <div className={section === 'base' ? 'active' : ''} onClick={() => setSection('base')}>BASE</div>
                <div className={section === 'combat' ? 'active' : ''} onClick={() => setSection('combat')}>COMBAT</div>
                <div className={section === 'party' ? 'active' : ''} onClick={() => setSection('party')}>PARTY</div>
                <div className={section === 'journal' ? 'active' : ''} onClick={() => setSection('journal')}>JOURNAL</div>
              </div>
              {getSectionContent()}
            </>
        }
        <div className={styles.panelHeader} style={{ marginTop: 'auto' }}><PiCodeFill />Version: 0.9.1.7 / Screen Width: {vw}px</div>
      </animated.div>
      <div className={styles.navigation}>
        <button onClick={() => setIsPanelHidden(!isPanelHidden)}><MdMenu /></button>
        <hr />
        <NavLink to="/deckbook/sets" className={({ isActive }) => isActive ? 'active' : ''}><MdAutoStories /></NavLink>
        <NavLink to="/deckbook/cards" className={({ isActive }) => isActive ? 'active' : ''}><MdWebStories /></NavLink>
        <NavLink to="/deckbook/decks" className={({ isActive }) => isActive ? 'active' : ''}><MdLayers /></NavLink>
        <hr />
        <NavLink to="/deckbook/maps" className={({ isActive }) => isActive ? 'active' : ''}><FaMap /></NavLink>
        <hr />
        <NavLink to="/deckbook/generators" className={({ isActive }) => isActive ? 'active' : ''}><FaDiceD20 /></NavLink>
        <div className={styles.navigation_end}>
          <button><MdSettings /></button>
          <button><MdHelp /></button>
          <button><SiBuymeacoffee /></button>
        </div>
      </div>
    </div>
  );
};

export default AppBar;