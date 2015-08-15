const A = 'a'.charCodeAt();

export function toNumber(l) {
  return l.charCodeAt() - A;
}

export function toString(n) {
  return String.fromCharCode(n + A);
}
