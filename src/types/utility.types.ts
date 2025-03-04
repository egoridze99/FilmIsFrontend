export type CastOptionalToRequired<
  T extends Record<string | number | symbol, unknown | undefined>
> = {[x in keyof T]-?: T[x] extends undefined ? never : T[x]};

export type NullableFields<
  T extends Record<string | number | symbol, unknown>
> = {[x in keyof T]: T[x] | null};
