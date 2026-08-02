/**
 * Ship Data — One Piece 2.0
 *
 * Phase 2M sample integrated dataset.
 * Follows ship-schema.md (Phase 2K) + relationships.md (Phase 2L).
 * Relationships reference entity IDs only — never embedded objects.
 */

const ships = [
  {
    id: 'thousand-sunny',
    displayName: 'Thousand Sunny',
    description: 'The Straw Hat Pirates\' second ship, built by Franky after the Going Merry.',
    aliases: ['Sunny'],
    tags: ['pirate-ship', 'straw-hat-pirates'],
    status: 'active',
    imageKey: 'thousand-sunny',
    shipType: 'pirate-ship',
    ownerCrewId: 'straw-hat-pirates',
    captainIds: ['monkey-d-luffy'],
    builder: 'Franky',
    manufacturer: 'Water 7 Shipyards',
    launchLocationId: 'water-7',
    size: '56m',
    specialFeatures: ['Coup de Burst', 'gaon cannon', 'doctor room', 'shark submarine'],
    armament: ['gaon cannon', 'gangster cannon', 'coup de bur', 'striker', 'wavemaker'],
    propulsion: 'sail',
    crewIds: ['straw-hat-pirates'],
    characterIds: ['monkey-d-luffy', 'roronoa-zoro', 'nami'],
    locationIds: ['water-7'],
    spoilerLevel: 'basic',
    designInspiration: 'A lion — the Sunny\'s figurehead and motif reflect Franky\'s design.',
    symbolicMeaning: 'Courage and the promise of adventure.',
    trivia: 'The Sunny was designed as a ship that could sail almost anywhere.',
    notes: 'Phase 2M sample — battleIds/arcIds omitted: the Sunny was not present at the Marineford War and no other battles or arcs are in the sample.',
  },
]

export default ships
