export function capitalize(s: string | undefined) {
  return s && s[0].toUpperCase() + s.slice(1);
}
