/**
 * Contains event handlers for the game.
 */

import { IGame } from "../interfaces/i-game.js";

/**
 * Handles the window resize event.
 * @param {IGame} game - The game.
 */
export const windowResizeHandler = (game: IGame): void =>
    game.graphics.resizeCanvas(game.grid, window.innerWidth, window.innerHeight);
