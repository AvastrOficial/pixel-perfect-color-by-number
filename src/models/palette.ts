import { IColor } from "../interfaces/i-color.js";
import { ColorHsl } from "./color-hsl.js";
import { ColorRgb } from "./color-rgb.js";

/**
 * Represents a palette of colors.
 */
export class Palette
{
    private readonly _colors: IColor[];

    /**
     * Create a palette of colors.
     * @param {IColor[]} colors - The colors in the palette.
     */
    public constructor(colors: IColor[])
    {
        this._colors = colors;
    }

    /**
     * Converts the palette to an array of colors.
     * @returns {IColor[]} The colors in the palette as an array.
     */
    public toColorArray = (): IColor[] => [...this._colors];

    /**
     * Converts the palette to grayscale.
     * @returns {Palette} The palette in grayscale.
     */
    public toGrayscale = (): Palette =>
    {
        const colors = this.toColorArray().map(color =>
        {
            const rgb = color.toRgb();
            const average = (rgb.r + rgb.g + rgb.b) / 3;

            return new ColorRgb(average, average, average);
        });

        return new Palette(colors);
    }

    /**
     * Lightens the palette by a factor using the formula: l + (100 - l) * factor.
     * @param {number} factor - The factor to lighten the palette by. A value between 0 and 1.
     * @returns {Palette} The palette lightened by the factor.
     */
    public lighten = (factor: number): Palette =>
    {
        const colors = this.toColorArray().map(color =>
        {
            const hsl = color.toHsl();
            let l = (hsl.l + (100 - hsl.l) * factor) % 100;

            return new ColorHsl(hsl.h, hsl.s, l);
        });

        return new Palette(colors);
    }

    /**
     * Gets a color from the palette by its index.
     * @param {number} index - The index of the color to get.
     * @returns {IColor} The color at the index.
     * @throws {RangeError} Thrown if the index is out of bounds.
     */
    public getColorByIndex = (index: number): IColor =>
    {
        if (index < 0 || index >= this._colors.length)
        {
            throw new RangeError("Index out of bounds");
        }

        return this._colors[index];
    }

    /**
     * Gets the length of the palette.
     * @returns {number} The number of colors in the palette.
     */
    public getLength = (): number => this._colors.length;
}
