/**
 * This is the entry point for the application.
 */

import { Graphics } from "../facades/graphics.js";
import { Gui } from "../facades/gui.js";
import { buildRandomGrid } from "../factories/grid-factory.js";
import { buildRandomPalette } from "../factories/palette-factory.js";
import { IGame } from "../interfaces/i-game.js";
import { View } from "../models/view.js";
import { clear, generate, paint, pan, solve, zoom } from "../ui/commands.js";
import { windowResizeHandler } from "../ui/handlers.js";

const palette = buildRandomPalette(10);
const grid = buildRandomGrid(20, 20, palette);

const canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const view = new View(0, 0, 20);
const graphics = new Graphics(canvas, palette, view);

const gui = new Gui();

gui.createControlPanel(
    document.getElementById('grid-columns-slider') as HTMLInputElement,
    document.getElementById('grid-rows-slider') as HTMLInputElement,
    document.getElementById('palette-size-slider') as HTMLInputElement,
    document.getElementById('grid-columns-input') as HTMLInputElement,
    document.getElementById('grid-rows-input') as HTMLInputElement,
    document.getElementById('palette-size-input') as HTMLInputElement
);

gui.createToolbar(
    document.getElementById('selected-color-div') as HTMLDivElement,
    document.getElementById('palette-tray-div') as HTMLDivElement,
    palette
);

const game = { grid, graphics, gui } as IGame;

const generateBtn = document.getElementById('generate-btn') as HTMLButtonElement;
const clearBtn = document.getElementById('clear-btn') as HTMLButtonElement;
const solveBtn = document.getElementById('solve-btn') as HTMLButtonElement;

generateBtn.addEventListener('click', () => generate(game));
clearBtn.addEventListener('click', () => clear(game));
solveBtn.addEventListener('click', () => solve(game));

canvas.addEventListener('contextmenu', (event: MouseEvent) => event.preventDefault());
canvas.addEventListener('mousemove',   (event: MouseEvent) => pan(event, game));
canvas.addEventListener('wheel',       (event: WheelEvent) => zoom(event, game));
canvas.addEventListener('mousemove',   (event: MouseEvent) => paint(event, game));
canvas.addEventListener('mousedown',   (event: MouseEvent) => paint(event, game));

window.addEventListener('resize', () => windowResizeHandler(game));

gui.initialize();
graphics.drawGrid(grid);
