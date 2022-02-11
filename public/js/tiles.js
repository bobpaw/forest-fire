/**
 * @file Tile module.
 * @author Aiden Woodruff
 * @license MIT
 */

/**
 * Tile values enum.
 * 
 * @readonly
 * @enum {number}
 */
const Tile = {
	null: 0,
	tree: 1,
	fire: 2
};

/**
 * @param {Tile} tile The tile value.
 * @returns {string} Corresponding textual output.
 */
function tileText (tile) {
	switch (tile) {
	case Tile.null: return "";
	case Tile.tree: return "T";
	case Tile.fire: return "F";
	default: return undefined;
	}
}

export { Tile, tileText };
