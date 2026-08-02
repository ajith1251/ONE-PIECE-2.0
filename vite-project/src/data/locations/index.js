/**
 * Location Data — One Piece 2.0
 *
 * Phase 2M sample integrated dataset.
 * Follows location-schema.md (Phase 2F) + relationships.md (Phase 2L).
 * Relationships reference entity IDs only — never embedded objects.
 * Canonical alias per Phase 2L: use `connectedLocationIds` (never
 * `neighborLocationIds`).
 */

const locations = [
  {
    id: 'marineford',
    displayName: 'Marineford',
    description: 'The headquarters of the Marines on the Grand Line, and the site of the Paramount War.',
    tags: ['marine-base', 'grand-line', 'paradise'],
    status: 'active',
    imageKey: 'marineford',
    locationType: 'marine-base',
    sea: 'grand-line',
    region: 'paradise',
    climate: 'temperate',
    government: 'world-government',
    characterIds: ['monkey-d-luffy'],
    arcIds: ['marineford'],
    battleIds: ['marineford-war'],
    connectedLocationIds: ['water-7'],
    mapRegion: 'paradise',
    spoilerLevel: 'basic',
    notes: 'Phase 2M sample — controllingFactionIds omitted: the Marines faction record is not in the sample dataset.',
  },
  {
    id: 'water-7',
    displayName: 'Water 7',
    description: 'A city-island of canals on the Grand Line, home to the Galley-La shipyards and where the Thousand Sunny was built.',
    tags: ['island', 'city', 'grand-line', 'paradise', 'shipyard'],
    status: 'active',
    imageKey: 'water-7',
    locationType: 'island',
    sea: 'grand-line',
    region: 'paradise',
    climate: 'temperate',
    terrain: ['city', 'canals'],
    government: 'mayoral',
    characterIds: ['monkey-d-luffy', 'roronoa-zoro', 'nami'],
    crewIds: ['straw-hat-pirates'],
    connectedLocationIds: ['marineford'],
    mapRegion: 'paradise',
    spoilerLevel: 'basic',
    notes: 'Phase 2M sample — first production location record.',
  },
]

export default locations
