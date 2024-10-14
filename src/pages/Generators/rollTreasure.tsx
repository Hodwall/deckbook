import { rollDice, rollTable } from "./common";
import data from './treasureData.json';


const rollTreasure = (type: number) => {
  let status: string = '';
  let items: string[] = [];


  // 'Hovel (brass)',
  // 'House (silver)',
  // 'Estate (gold)',
  // 'Shrine (brass)',
  // 'Temple (gold)',
  // 'Workshop (silver)',
  // 'Wizard Home (gold)',
  // 'Chest - Open (silver)',
  // 'Chest - Secure (gold)',
  // 'Chest - Vault (gold)',
  // 'Peasant (brass)',
  // 'Citizen (silver)',
  // 'Noble (gold)',
  // 'Wizard (gold)',
  // 'Small Monster (silver)',
  // 'Large Monster (gold)',

  const item_values = ['pennies', 'shillings', 'crowns'];

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

  switch (type) {
    case 0:
      status = 'Hovel (brass)';
      if (rollDice(100) <= 50) items.push(`${rollDice(10)} pennies.`);
      if (rollDice(100) <= 10) items.push(`${rollDice(5)} shillings.`);
      if (rollDice(100) <= 1) items.push(`One crown.`);
      if (rollDice(100) <= 10) items.push(...getItems(1, rollDice(5), data.domestic_items));
      else items.push(...getItems(1, 1, data.domestic_items));
      if (rollDice(100) <= 10) items.push(...getItems(1, rollDice(5), data.cloth_items));
      else items.push(...getItems(1, 1, data.cloth_items));
      break;
    case 1:
      status = 'House (silver)';
      items.push(`${rollDice(54) + 6} pennies.`);
      items.push(`${rollDice(18) + 2} pennies.`);
      if (rollDice(100) <= 25) items.push(`${rollDice(10)} crowns.`);
      items.push(...getItems(1, rollDice(10), data.domestic_items));
      if (rollDice(100) <= 5) {
        let gem_items = rollDice(5);
        for (let i = 0; i < gem_items; i++) {
          let jewelry_type = rollDice(10) <= 5 ? rollTable(data.gem_items_basic_silver) : rollTable(data.gem_items_advanced);
          items.push(`${jewelry_type} (${rollDice(10, 2)} shillings)`);
        }
      }
      if (rollDice(100) <= 10) {
        let art_items = rollDice(2);
        for (let i = 0; i < art_items; i++) {
          items.push(`Art item (${rollDice(10) * 5} shillings)`);
        }
      }
      if (rollDice(100) <= 25) items.push(...getItems(1, rollDice(5), data.cloth_items));
      if (rollDice(100) === 1) items.push(`A Scroll!`);
      if (rollDice(100) === 1) items.push(`A random item!`);
      break;
    case 2:
      status = 'Estate (gold)';
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
      if (rollDice(100) <= 25) items.push(`${rollDice(100)} pennies.`);
      if (rollDice(100) <= 25) items.push(`${rollDice(10)} shillings.`);
      if (rollDice(100) <= 5) items.push(`${rollDice(10)} crowns.`);
      if (rollDice(100) <= 5) {
        items.push(`${rollTable(data.domestic_items)} (${rollDice(10)} shillings)`);
      }
      if (rollDice(100) <= 5) {
        let jewelry_type = rollDice(10) <= 5 ? rollTable(data.gem_items_basic_silver) : rollTable(data.gem_items_advanced);
        items.push(`${jewelry_type} (${rollDice(10, 2)} shillings)`);
      }
      if (rollDice(100) <= 5) {
        items.push(`${rollTable(data.cloth_items)} (${rollDice(10)} shillings)`);
      }
      if (rollDice(100) === 1) {
        items.push(`A Scroll!`);
      }
      break;
    case 8:
      status = 'Chest - Secure (gold)';
      items.push(`${rollDice(45) + 5} pennies.`);
      items.push(`${rollDice(27) + 3} shillings.`);
      if (rollDice(100) <= 50) items.push(`${rollDice(18) + 2} crowns.`);
      if (rollDice(100) <= 10) {
        items.push(`${rollTable(data.domestic_items)} (${rollDice(10)} crowns)`);
      }
      if (rollDice(100) <= 15) {
        let gem_items = rollDice(10);
        for (let i = 0; i < gem_items; i++) {
          let jewelry_type = rollDice(10) <= 5 ? rollTable(data.gem_items_basic_gold) : rollTable(data.gem_items_advanced);
          items.push(`${jewelry_type} (${rollDice(10, 2)} crowns)`);
        }
      }
      if (rollDice(100) <= 5) {
        items.push(`Art item (${rollDice(10) * 5} crowns)`);
      }
      if (rollDice(100) <= 15) {
        items.push(`${rollTable(data.cloth_items)} (${rollDice(10)} crowns)`);
      }
      if (rollDice(100) <= 15) {
        items.push(`A Scroll!`);
      }
      if (rollDice(100) === 1) {
        items.push(`A grimoire!`);
      }
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