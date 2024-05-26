import { Cell } from "./cell.js";

/**
 * Represents a grid of cells.
 */
export class Grid
{
    private readonly _cells: Cell[][];

    /**
     * Create a grid of cells.
     * @param {Cell[][]} cells - The cells in the grid.
     */
    constructor(cells: Cell[][])
    {
        this._cells = cells;
    }

    /**
     * Get a cell in the grid.
     * @param {number} row - The row of the cell.
     * @param {number} column - The column of the cell.
     * @returns {Cell | undefined} The cell at the row and column. Undefined if the cell is out of bounds.
     */
    public getCell = (row: number, column: number): Cell | undefined => this._cells[row]?.[column];

    /**
     * Get the number of rows in the grid.
     * @returns {number} The number of rows in the grid.
     */
    public getNumRows = (): number => this._cells.length;

    /**
     * Get the number of columns in the grid.
     * @returns {number} The number of columns in the grid.
     */
    public getNumColumns = (): number => this._cells[0].length;

    /**
     * Uncolor all cells in the grid.
     */
    public uncolorAll = (): void =>
    {
        for (let row = 0; row < this.getNumRows(); row++)
        {
            for (let column = 0; column < this.getNumColumns(); column++)
            {
                this._cells[row][column].isColored = false;
            }
        }
    }

    /**
     * Color all cells in the grid.
     */
    public colorAll = (): void =>
    {
        for (let row = 0; row < this.getNumRows(); row++)
        {
            for (let column = 0; column < this.getNumColumns(); column++)
            {
                this._cells[row][column].isColored = true;
            }
        }
    }

    /**
     * Check if all cells in the grid are colored.
     * @returns {boolean} True if all cells are colored, false otherwise.
     */
    public isAllColored = (): boolean =>
    {
        for (let row = 0; row < this.getNumRows(); row++)
        {
            for (let column = 0; column < this.getNumColumns(); column++)
            {
                if (!this._cells[row][column].isColored)
                {
                    return false;
                }
            }
        }

        return true;
    }
}
