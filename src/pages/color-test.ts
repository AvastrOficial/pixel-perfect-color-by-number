/**
 * This file is used to test the color conversion functions of the ColorRgb and ColorHsl classes.
 */

import { ColorRgb } from '../models/color-rgb.js';

const colorRgbUi = document.getElementById('color-rgb-ui') as HTMLDivElement;
const colorHslUi = document.getElementById('color-hsl-ui') as HTMLDivElement;
const colorPicker = document.getElementById('color-picker') as HTMLInputElement;

const updateColor = (): void =>
{
    const colorHexValue = colorPicker.value;

    const r = parseInt(colorHexValue.slice(1, 3), 16);
    const g = parseInt(colorHexValue.slice(3, 5), 16);
    const b = parseInt(colorHexValue.slice(5, 7), 16);

    const rgb = new ColorRgb(r, g, b);
    const hsl = rgb.toHsl();

    colorRgbUi.style.backgroundColor = rgb.toRgbString();
    colorHslUi.style.backgroundColor = hsl.toHslString();
};

colorPicker.addEventListener('input', updateColor);
