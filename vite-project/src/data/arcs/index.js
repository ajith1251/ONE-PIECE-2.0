/**
 * Arc Data — One Piece 2.0
 *
 * Phase 2M sample integrated dataset.
 * Follows arc-schema.md (Phase 2G) + relationships.md (Phase 2L).
 * Relationships reference entity IDs only — never embedded objects.
 */

const arcs = [
  {
    id: 'marineford-arc',
    displayName: 'Marineford',
    description: 'The climactic war between the Whitebeard Pirates and the Marines over the execution of Portgas D. Ace.',
    aliases: ['The Paramount War'],
    tags: ['war', 'paramount-war-saga', 'marineford'],
    status: 'historic',
    imageKey: 'marineford-arc',
    sagaId: 'paramount-war-saga',
    arcNumber: 26,
    chronologicalOrder: 26,
    arcType: 'war',
    animeEpisodeRange: { start: 457, end: 489 },
    mangaChapterRange: { start: 553, end: 580 },
    duration: 'a few days',
    overview: 'The Whitebeard Pirates launch an all-out assault on Marine Headquarters to rescue Portgas D. Ace.',
    centralConflict: 'Marines vs. Whitebeard Pirates (and allies) over Ace\'s execution.',
    outcome: 'Ace is executed; Whitebeard falls; the war reshapes the balance of power in the world.',
    significance: 'Ends the pre-timeskip era and triggers the two-year timeskip.',
    characterIds: ['monkey-d-luffy'],
    locationIds: ['marineford'],
    battleIds: ['marineford-war'],
    crewIds: ['straw-hat-pirates'],
    spoilerLevel: 'advanced',
    notes: 'Phase 2M sample — characterIds/shipIds limited to entities in the sample set; previousArcId/nextArcId omitted (impel-down and post-war arcs not yet in the dataset).',
  },
]

export default arcs
