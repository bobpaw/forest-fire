import { Model } from "./model.js";
import { View } from "./view.js";
import { Tile } from "./tiles.js";

$(function () {
	const width = Math.floor($(window).width() / 17);
	const height = Math.floor($(window).height() / 21);

	const view = new View(width, height);
	const model = new Model(width, height);

	window.view = view;
	view.set([34], Tile.tree);
});
