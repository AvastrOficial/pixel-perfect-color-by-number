import { IGuiElement } from "../interfaces/i-gui-element.js";
import { Palette } from "../models/palette.js";

/**
 * Represents the toolbar of the GUI.
 * @implements {IGuiElement}
 */
export class Toolbar implements IGuiElement
{
    private readonly _selectedColorDiv: HTMLDivElement;
    private readonly _paletteTrayDiv: HTMLDivElement;

    private _palette: Palette;
    private _selectedColorIndex: number = 0;

    /**
     * Create the toolbar.
     * @param {HTMLDivElement} selectedColorDiv - The div to display the selected color.
     * @param {HTMLDivElement} paletteTrayDiv - The div to display the palette of colors.
     * @param {Palette} palette - The palette of colors.
     */
    constructor(selectedColorDiv: HTMLDivElement, paletteTrayDiv: HTMLDivElement, palette: Palette)
    {
        this._selectedColorDiv = selectedColorDiv;
        this._paletteTrayDiv = paletteTrayDiv;
        this._palette = palette;
    }

    public initialize = () =>
    {
        this._paletteTrayDiv.innerHTML = '';

        this._palette.toColorArray().forEach((color, index) =>
        {
            const colorSample = document.createElement('div');
            colorSample.textContent = (index + 1).toString();
            colorSample.classList.add('color-sample');
            colorSample.style.backgroundColor = color.toHexString();
            colorSample.onclick = () => this.setSelectedColorIndex(index);

            this._paletteTrayDiv.appendChild(colorSample);
        });

        this.setSelectedColorIndex(0);
    }

    /**
     * Set the palette of the toolbar.
     * @param {Palette} palette - The palette of colors.
     */
    public setPalette = (palette: Palette) =>
    {
        this._palette = palette;

        this.initialize();
    }

    /**
     * Set the selected color index.
     * @param {number} colorIndex - The index of the selected color.
     */
    private setSelectedColorIndex = (colorIndex: number) =>
    {
        const color = this._palette.getColorByIndex(colorIndex);
        this._selectedColorDiv.style.backgroundColor = color.toRgbString();
        this._selectedColorIndex = colorIndex;
    }

    /**
     * Get the selected color index.
     * @returns {number} The index of the selected color.
     */
    public getSelectedColorIndex = (): number => this._selectedColorIndex;
}
