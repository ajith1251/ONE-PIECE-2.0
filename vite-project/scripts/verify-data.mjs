/**
 * Data Layer Verification — One Piece 2.0
 *
 * Phase 2N tooling. Validates every dataset in src/data/<type>/index.js
 * against the conventions in src/data/shared/:
 *   - entity-ids.md       (Phase 2C) — kebab-case, immutable IDs
 *   - entity-metadata.md  (Phase 2D) — id / displayName / description / imageKey
 *   - relationships.md    (Phase 2L) — ID-only references, field names, aliases
 *
 * Checks:
 *   [ERROR]  duplicate IDs, duplicate array values, unresolved references,
 *            type mismatches, unknown relationship fields, alias violations,
 *            self-references, circular prev/next arc chains, malformed IDs
 *   [WARN]   stored-both mirror gaps / disagreements (data completeness)
 *
 * Run: npm run verify  (exits non-zero only on errors)
 */

import characters from '../src/data/characters/index.js'
import locations from '../src/data/locations/index.js'
import arcs from '../src/data/arcs/index.js'
import crews from '../src/data/crews/index.js'
import battles from '../src/data/battles/index.js'
import ships from '../src/data/ships/index.js'
import powers from '../src/data/fruits/index.js'

const datasets = [
  { type: 'characters', records: characters },
  { type: 'locations', records: locations },
  { type: 'arcs', records: arcs },
  { type: 'crews', records: crews },
  { type: 'battles', records: battles },
  { type: 'ships', records: ships },
  { type: 'powers', records: powers },
]

const datasetsByType = new Map(datasets.map((ds) => [ds.type, ds]))

const FIELD_TYPE = {
  captainId: 'characters',
  devilFruitId: 'powers',
  ownerCrewId: 'crews',
  locationId: 'locations',
  arcId: 'arcs',
  battleId: 'battles',
  originLocationId: 'locations',
  currentLocationId: 'locations',
  headquartersLocationId: 'locations',
  parentLocationId: 'locations',
  launchLocationId: 'locations',
  previousArcId: 'arcs',
  nextArcId: 'arcs',
  characterIds: 'characters',
  locationIds: 'locations',
  arcIds: 'arcs',
  battleIds: 'battles',
  crewIds: 'crews',
  shipIds: 'ships',
  eventIds: 'events',
  memberIds: 'characters',
  leaderIds: 'characters',
  participantIds: 'characters',
  userIds: 'characters',
  previousUserIds: 'characters',
  captainIds: 'characters',
  connectedLocationIds: 'locations',
  neighborLocationIds: 'locations',
  controllingFactionIds: 'crews',
  territoryIds: 'locations',
  mentorIds: 'characters',
  rivalIds: 'characters',
  familyIds: 'characters',
  powerIds: 'powers',
  relatedPowerIds: 'powers',
  fruitIds: 'powers',
  devilFruitIds: 'powers',
}

const LABEL_FIELDS = new Set(['sagaId', 'hotspotId'])

const SINGULAR_FIELDS = new Set([
  'captainId',
  'devilFruitId',
  'ownerCrewId',
  'locationId',
  'arcId',
  'battleId',
  'originLocationId',
  'currentLocationId',
  'headquartersLocationId',
  'parentLocationId',
  'launchLocationId',
  'previousArcId',
  'nextArcId',
])

const ALIAS_RULES = [
  { type: 'battles', forbidden: 'characterIds', canonical: 'participantIds' },
  { type: 'powers', forbidden: 'characterIds', canonical: 'userIds' },
  { type: 'locations', forbidden: 'neighborLocationIds', canonical: 'connectedLocationIds' },
]

const MIRROR_PAIRS = [
  ['characters', 'crewIds', 'crews', 'memberIds'],
  ['characters', 'shipIds', 'ships', 'characterIds'],
  ['characters', 'arcIds', 'arcs', 'characterIds'],
  ['characters', 'battleIds', 'battles', 'participantIds'],
  ['characters', 'locationIds', 'locations', 'characterIds'],
  ['characters', 'devilFruitId', 'powers', 'userIds'],
  ['crews', 'memberIds', 'characters', 'crewIds'],
  ['crews', 'characterIds', 'characters', 'crewIds'],
  ['crews', 'shipIds', 'ships', 'ownerCrewId'],
  ['crews', 'locationIds', 'locations', 'crewIds'],
  ['crews', 'battleIds', 'battles', 'crewIds'],
  ['crews', 'arcIds', 'arcs', 'crewIds'],
  ['battles', 'participantIds', 'characters', 'battleIds'],
  ['battles', 'crewIds', 'crews', 'battleIds'],
  ['battles', 'locationId', 'locations', 'battleIds'],
  ['battles', 'arcId', 'arcs', 'battleIds'],
  ['ships', 'ownerCrewId', 'crews', 'shipIds'],
  ['ships', 'captainIds', 'characters', 'shipIds'],
  ['ships', 'characterIds', 'characters', 'shipIds'],
  ['ships', 'crewIds', 'crews', 'shipIds'],
  ['locations', 'characterIds', 'characters', 'locationIds'],
  ['locations', 'crewIds', 'crews', 'locationIds'],
  ['locations', 'arcIds', 'arcs', 'locationIds'],
  ['locations', 'battleIds', 'battles', 'locationId'],
  ['locations', 'connectedLocationIds', 'locations', 'connectedLocationIds'],
  ['arcs', 'characterIds', 'characters', 'arcIds'],
  ['arcs', 'locationIds', 'locations', 'arcIds'],
  ['arcs', 'battleIds', 'battles', 'arcId'],
  ['arcs', 'crewIds', 'crews', 'arcIds'],
  ['powers', 'userIds', 'characters', 'devilFruitId'],
]

const errors = []
const warnings = []

const error = (msg) => errors.push(msg)
const warn = (msg) => warnings.push(msg)

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/

const registry = new Map()

for (const ds of datasets) {
  for (const rec of ds.records) {
    if (registry.has(rec.id)) {
      error(`Duplicate ID '${rec.id}' in ${ds.type} (already registered as ${registry.get(rec.id).type})`)
    } else {
      registry.set(rec.id, { type: ds.type, record: rec })
    }
  }
}

const checkRef = (recType, recId, field, id, targetType) => {
  const target = registry.get(id)
  if (!target) {
    error(`Unresolved reference '${id}' in '${field}' on ${recType}:${recId}`)
    return
  }
  if (target.type !== targetType) {
    error(`Type mismatch: '${field}' on ${recType}:${recId} references '${id}' (a ${target.type}), expected ${targetType}`)
  }
}

for (const ds of datasets) {
  for (const rec of ds.records) {
    for (const required of ['id', 'displayName', 'description']) {
      if (typeof rec[required] !== 'string' || rec[required].trim() === '') {
        error(`Missing required field '${required}' on ${ds.type}:${rec.id ?? '(no id)'}`)
      }
    }
    if (typeof rec.imageKey !== 'string' || rec.imageKey.trim() === '') {
      error(`Missing 'imageKey' on ${ds.type}:${rec.id}`)
    } else if (rec.imageKey !== rec.id) {
      error(`'imageKey' ('${rec.imageKey}') does not match id ('${rec.id}') on ${ds.type}:${rec.id}`)
    }
    if (typeof rec.id !== 'string' || !KEBAB.test(rec.id)) {
      error(`Invalid id '${rec.id}' on ${ds.type} — must be lowercase kebab-case`)
    }

    for (const alias of ALIAS_RULES) {
      if (ds.type === alias.type && Object.hasOwn(rec, alias.forbidden)) {
        error(`Alias violation on ${ds.type}:${rec.id}: use '${alias.canonical}' instead of '${alias.forbidden}'`)
      }
    }

    for (const [field, value] of Object.entries(rec)) {
      if (!/Ids?$/.test(field) || LABEL_FIELDS.has(field)) continue
      const targetType = FIELD_TYPE[field]
      if (!targetType) {
        error(`Unknown relationship field '${field}' on ${ds.type}:${rec.id}`)
        continue
      }
      if (SINGULAR_FIELDS.has(field)) {
        if (value === null) {
          warn(`Null value for singular field '${field}' on ${ds.type}:${rec.id} — omit instead of null per relationships.md`)
          continue
        }
        if (typeof value !== 'string' || value.trim() === '') {
          error(`Singular field '${field}' on ${ds.type}:${rec.id} must be a non-empty string`)
          continue
        }
        checkRef(ds.type, rec.id, field, value, targetType)
        if (value === rec.id) error(`Self-reference: ${ds.type}:${rec.id} references itself via '${field}'`)
      } else {
        if (!Array.isArray(value)) {
          error(`Plural field '${field}' on ${ds.type}:${rec.id} must be an array`)
          continue
        }
        const seen = new Set()
        for (const id of value) {
          if (typeof id !== 'string' || id.trim() === '') {
            error(`Non-string ID in '${field}' on ${ds.type}:${rec.id}`)
            continue
          }
          if (seen.has(id)) error(`Duplicate ID '${id}' in '${field}' on ${ds.type}:${rec.id}`)
          seen.add(id)
          checkRef(ds.type, rec.id, field, id, targetType)
          if (id === rec.id) error(`Self-reference: ${ds.type}:${rec.id} references itself via '${field}'`)
        }
      }
    }
  }
}

for (const chainField of ['previousArcId', 'nextArcId']) {
  for (const rec of arcs) {
    const seen = new Set()
    let current = rec
    while (current && typeof current[chainField] === 'string') {
      const nextId = current[chainField]
      if (seen.has(nextId)) {
        error(`Circular '${chainField}' chain involving arcs:${rec.id}`)
        break
      }
      seen.add(nextId)
      current = registry.get(nextId)?.record
    }
  }
}

for (const [sourceType, sourceField, targetType, targetField] of MIRROR_PAIRS) {
  for (const rec of datasetsByType.get(sourceType).records) {
    const value = rec[sourceField]
    if (value == null) continue
    const ids = Array.isArray(value) ? value : [value]
    for (const id of ids) {
      const target = registry.get(id)
      if (!target) continue
      const targetValue = target.record[targetField]
      if (targetValue === undefined) {
        warn(`Mirror missing: ${sourceType}:${rec.id}.${sourceField} lists '${id}' but ${targetType}:${id}.${targetField} is absent`)
      } else {
        const agrees = Array.isArray(targetValue) ? targetValue.includes(rec.id) : targetValue === rec.id
        if (!agrees) {
          warn(`Mirror disagreement: ${sourceType}:${rec.id}.${sourceField} lists '${id}' but ${targetType}:${id}.${targetField} does not include '${rec.id}'`)
        }
      }
    }
  }
}

for (const ds of datasets) {
  console.log(`${ds.type}: ${ds.records.length}`)
}
console.log('---')
for (const e of errors) console.log(`[ERROR] ${e}`)
for (const w of warnings) console.log(`[WARN]  ${w}`)
console.log(`SUMMARY: ${errors.length} errors, ${warnings.length} warnings`)
console.log(errors.length === 0 ? 'RESULT: PASS' : 'RESULT: FAIL')
process.exitCode = errors.length > 0 ? 1 : 0
