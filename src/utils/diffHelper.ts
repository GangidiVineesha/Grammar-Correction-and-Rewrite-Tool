import { DiffPart } from '../types/grammar';

/**
 * Computes a simple word-level diff between original and target text
 * without external heavy libraries.
 */
export function computeWordDiff(original: string, target: string): DiffPart[] {
  const origWords = original.trim().split(/(\s+)/);
  const targetWords = target.trim().split(/(\s+)/);

  const diff: DiffPart[] = [];
  let i = 0;
  let j = 0;

  while (i < origWords.length || j < targetWords.length) {
    if (i < origWords.length && j < targetWords.length && origWords[i] === targetWords[j]) {
      diff.push({ type: 'same', value: origWords[i] });
      i++;
      j++;
    } else {
      // Lookahead match
      let matchTargetIdx = -1;
      let matchOrigIdx = -1;

      for (let lookJ = j; lookJ < Math.min(j + 4, targetWords.length); lookJ++) {
        if (targetWords[lookJ] === origWords[i]) {
          matchTargetIdx = lookJ;
          break;
        }
      }

      for (let lookI = i; lookI < Math.min(i + 4, origWords.length); lookI++) {
        if (origWords[lookI] === targetWords[j]) {
          matchOrigIdx = lookI;
          break;
        }
      }

      if (matchTargetIdx !== -1 && (matchOrigIdx === -1 || matchTargetIdx - j <= matchOrigIdx - i)) {
        // Words were added in target
        while (j < matchTargetIdx) {
          diff.push({ type: 'added', value: targetWords[j] });
          j++;
        }
      } else if (matchOrigIdx !== -1) {
        // Words were removed from original
        while (i < matchOrigIdx) {
          diff.push({ type: 'removed', value: origWords[i] });
          i++;
        }
      } else {
        // Replacement
        if (i < origWords.length && origWords[i].trim() !== '') {
          diff.push({ type: 'removed', value: origWords[i] });
          i++;
        }
        if (j < targetWords.length && targetWords[j].trim() !== '') {
          diff.push({ type: 'added', value: targetWords[j] });
          j++;
        }
        if (i < origWords.length && origWords[i].trim() === '') {
          diff.push({ type: 'same', value: origWords[i] });
          i++;
        }
        if (j < targetWords.length && targetWords[j].trim() === '') {
          j++;
        }
      }
    }
  }

  return diff;
}
