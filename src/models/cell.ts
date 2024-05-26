/**
 * Represents a cell in a grid.
 * @property {number} colorIndex - The index of the color in a palette.
 * @property {boolean} isColored - Whether the cell is colored or not.
 */
export class Cell
{
    public readonly colorIndex: number;
    public isColored: boolean;

    /**
     * Create a cell.
     * @param {number} colorIndex - The index of the color in a palette.
     * @param {boolean} isColored - Whether the cell is colored or not.
     */
    constructor(colorIndex: number, isColored: boolean = false)
    {
        this.colorIndex = colorIndex;
        this.isColored = isColored;
    }
}
