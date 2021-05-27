export type ObjectKey = string | number | symbol;

export type ObjectRecord = Record<ObjectKey, unknown>;

export type TypeOfResult = 'string' | 'object' | 'number' | 'bigint' | 'function' | 'symbol';

export type DuckTypeEntries<T> = {
    [K in keyof T]?: TypeOfResult;
}

/**
 * Check whether a given value is an object, which is a record from any object key -> unknown.
 * @param value
 */
export const isObject = (value: unknown): value is ObjectRecord => value != null && typeof value === 'object';

/**
 * Check whether a given value has a given duck type. To have the given duck type, the value must also be an object.
 * @param value
 * @param expectedKeyTypes - An object literal specifying properties on <T> along with the "typeof" string you
 *  expect to be returned for value[prop].
 *
 *  @example
 *  ```js
 *  interface IMyInterface {
 *      myProp: string;
 *      myOtherProp: symbol;
 *  }
 *
 *  const json: any = // ...
 *
 *  if (!isDuckType<IMyInterface>(json, {
 *      myProp:      'string',
 *      myOtherProp: 'symbol'
 *  })) {
 *      throw new Error('json does not conform to interface');
 *  }
 *  ```
 */
export const isDuckType = <T>(value: unknown, expectedKeyTypes: DuckTypeEntries<T>): value is T =>
    isObject(value) && Object.entries(expectedKeyTypes).every(([expectedKey, expectedType]) => value[expectedKey] != null && typeof value[expectedKey] === expectedType);

/**
 * Check whether a given value is an array whose values match a given duck type.
 * @param value
 * @param expectedKeyTypes - An object literal in the same format as isDuckType.
 */
export const isDuckTypeArray = <T>(value: unknown, expectedKeyTypes: DuckTypeEntries<T>): value is T[] =>
    Array.isArray(value) && value.every(item => isDuckType<T>(item, expectedKeyTypes));
