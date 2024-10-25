import { rollDice, rollTable } from "./common";
import data from './treasureData.json';


const rollTreasure = (type: number) => {
  let status: string = '';
  let items: string[] = [];



  /*
    treasures
      brass
          


      silver
        hoard
        npc
        monster
        chest
      gold
        hoard
        npc
        monster
        chest

  */




  /* LOCATIONS */
  // 'Hovel (brass)',
  // 'House (silver)',
  // 'Estate (gold)',

  // 'Shrine (brass)',
  // 'Temple (gold)',
  // 'Workshop (silver)',
  // 'Wizard Home (gold)',

  /* CHESTS */
  // 'Chest - Open (silver)',
  // 'Chest - Secure (gold)',
  // 'Chest - Vault (gold)',

  /* NPCs */
  // 'Peasant (brass)',
  // 'Citizen (silver)',
  // 'Noble (gold)',
  // 'Wizard (gold)',

  /* CREATURES */
  // 'Small Monster (silver)',
  // 'Large Monster (gold)',


  const item_values = ['pennies', 'shillings', 'crowns'];

  // base_value: 0-brass, 1-silver, 2-gold
  const getItems = (base_value: number, amount: number, data: any) => {
    const to_return = [];
    for (let i = 0; i < amount; i++) {
      if (rollDice(100) <= 25) base_value++;
      if (rollDice(100) <= 25) base_value--;
      if (base_value > 2) base_value = 2;
      else if (base_value < 0) base_value = 0;
      to_return.push(`${rollTable(data)} (${rollDice(10)} ${item_values[base_value]})`);
    }
    return to_return;
  };

  const getBasicItems = (base_value: number, amount: number) => {
    let items = [];
    for (let i = 0; i < amount; i++) {
      const roll = rollDice(100);
      switch (true) {
        case (roll < 50):
          items.push(...getItems(base_value, 1, data.basic_items.domestic_items));
          break;
        case (roll < 75):
          items.push(...getItems(base_value, 1, data.basic_items.food_items));
          break;
        default:
          items.push(...getItems(base_value, 1, data.basic_items.trade_items));
          break;
      }
    }
    return items;
  };

  switch (type) {
    case 0:
      status = 'Hovel (brass)';
      // coins
      if (rollDice(100) <= 50) items.push(`${rollDice(10)} ${rollDice(8) === 8 ? 'imperial ' : ''}pennies.`);
      if (rollDice(100) <= 10) items.push(`${rollDice(5)} ${rollDice(8) === 8 ? 'imperial ' : ''}shillings.`);
      if (rollDice(100) <= 1) items.push(`One ${rollDice(8) === 8 ? 'imperial ' : ''}crown.`);
      // basic items
      if (rollDice(100) <= 10) items.push(...getBasicItems(0, rollDice(5)));
      // equipment and clothes
      if (rollDice(100) <= 10) items.push(...getItems(0, rollDice(5), data.cloth_items));
      // if nothing else ...
      if (items.length < 1) items.push(`${rollDice(10)} ${rollDice(8) === 8 ? 'imperial ' : ''}pennies.`);
      break;
    case 1:
      status = 'House (silver)';
      // coins
      items.push(`${rollDice(54) + 6} ${rollDice(8) === 8 ? 'imperial ' : ''}pennies.`);
      items.push(`${rollDice(18) + 2} ${rollDice(8) === 8 ? 'imperial ' : ''}shillings.`);
      if (rollDice(100) <= 25) items.push(`${rollDice(10)} ${rollDice(8) === 8 ? 'imperial ' : ''}crowns.`);
      // basic items
      items.push(...getBasicItems(1, rollDice(10)));
      // gems and jewelry
      if (rollDice(100) <= 5) {
        let gem_items = rollDice(5);
        for (let i = 0; i < gem_items; i++) {
          let jewelry_type = rollDice(10) <= 5 ? rollTable(data.gem_items_basic_silver) : rollTable(data.gem_items_advanced);
          items.push(`${jewelry_type} (${rollDice(10, 2)} ${rollDice(8) === 8 ? 'imperial ' : ''}shillings)`);
        }
      }
      // art items
      if (rollDice(100) <= 10) {
        let art_items = rollDice(2);
        for (let i = 0; i < art_items; i++) {
          items.push(`Art item (${rollDice(10) * 5} ${rollDice(8) === 8 ? 'imperial ' : ''}shillings)`);
        }
      }
      // equipment and clothes
      if (rollDice(100) <= 25) items.push(...getItems(1, rollDice(5), data.cloth_items));
      // magic scroll
      if (rollDice(100) === 1) items.push(`A Scroll!`);
      // random item?
      if (rollDice(100) === 1) items.push(`A random item!`);
      break;
    case 2:
      status = 'Estate (gold)';
      // coins
      items.push(`${rollDice(198) + 2} ${rollDice(8) === 8 ? 'imperial ' : ''}pennies.`);
      items.push(`${rollDice(100)} ${rollDice(8) === 8 ? 'imperial ' : ''}shillings.`);
      items.push(`${rollDice(100)} ${rollDice(8) === 8 ? 'imperial ' : ''}crowns.`);
      // basic items
      items.push(...getBasicItems(2, rollDice(18) + 2));
      // gems and jewelry
      if (rollDice(100) <= 90) {
        let gem_items = rollDice(10);
        for (let i = 0; i < gem_items; i++) {
          let jewelry_type = rollDice(10) <= 5 ? rollTable(data.gem_items_basic_silver) : rollTable(data.gem_items_advanced);
          items.push(`${jewelry_type} (${rollDice(10, 2)} ${rollDice(8) === 8 ? 'imperial ' : ''}shillings)`);
        }
      }
      // art items
      if (rollDice(100) <= 75) {
        let art_items = rollDice(10);
        for (let i = 0; i < art_items; i++) {
          items.push(`Art item (${rollDice(10) * 5} ${rollDice(8) === 8 ? 'imperial ' : ''}shillings)`);
        }
      }
      // equipment and clothes
      items.push(...getItems(2, rollDice(10), data.cloth_items));
      // magic scroll
      if (rollDice(100) <= 5) items.push(`A Scroll!`);
      // random item?
      if (rollDice(100) <= 5) items.push(`A random item!`);
      break;
    case 3:
      status = 'Shrine (brass)';
      break;
    case 4:
      status = 'Temple (gold)';
      break;
    case 5:
      status = 'Workshop (silver)';
      break;
    case 6:
      status = 'Wizard Home (gold)';
      break;




    case 7:
      status = 'Chest - Open (silver)';
      // coins
      if (rollDice(100) <= 25) items.push(`${rollDice(100)} ${rollDice(8) === 8 ? 'imperial ' : ''}pennies.`);
      if (rollDice(100) <= 25) items.push(`${rollDice(10)} ${rollDice(8) === 8 ? 'imperial ' : ''}shillings.`);
      if (rollDice(100) <= 5) items.push(`${rollDice(10)} ${rollDice(8) === 8 ? 'imperial ' : ''}crowns.`);
      // basic items
      if (rollDice(100) <= 5) items.push(`${getBasicItems(1, 1)}`);
      // gems and jewelry
      if (rollDice(100) <= 5) {
        let jewelry_type = rollDice(10) <= 5 ? rollTable(data.gem_items_basic_silver) : rollTable(data.gem_items_advanced);
        items.push(`${jewelry_type} (${rollDice(10, 2)} ${rollDice(8) === 8 ? 'imperial ' : ''}shillings)`);
      }
      // equipment and clothes
      if (rollDice(100) <= 5) {
        items.push(`${rollTable(data.cloth_items)} (${rollDice(10)} ${rollDice(8) === 8 ? 'imperial ' : ''}shillings)`);
      }
      // scroll
      if (rollDice(100) === 1) {
        items.push(`A Scroll!`);
      }
      break;

    case 8:
      status = 'Chest - Secure (gold)';
      // coins
      items.push(`${rollDice(45) + 5} ${rollDice(8) === 8 ? 'imperial ' : ''}pennies.`);
      items.push(`${rollDice(27) + 3} ${rollDice(8) === 8 ? 'imperial ' : ''}shillings.`);
      if (rollDice(100) <= 50) items.push(`${rollDice(18) + 2} ${rollDice(8) === 8 ? 'imperial ' : ''}crowns.`);
      // basic items
      if (rollDice(100) <= 10) items.push(`${getBasicItems(2, 1)}`);
      // gems and jewelry
      if (rollDice(100) <= 15) {
        let gem_items = rollDice(10);
        for (let i = 0; i < gem_items; i++) {
          let jewelry_type = rollDice(10) <= 5 ? rollTable(data.gem_items_basic_gold) : rollTable(data.gem_items_advanced);
          items.push(`${jewelry_type} (${rollDice(10, 2)} ${rollDice(8) === 8 ? 'imperial ' : ''}crowns)`);
        }
      }
      // art items
      if (rollDice(100) <= 5) {
        items.push(`Art item (${rollDice(10) * 5} ${rollDice(8) === 8 ? 'imperial ' : ''}crowns)`);
      }
      // equipment and clothes
      if (rollDice(100) <= 15) {
        items.push(`${rollTable(data.cloth_items)} (${rollDice(10)} ${rollDice(8) === 8 ? 'imperial ' : ''}crowns)`);
      }
      // scroll
      if (rollDice(100) <= 15) {
        items.push(`A Scroll!`);
      }
      // grimoire
      if (rollDice(100) === 1) {
        items.push(`A grimoire!`);
      }
      // random item?
      if (rollDice(100) === 1) {
        items.push(`A random item!`);
      }
      break;

    case 9:
      status = 'Chest - Vault (gold)';
      break;




    case 10:
      status = 'Peasant (brass)';
      break;
    case 11:
      status = 'Citizen (silver)';
      break;
    case 12:
      status = 'Noble (gold)';
      break;
    case 13:
      status = 'Wizard (gold)';
      break;
    case 14:
      status = 'Small Monster (silver)';
      break;
    case 15:
      status = 'Large Monster (gold)';
      break;
  }
  return { status, items };
};

export default rollTreasure;