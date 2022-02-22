/**
 * @file Forest module.
 * @author Aiden Woodruff
 * @license MIT
 */

/** Class maintaining ownership of Tiles. */
class Forest {
	/**
	 * Creates a new Forest.
	 * 
	 * @param {Land} land Land this Forest exists on.
	 * @param {number} id The first id to add.
	 */
	constructor (land, id) {
		this.land = land;

		// Sorted lists of ids.
		this.ids = [id];
		this.borders = this.land.aroundCardinal(id);
	}

	/**
	 * Select some borders to grow into.
	 * 
	 * @returns {number[]} A list of ids to request to add.
	 */
	grow () {
		let borders = this.borders.filter(() => {
			return Math.random() * 100 < 20;
		});

		return borders;
	}

	/**
	 * Merges this forest with another, claiming its ids.
	 * Also figure out the new borders.
	 * 
	 * Borders and ids in otherForest are cleared.
	 * 
	 * @param {Forest} otherForest The forest to absorb.
	 */
	merge (otherForest) {
		this.ids.push(...otherForest.ids);
		otherForest.ids = [];

		this.ids.sort((x, y) => x < y ? -1 : (x === y ? 0 : 1));

		this.borders.push(...otherForest.borders);
		otherForest.borders = [];

		this.borders = this.borders.filter(x => this.contains(x));
	}

	/**
	 * Check if this Forest has ids in this.ids.
	 * If strict is true, checks for all ids.
	 * If strict is false, checks for any ids.
	 * 
	 * @param {number|number[]} ids The id or ids to test
	 * @param {boolean} strict A switch changing behavior.
	 * @returns {boolean} Whether this.ids has ids.
	 */
	contains (ids, strict) {
		if (!Array.isArray(ids)) ids = [ids];

		let stop = !strict;
		
		/*const search = (id) => {
			(function binarySearch (value, array, start, length) {
				if (array[start] === value) return 
			})(id, this.ids, 0, this.ids.length);
		};*/

		for (let i = 0; i < ids.length; ++i) {
			if (this.ids.includes(ids[i]) === stop) return stop;
		}
		return !stop;
	}

	// Unclaim an id.
	remove (id) {}

	/**
	 * Adds ids to this.ids and updates this.borders.
	 * 
	 * @param {number|number[]} ids IDs to add.
	 */
	claim (ids) {
		this.ids.push(...ids);
		this.ids.sort((x, y) => x < y ? -1 : (x === y ? 0 : 1));

		this.borders = this.borders.filter(id => !ids.includes(id));

		let borders = ids.flatMap(id => this.land.aroundCardinal(id)).filter(id => !this.contains(id));

		this.borders.push(...borders);
	}
}

export { Forest };
