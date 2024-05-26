/**
 * Contains functions for creating grids.
 */

import { Cell } from "../models/cell.js";
import { Grid } from "../models/grid.js";
import { Palette } from "../models/palette.js";

/**
 * Builds a random grid of cells.
 * @param {number} rowLength - The number of rows in the grid.
 * @param {number} columnLength - The number of columns in the grid.
 * @param {Palette} palette - The palette of colors.
 * @param {boolean} isColored - Whether the grid is colored or not.
 * @returns {Grid} The random grid.
 */
export const buildRandomGrid = (
    rowLength: number,
    columnLength: number,
    palette: Palette,
    isColored: boolean = false
): Grid =>
{
    const cells: Cell[][] = [];
    const randomColorIndex = () => Math.floor(Math.random() * palette.getLength());

    for (let rowIndex = 0; rowIndex < rowLength; rowIndex++)
    {
        const row: Cell[] = [];

        for (let columnIndex = 0; columnIndex < columnLength; columnIndex++)
        {
            row.push(new Cell(randomColorIndex(), isColored));
        }

        cells.push(row);
    }

    return new Grid(cells);
}
