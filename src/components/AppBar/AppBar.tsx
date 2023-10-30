import { MdWebStories, MdAutoStories, MdLayers, MdSettings, MdHelp } from 'react-icons/md';
import AppBarButton from './AppBarButton';
import './AppBar.css';


const AppBar = () => {
	return (
		<div className="AppBar">
			<AppBarButton section={'collections'}><MdAutoStories /></AppBarButton>
			<AppBarButton section={'decks'}><MdLayers /></AppBarButton>
			<AppBarButton section={'cards'}><MdWebStories /></AppBarButton>
			-
			<AppBarButton section={'settings'}><MdSettings /></AppBarButton>
			<AppBarButton section={'help'}><MdHelp /></AppBarButton>
			<AppBarButton section={'about'}>A</AppBarButton>
		</div>
	);
};

export default AppBar;