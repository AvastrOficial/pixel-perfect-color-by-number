/**
 * This file is used to test grid generation and visualization functions.
 */

import { drawGrid } from "../drawers/grid-drawers.js";
import { buildRandomGrid } from "../factories/grid-factory.js";
import { buildRandomPalette } from "../factories/palette-factory.js";
import { View } from "../models/view.js";

/* Constants */
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

const GRID_NUM_ROWS = 20;
const GRID_NUM_COLUMNS = 20;

const VIEW_OFFSET_X = 0;
const VIEW_OFFSET_Y = 0;
const CELL_SIZE = 25;

const PALETTE_NUM_COLORS = 5;
const UNCOLORED_PALETTE_LIGHTEN_FACTOR = 0.8;

/* Canvas setup */
const unsolvedGridCanvas = document.getElementById('unsolved-grid-canvas') as HTMLCanvasElement;
const solvedGridCanvas = document.getElementById('solved-grid-canvas') as HTMLCanvasElement;
const bufferCanvas = document.createElement('canvas');

unsolvedGridCanvas.width = CANVAS_WIDTH;
unsolvedGridCanvas.height = CANVAS_HEIGHT;
solvedGridCanvas.width = CANVAS_WIDTH;
solvedGridCanvas.height = CANVAS_HEIGHT;
bufferCanvas.width = CANVAS_WIDTH;
bufferCanvas.height = CANVAS_HEIGHT;

/* Grid setup */
const coloredPalette = buildRandomPalette(PALETTE_NUM_COLORS);
const uncoloredPalette = coloredPalette.toGrayscale().lighten(UNCOLORED_PALETTE_LIGHTEN_FACTOR);
const grid = buildRandomGrid(GRID_NUM_ROWS, GRID_NUM_COLUMNS, coloredPalette);
const view = new View(VIEW_OFFSET_X, VIEW_OFFSET_Y, CELL_SIZE);


/* Initial draw */
drawGrid(grid, coloredPalette, uncoloredPalette, view, bufferCanvas, unsolvedGridCanvas);

grid.colorAll();

drawGrid(grid, coloredPalette, uncoloredPalette, view, bufferCanvas, solvedGridCanvas);
