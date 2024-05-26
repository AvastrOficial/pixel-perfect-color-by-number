/**
 * This file is used to test and visualize the game user interface.
 */

import { Gui } from "../facades/gui.js";
import { buildRandomPalette } from "../factories/palette-factory.js";

const PALETTE_NUM_COLORS = 10;

const paletteTrayDiv = document.getElementById('palette-tray-div') as HTMLDivElement;
const selectedColorDiv = document.getElementById('selected-color-div') as HTMLDivElement;
const palette = buildRandomPalette(PALETTE_NUM_COLORS);

const gridColumnsSlider = document.getElementById('grid-columns-slider') as HTMLInputElement;
const gridRowsSlider = document.getElementById('grid-rows-slider') as HTMLInputElement;
const paletteSizeSlider = document.getElementById('palette-size-slider') as HTMLInputElement;

const gridColumnsInput = document.getElementById('grid-columns-input') as HTMLInputElement;
const gridRowsInput = document.getElementById('grid-rows-input') as HTMLInputElement;
const paletteSizeInput = document.getElementById('palette-size-input') as HTMLInputElement;

const gui = new Gui();

gui.createToolbar(selectedColorDiv, paletteTrayDiv, palette);
gui.createControlPanel(
    gridColumnsSlider,
    gridRowsSlider,
    paletteSizeSlider,
    gridColumnsInput,
    gridRowsInput,
    paletteSizeInput
)

gui.initialize();
