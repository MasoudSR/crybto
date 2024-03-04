const getFavorites = () => {
	const favorites = localStorage.getItem("favorites");
	if (favorites === null) {
		return [];
	} else {
		return JSON.parse(favorites);
	}
};

const isFavorite = (coinId) => {
	const favorites = localStorage.getItem("favorites");
	if (favorites === null) {
		return false;
	} else {
		return favorites.includes(coinId);
	}
};

const addToFav = (coinId) => {
	const favorites = getFavorites();
	favorites.push(coinId);
	localStorage.setItem("favorites", JSON.stringify(favorites));
};

const removeFromFav = (coinId) => {
	const favorites = getFavorites();
	const coinIndex = favorites.indexOf(coinId);
	favorites.splice(coinIndex, 1);
	localStorage.setItem("favorites", JSON.stringify(favorites));
};

export { getFavorites, isFavorite, addToFav, removeFromFav };
