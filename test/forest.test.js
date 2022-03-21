import { expect } from "chai";
import { Forest } from "../public/js/forest.js";
import { Land } from "../public/js/land.js";

describe("Forest", function () {
	let land;

	beforeEach(function () {
		land = new Land(10, 10);
	});
	describe("constructor()", function () {
		it("Sets the initial borders.", function () {
			const f = new Forest(land, 28);

			expect(f.ids).to.have.members([28]);
			expect(f.borders).to.have.members([18, 27, 29, 38]);
		});
	});
	describe("claim()", function () {
		let forest;
		beforeEach(function () {
			forest = new Forest(land, 28);
		});

		it("Adds an id and updates borders.", function () {
			forest.claim(13);
			expect(forest.ids).to.have.members([28, 13]);
			expect(forest.borders).to.have
				.members([18, 27, 29, 38, 3, 12, 14, 23]);
		});
		it("Adds ids and updates borders.", function () {
			forest.claim([14, 82]);
			expect(forest.ids).to.have.members([28, 14, 82]);
			expect(forest.borders).to.have
				.members([18, 27, 29, 38, 4, 13, 15, 24, 72, 81, 83, 92]);
		});
		it("Adds ids in borders.", function () {
			forest.claim([27]);
			expect(forest.ids).to.have.members([28, 27]);
			expect(forest.borders).to.have.members([18, 29, 38, 17, 26, 37]);

			forest.claim([37, 38]);
			expect(forest.ids).to.have.members([28, 27, 37, 38]);
			expect(forest.borders).to.have
				.members([18, 29, 17, 26, 36, 47, 48, 39]);
		});
		it("Adds ids next to borders.", function () {
			forest.claim([26, 17]);

			expect(forest.ids).to.have.members([28, 26, 17]);
			expect(forest.borders).to.have
				.members([18, 27, 29, 38, 16, 25, 36, 7, 19]);
		});
	});
	describe("remove()", function () {
		it("Removes ids.");
		it("Updates borders.");
	});
	describe("grow()", function () {
		it("Returns an array without duplicates.", function () {
			const f = new Forest(land, 28);

			f.claim([11, 43, 55]);
			let growth = f.grow();
			expect(growth.length).to.be.within(0, 16);

			let growth_ddp = growth.reduce((x, y) => (x.includes(y) ? x : x.push(y), x), []);
			expect(growth.length).to.equal(growth_ddp.length);
		});
	});
	describe("contains()", function () {
		it("Accepts an id.", function () {
			const forest = new Forest(land, 34);
			expect(forest.contains(34, false)).to.be.true;
			expect(forest.contains(34, true)).to.be.true;
		});
		it("If strict is true, returns whether all ids are in this.ids.", function () {
			const forest = new Forest(land, 33);
			forest.claim([12, 46]);
			expect(forest.contains([33, 12], true)).to.be.true;
			expect(forest.contains([33, 12, 46], true)).to.be.true;
			expect(forest.contains([12, 55], true)).to.be.false;
			expect(forest.contains([55, 62], true)).to.be.false;
		});
		it("If strict is false, returns whether any ids are in this.ids.", function () {
			const forest = new Forest(land, 33);
			forest.claim([12, 46]);
			expect(forest.contains([33, 12], false)).to.be.true;
			expect(forest.contains([33, 12, 46], false)).to.be.true;
			expect(forest.contains([12, 55], false)).to.be.true;
			expect(forest.contains([55, 62], false)).to.be.false;
		});
	});
	describe("merge()", function () {
		let forest1;
		let forest2;

		beforeEach(function () {
			forest1 = new Forest(land, 11);
			forest2 = new Forest(land, 55);

			forest1.claim([12, 21, 22, 13, 1, 10]);
			forest2.claim([46, 45, 35, 25, 24, 36, 44, 15, 14]);
		});
		it("Moves otherForest.ids to this.ids.", function () {
			forest1.merge(forest2);

			expect(forest2.ids).to.have.length(0);
			expect(forest1.ids).to.have.members(
				[12, 21, 22, 13, 1, 10, 46, 45, 35, 25, 24, 36, 44, 15, 14]
			);
		});
		it("Moves otherForest.borders to this.borders.", function () {
			forest1.merge(forest2);
			
			expect(forest2.borders).to.have.length(0);
			expect(forest1.borders).to.have.members(
				[0,  2,  3,  4,  5, 11, 16, 20, 23, 26, 31,
					32, 34, 36, 37, 43, 47, 54, 55, 56]
			);
		});
		it("Removes duplicate borders.");
		it("Removes borders which were in otherForests.ids.");
	});
});
