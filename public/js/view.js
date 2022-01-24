function getID (id, width) {
	if (typeof id === "number") {
		return id;
	} else if (typeof id === "object" &&
	"x" in id && typeof id.x === "number" &&
	"y" in id && typeof id.y === "number") {
		if (typeof width !== "number")
			throw new TypeError("width must be a number.");
		return width * id.y + id.x;
	} else {
		throw new TypeError("id must be a number or { x, y } object.");
	}
}

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
		const texts = { tree: "T", null: "", fire: "F" }, text = texts[value];

		if (text === undefined)
			throw new TypeError(`value must be one of ${text.keys()}`);

		ids = ids.map(x => getID(x, this.width));
		this.table.find(".forest__row__cell").filter((_, x) =>
			ids.includes($(x).data("id"))).text(text);
	}

	clear () {
		this.table.find(".forest__row__cell").text("");
	}
}
