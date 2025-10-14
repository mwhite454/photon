/**
 * Functional composition utilities for photon/core
 * Provides pure, immutable function composition patterns
 * @module functional
 */

/**
 * Pipe value through functions left-to-right
 * 
 * Applies functions in sequence from left to right, passing the result
 * of each function to the next. This is a pure functional composition
 * utility that does not mutate the original value.
 * 
 * @example
 * ```typescript
 * // Simple numeric transformations
 * const result = pipe(
 *   10,
 *   x => x + 5,
 *   x => x * 2,
 *   x => x - 3
 * ); // 27
 * 
 * // With Photon models
 * const square = pipe(
 *   new Square(100),
 *   m => model.moveRelative(m, [10, 20]),
 *   m => model.rotate(m, 45)
 * );
 * ```
 * 
 * @param value - Initial value to transform
 * @param fns - Functions to apply in sequence (left-to-right)
 * @returns Final result after all transformations
 */
export function pipe<T>(value: T): T;
export function pipe<T, A>(value: T, fn1: (x: T) => A): A;
export function pipe<T, A, B>(value: T, fn1: (x: T) => A, fn2: (x: A) => B): B;
export function pipe<T, A, B, C>(
  value: T,
  fn1: (x: T) => A,
  fn2: (x: A) => B,
  fn3: (x: B) => C
): C;
export function pipe<T, A, B, C, D>(
  value: T,
  fn1: (x: T) => A,
  fn2: (x: A) => B,
  fn3: (x: B) => C,
  fn4: (x: C) => D
): D;
export function pipe<T, A, B, C, D, E>(
  value: T,
  fn1: (x: T) => A,
  fn2: (x: A) => B,
  fn3: (x: B) => C,
  fn4: (x: C) => D,
  fn5: (x: D) => E
): E;
export function pipe<T, A, B, C, D, E, F>(
  value: T,
  fn1: (x: T) => A,
  fn2: (x: A) => B,
  fn3: (x: B) => C,
  fn4: (x: C) => D,
  fn5: (x: D) => E,
  fn6: (x: E) => F
): F;
export function pipe<T, A, B, C, D, E, F, G>(
  value: T,
  fn1: (x: T) => A,
  fn2: (x: A) => B,
  fn3: (x: B) => C,
  fn4: (x: C) => D,
  fn5: (x: D) => E,
  fn6: (x: E) => F,
  fn7: (x: F) => G
): G;
export function pipe<T, A, B, C, D, E, F, G, H>(
  value: T,
  fn1: (x: T) => A,
  fn2: (x: A) => B,
  fn3: (x: B) => C,
  fn4: (x: C) => D,
  fn5: (x: D) => E,
  fn6: (x: E) => F,
  fn7: (x: F) => G,
  fn8: (x: G) => H
): H;
export function pipe<T, A, B, C, D, E, F, G, H, I>(
  value: T,
  fn1: (x: T) => A,
  fn2: (x: A) => B,
  fn3: (x: B) => C,
  fn4: (x: C) => D,
  fn5: (x: D) => E,
  fn6: (x: E) => F,
  fn7: (x: F) => G,
  fn8: (x: G) => H,
  fn9: (x: H) => I
): I;
export function pipe<T, A, B, C, D, E, F, G, H, I, J>(
  value: T,
  fn1: (x: T) => A,
  fn2: (x: A) => B,
  fn3: (x: B) => C,
  fn4: (x: C) => D,
  fn5: (x: D) => E,
  fn6: (x: E) => F,
  fn7: (x: F) => G,
  fn8: (x: G) => H,
  fn9: (x: H) => I,
  fn10: (x: I) => J
): J;
export function pipe(value: any, ...fns: Function[]): any {
  if (fns.length === 0) return value;
  return fns.reduce((acc, fn) => fn(acc), value);
}

/**
 * Compose functions right-to-left
 * 
 * Creates a reusable composed function that applies functions from right to left.
 * This is the traditional mathematical composition where (f ∘ g)(x) = f(g(x)).
 * 
 * @example
 * ```typescript
 * // Simple transformations
 * const transform = compose(
 *   x => x * 2,
 *   x => x + 5
 * );
 * transform(10); // (10 + 5) * 2 = 30
 * 
 * // Reusable with Photon models
 * const centerAndRotate = compose(
 *   m => model.rotate(m, 45),
 *   m => model.center(m)
 * );
 * const square1 = centerAndRotate(new Square(100));
 * const square2 = centerAndRotate(new Rectangle(200, 100));
 * ```
 * 
 * @param fns - Functions to compose (applied right-to-left)
 * @returns Composed function that can be called with an initial value
 */
export function compose<A>(fn1: (x: A) => A): (x: A) => A;
export function compose<A, B>(fn2: (x: A) => B, fn1: (x: A) => A): (x: A) => B;
export function compose<A, B, C>(
  fn3: (x: B) => C,
  fn2: (x: A) => B,
  fn1: (x: A) => A
): (x: A) => C;
export function compose<A, B, C, D>(
  fn4: (x: C) => D,
  fn3: (x: B) => C,
  fn2: (x: A) => B,
  fn1: (x: A) => A
): (x: A) => D;
export function compose<A, B, C, D, E>(
  fn5: (x: D) => E,
  fn4: (x: C) => D,
  fn3: (x: B) => C,
  fn2: (x: A) => B,
  fn1: (x: A) => A
): (x: A) => E;
export function compose<A, B, C, D, E, F>(
  fn6: (x: E) => F,
  fn5: (x: D) => E,
  fn4: (x: C) => D,
  fn3: (x: B) => C,
  fn2: (x: A) => B,
  fn1: (x: A) => A
): (x: A) => F;
export function compose<A, B, C, D, E, F, G>(
  fn7: (x: F) => G,
  fn6: (x: E) => F,
  fn5: (x: D) => E,
  fn4: (x: C) => D,
  fn3: (x: B) => C,
  fn2: (x: A) => B,
  fn1: (x: A) => A
): (x: A) => G;
export function compose<A, B, C, D, E, F, G, H>(
  fn8: (x: G) => H,
  fn7: (x: F) => G,
  fn6: (x: E) => F,
  fn5: (x: D) => E,
  fn4: (x: C) => D,
  fn3: (x: B) => C,
  fn2: (x: A) => B,
  fn1: (x: A) => A
): (x: A) => H;
export function compose<A, B, C, D, E, F, G, H, I>(
  fn9: (x: H) => I,
  fn8: (x: G) => H,
  fn7: (x: F) => G,
  fn6: (x: E) => F,
  fn5: (x: D) => E,
  fn4: (x: C) => D,
  fn3: (x: B) => C,
  fn2: (x: A) => B,
  fn1: (x: A) => A
): (x: A) => I;
export function compose<A, B, C, D, E, F, G, H, I, J>(
  fn10: (x: I) => J,
  fn9: (x: H) => I,
  fn8: (x: G) => H,
  fn7: (x: F) => G,
  fn6: (x: E) => F,
  fn5: (x: D) => E,
  fn4: (x: C) => D,
  fn3: (x: B) => C,
  fn2: (x: A) => B,
  fn1: (x: A) => A
): (x: A) => J;
export function compose<A>(...fns: Function[]): (x: A) => any {
  return (x: A) => fns.reduceRight((acc, fn) => fn(acc), x);
}
