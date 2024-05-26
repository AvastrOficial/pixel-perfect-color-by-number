/**
 * Contains functions that allow the user to interact with the game.
 */

import { Gui } from "../facades/gui.js";
import { buildRandomGrid } from "../factories/grid-factory.js";
import { buildRandomPalette } from "../factories/palette-factory.js";
import { IGame } from "../interfaces/i-game.js";
import { ControlPanel } from "./control-panel.js";
import { Toolbar } from "./toolbar.js";

/**
 * Pans the view of the game.
 * @param {MouseEvent} event - The mouse event.
 * @param {IGame} game - The game.
 */
export const pan = (event: MouseEvent, game: IGame): void =>
{
    if (event.buttons !== 2) // check if the right mouse button is pressed
    {
        return;
    }

    game.graphics.pan(game.grid, event.movementX, event.movementY);
}

/**
 * Zooms the view of the game.
 * @param {WheelEvent} event - The wheel event.
 * @param {IGame} game - The game.
 */
export const zoom = (event: WheelEvent, game: IGame): void =>
{
    const zoomFactor = 1.1;
    const zoomDirection = event.deltaY < 0 ? 1 : -1;
    const zoomAdjustment = zoomFactor ** zoomDirection;

    game.graphics.zoom(game.grid, zoomAdjustment);
}

/**
 * Paints the cell that the mouse is hovering over.
 * @param {MouseEvent} event - The mouse event.
 * @param {IGame} game - The game.
 */
export const paint = (event: MouseEvent, game: IGame): void =>
{
    if (event.buttons !== 1) // check if the left mouse button is pressed
    {
        return;
    }

    const cellSize = game.graphics.view.scale;
    const column = Math.floor((event.offsetX + game.graphics.view.offsetX) / cellSize);
    const row = Math.floor((event.offsetY + game.graphics.view.offsetY) / cellSize);
    const cell = game.grid.getCell(row, column);

    if (cell === undefined)
    {
        return;
    }

    const toolbar = game.gui.getGuiElement(Gui.ElementConstants.TOOLBAR) as Toolbar | undefined;
    const selectedColorIndex = toolbar ? toolbar.getSelectedColorIndex() : -1;

    if (selectedColorIndex === cell.colorIndex || selectedColorIndex === -1)
    {
        cell.isColored = true;

        game.graphics.drawCell(cell, row, column);
    }
}

/**
 * Clears the grid of color.
 * @param {IGame} game - The game.
 */
export const clear = (game: IGame): void =>
{
    game.grid.uncolorAll();

    game.graphics.drawGrid(game.grid);
}

/**
 * Solves the game by coloring all cells.
 * @param {IGame} game - The game.
 */
export const solve = (game: IGame): void =>
{
    game.grid.colorAll();

    game.graphics.drawGrid(game.grid);
}

/**
 * Generates a new game.
 * @param {IGame} game - The game.
 */
export const generate = (game: IGame): void =>
{
    const controlPanel = game.gui.getGuiElement(Gui.ElementConstants.CONTROL_PANEL) as ControlPanel | undefined;

    const gridColumns = controlPanel ? controlPanel.getGridColumns() : 20;
    const gridRows = controlPanel ? controlPanel.getGridRows() : 20;
    const paletteSize = controlPanel ? controlPanel.getPaletteSize() : 10;

    const palette = buildRandomPalette(paletteSize);
    const toolbar = game.gui.getGuiElement(Gui.ElementConstants.TOOLBAR) as Toolbar | undefined;

    if (toolbar !== undefined)
    {
        toolbar.setPalette(palette);
    }

    game.grid = buildRandomGrid(gridRows, gridColumns, palette);
    game.graphics.setPalette(palette);
    game.graphics.drawGrid(game.grid);
}
