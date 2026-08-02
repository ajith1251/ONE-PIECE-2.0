/**
 * Devil Fruit / Power Data — One Piece 2.0
 *
 * Phase 2M sample integrated dataset.
 * Follows power-schema.md (Phase 2J) + relationships.md (Phase 2L).
 * Relationships reference entity IDs only — never embedded objects.
 * Canonical alias per Phase 2L: use `userIds` / `previousUserIds`
 * (never `characterIds`).
 */

const powers = [
  {
    id: 'gomu-gomu-no-mi',
    displayName: 'Gomu Gomu no Mi',
    description: 'A Devil Fruit that grants its user a rubber body.',
    aliases: ['Rubber Fruit'],
    tags: ['devil-fruit', 'paramecia'],
    status: 'active',
    imageKey: 'gomu-gomu-no-mi',
    powerType: 'devil-fruit',
    fruitType: 'paramecia',
    canonicalName: 'Hito Hito no Mi, Model: Nika',
    alternativeNames: ['Gum-Gum Fruit'],
    userIds: ['monkey-d-luffy'],
    awakeningStatus: 'awakened',
    strengths: ['elastic resilience', 'creative stretching', 'unconventional movement'],
    weaknesses: ['swimming (seawater weakness)', 'bladed weapons (pre-refinement)'],
    combatApplications: ['gum-gum techniques', 'Gear 5 transformations'],
    rarity: 'unique',
    canonicalStatus: 'canon',
    arcIds: ['marineford'],
    crewIds: ['straw-hat-pirates'],
    spoilerLevel: 'late',
    trivia: 'The canonical name is a major late-story reveal.',
    symbolicMeaning: 'Freedom and liberation.',
    notes: 'Phase 2M sample — previousUserIds omitted (Shanks not in the sample dataset); relatedPowerIds omitted (no other power in the sample); battleIds omitted (the fruit was not decisive in the Marineford War).',
  },
]

export default powers
