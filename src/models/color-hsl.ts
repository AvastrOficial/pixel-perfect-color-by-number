import { IColor } from "../interfaces/i-color.js";
import { ColorRgb } from "./color-rgb.js";

/**
 * Represents a color in HSL format.
 * @implements {IColor}
 * @property {number} h - The hue component.
 * @property {number} s - The saturation component.
 * @property {number} l - The lightness component.
 */
export class ColorHsl implements IColor
{
    public readonly h: number;
    public readonly s: number;
    public readonly l: number;

    /**
     * Create a color in HSL format.
     * @param {number} h - The hue component.
     * @param {number} s - The saturation component.
     * @param {number} l - The lightness component.
     */
    constructor(h: number, s: number, l: number)
    {
        this.h = h;
        this.s = s;
        this.l = l;
    }

    public toRgb(): ColorRgb
    {
        const h = this.h / 360;
        const s = this.s / 100;
        const l = this.l / 100;

        let r = l;
        let g = l;
        let b = l;

        if (s !== 0)
        {
            const hueToRgb = (p: number, q: number, t: number): number =>
            {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;

                return p;
            }

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;

            r = hueToRgb(p, q, h + 1 / 3);
            g = hueToRgb(p, q, h);
            b = hueToRgb(p, q, h - 1 / 3);
        }

        return new ColorRgb(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
    }

    public toHsl = (): ColorHsl => new ColorHsl(this.h, this.s, this.l);

    public toRgbString = () => this.toRgb().toRgbString();

    public toHslString = () => `hsl(${this.h}, ${this.s}%, ${this.l}%)`;

    public toHexString = () => this.toRgb().toHexString();

    public equals = (color: IColor): boolean => color.toHexString() === this.toHexString();
}
