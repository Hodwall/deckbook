import useCollectionStore from '../../store/useCollectionStore';
import Collection from '../../components/Collection/Collection';
import CreateCollectionDialog from '../../components/CreateCollectionDialog/CreateCollectionDialog';
import Toolbar from '../../components/Toolbar/Toolbar';
import './Collections.css';


const Collections = () => {
  const collections = useCollectionStore((state) => state.collections);

  return (
    <div className="Collections">
      <img className="background" src={'https://images.ctfassets.net/swt2dsco9mfe/1Nilq8hMUskR3Yi9U83VCK/a0880689c08bd4ec189ac2e9cb9515ab/1920x1342-oiwAqx0sa.jpg?q=70'} />
      <div className="title">COLLECTIONS</div>
      <Toolbar>
        <CreateCollectionDialog />
      </Toolbar>
      <div className="results">
        {
          collections.map((c) => <Collection data={c} />)
        }
      </div>
    </div>
  );
};

export default Collections;