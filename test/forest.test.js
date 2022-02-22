import { expect } from "chai";
import { Forest } from "../public/js/forest.js";

describe("Forest", function () {
	describe("constructor()", function () {
		it("Sets the initial borders.");
	});
	describe("claim()", function () {
		it("Adds an id and updates borders.");
		it("Adds ids and updates borders.");
	});
	describe("remove()", function () {
		it("Removes ids.");
		it("Updates borders.");
	});
	describe("grow()", function () {
		it("Returns an array without duplicates.");
	});
	describe("contains()", function () {
		it("Accepts an id.");
		it("Accepts an array of ids.");
		it("If strict is true, returns whether all ids are in this.ids.");
		it("If strict is false, returns whether any ids are in this.ids.");
	});
	describe("merge()", function () {
		it("Moves otherForest.ids to this.ids.");
		it("Moves otherForest.borders other this.borders.");
		it("Removes duplicate borders.");
		it("Removes borders which were in otherForests.ids.");
	});
});
