/**
 * This file is used to test the generation and functionality of the toolbar.
 */

import { buildRandomPalette } from "../factories/palette-factory.js";
import { Toolbar } from "../ui/toolbar.js";

const PALETTE_NUM_COLORS = 10;

const paletteTrayDiv = document.getElementById('palette-tray-div') as HTMLDivElement;
const selectedColorDiv = document.getElementById('selected-color-div') as HTMLDivElement;

const palette = buildRandomPalette(PALETTE_NUM_COLORS);

const toolbar = new Toolbar(selectedColorDiv, paletteTrayDiv, palette);
toolbar.initialize();
