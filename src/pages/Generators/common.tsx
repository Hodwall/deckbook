export interface ITable {
  length: number,
  items: any[][];
}

export const rollTable = (table: ITable | string[], dice?: number) => {
  let roll = rollDice(table.length, dice);
  if (Array.isArray(table)) {
    return table[roll - 1];
  } else {
    return table.items.find((item) => roll <= item[0])?.[1] || '';
  }
};

export const rollDice = (dice: number, rolls?: number) => {
  if (rolls) {
    let result = 0;
    for (let i = 0; i < rolls; i++) {
      result += Math.floor(Math.random() * (dice - 1 + 1) + 1);
    }
    return result;
  } else {
    return Math.floor(Math.random() * (dice - 1 + 1) + 1);
  }
};