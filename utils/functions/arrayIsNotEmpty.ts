export function arrayIsNotEmpty(arr: any) {
  if (Array.isArray(arr)) {
    return arr.length > 0;
  } else {
    return false
  }
}