import { MdWebStories, MdAutoStories, MdLayers, MdSettings, MdHelp } from 'react-icons/md';
import AppBarButton from './AppBarButton';
import './AppBar.css';


const AppBar = () => {
  return (
    <div className="AppBar">
      <AppBarButton section={'collections'}><MdAutoStories /></AppBarButton>
      <AppBarButton section={'decks'}><MdLayers /></AppBarButton>
      <AppBarButton section={'cards'}><MdWebStories /></AppBarButton>
      <div className="AppBar-bottom">
        <AppBarButton section={'settings'} disabled><MdSettings /></AppBarButton>
        <AppBarButton section={'help'} disabled><MdHelp /></AppBarButton>
        <AppBarButton section={'about'} disabled>A</AppBarButton>
      </div>
    </div>
  );
};

export default AppBar;