import { MdWebStories, MdAutoStories, MdLayers, MdSettings, MdHelp, MdDashboard, MdCollectionsBookmark } from 'react-icons/md';
import { SiBuymeacoffee } from "react-icons/si";
import { FaMap } from "react-icons/fa";
import AppBarButton from './AppBarButton';
import './AppBar.css';


const AppBar = () => {
  return (
    <div className="AppBar">
      <AppBarButton section={'libraries'}><MdAutoStories /></AppBarButton>
      <AppBarButton section={'board'}><MdDashboard /></AppBarButton>
      <AppBarButton section={'decks'}><MdLayers /></AppBarButton>
      <hr />
      <AppBarButton section={'collections'}><MdCollectionsBookmark /></AppBarButton>
      <AppBarButton section={'cards'}><MdWebStories /></AppBarButton>
      <hr />
      <AppBarButton section={'maps'}><FaMap /></AppBarButton>
      <div className="bottom-buttons">
        <AppBarButton section={'settings'} disabled><MdSettings /></AppBarButton>
        <AppBarButton section={'help'} disabled><MdHelp /></AppBarButton>
        <AppBarButton section={'about'} disabled><SiBuymeacoffee /></AppBarButton>
      </div>
    </div>
  );
};

export default AppBar;