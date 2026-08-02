/**
 * Crew / Faction Data — One Piece 2.0
 *
 * Phase 2M sample integrated dataset.
 * Follows crew-schema.md (Phase 2H) + relationships.md (Phase 2L).
 * Relationships reference entity IDs only — never embedded objects.
 */

const crews = [
  {
    id: 'straw-hat-pirates',
    displayName: 'Straw Hat Pirates',
    description: 'The pirate crew led by Monkey D. Luffy, bound for the journey to become the Pirate King.',
    aliases: ['Straw Hats', 'Mugiwara Pirates'],
    tags: ['pirate-crew', 'protagonist-crew'],
    status: 'active',
    imageKey: 'straw-hat-pirates',
    organizationType: 'pirate-crew',
    captainId: 'monkey-d-luffy',
    leaderIds: ['monkey-d-luffy'],
    memberIds: ['monkey-d-luffy', 'roronoa-zoro', 'nami'],
    emblem: 'Straw Hat Jolly Roger',
    allegiance: 'pirates',
    foundedBy: 'Monkey D. Luffy',
    objective: 'To reach Laugh Tale and find the One Piece.',
    motto: 'Sailing with my crew to become the Pirate King.',
    affiliations: ['yonko'],
    shipIds: ['thousand-sunny'],
    characterIds: ['monkey-d-luffy', 'roronoa-zoro', 'nami'],
    locationIds: ['water-7', 'marineford'],
    battleIds: ['marineford-war'],
    arcIds: ['marineford'],
    spoilerLevel: 'basic',
    history: 'Founded when Luffy departed Foosha Village and gathered his crew across the East Blue.',
    notes: 'Phase 2M sample — memberIds is a canonical SUBSET (3 of 10 members); the full roster will arrive as more character records are added. TerritoryIds omitted (fish-man-island not in the sample).',
  },
]

export default crews
