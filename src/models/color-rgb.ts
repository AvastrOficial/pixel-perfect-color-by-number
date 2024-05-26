import { IColor } from "../interfaces/i-color.js";
import { ColorHsl } from "./color-hsl.js";

/**
 * Represents a color in RGB format.
 * @implements {IColor}
 * @property {number} r - The red component.
 * @property {number} g - The green component.
 * @property {number} b - The blue component.
 */
export class ColorRgb implements IColor
{
    public readonly r: number;
    public readonly g: number;
    public readonly b: number;

    /**
     * Create a color in RGB format.
     * @param {number} r - The red component.
     * @param {number} g - The green component.
     * @param {number} b - The blue component.
     */
    constructor(r: number, g: number, b: number)
    {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    public toRgb = (): ColorRgb => new ColorRgb(this.r, this.g, this.b);

    public toHsl = (): ColorHsl =>
    {
        const r = this.r / 255;
        const g = this.g / 255;
        const b = this.b / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);

        let h = 0;
        let s = 0;
        const l = (max + min) / 2;

        if (max !== min)
        {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max)
            {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }

            h /= 6;
        }

        return new ColorHsl(h * 360, s * 100, l * 100);
    }

    public toRgbString = (): string => `rgb(${this.r}, ${this.g}, ${this.b})`;

    public toHslString = (): string => this.toHsl().toHslString();

    public toHexString = (): string =>
    {
        const toHex = (value: number): string =>
        {
            const roundedValue = Math.round(value);
            const hex = roundedValue.toString(16);

            return hex.length === 1 ? `0${hex}` : hex;
        }

        const roundedR = Math.round(this.r);
        const roundedG = Math.round(this.g);
        const roundedB = Math.round(this.b);

        return `#${toHex(roundedR)}${toHex(roundedG)}${toHex(roundedB)}`;
    }

    public equals = (color: IColor): boolean => color.toHexString() === this.toHexString();
}
