const Tile = {
	null: 0,
	tree: 1,
	fire: 2
};

function tileText (tile) {
	switch (tile) {
	case Tile.null: return "";
	case Tile.tree: return "T";
	case Tile.fire: return "F";
	default: return undefined;
	}
}

export { Tile, tileText };
