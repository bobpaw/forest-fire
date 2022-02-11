import { Tile } from "../public/js/tiles.js";
import { Land } from "../public/js/land.js";
import { expect } from "chai";

describe("Land", function () {
	let land;

	beforeEach(function () {
		land = new Land(10, 10);
	});

	it("constructs.", function () {
		expect(land.tiles).to.be.an("array").with.length(100);

		expect(land.tiles[0]).to.deep.equal({ value: 0, owner: -1 });
		expect(land.tiles[0]).to.deep.equal(land.tiles[1]);
		expect(land.tiles[0]).to.not.equal(land.tiles[1]);
	});

	it("gets and sets one value.", function () {
		expect(land.get(10)).to.equal(Tile.null);
		expect(land.get(11)).to.equal(Tile.null);

		land.set(10, Tile.tree);
		expect(land.get(10)).to.equal(Tile.tree);
		expect(land.get(11)).to.equal(Tile.null);
	});

	it("gets and sets ownership.", function () {
		expect(land.owner(9)).to.equal(-1);
		expect(land.owner(10)).to.equal(-1);
		
		land.own(9, 3);
		expect(land.owner(9)).to.equal(3);
		expect(land.owner(10)).to.equal(-1);
	});
	describe("idToXY()", function () {
		it("Returns valid results.", function () {
			expect(land.idToXY(0)).to.deep.equal({ x: 0, y: 0 });
			expect(land.idToXY(37)).to.deep.equal({ x: 7, y: 3 });
			expect(land.idToXY(16)).to.deep.equal({ x: 6, y: 1 });
			expect(land.idToXY(4)).to.deep.equal({ x: 4, y: 0 });
		});
		it("Returns invalid xys for ids exceeding the height.", function () {
			land = new Land(10, 4);

			expect(land.contains(land.idToXY(45))).to.not.be.ok;
			expect(land.contains(land.idToXY(96))).to.not.be.ok;
		});
	});
	describe("xyToID", function () {
		it("Returns valid results.", function () {
			expect(land.xyToID({ x: 5, y: 4 })).to.equal(45);
			expect(land.xyToID({ x: 7, y: 3 })).to.equal(37);
		});
	});
	describe("contains()", function () {
		it("should return true for valid xys.", function () {
			expect(land.contains({ x: 2, y: 8 })).to.be.ok;
			expect(land.contains({ x: 5, y: 2 })).to.be.ok;
			expect(land.contains({ x: 0, y: 9 })).to.be.ok;
		});
		it("should return false for invalid xys.", function () {
			expect(land.contains({ x: 23, y: 3 })).to.not.be.ok;
			expect(land.contains({ x: -2, y: 6 })).to.not.be.ok;
			expect(land.contains({ x: 4, y: 1290 })).to.not.be.ok;
			expect(land.contains({ x: 4, y: -3 })).to.not.be.ok;
		});
		it("should return false for wrongly-typed xys.", function () {
			expect(land.contains({ x: 5.6, y: 8 })).to.not.be.ok;
			expect(land.contains({ x: "4", y: 0 })).to.not.be.ok;
		});
	});
	describe("around()", function () {
		it("should return the right 8 ids.");
		it("should return only 5 valid ids at a wall.");
		it("should return only 3 valid ids at a corner.");
	});
	describe("aroundCardinal()", function () {
		it("should return the right 4 ids.");
		it("should return only 3 valid ids at a wall.");
		it("should return only 2 valid ids at a corner.");
	});
	describe("neightbors()", function () {
		it("should return true for neightbors.");
		it("should return false for corners.");
		it("should return false for non-neighbors.");
	});
});
