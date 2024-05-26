/**
 * Contains functions for drawing the grid.
 */

import { drawCell, drawCellColorIndex } from "./cell-drawers.js";
import { Grid } from "../models/grid.js";
import { View } from "../models/view.js";
import { Palette } from "../models/palette.js";

/**
 * Draws the grid on a buffer canvas, then draws the buffer canvas on a target canvas if specified.
 * A buffer canvas is used to prevent flickering.
 * @param {Grid} grid - The grid to draw.
 * @param {Palette} coloredPalette - The palette of colored cells.
 * @param {Palette} uncoloredPalette - The palette of uncolored cells.
 * @param {View} view - The view of the game.
 * @param {HTMLCanvasElement} bufferCanvas - The buffer canvas.
 * @param {HTMLCanvasElement | undefined} canvas - The canvas to draw on if specified.
 */
export const drawGrid = (
    grid: Grid,
    coloredPalette: Palette,
    uncoloredPalette: Palette,
    view: View,
    bufferCanvas: HTMLCanvasElement,
    canvas: HTMLCanvasElement | undefined = undefined
): void =>
{
    const bufferCtx = bufferCanvas.getContext('2d') as CanvasRenderingContext2D;
    bufferCtx.fillStyle = 'white';
    bufferCtx.fillRect(0, 0, bufferCanvas.width, bufferCanvas.height);

    const cellSize = view.scale;
    const startColumn = Math.floor(view.offsetX / cellSize);
    const endColumn = Math.floor((view.offsetX + bufferCanvas.width) / cellSize);
    const startRow = Math.floor(view.offsetY / cellSize);
    const endRow = Math.floor((view.offsetY + bufferCanvas.height) / cellSize);

    for (let row = startRow; row <= endRow; row++)
    {
        for (let column = startColumn; column <= endColumn; column++)
        {
            const cell = grid.getCell(row, column);
            const palette = cell?.isColored ? coloredPalette : uncoloredPalette;

            if (cell !== undefined)
            {
                drawCell(cell, row, column, palette, view, bufferCanvas);
            }
        }
    }

    if (cellSize >= 15)
    {
        drawGridColorIndices(grid, view, startColumn, endColumn, startRow, endRow, bufferCanvas);
    }

    if (canvas !== undefined)
    {
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.drawImage(bufferCanvas, 0, 0);
    }
}

/**
 * Draws the color indices of a portion of a grid on a buffer canvas.
 * Only draws the color indices of uncolored cells.
 * @param {Grid} grid - The grid to draw.
 * @param {View} view - The view of the game.
 * @param {number} startColumn - The starting column to draw.
 * @param {number} endColumn - The ending column to draw.
 * @param {number} startRow - The starting row to draw.
 * @param {number} endRow - The ending row to draw.
 * @param {HTMLCanvasElement} bufferCanvas - The buffer canvas.
 */
const drawGridColorIndices = (
    grid: Grid,
    view: View,
    startColumn: number,
    endColumn: number,
    startRow: number,
    endRow: number,
    bufferCanvas: HTMLCanvasElement
): void =>
{
    for (let row = startRow; row <= endRow; row++)
    {
        for (let column = startColumn; column <= endColumn; column++)
        {
            const cell = grid.getCell(row, column);

            if (cell === undefined)
            {
                continue;
            }

            if (!cell.isColored)
            {
                drawCellColorIndex(cell, row, column, view, bufferCanvas);
            }
        }
    }
}
