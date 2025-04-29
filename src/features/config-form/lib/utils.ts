export function parsePropsToNumber(obj: Record<string, unknown>) {
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      obj[key] = (obj[key] as Array<unknown>).map((value) => Number(value))
    } else if (typeof obj[key] === 'string') {
      obj[key] = Number(obj[key])
    }
  }

  return obj
}
