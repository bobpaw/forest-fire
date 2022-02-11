import { expect } from "chai";
import { Tile, tileText } from "../public/js/tiles.js";

describe("tileText()", function () {
	it("should return a value for each value of Tile.", function () {
		expect(Object.values(Tile).map(t => tileText(t))).to.be.an("array")
			.that.does.not.include(undefined);
	});
	it("should not return invalid values.", function () {
		expect(tileText(-1)).to.be.undefined;
		expect(tileText("T")).to.be.undefined;
		expect(tileText(399)).to.be.undefined;
	});
});
