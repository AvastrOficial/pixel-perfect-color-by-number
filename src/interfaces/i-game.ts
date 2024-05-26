import { Graphics } from "../facades/graphics.js";
import { Gui } from "../facades/gui.js";
import { Grid } from "../models/grid.js";

/**
 * Interface for the game.
 * @property {Grid} grid - The grid of the game.
 * @property {Graphics} graphics - The graphics facade.
 * @property {Gui} gui - The GUI facade.
 */
export interface IGame
{
    grid: Grid;
    graphics: Graphics;
    gui: Gui;
}
