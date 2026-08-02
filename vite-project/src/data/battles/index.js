/**
 * Battle Data — One Piece 2.0
 *
 * Phase 2M sample integrated dataset.
 * Follows battle-schema.md (Phase 2I) + relationships.md (Phase 2L).
 * Relationships reference entity IDs only — never embedded objects.
 * Canonical alias per Phase 2L: use `participantIds` (never `characterIds`).
 * `winningSide` / `losingSide` are labels, not entity IDs.
 */

const battles = [
  {
    id: 'marineford-war',
    displayName: 'Marineford War',
    description: 'The all-out war between the Whitebeard Pirates and the Marines over the execution of Portgas D. Ace.',
    aliases: ['The Paramount War'],
    tags: ['war', 'marineford', 'paramount-war-saga'],
    status: 'historic',
    imageKey: 'marineford-war',
    battleType: 'war',
    locationId: 'marineford',
    arcId: 'marineford-arc',
    participantIds: ['monkey-d-luffy'],
    winningSide: 'marines',
    losingSide: 'whitebeard-pirates',
    outcome: 'Ace is executed; Whitebeard falls; the war reshapes the world balance of power.',
    duration: 'less than a day',
    significance: 'Ends the pre-timeskip era and triggers the two-year timeskip.',
    casualties: 'Portgas D. Ace and Edward Newgate die; heavy losses on both sides.',
    timelineOrder: 26,
    crewIds: ['straw-hat-pirates'],
    spoilerLevel: 'advanced',
    summary: 'Whitebeard and his allied fleet clash with the Marine Headquarters to rescue Ace.',
    keyMoments: ['Ace\'s release and re-capture', 'Whitebeard\'s final stand', 'Shanks\'s arrival ending the war'],
    importantQuotes: ['The One Piece is real.'],
    futureConsequences: 'The war paves the way for the worst generation and the two-year timeskip.',
    notes: 'Phase 2M sample — participantIds limited to characters in the sample set (Zoro and Nami were not at Marineford). shipIds omitted: the Thousand Sunny was not present at this battle. winningSide/losingSide are labels, not IDs in the dataset.',
  },
]

export default battles
