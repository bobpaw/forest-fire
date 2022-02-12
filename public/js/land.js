/**
 * @file Land module.
 * @author Aiden Woodruff
 * @license MIT
 */
import { Tile } from "./tiles.js";

/** Class maintaining land tile data. */
class Land {
	/**
	 * Create a parcel of land.
	 *
	 * @param {number} width A natural number.
	 * @param {number} height A natural number.
	 */
	constructor (width, height) {
		this.width = width;
		this.height = height;

		this.tiles = new Array(width * height);
		for (let i = 0; i < width * height; ++i)
			this.tiles[i] = {
				value: Tile.null,
				owner: -1
			};
	}

	/**
	 * @param {number} id An index in this.tiles.
	 * @returns {Tile} The value of that tile.
	 */
	get (id) {
		return this.tiles[id].value;
	}

	/**
	 * Sets a tile value. Value is not checked.
	 * 
	 * If value is Tile.null, ownership is also cleared.
	 * 
	 * @param {number} id An id in tiles.
	 * @param {Tile} value The value to set.
	 * @throws {RangeError} If id is out of range.
	 */
	set (id, value) {
		if (id < 0 || id >= this.tiles.length) throw new RangeError(
			"Passed id must be in range."
		);
		this.tiles[id].value = value;
		if (value === Tile.null) this.tiles[id].owner = -1;
	}

	/**
	 * Sets tile ownership data.
	 * 
	 * @param {number} id An id in tiles.
	 * @param {number} owner Arbitrary ownership data.
	 * @throws {RangeError} If id is out of range.
	 */
	own (id, owner) {
		this.tiles[id].owner = owner;
	}

	/**
	 * @param {number} id A tile id.
	 * @returns {number} Tile ownership data.
	 */
	owner (id) {
		return this.tiles[id].owner;
	}

	/**
	 * @typedef {object} XY
	 * @property {number} x If valid, an element of [0, this.width).
	 * @property {number} y If valid, an element of [0, this.height).
	 */

	/**
	 * Converts an id to an xy pair. Behavior is defined only if id is in tiles.
	 * 
	 * @param {number} id An id.
	 * @returns {XY} An xy pair.
	 */
	idToXY (id) {
		const x = id % this.width;
		const y = (id - x) / this.width;
		return { x, y };
	}

	/**
	 * Converts an xy pair to an id.
	 * Behavior is defined only if this.contains({x, y}).
	 * 
	 * @param {XY} xy An xy pair.
	 * @returns {number} An id.
	 */
	xyToID ({ x, y }) {
		return this.width * y + x;
	}

	/**
	 * @param {XY} xy An xy pair.
	 * @returns {boolean} Whether xy is valid.
	 */
	contains ({ x, y }) {
		return x >= 0 && x < this.width && y >= 0 && y < this.height;
	}

	/**
	 * Returns an array of the ids around id.
	 * 3 ids border a corner, 5 border an edge, and 8 border other tiles.
	 * 
	 * @param {number} id A valid id.
	 * @returns {number[]} An array of ids.
	 */
	around (id) {
		const xy = this.idToXY(id), x = xy.x, y = xy.y;

		return [
			{ x: x - 1, y: y - 1 },
			{ x: x - 1, y },
			{ x: x - 1, y: y + 1 },
			{ x, y: y + 1 },
			{ x: x + 1, y: y + 1 },
			{ x: x - 1, y },
			{ x: x + 1, y: y - 1 },
			{ x, y: y + 1 }
		].filter(xy => this.contains(xy))
			.map(xy => this.xyToID(xy, this.width));
	}

	/**
	 * Returns an array of ids left, right, above, and below id.
	 * 2 ids border a corner, 3 border an edge, and 4 border other tiles.
	 * 
	 * @param {number} id A valid id.
	 * @returns {number[]} An array of ids.
	 */
	aroundCardinal (id) {
		const xy = this.idToXY(id), x = xy.x, y = xy.y;

		return [
			{ x: x + 1, y },
			{ x, y: y + 1 },
			{ x: x - 1, y },
			{ x, y: y - 1 }
		].filter(xy => this.contains(xy))
			.map(xy => this.xyToID(xy, this.width));
	}

	/**
	 * @param {number} lhs A valid id.
	 * @param {number} rhs A valid id.
	 * @returns {boolean} True if lhs and rhs are neighbors.
	 */
	neighbors (lhs, rhs) {
		lhs = this.idToXY(lhs);
		rhs = this.idToXY(rhs);

		let x = lhs.x - rhs.x;
		let y = lhs.y - lhs.y;

		return (x === -1 || x === 1) !== (y === -1 || y === 1);
	}
}

export { Land };
