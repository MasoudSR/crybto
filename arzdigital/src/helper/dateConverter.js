const convertToDay = (date) => {
	const newDate = new Date(date);
	return `${newDate.getDate()}`;
};

const convertToFullDate = (date) => {
	const newDate = new Date(date);
	return `${newDate.toLocaleString()}`;
};

export { convertToDay, convertToFullDate };
