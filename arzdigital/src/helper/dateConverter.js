const convertToDate = (date) => {
	const newDate = new Date(date);
	return `${newDate.toLocaleString()}`;
};

export default convertToDate;