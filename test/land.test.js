import { Tile } from "../public/js/tiles.js";
import { Land } from "../public/js/land.js";
import { expect } from "chai";

describe("Land", function () {
	let land;

	it("constructs.", function () {
		land = new Land(10, 10);
		
		expect(land.tiles).to.be.an("array").with.length(100);

		expect(land.tiles[0]).to.deep.equal({ value: 0, owner: -1 });
		expect(land.tiles[0]).to.deep.equal(land.tiles[1]);
		expect(land.tiles[0]).to.not.equal(land.tiles[1]);
	});

	it("gets and sets one value.", function () {
		land = new Land(10, 10);

		expect(land.get(10)).to.equal(Tile.null);
		expect(land.get(11)).to.equal(Tile.null);

		land.set(10, Tile.tree);
		expect(land.get(10)).to.equal(Tile.tree);
		expect(land.get(11)).to.equal(Tile.null);
	});

	it("gets and sets ownership.", function () {
		land = new Land(10, 10);

		expect(land.owner(9)).to.equal(-1);
		expect(land.owner(10)).to.equal(-1);
		
		land.own(9, 3);
		expect(land.owner(9)).to.equal(3);
		expect(land.owner(10)).to.equal(-1);
	});
	describe("idToXY")
});
