/**
 * Represents the view of the game in a canvas.
 * @property {number} offsetX - The horizontal offset.
 * @property {number} offsetY - The vertical offset.
 * @property {number} scale - The scale.
 */
export class View
{
    public offsetX: number;
    public offsetY: number;
    public scale: number;

    /**
     * Create a view.
     * @param {number} offsetX - The horizontal offset.
     * @param {number} offsetY - The vertical offset.
     * @param {number} scale - The scale.
     */
    constructor(offsetX: number, offsetY: number, scale: number)
    {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.scale = scale;
    }
}
