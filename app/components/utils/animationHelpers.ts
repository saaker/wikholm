/**
 * Calculate animation delay class for grid items.
 * Items in the same row get the same delay for staggered row-by-row animation.
 *
 * @param index - Item index in the array
 * @param columns - Number of columns in the grid (default: 2)
 * @returns Delay class string (e.g., 'delay-1', 'delay-2', etc.)
 *
 * @example
 * // 2-column grid: pairs animate together
 * getDelayClass(0, 2) // 'delay-1' (row 1)
 * getDelayClass(1, 2) // 'delay-1' (row 1)
 * getDelayClass(2, 2) // 'delay-2' (row 2)
 * getDelayClass(6, 2) // 'delay-4' (row 4)
 *
 * @example
 * // 3-column grid: trios animate together
 * getDelayClass(0, 3) // 'delay-1' (row 1)
 * getDelayClass(2, 3) // 'delay-1' (row 1)
 * getDelayClass(3, 3) // 'delay-2' (row 2)
 */
export function getDelayClass(index: number, columns = 2): string {
  const row = Math.floor(index / columns);
  const delayNumber = Math.min(row + 1, 5); // Cap at delay-5 (max defined in CSS)
  const delays = ['delay-1', 'delay-2', 'delay-3', 'delay-4', 'delay-5'];
  return delays[delayNumber - 1];
}
