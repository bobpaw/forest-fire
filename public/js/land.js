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

	set (id, value) {
		this.tiles[id].value = value;
		if (value === Tile.null) this.tiles[id].owner = -1;
	}

	own (id, owner) {
		this.tiles[id].owner = owner;
	}

	owner (id) {
		return this.tiles[id].owner;
	}

	// Behavior is undefined if id < this.width * this.height.
	idToXY (id) {
		const x = id % this.width;
		const y = (id - x) / this.width;
		return { x, y };
	}

	// Behavior is undefined if !this.contains({ x, y }).
	xyToID ({ x, y }) {
		return this.width * y + x;
	}

	contains ({ x, y }) {
		return x >= 0 && x < this.width && y >= 0 && y < this.height;
	}

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

	// Returns true if two ids are neighbors.
	neighbors (lhs, rhs) {
		lhs = this.idToXY(lhs);
		rhs = this.idToXY(rhs);

		let x = lhs.x - rhs.x;
		let y = lhs.y - lhs.y;

		return (x === -1 || x === 1) !== (y === -1 || y === 1);
	}
}

export { Land };
