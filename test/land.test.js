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

	it("sets a null owner for Tile.null.", function () {
		land.own(0, 2);
		expect(land.owner(0)).to.equal(2);
		land.set(0, Tile.null);
		expect(land.get(0)).to.equal(Tile.null);
		expect(land.owner(0)).to.equal(-1);
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
			expect(land.contains({ x: 10, y: 4 })).to.not.be.ok;
		});
		it("should return false for wrongly-typed xys.", function () {
			expect(land.contains({ x: 5.6, y: 8 })).to.not.be.ok;
			expect(land.contains({ x: "4", y: 0 })).to.not.be.ok;
		});
	});
	describe("around()", function () {
		it("should return the right 8 ids.", function () {
			expect(land.around(45)).to.be.an("array")
				.with.members([34, 35, 36, 44, 46, 53, 54, 55]);
			expect(land.around(18)).to.be.an("array")
				.with.members([7, 8, 9, 17, 19, 27, 28, 29]);
		});
		it("should return only 5 valid ids at a wall.", function () {
			expect(land.around(40)).to.be.an("array")
				.with.members([30, 31, 41, 50, 51]);
			expect(land.around(7)).to.be.an("array")
				.with.members([6, 8, 16, 57, 18]);
			expect(land.around(49)).to.be.an("array")
				.with.members([38, 39, 48, 58, 59]);
			expect(land.around(94)).to.be.an("array")
				.with.members([83, 84, 85, 93, 95]);
		});
		it("should return only 3 valid ids at a corner.", function () {
			expect(land.around(0)).to.be.an("array")
				.with.members([1, 10, 11]);
			expect(land.around(9)).to.be.an("array")
				.with.members([8, 18, 19]);
			expect(land.around(90)).to.be.an("array")
				.with.members([80, 81, 91]);
			expect(land.around(99)).to.be.an("array")
				.with.members([88, 89, 98]);
		});
	});
	describe("aroundCardinal()", function () {
		it("should return the right 4 ids.", function () {
			expect(land.aroundCardinal(41)).to.be.an("array")
				.with.members([31, 40, 42, 51]);
			expect(land.aroundCardinal(58)).to.be.an("array")
				.with.members([48, 57, 59, 68]);
		});
		it("should return only 3 valid ids at a wall.", function () {
			expect(land.aroundCardinal(3), "Upper edge.").to.be.an("array")
				.with.members([2, 4, 13]);
			expect(land.aroundCardinal(30), "Left edge.").to.be.an("array")
				.with.members([20, 31, 40]);
			expect(land.aroundCardinal(79), "Right edge.").to.be.an("array")
				.with.members([69, 78, 89]);
			expect(land.aroundCardinal(91), "Lower edge").to.be.an("array")
				.with.members([81, 90, 92]);
		});
		it("should return only 2 valid ids at a corner.", function () {
			expect(land.aroundCardinal(0), "Upper left.").to.be.an("array")
				.with.members([1, 10]);
			expect(land.aroundCardinal(9), "Upper right.").to.be.an("array")
				.with.members([8, 19]);
			expect(land.aroundCardinal(90), "Lower left.").to.be.an("array")
				.with.members([80, 91]);
			expect(land.around(99), "Lower right.").to.be.an("array")
				.with.members([89, 98]);
		});
	});
	describe("neightbors()", function () {
		it("should return true for neightbors.", function () {
			expect(land.neighbors(22, 23), "Right.").to.be.true;
			expect(land.neighbors(74, 64), "Up.").to.be.true;
			expect(land.neighbors(49, 59), "Down.").to.be.true;
			expect(land.neighbors(86, 85), "Left.").to.be.true;
		});
		it("should return false for non-neighbors.", function () {
			expect(land.neighbors(22, 48)).to.be.false;
			expect(land.neighbors(74, 34)).to.be.false;
			expect(land.neighbors(49, 39)).to.be.false;
			expect(land.neighbors(86, 88)).to.be.false;
		});
		it("should return false for corners.", function () {
			expect(land.neighbors(22, 11), "Upper left.").to.be.false;
			expect(land.neighbors(74, 65), "Upper right.").to.be.false;
			expect(land.neighbors(49, 58), "Lower left.").to.be.false;
			expect(land.neighbors(86, 97), "lower right.").to.be.false;
		});
	});
});
