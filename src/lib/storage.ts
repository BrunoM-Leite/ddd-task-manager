export type Persisted<T> = {
  schemaVersion: number
  data: T
}

export function withVersion<T>(data: T, schemaVersion = 1): Persisted<T> {
  return { schemaVersion, data }
}

export function migrate<T>(raw: any, currentVersion: number, migrateFn: (old: any) => T): T {
  if (!raw) return migrateFn(undefined)
  if (typeof raw === 'object' && 'schemaVersion' in raw) {
    const p = raw as Persisted<T>
    if (p.schemaVersion === currentVersion) return p.data
  }
  return migrateFn(raw)
}

