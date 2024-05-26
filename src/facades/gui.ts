import { IGuiElement } from "../interfaces/i-gui-element.js";
import { Palette } from "../models/palette.js";
import { ControlPanel } from "../ui/control-panel.js";
import { Toolbar } from "../ui/toolbar.js";

/**
 * Facade that represents the graphical user interface.
 */
export class Gui
{
    /**
     * Constants for the elements of the GUI.
     */
    public static ElementConstants =
    {
        TOOLBAR: 'toolbar',
        CONTROL_PANEL: 'control-panel',
    }

    private readonly _elements = new Map<string, IGuiElement>();

    /**
     * Create the toolbar.
     * @param {HTMLDivElement} selectedColorDiv - The div to display the selected color.
     * @param {HTMLDivElement} paletteTrayDiv - The div to display the palette of colors.
     * @param {Palette} palette - The palette of colors.
     */
    public createToolbar = (
        selectedColorDiv: HTMLDivElement,
        paletteTrayDiv: HTMLDivElement,
        palette: Palette
    ): void =>
    {
        this._elements.set(Gui.ElementConstants.TOOLBAR, new Toolbar(
            selectedColorDiv,
            paletteTrayDiv,
            palette));
    }

    /**
     * Create the control panel for grid and palette generation.
     * @param {HTMLInputElement} gridColumnsSlider - The slider for the number of grid columns.
     * @param {HTMLInputElement} gridRowsSlider - The slider for the number of grid rows.
     * @param {HTMLInputElement} paletteSizeSlider - The slider for the size of the palette.
     * @param {HTMLInputElement} gridColumnsInput - The input for the number of grid columns.
     * @param {HTMLInputElement} gridRowsInput - The input for the number of grid rows.
     * @param {HTMLInputElement} paletteSizeInput - The input for the size of the palette.
     */
    public createControlPanel = (
        gridColumnsSlider: HTMLInputElement,
        gridRowsSlider: HTMLInputElement,
        paletteSizeSlider: HTMLInputElement,
        gridColumnsInput: HTMLInputElement,
        gridRowsInput: HTMLInputElement,
        paletteSizeInput: HTMLInputElement
    ): void =>
    {
        this._elements.set(Gui.ElementConstants.CONTROL_PANEL, new ControlPanel(
            gridColumnsSlider,
            gridRowsSlider,
            paletteSizeSlider,
            gridColumnsInput,
            gridRowsInput,
            paletteSizeInput
        ));
    }

    /**
     * Initialize the GUI elements.
     */
    public initialize = (): void => this._elements.forEach(element => element.initialize());

    /**
     * Get a GUI element by key.
     * @param {string} key - The key of the element.
     * @returns {IGuiElement | undefined} The GUI element. Undefined if the key does not exist.
     */
    public getGuiElement = (key: string): IGuiElement | undefined => this._elements.get(key);
}
