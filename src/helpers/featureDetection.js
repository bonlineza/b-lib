export function canUseRedactor() {
  let result = false;

  try {
    if (Selection.prototype.containsNode) {
      result = true;
    }
  } catch (e) {
    return false;
  }

  return result;
}
