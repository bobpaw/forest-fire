/**
 * @file Forest module.
 * @author Aiden Woodruff
 * @license MIT
 */

class Forest {
	constructor (land, id) {
		this.land = land;

		// Sorted lists of ids.
		this.ids = [id];
		this.borders = this.land.aroundCardinal(id);
	}

	// Returns list of ids to claim.
	grow () {
		let borders = this.borders.filter(() => {
			return Math.random() * 100 < 20;
		});

		return borders;
	}

	// Returns a single merged forest. Clears this and otherForest.
	merge (otherForest) {
		this.ids.push(...otherForest.ids);
		otherForest.ids = [];

		this.ids.sort((x, y) => x < y ? -1 : (x === y ? 0 : 1));

		this.borders.push(...otherForest.borders);
		otherForest.borders = [];

		this.borders = this.borders.filter(x => this.contains(x));
	}

	// strict i.e. true = all, false = any.
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

	claim (ids) {
		this.ids.push(...ids);
		this.ids.sort((x, y) => x < y ? -1 : (x === y ? 0 : 1));

		this.borders = this.borders.filter(id => !ids.includes(id));

		let borders = ids.flatMap(id => this.land.aroundCardinal(id)).filter(id => !this.contains(id));

		this.borders.push(...borders);
	}
}

export { Forest };
