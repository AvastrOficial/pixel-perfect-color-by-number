import { drawCell } from "../drawers/cell-drawers.js";
import { drawGrid } from "../drawers/grid-drawers.js";
import { Cell } from "../models/cell.js";
import { Grid } from "../models/grid.js";
import { Palette } from "../models/palette.js";
import { View } from "../models/view.js";

/**
 * Facade for drawing graphics on a canvas.
 * @property {View} view - The view of the game.
 */
export class Graphics
{
    private readonly _bufferCanvas: HTMLCanvasElement;
    private readonly _mainCanvas: HTMLCanvasElement;

    private _coloredPalette: Palette;
    private _uncoloredPalette: Palette;

    public readonly view: View;

    /**
     * Create a graphics facade.
     * @param {HTMLCanvasElement} canvas - The canvas to draw on.
     * @param {Palette} palette - The palette of colors.
     * @param {View} view - The view of the game.
     */
    constructor(canvas: HTMLCanvasElement, palette: Palette, view: View)
    {
        this._bufferCanvas = document.createElement('canvas');
        this._bufferCanvas.width = canvas.width;
        this._bufferCanvas.height = canvas.height;

        this._mainCanvas = canvas;
        this._coloredPalette = palette;
        this._uncoloredPalette = palette.toGrayscale().lighten(0.8);
        this.view = view;
    }

    /**
     * Draws the grid on the canvas.
     * @param {Grid} grid - The grid to draw.
     */
    public drawGrid = (grid: Grid): void =>
        drawGrid(
            grid,
            this._coloredPalette,
            this._uncoloredPalette,
            this.view,
            this._bufferCanvas,
            this._mainCanvas);

    /**
     * Draws a cell on the canvas.
     * @param {Cell} cell - The cell to draw.
     * @param {number} row - The row of the cell.
     * @param {number} column - The column of the cell.
     */
    public drawCell = (cell: Cell, row: number, column: number): void =>
        drawCell(
            cell,
            row,
            column,
            cell.isColored ? this._coloredPalette : this._uncoloredPalette,
            this.view,
            this._bufferCanvas,
            this._mainCanvas);

    /**
     * Get the dimensions of the canvas.
     * @returns {{ width: number, height: number }} The dimensions of the canvas.
     */
    public getCanvasDimensions = (): { width: number, height: number } =>
        ({ width: this._mainCanvas.width, height: this._mainCanvas.height });

    /**
     * Pan the view by a specified amount.
     * @param {Grid} grid - The grid to draw.
     * @param {number} movementX - The amount to move the view in the x direction.
     * @param {number} movementY - The amount to move the view in the y direction.
     */
    public pan = (grid: Grid, movementX: number, movementY: number): void =>
    {
        this.view.offsetX -= movementX;
        this.view.offsetY -= movementY;

        this.drawGrid(grid);
    }

    /**
     * Zoom the view by a specified amount.
     * @param {Grid} grid - The grid to draw.
     * @param {number} zoomAdjustment - The amount to zoom the view.
     */
    public zoom = (grid: Grid, zoomAdjustment: number): void =>
    {
        const canvasWidth = this.getCanvasDimensions().width;
        const canvasHeight = this.getCanvasDimensions().height;

        this.view.scale *= zoomAdjustment;
        this.view.offsetX = this.view.offsetX * zoomAdjustment + (canvasWidth / 2) * (zoomAdjustment - 1);
        this.view.offsetY = this.view.offsetY * zoomAdjustment + (canvasHeight / 2) * (zoomAdjustment - 1);

        this.drawGrid(grid);
    }

    /**
     * Resize the canvas.
     * @param {Grid} grid - The grid to draw.
     * @param {number} width - The new width of the canvas.
     * @param {number} height - The new height of the canvas.
     */
    public resizeCanvas = (grid: Grid, width: number, height: number): void =>
    {
        this._mainCanvas.width = width;
        this._mainCanvas.height = height;
        this._bufferCanvas.width = width;
        this._bufferCanvas.height = height;

        this.drawGrid(grid);
    }

    /**
     * Set the palette of the graphics.
     * @param {Palette} palette - The new palette.
     */
    public setPalette = (palette: Palette): void =>
    {
        this._coloredPalette = palette;
        this._uncoloredPalette = palette.toGrayscale().lighten(0.8);
    }
}
