import { IGuiElement } from "../interfaces/i-gui-element.js";

/**
 * Represents the control panel of the GUI.
 * @implements {IGuiElement}
 */
export class ControlPanel implements IGuiElement
{
    private readonly _gridColumnsSlider: HTMLInputElement;
    private readonly _gridRowsSlider: HTMLInputElement;
    private readonly _paletteSizeSlider: HTMLInputElement;

    private readonly _gridColumnsInput: HTMLInputElement;
    private readonly _gridRowsInput: HTMLInputElement;
    private readonly _paletteSizeInput: HTMLInputElement;

    /**
     * Create the control panel.
     * @param {HTMLInputElement} gridColumnsSlider - The slider for the number of grid columns.
     * @param {HTMLInputElement} gridRowsSlider - The slider for the number of grid rows.
     * @param {HTMLInputElement} paletteSizeSlider - The slider for the size of the palette.
     * @param {HTMLInputElement} gridColumnsInput - The input for the number of grid columns.
     * @param {HTMLInputElement} gridRowsInput - The input for the number of grid rows.
     * @param {HTMLInputElement} paletteSizeInput - The input for the size of the palette.
     */
    constructor(
        gridColumnsSlider: HTMLInputElement,
        gridRowsSlider: HTMLInputElement,
        paletteSizeSlider: HTMLInputElement,
        gridColumnsInput: HTMLInputElement,
        gridRowsInput: HTMLInputElement,
        paletteSizeInput: HTMLInputElement)
    {
        this._gridColumnsSlider = gridColumnsSlider;
        this._gridRowsSlider = gridRowsSlider;
        this._paletteSizeSlider = paletteSizeSlider;

        this._gridColumnsInput = gridColumnsInput;
        this._gridRowsInput = gridRowsInput;
        this._paletteSizeInput = paletteSizeInput;
    }

    public initialize = (): void =>
    {
        this._gridColumnsSlider.oninput = () => this._gridColumnsInput.value = this._gridColumnsSlider.value;
        this._gridRowsSlider.oninput = () => this._gridRowsInput.value = this._gridRowsSlider.value;
        this._paletteSizeSlider.oninput = () => this._paletteSizeInput.value = this._paletteSizeSlider.value;

        this._gridColumnsInput.oninput = () => this.inputToSliderHandler(
            this._gridColumnsInput,
            this._gridColumnsSlider,
            parseInt(this._gridColumnsSlider.min),
            parseInt(this._gridColumnsSlider.max));

        this._gridRowsInput.oninput = () => this.inputToSliderHandler(
            this._gridRowsInput,
            this._gridRowsSlider,
            parseInt(this._gridRowsSlider.min),
            parseInt(this._gridRowsSlider.max));

        this._paletteSizeInput.oninput = () => this.inputToSliderHandler(
            this._paletteSizeInput,
            this._paletteSizeSlider,
            parseInt(this._paletteSizeSlider.min),
            parseInt(this._paletteSizeSlider.max));
    };

    /**
     * Get the number of grid columns.
     * @returns {number} The number of grid columns.
     */
    public getGridColumns = (): number => parseInt(this._gridColumnsInput.value);

    /**
     * Get the number of grid rows.
     * @returns {number} The number of grid rows.
     */
    public getGridRows = (): number => parseInt(this._gridRowsInput.value);

    /**
     * Get the size of the palette.
     * @returns {number} The size of the palette.
     */
    public getPaletteSize = (): number => parseInt(this._paletteSizeInput.value);

    /**
     * Helper method to handle converting input values to slider values.
     * @param {HTMLInputElement} input - The input element.
     * @param {HTMLInputElement} slider - The slider element.
     * @param {number} min - The minimum allowed value.
     * @param {number} max - The maximum allowed value.
     */
    private inputToSliderHandler = (
        input: HTMLInputElement,
        slider: HTMLInputElement,
        min: number,
        max: number
    ): void =>
    {
        let value = parseInt(input.value);

        value = isNaN(value) ? min : Math.min(max, Math.max(min, value));

        input.value = value.toString();
        slider.value = value.toString();
    }
}
