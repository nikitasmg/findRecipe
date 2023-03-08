// eslint-disable-next-line no-comments/disallowComments
/**
 * @function getBooleanPresentationForBackend - функция предназначена для приведения булевых значений к числам строкам
 * @param {boolean} value - значение которое будет переведено в строчное представление
 * @example
 * // returns "1"
 * getBooleanPresentationForBackend(true)
 * @example
 * // returns "0"
 * getBooleanPresentationForBackend(false)
 * @returns {"1" | "0"}
 */
export const getBooleanPresentationForBackend = (value: unknown) => (value ? "1" : "0");
