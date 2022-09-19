export const notNullish = <T>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined;