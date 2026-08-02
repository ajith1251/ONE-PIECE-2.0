/**
 * Character Data — One Piece 2.0
 *
 * Phase 2M sample integrated dataset.
 * Follows character-schema.md (Phase 2E) + relationships.md (Phase 2L).
 * Relationships reference entity IDs only — never embedded objects.
 * Roster / relationship lists are canonical SUBSETS limited to entities
 * present in this sample dataset; full lists arrive as datasets grow.
 */

const characters = [
  {
    id: 'monkey-d-luffy',
    displayName: 'Monkey D. Luffy',
    description: 'Captain of the Straw Hat Pirates, aiming to become the Pirate King.',
    aliases: ['Straw Hat Luffy'],
    tags: ['pirate', 'captain', 'yonko'],
    status: 'active',
    imageKey: 'monkey-d-luffy',
    bounty: 3000000000,
    occupation: 'pirate',
    role: 'captain',
    species: 'human',
    gender: 'male',
    birthday: '1997-05-05',
    age: 19,
    height: '174cm',
    nicknames: ['Straw Hat'],
    haki: ['observation', 'armament', 'conquerors'],
    devilFruitId: 'gomu-gomu-no-mi',
    fightingStyles: ['gum-gum techniques'],
    crewIds: ['straw-hat-pirates'],
    shipIds: ['thousand-sunny'],
    arcIds: ['marineford-arc'],
    battleIds: ['marineford-war'],
    locationIds: ['marineford', 'water-7'],
    spoilerLevel: 'late',
    notes: 'Phase 2M sample — first production character record. Family/mentor lists omitted (references would point outside the sample dataset).',
  },
  {
    id: 'roronoa-zoro',
    displayName: 'Roronoa Zoro',
    description: 'The Straw Hat Pirates\' swordsman and first mate, pursuing the title of World\'s Strongest Swordsman.',
    tags: ['pirate', 'swordsman', 'straw-hat-pirates'],
    status: 'active',
    imageKey: 'roronoa-zoro',
    bounty: 1111000000,
    occupation: 'pirate',
    role: 'first mate / swordsman',
    species: 'human',
    gender: 'male',
    birthday: '1997-11-11',
    height: '181cm',
    haki: ['observation', 'armament'],
    weapons: ['wado-ichimonji', 'sandai-kitetsu', 'enma'],
    fightingStyles: ['three-sword style'],
    crewIds: ['straw-hat-pirates'],
    shipIds: ['thousand-sunny'],
    locationIds: ['water-7'],
    spoilerLevel: 'basic',
    notes: 'Phase 2M sample — arcIds/battleIds omitted because marineford-arc (the only arc in the sample) did not include Zoro.',
  },
  {
    id: 'nami',
    displayName: 'Nami',
    description: 'The navigator of the Straw Hat Pirates, who dreams of drawing a complete map of the world.',
    tags: ['pirate', 'navigator', 'straw-hat-pirates'],
    status: 'active',
    imageKey: 'nami',
    bounty: 366000000,
    occupation: 'pirate',
    role: 'navigator',
    species: 'human',
    gender: 'female',
    birthday: '1997-07-03',
    height: '170cm',
    weapons: ['clima-tact'],
    fightingStyles: ['clima-tact techniques'],
    crewIds: ['straw-hat-pirates'],
    shipIds: ['thousand-sunny'],
    locationIds: ['water-7'],
    spoilerLevel: 'basic',
    notes: 'Phase 2M sample — arcIds/battleIds omitted because marineford-arc (the only arc in the sample) did not include Nami.',
  },
]

export default characters
