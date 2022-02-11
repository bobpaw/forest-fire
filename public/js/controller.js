import { Model } from "./model.js";
import { View } from "./view.js";
import { Tile } from "./tiles.js";

$(function () {
	const width = Math.floor($(window).width() / 17);
	const height = Math.floor($(window).height() / 21);

	const view = new View(width, height);
	const model = new Model(width, height);

	window.view = view;
	window.model = model;

	function updateView(ids) {
		if (!Array.isArray(ids)) ids = [ids];

		let updates = {};
		for (let id of ids) {
			updates[id] = model.land.get(id);
		}
		view.set(updates);
	}
	window.updateView = updateView;
	window.setInterval(() => {
		updateView(model.update());
		let borderCount = model.forests.map(f => f.borders.length).reduce((x, y) => x + y, 0);
		console.log(`Forest count: ${model.forests.length}, Border count: ${borderCount}`);
	}, 100);
});
