import { tileText } from "./tiles.js";

export class View {
	constructor (width, height) {
		this.width = width;
		this.height = height;

		const table = $("<div>", { class: "forest" });

		for (let id = 0, y = 0; y < height; ++y) {
			const row = $("<div>", { class: "forest__row" });
			for (let x = 0; x < width; ++x, ++id) {
				const cell = $("<div>", { class: "forest__row__cell" });
				cell.data("id", id);
				row.append(cell);
			}
			table.append(row);
		}

		this.table = $("body").append(table);
	}

	set (ids, value) {
		if (!Array.isArray(ids)) ids = [ids];

		if (tileText(value) === undefined)
			throw new TypeError("value must be a TreEnum");

		this.table.find(".forest__row__cell").filter((_, x) =>
			ids.includes($(x).data("id"))).text(tileText(value));
	}

	clear () {
		this.table.find(".forest__row__cell").text("");
	}
}
