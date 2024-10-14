import { ITable, rollTable, rollDice } from './common';
import data from './territoryData.json';


const rollCave = () => {
  const cave_ecosystem = rollTable(data.cave_ecosystems);
  const cave_entrances_amount: ITable = {
    length: 100,
    items: [[10, 0], [50, 1], [75, 2], [90, 3], [99, rollDice(4) + 2], [100, rollDice(4, 2) + 2]]
  };
  const cave_entrances_number = +rollTable(cave_entrances_amount);
  const cave_size = rollTable(data.cave_sizes);
  const entrances: { [key: string]: number; } = data.cave_entrance_types.items.reduce((prev, current) => {
    return { ...prev, [current[1]]: 0 };
  }, {});
  for (let i = 0; i < cave_entrances_number; i++) {
    entrances[rollTable(data.cave_entrance_types)]++;
  }
  let entrances_description = '';
  if (cave_entrances_number > 0) {
    Object.keys(entrances).forEach((entrance) => {
      if (entrances[entrance] > 0) {
        entrances_description += `${entrances[entrance]} ${entrance} entrance${entrances[entrance] > 1 ? 's' : ''}. `;
      }
    });
  } else {
    entrances_description = 'No surface entrances. ';
  }
  let cave_uninhabited = '';
  if (rollDice(20) === 1) {
    cave_uninhabited = 'The cave looks uninhabited.';
    cave_uninhabited += (rollDice(6) <= 3) ? ' Something has made its dwellers leave.' : '';
  }
  return {
    name: 'Cave',
    visibility: rollVisibility(),
    description: `${cave_size} caves. ${cave_ecosystem} environment. ${entrances_description} ${cave_uninhabited}`
  };
};

const rollElevation = () => {
  const elevation_origin = rollTable(data.elevation_origins);
  const elevation_direction = rollTable(data.elevation_directions);
  const elevation_rate = rollTable(data.elevation_rates);
  const elevation_size = rollTable(data.elevation_sizes);
  return {
    name: 'Terrain elevation',
    visibility: rollVisibility(),
    description: `A ${elevation_size}, ${elevation_rate} ${elevation_direction} of the terrain. It looks ${elevation_origin}.`
  };
};

const rollRocks = () => {
  const rocks_type = rollTable(data.rocks_types);
  const rocks_size = rollTable(data.rocks_sizes);
  const rocks_origin = rollTable(data.rocks_origins);
  let rocks_feature = '';
  if (rollDice(6) === 1) {
    switch (rollTable(data.rocks_features)) {
      case 'writing':
        switch (rollDice(6)) {
          case 1:
            rocks_feature = 'The rocks have meaningless writting or symbols scattered upon them.';
            break;
          case 2:
            rocks_feature = (rollDice(6) <= 4)
              ? 'A formula for a spell seems to be engraved on the rocks.'
              : 'A formula for a magical item seems to be engraved on the rocks.';
            break;
          case 3:
            rocks_feature = (rollDice(6) <= 4)
              ? 'A prophecy for events yet to come is written on the rocks.'
              : 'A prophecy for already happened events is written on the rocks.';
            if (rollDice(6) <= 2) rocks_feature += ' These are clearly the ramblings of a lunatic.';
            break;
          case 4:
            let roll_ = rollDice(6);
            if (roll_ <= 2) rocks_feature = 'An engraved map seems to lead to treasure.';
            else if (roll_ <= 4) rocks_feature = 'An engraved map seems to detail the sorrounding territory.';
            else rocks_feature = 'An engraved map seems to lead to a nearby territory.';
            break;
          case 5:
            rocks_feature = 'The rocks seem to contain valuable minerals or resources.';
            break;
          case 6:
            roll_ = rollDice(4);
            if (roll_ === 1) rocks_feature = 'The rocks seem engraved with a record of historical events.';
            if (roll_ === 2) rocks_feature = 'The rocks are engraved with a warning about dangers in the area. Reveals the lair of monsters in the territory.';
            if (roll_ === 3) rocks_feature = 'Some rocks have an engraved symbol. A hunting mark, maybe a guild sign. Reveals the lair of animals in the territory.';
            if (roll_ === 4) rocks_feature = 'A rock is engraved with directions. Reveals the human locations in the territory.';
            break;
        }
        break;
      case 'arranged':
        rocks_feature = 'The rocks seem to be arranged in a specific pattern.';
        if (rollDice(6) <= 4) rocks_feature += ' The pattern can only be discerned from above.';
        const roll_ = rollDice(3);
        if (roll_ === 1) rocks_feature += ' The pattern is of a random shape or arrangement, with no discernible meaning.';
        if (roll_ === 2) rocks_feature += ' The pattern is mundane in nature, forming a shape or image. Its use or meaning, a mistery.';
        if (roll_ === 3) rocks_feature += ' There is power in the pattern. ';
        break;
      case 'magical':
        rocks_feature = 'The rocks are clearly magical. ';
        break;
    }
  }
  return {
    name: 'Rock formation',
    visibility: rollVisibility(),
    description: `A ${rocks_size} ${rocks_type}. They look ${rocks_origin}. ${rocks_feature}`
  };
};

const rollBurialGrounds = () => {
  const burial_ground_age = rollTable(data.burial_ground_ages);
  const burial_ground_size = rollTable(data.burial_ground_sizes);
  const burial_ground_style = [
    'left to be exposed to the elements.',
    'buried in a mass grave.',
    'buried under wooden markers.',
    'buried under stone tombstones.',
    'buried inside mausoleums or crypts.',
    'ritually exposed to the elements.',
    'exposed in punishment, as a warning.',
    'buried in unmarked graves.',
    'sealed magically (turned to stone or trees, frozen in ice, embedded in amber, ...).'
  ];
  const burial_ground_style_roll = rollDice(9) - 1;
  let burial_ground_style_desc = '';
  if (burial_ground_style_roll >= 2 && burial_ground_style_roll <= 4) {
    if (rollDice(3) === 1) {
      burial_ground_style_desc = 'The graves have some writing on them,';
      const burial_ground_style_descriptions: ITable = {
        length: 6,
        items: [
          [2, ' describing the name of the deceased.'],
          [4, ' some a meaningful passage, others a prayer.'],
          [5, ' describing how they died.'],
          [6, ' but the writing is illegible.'],
        ]
      };
      burial_ground_style_desc += rollTable(burial_ground_style_descriptions);
    }
  }
  let burial_ground_hallowing_desc = '';
  if (rollDice(6) <= 1 + data.burial_ground_sizes.indexOf(burial_ground_size + '')) {
    const burial_ground_hallowings = rollTable({ length: 3, items: [[3, 1], [5, 2], [6, 3]] });
    const burial_ground_hallowing_effects = [
      'the dead walk.',
      'the dead resist.',
      'the dead persist.',
      'the dead protest.',
      'evil permeates.',
      'the dead hunger.',
      'the dead corrupt.',
      'the dead speak.'
    ];
    burial_ground_hallowing_desc = 'This place has been unhallowed! Here, ';
    for (let i = 0; i < +burial_ground_hallowings; i++) {
      burial_ground_hallowing_desc += rollTable(burial_ground_hallowing_effects);
    }
  }
  return {
    name: 'Burial grounds',
    visibility: rollVisibility(),
    description: `${burial_ground_age} ${burial_ground_size} burial grounds. The dead are ${burial_ground_style[rollDice(9) - 1]} ${burial_ground_style_desc} ${burial_ground_hallowing_desc}`
  };
};

const rollMonument = () => {
  let monument_name = '';
  const monument_age = rollTable(data.monument_ages);
  const monument_size = rollTable(data.monument_sizes);
  const monument_material = rollTable(data.monument_materials);
  const monument_purpose = rollTable(data.monument_purposes);
  let monument_type_desc = '';
  switch (rollTable(data.monument_type)) {
    case 'statue':
      monument_name = 'Statue';
      const statue_amount = rollDice(6) <= 4 ? 'one statue' : 'several statues';
      const statue_depiction = rollTable(data.monument_statues_depiction);
      monument_type_desc = `It takes the form of ${statue_amount}, depicting ${statue_amount === 'one statue' ? 'a' : ''} ${statue_depiction}${statue_amount !== 'one statue' ? 's' : ''}.`;
      if (rollDice(6) <= 2) {
        monument_type_desc += ' The statue features seem to have been';
        monument_type_desc += (rollDice(2) === 1)
          ? ' erased by the passage of time.'
          : ' defaced in an act of vandalism.';
      }
      break;
    case 'obelisk':
      monument_name = 'Obelisk';
      monument_type_desc = `An obelisk standing tall among its sorroundings.`;
      if (rollDice(6) <= 2) monument_type_desc += ` Its sorrounded by ${rollDice(8) + 1} columns.`;
      break;
    case 'megalith':
      monument_name = 'Megalith';
      monument_type_desc = `An imponent megalith arranged solemnly.`;
      break;
    case 'arch':
      monument_name = 'Arch';
      monument_type_desc = `An arch monument, engraved with depictions of the honored. `;
      break;
    case 'temple':
      monument_name = 'Temple';
      monument_type_desc = rollTable(data.monument_temple_styles) + '';
      break;
    case 'fountain':
      monument_name = 'Fountain';
      monument_type_desc = 'A fountain or water feature. ';
      break;
    case 'magic':
      monument_name = 'Magic monument';
      monument_type_desc = 'A feature of arcane nature. ';
      break;
  }
  if (rollDice(6) <= 3) {
    monument_type_desc += ' It is engraved with writing';
    monument_type_desc += (rollDice(6) <= 2)
      ? ', but time and the elements have obscured most of it.'
      : '.';
    monument_type_desc += (rollDice(6) <= 2)
      ? ' The writing seems to be in a forgotten language no longer known to man.'
      : '';
  }
  let monument_special_quality = '';
  if (rollDice(20) === 1) {
    switch (rollDice(6)) {
      case 1:
        monument_special_quality = 'This place provides a clue to a mystery or points the way to something relevant. ';
        break;
      case 2:
        monument_special_quality = 'This monument radiates magical energy, being the focal point of an active spell. ';
        break;
      case 3:
        monument_special_quality = 'The monument is actually a device designed to capture ley line energy. ';
        if (rollDice(6) <= 2) monument_special_quality += 'The ley line seems to have shifted and the monument lays inactive.';
        break;
      case 4:
        monument_special_quality = 'The monument serves as a prison for a powerful being.';
        break;
      case 5:
        monument_special_quality = 'If touched or manipulated, the monument will ';
        if (rollDice(6) <= 3) {
          monument_special_quality += 'provide a boon.';
          monument_special_quality += (rollDice(6) <= 2) ? 'But only to those who present a worthy sacrifice.' : '';
        } else {
          monument_special_quality += 'inflict a bane.';
        }
        break;
      case 6:
        monument_special_quality = 'The monument serves as an arcane portal. ';
        break;
    }
  }
  let monument_interior = '';
  if (rollDice(6) <= 2) {
    monument_interior = `A ${rollTable(data.monument_interior_entrances)} entrance leads to the interior of the monument.`;
  }
  return {
    name: monument_name,
    visibility: rollVisibility(),
    description: `${monument_age}, ${monument_size} monument. Built in ${monument_material} ${monument_purpose} ${monument_type_desc} ${monument_interior}`
  };
};

const rollDwelling = () => {
  let dwelling_name = '';
  const dwelling_inhabitant = rollTable(data.dwelling_inhabitants);
  const dwelling_age = rollTable(data.dwelling_ages);
  const dwelling_condition = rollTable(data.dwelling_conditions);
  const dwelling_size = rollTable(data.dwelling_sizes);
  let dwelling_description = '';
  switch (dwelling_size) {
    case 'tiny':
      dwelling_name = 'Tiny dwelling';
      dwelling_description = 'A single-room hut, hovel or house. ';
      dwelling_description += (rollDice(6) <= 2) ? 'It has been built as temporary shelter.' : '';
      break;
    case 'small':
      dwelling_name = 'Small dwelling';
      dwelling_description = `A modest dwelling, ${rollDice(3)} rooms in size.`;
      dwelling_description += (rollDice(6) === 1) ? 'The place is sorrounded by a wall or palisade.' : '';
      break;
    case 'medium':
      dwelling_name = 'Dwelling';
      dwelling_description = `A medium-sized building, with ${rollDice(4) + 1} rooms.`;
      dwelling_description += (rollDice(8) === 1)
        ? ` A small, fortified keep`
        : ` A regular home`;
      dwelling_description += (rollDice(6) === 1) ? ' sorrounded by a wall or palisade.' : '.';
      break;
    case 'large':
      dwelling_name = 'Large dwelling';
      const rooms_amount = rollDice(6) + 4;
      if (rooms_amount > 6 && rollDice(6) <= 2) {
        dwelling_description += `A gathering of ${rollDice(2) + 1} houses, forming a compound.`;
        dwelling_description += (rollDice(6) <= 3) ? ' It is sorrounded by a wall or palisade.' : '';
      } else {
        dwelling_description += `A large building, home to many.`;
        dwelling_description += (rollDice(6) <= 2) ? ' It is sorrounded by a wall or palisade.' : '';
      }
      if (rollDice(8) === 1) {
        dwelling_description += ' The place serves as a keep, a protected bastion among its sorroundings.';
      }
      break;
    case 'very large':
      dwelling_name = 'Very large dwelling';
      dwelling_description = `A large building of ${rollDice(12) + 5} rooms, roughly the size of a manor house.`;
      dwelling_description += (rollDice(6) <= 3) ? `${rollDice(2) + 1} smaller buildings sorround the main one` : '';
      dwelling_description += (rollDice(6) <= 3) ? ' The place is protected by a wall and defensive fortifications.' : '';
      dwelling_description += (rollDice(8) <= 2) ? ' The place serves as a keep, a protected bastion among its sorroundings.' : '';
      break;
    case 'palatial':
      dwelling_name = 'Palatial dwelling';
      const is_castle = rollDice(4) === 1;
      dwelling_description = (is_castle)
        ? `A castle. It has ${rollDice(20, 2) + 5} rooms inside.`
        : `An imposing building. It has ${rollDice(20, 2) + 5} rooms and is roughly the size of a castle. `;
      if (rollDice(6) <= 3) {
        dwelling_description = `It is sorrounded by ${rollDice(4, 2)} smaller buildings`;
      }
      dwelling_description += (!is_castle && rollDice(6) <= 3) ? ' The area is sorrounded by a wall.' : '';
      break;
  }
  dwelling_description += ` The structure is ${dwelling_age} and looks ${dwelling_condition}.`;
  switch (dwelling_inhabitant) {
    case 'monsters':
      dwelling_description += ` It's been overrun by monsters.`;
      break;
    case 'uninhabited':
      dwelling_description += ` The place looks deserted`;
      if (rollDice(6) <= 2) {
        dwelling_description += `, but some valuables can be found inside.`;
        dwelling_description += (rollDice(6) <= 3) ? `The treasure is trapped.` : '';
      } else {
        dwelling_description += '.';
      }
      break;
    case 'inhabited':
      dwelling_description += '';
      break;
  }
  return {
    name: dwelling_name,
    visibility: rollVisibility(),
    description: dwelling_description
  };
};

const rollFortification = () => {
  let fortification_name = '';
  const fortification_type = rollTable(data.fortification_types);
  let fortification_description = `A ${rollTable(data.fortification_ages)} ${fortification_type}. Built with ${rollTable(data.fortification_materials)}, it looks ${rollTable(data.fortification_conditions)}.`;
  switch (fortification_type) {
    case 'wall':
      fortification_name = 'Wall';
      fortification_description += `The wall extends ${rollTable(data.fortification_wall_angle)} to the ${rollTable(data.fortification_wall_directions)}.`;
      fortification_description += `It is ${rollTable(data.fortification_wall_length)}`;
      const wall_height = rollTable(data.fortification_wall_height);
      switch (wall_height) {
        case 'short':
          fortification_description += ` and short, a mere ${rollDice(4)} feet tall.`;
          break;
        case 'medium':
          fortification_description += ` and about ${rollDice(4, 2)} feet tall.`;
          break;
        case 'tall':
          fortification_description += ` and tall, some ${rollDice(4, 3)} feet tall.`;
          break;
        case 'very tall':
          if (rollDice(6) <= 2) {
            fortification_description += (rollDice(6) <= 4)
              ? ` and an imposing ${rollDice(20, 5)} feet tall.`
              : ` and a tremendous ${rollDice(100, 5)} feet tall.`;
          } else {
            fortification_description += ` and an impressive ${rollDice(6, 4)} feet tall.`;
          }
          break;
      }
      break;
    case 'fort':
      fortification_name = 'Fort';
      fortification_description = 'A fort!';
    case 'berm':
      fortification_name = 'Berm';
      fortification_description = 'A berm!';
    case 'trench':
      fortification_name = 'Trench';
      fortification_description = 'A trench!';
    case 'tower':
      fortification_name = 'Tower';
      fortification_description = 'A tower!';
    case 'keep':
      fortification_name = 'Keep';
      fortification_description = 'A keep!';
    case 'castle':
      fortification_name = 'Castle';
      fortification_description = 'A castle!';
  }
  return {
    name: fortification_name,
    visibility: rollVisibility(),
    description: fortification_description
  };
};

const rollInfrastructure = () => {
  let infrastructure_name = '';
  let infrastructure_description = '';
  switch (rollTable(data.infrastructure_types)) {
    case 'road':
      infrastructure_name = 'Road';
      infrastructure_description = 'A road!';
    case 'water':
      switch (rollTable(data.infrastructure_water_types)) {
        case 'aqueduct':
          infrastructure_name = 'Aqueduct';
          infrastructure_description = 'A aqueduct!';
        case 'bridge':
          infrastructure_name = 'Bridge';
          infrastructure_description = 'A bridge!';
        case 'canal':
          infrastructure_name = 'Canal';
          infrastructure_description = 'A canal!';
        case 'fountain':
          infrastructure_name = 'Fountain';
          infrastructure_description = 'A fountain!';
        case 'pond':
          infrastructure_name = 'Pond';
          infrastructure_description = 'A pond!';
        case 'well':
          infrastructure_name = 'Well';
          infrastructure_description = 'A well!';
      }
      break;
    case 'commercial':
      switch (rollTable(data.infrastructure_commercial_types)) {
        case 'camp':
          infrastructure_name = 'Camp';
          infrastructure_description = 'A camp!';
        case 'farm':
          infrastructure_name = 'Farm';
          infrastructure_description = 'A farm!';
        case 'ferry':
          infrastructure_name = 'Ferry';
          infrastructure_description = 'A ferry!';
        case 'ford':
          infrastructure_name = 'Ford';
          infrastructure_description = 'A ford!';
        case 'hunting lodge':
          infrastructure_name = 'Hunting lodge';
          infrastructure_description = 'A hunting lodge!';
        case 'inn':
          infrastructure_name = 'Inn';
          infrastructure_description = 'A inn!';
        case 'lighthouse':
          infrastructure_name = 'Lighthouse';
          infrastructure_description = 'A lighthouse!';
        case 'logging camp':
          infrastructure_name = 'Logging camp';
          infrastructure_description = 'A logging camp!';
        case 'military garrison':
          infrastructure_name = 'Military garrison';
          infrastructure_description = 'A military garrison!';
        case 'mill':
          infrastructure_name = 'Mill';
          infrastructure_description = 'A mill!';
        case 'mine':
          infrastructure_name = 'Mine';
          infrastructure_description = 'A mine!';
        case 'monastery':
          infrastructure_name = 'Monastery';
          infrastructure_description = 'A monastery!';
        case 'orchard':
          infrastructure_name = 'Orchard';
          infrastructure_description = 'A orchard!';
        case 'other':
          infrastructure_name = 'Other';
          infrastructure_description = 'A other!';
        case 'quarry':
          infrastructure_name = 'Quarry';
          infrastructure_description = 'A quarry!';
        case 'ranch':
          infrastructure_name = 'Ranch';
          infrastructure_description = 'A ranch!';
        case 'shrine':
          infrastructure_name = 'A shrine!';
          infrastructure_description = 'A shrine!';
        case 'temple':
          infrastructure_name = 'A temple!';
          infrastructure_description = 'A temple!';
      }
      break;
  }
  return {
    name: infrastructure_name,
    visibility: rollVisibility(),
    description: infrastructure_description
  };
};

const rollResource = () => {
  let resource_description = '';
  switch (rollTable(data.resource_types)) {
    case 'animal, game':
      resource_description = 'A animal, game!';
      break;
    case 'animal, livestock':
      resource_description = 'A animal, livestock!';
      break;
    case 'mineral, quarried':
      resource_description = 'A mineral, quarried!';
      break;
    case 'mineral, mined':
      resource_description = 'A mineral, mined!';
      break;
    case 'vegetable, agricultural':
      resource_description = 'A vegetable, agricultural!';
      break;
    case 'vegetable, industrial':
      resource_description = 'A vegetable, industrial!';
      break;
  }
  return {
    name: 'Resource',
    visibility: rollVisibility(),
    description: resource_description
  };
};


const rollFeature = (type?: string, subtype?: string) => {
  switch (type || rollTable(data.feature_types)) {
    case 'geologic':
      switch (subtype || rollTable(data.geologic_features)) {
        case 'caves': return rollCave();
        case 'elevation': return rollElevation();
        case 'rocks': return rollRocks();
        case 'water': return { name: 'Water', description: `A source of water.` };
        case 'terrain': return { name: 'Terrain', description: `A patch of land with a different terrain` };
      }
      break;
    case 'structure':
      switch (subtype || rollTable(data.structure_types)) {
        case 'burial grounds': return rollBurialGrounds();
        case 'monument': return rollMonument();
        case 'dwelling': return rollDwelling();
        case 'fortification': return rollFortification();
        case 'infrastructure': return rollInfrastructure();
        case 'barrier': return { name: 'Barrier', description: `A barrier!` };
        case 'dungeon': return { name: 'Dungeon', description: `A dungeon!` };
      }
      break;
    case 'resource': return rollResource();
    case 'hazard': return { name: 'hazard', description: `A hazard!` };
    case 'sign': return { name: 'sign', description: `A sign!` };
    case 'dungeon': return { name: 'dungeon', description: `A dungeon!` };
    case 'terrain': return { name: 'terrain', description: `A terrain!` };
    case 'settlement': return { name: 'settlement', description: `A settlement!` };
    case 'water': return { name: 'water', description: `A water!` };
    case 'magic': return { name: 'magic', description: `A magic!` };
  }
};

const rollLair = () => {
  return ['animal', 'human', 'monster'][rollDice(3) - 1];
};

const rollVisibility = () => {
  return ['landmark', 'hidden', 'secret'][rollDice(3) - 1];
};

const rollTerritory = () => {
  const territory: any = {
    name: 'TERRITORY',
    lairs: [],
    locations: []
  };

  const num_lairs = rollDice(4);
  const num_locations = rollDice(4);
  for (let i = 0; i < num_lairs; i++) {
    territory.lairs.push({ name: rollLair(), visibility: rollVisibility() });
  }
  for (let i = 0; i < num_locations; i++) {
    territory.locations.push({ ...rollFeature(), visibility: rollVisibility() });
  }

  return territory;
};

export default rollTerritory;