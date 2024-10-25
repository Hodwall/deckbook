import rollTreasure from "../../../pages/Generators/rollTreasure";
import styles from '../CardContent.module.css';


const GeneratorsMenu = (props: {
  handleGenerateList: (header: string, items: string[]) => void,
}) => {
  return (
    <div className={styles.GeneratorsMenu}>
      <div className={styles.generators__navbar}>
        {/* <div>WFRP4E</div>
        <div>DND5</div> */}
      </div>
      <div className={styles.generators__list}>
        <button onClick={() => {
          const treasure = rollTreasure(0);
          return props.handleGenerateList(treasure.status, treasure.items);
        }}>
          <span>Hovel (brass)</span>
          <span>The hut, cottage or hovel of a peasant.</span>
        </button>
        <button onClick={() => {
          const treasure = rollTreasure(1);
          return props.handleGenerateList(treasure.status, treasure.items || []);
        }}>
          <span>House (silver)</span>
          <span>The home of the burgeoning middle-class such as a small-time merchant, shop-keeper, tradesman or scholar.</span>
        </button>
        <button onClick={() => {
          const treasure = rollTreasure(2);
          return props.handleGenerateList(treasure.status, treasure.items || []);
        }}>
          <span>State (gold)</span>
          <span>The mansion or secondary home of the richest members of society, such as wnealthy merchants, gentry or aristocrats.</span>
        </button>
        <button onClick={() => {
          const treasure = rollTreasure(7);
          return props.handleGenerateList(treasure.status, treasure.items || []);
        }}>
          <span>Chest - Open (silver)</span>
          <span></span>
        </button>
        <button onClick={() => {
          const treasure = rollTreasure(8);
          return props.handleGenerateList(treasure.status, treasure.items || []);
        }}>
          <span>Chest - Secure (gold)</span>
          <span></span>

        </button>
      </div>
    </div>
  );
};

export default GeneratorsMenu;