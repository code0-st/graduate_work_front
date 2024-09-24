export function parsePropsToNumber(obj: Record<string, any>) {
  for (const key in obj) {
    obj[key] = Number(obj[key])
  }

  return obj
}
