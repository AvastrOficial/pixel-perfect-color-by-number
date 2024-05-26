/**
 * Contains functions for creating palettes.
 */

import { IColor } from '../interfaces/i-color.js';
import { ColorRgb } from '../models/color-rgb.js';
import { Palette } from '../models/palette.js';

/**
 * Builds a random palette of unique colors.
 * **Warning:** This function may take too long or run indefinitely if the desired size is too large.
 * @param {number} size - The number of colors in the palette.
 * @returns {Palette} The random palette.
 * @todo Add a safeguard to prevent infinite loops.
 */
export const buildRandomPalette = (size: number): Palette =>
{
    const MAX_RGB_VALUE = 256;
    const colors: IColor[] = [];

    while (colors.length < size)
    {
        const r = Math.floor(Math.random() * MAX_RGB_VALUE);
        const g = Math.floor(Math.random() * MAX_RGB_VALUE);
        const b = Math.floor(Math.random() * MAX_RGB_VALUE);

        const color = new ColorRgb(r, g, b);

        if (!colors.some(c => c.equals(color))) // ensure the color is unique
        {
            colors.push(color);
        }
    }

    return new Palette(colors);
}
