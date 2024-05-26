import { ColorHsl } from "../models/color-hsl.js"
import { ColorRgb } from "../models/color-rgb.js"

/**
 * Interfacce for classes that represent a color.
 */
export interface IColor
{
    /**
     * Converts the color to to RGB format.
     * @returns {ColorRgb} The color in RGB format.
     */
    toRgb(): ColorRgb

    /**
     * Converts the color to HSL format.
     * @returns {ColorHsl} The color in HSL format.
     */
    toHsl(): ColorHsl

    /**
     * Converts the color to a CSS RGB string.
     * @returns {string} The color in CSS RGB format.
     * @example "rgb(204, 45, 214)"
     */
    toRgbString(): string

    /**
     * Converts the color to a CSS HSL string.
     * @returns {string} The color in CSS HSL format.
     * @example "hsl(244, 29%, 33%)"
     */
    toHslString(): string

    /**
     * Converts the color to a hexadecimal string.
     * @returns {string} The color in hexadecimal format.
     * @example "#256d7b"
     */
    toHexString(): string

    /**
     * Determines if the color is equal to another color.
     * @param {IColor} color - The color to compare.
     * @returns {boolean} True if the colors are equal, otherwise false.
     */
    equals(color: IColor): boolean
}
