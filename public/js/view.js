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

	// map {id: value} objects.
	set (map) {
		this.table.find(".forest__row__cell").each((_, x) => {
			let id = $(x).data("id");
			if (id in map) {
				if (tileText(map[id]) === undefined)
					throw new TypeError("value must be a Tile.");
				$(x).text(tileText(map[id]));
			}
		});
	}

	get (ids) {
		if (!Array.isArray(ids)) ids = [ids];
		return this.table.find(".forest__row__cell").filter((i, x) => ids.includes($(x).data("id")));
	}

	clear () {
		this.table.find(".forest__row__cell").text("");
	}
}
