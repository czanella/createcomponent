export function toDashed(s: string) {
  return [...s.matchAll(/[A-Z][^A-Z]*/g)].join('-').toLowerCase();
}