/**
 * Contains functions for drawing cells.
 */

import { Cell } from "../models/cell.js";
import { Palette } from "../models/palette.js";
import { View } from "../models/view.js";

/**
 * Draws a cell on a buffer canvas, then draws the buffer canvas on a target canvas if specified.
 * A buffer canvas is used to prevent flickering.
 * @param {Cell} cell - The cell to draw.
 * @param {number} row - The row of the cell.
 * @param {number} column - The column of the cell.
 * @param {Palette} palette - The palette of colors.
 * @param {View} view - The view of the game.
 * @param {HTMLCanvasElement} bufferCanvas - The buffer canvas.
 * @param {HTMLCanvasElement | undefined} canvas - The canvas to draw on if specified.
 */
export const drawCell = (
    cell: Cell,
    row: number,
    column: number,
    palette: Palette,
    view: View,
    bufferCanvas: HTMLCanvasElement,
    canvas: HTMLCanvasElement | undefined = undefined
): void =>
{
    const cellSize = view.scale;
    const cellX = column * cellSize - view.offsetX;
    const cellY = row * cellSize - view.offsetY;
    const color = palette.getColorByIndex(cell.colorIndex);

    const bufferCtx = bufferCanvas.getContext('2d') as CanvasRenderingContext2D;
    bufferCtx.fillStyle = color.toRgbString();
    bufferCtx.fillRect(cellX, cellY, cellSize, cellSize);

    if (canvas !== undefined)
    {
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.drawImage(bufferCanvas, 0, 0);
    }
}

/**
 * Draws a cell's color index on a buffer canvas, then draws the buffer canvas on a target canvas if specified.
 * A buffer canvas is used to prevent flickering.
 * @param {Cell} cell - The cell to draw.
 * @param {number} row - The row of the cell.
 * @param {number} column - The column of the cell.
 * @param {View} view - The view of the game.
 * @param {HTMLCanvasElement} bufferCanvas - The buffer canvas.
 * @param {HTMLCanvasElement | undefined} canvas - The canvas to draw on if specified.
 */
export const drawCellColorIndex = (
    cell: Cell,
    row: number,
    column: number,
    view: View,
    bufferCanvas: HTMLCanvasElement,
    canvas: HTMLCanvasElement | undefined = undefined
): void =>
{
    const cellSize = view.scale;
    const cellX = column * cellSize - view.offsetX;
    const cellY = row * cellSize - view.offsetY;
    
    const bufferCtx = bufferCanvas.getContext('2d') as CanvasRenderingContext2D;
    bufferCtx.fillStyle = 'black';
    bufferCtx.font = `${cellSize * 0.6}px Arial`;
    bufferCtx.textAlign = 'center';
    bufferCtx.textBaseline = 'middle';
    bufferCtx.fillText((cell.colorIndex + 1).toString(), cellX + cellSize / 2, cellY + cellSize / 2);

    if (canvas !== undefined)
    {
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.drawImage(bufferCanvas, 0, 0);
    }
}
