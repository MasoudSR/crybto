const convertToDate = (date) => {
	const newDate = new Date(date);
	return `${newDate.toLocaleDateString()}`;
};

const convertToFullDate = (date) => {
	const newDate = new Date(date);
	return `${newDate.toLocaleString()}`;
};

export { convertToDate, convertToFullDate };
