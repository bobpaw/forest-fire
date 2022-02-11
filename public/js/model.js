import { Tile } from "./tiles.js";
import { Land } from "./land.js";

class Organism {
	constructor (land, id) {
		this.land = land;
		this.ids = [id];
		this.borders = [id];
	}

	// Adds ids to this.ids and updates this.borders.
	// ids {Array}
	claim (ids) {}
	unclaim () {}

	// strict i.e. true = all, false = any.
	contains (ids, strict) {
		if (!Array.isArray(ids)) ids = [ids];
		if (typeof strict === undefined) strict = false;
		
		for (let i = 0; i < ids.length; ++i) {
			if (this.ids.includes(ids[i]) !== strict) return !strict;
		}
		return strict;
	}


	merge (otherOrganism) {}

	// Virtual?
	imagineGrowth () {

	}
}
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

class Fire {
	constructor (id) {
		this.ids = [id];
	}

	grow () {}

	merge (otherFire) {}

	contains (id) {}

	remove (id) {}
}

class Model {
	constructor (width, height) {
		this.land = new Land(width, height);
		this.forests = [];
		this.fires = [];

		this.growChance = 0;
		this.spreadChance = 0;
		this.fireChance = 0;

		// Influences how long fire is displayed.
		// this.fireLife = 1;
	}

	

	/**
	 * @returns {Array} An array of ids of updated tiles.
	 */
	update () {
		const updates = [];
		// Fires spread.
		// Trees spread.
		for (let i = 0; i < this.forests.length; ++i) {
			let growth = this.forests[i].grow();
			let emptyTiles = growth.filter(id => this.land.get(id) === Tile.null);
			let inhabited = growth.filter(id =>
				this.land.get(id) === Tile.tree && this.land.owner(id) !== i
			);
			if (emptyTiles.length !== 0) {
				this.forests[i].claim(emptyTiles);
				growth.forEach(id => {
					this.land.set(id, Tile.tree);
					this.land.own(id, i);
				});
				updates.push(...growth);
			}

			if (inhabited.length !== 0) {
				const owners = inhabited.map(id => this.land.owner(id))
					.reduce((lhs, rhs) => (lhs.includes(rhs) ? lhs : lhs.push(rhs), lhs), []);
				for (const owner of owners) {
					this.forests[i].merge(this.forests[owner]);
					this.forests.splice(owner, 1);
				}
			}
		}

		if (Math.random() * 100 < 3) {
			let birthplace = Math.floor(Math.random() * this.land.tiles.length);
			if (this.land.get(birthplace) === Tile.null) {
				this.forests.push(new Forest(this.land, birthplace));
				this.land.set(birthplace, Tile.tree);
				this.land.own(birthplace, this.forests.length - 1);
				updates.push(birthplace);
			}
		}
		// Fires appear.
		// Trees appear.
		return updates;
	}
}

export { Model };
