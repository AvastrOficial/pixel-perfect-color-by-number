/**
 * This file is used to test palette generation and manipulation functions of the Palette class.
 */

import { buildRandomPalette } from "../factories/palette-factory.js";
import { Palette } from "../models/palette.js";

const colorContainerOriginal = document.getElementById('palette-container-original') as HTMLDivElement;
const colorContainerLightened = document.getElementById('palette-container-lightened') as HTMLDivElement;
const colorContainerGrayscale = document.getElementById('palette-container-grayscale') as HTMLDivElement;
const colorContainerLightenedGrayscale = document.getElementById('palette-container-lightened-grayscale') as HTMLDivElement;

const originalPalette = buildRandomPalette(5);
const lightenedPalette = originalPalette.lighten(0.8);
const grayscalePalette = originalPalette.toGrayscale();
const lightenedGrayscalePalette = originalPalette.toGrayscale().lighten(0.8);

const insertPaletteToContainer = (palette: Palette, container: HTMLDivElement) =>
{
    palette.toColorArray().forEach((color, index) =>
    {
        const colorElement = document.createElement('div');
        colorElement.textContent = (index + 1).toString();

        colorElement.classList.add('color-sample');
        colorElement.style.backgroundColor = color.toHexString();
        container.appendChild(colorElement);
    });
}

insertPaletteToContainer(originalPalette, colorContainerOriginal);
insertPaletteToContainer(lightenedPalette, colorContainerLightened);
insertPaletteToContainer(grayscalePalette, colorContainerGrayscale);
insertPaletteToContainer(lightenedGrayscalePalette, colorContainerLightenedGrayscale);
