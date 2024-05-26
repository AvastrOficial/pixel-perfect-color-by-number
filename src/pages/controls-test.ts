/**
 * This file is used to test the user interface functions of the game.
 */

import { buildRandomGrid } from "../factories/grid-factory.js";
import { buildRandomPalette } from "../factories/palette-factory.js";
import { pan, zoom, paint, solve, clear } from "../ui/commands.js";
import { View } from "../models/view.js";
import { Graphics } from "../facades/graphics.js";
import { IGame } from "../interfaces/i-game.js";
import { Gui } from "../facades/gui.js";

/* Constants */
const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 640;

const GRID_NUM_ROWS = 200;
const GRID_NUM_COLUMNS = 200;

const VIEW_OFFSET_X = 120;
const VIEW_OFFSET_Y = 240;
const CELL_SIZE = 55;

const PALETTE_NUM_COLORS = 20;

/* Canvas setup */
const canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

/* Game setup */
const palette = buildRandomPalette(PALETTE_NUM_COLORS);
const view = new View(VIEW_OFFSET_X, VIEW_OFFSET_Y, CELL_SIZE);

const grid = buildRandomGrid(GRID_NUM_ROWS, GRID_NUM_COLUMNS, palette);
const graphics = new Graphics(canvas, palette, view);
const gui = new Gui();

const game = { grid, graphics, gui } as IGame;

/* Event listeners */
canvas.addEventListener('contextmenu', (event: MouseEvent) => event.preventDefault());
canvas.addEventListener('mousemove',   (event: MouseEvent) => pan(event, game));
canvas.addEventListener('wheel',       (event: WheelEvent) => zoom(event, game));
canvas.addEventListener('mousemove',   (event: MouseEvent) => paint(event, game));
canvas.addEventListener('mousedown',   (event: MouseEvent) => paint(event, game));

const solveBtn = document.getElementById('solve-btn') as HTMLButtonElement;
const clearBtn = document.getElementById('clear-btn') as HTMLButtonElement;

solveBtn.addEventListener('click', () => solve(game));
clearBtn.addEventListener('click', () => clear(game));

/* Initial draw */
graphics.drawGrid(grid);
