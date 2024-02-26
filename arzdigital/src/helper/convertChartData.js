import convertToDate from "./dateConverter";

const convertChartData = (data) => {
	const convertedData = data?.map((item) => {
		const date = convertToDate(item[0])
		return {
			date: date,
			price: item[1],
		};
	});
	return convertedData;
};

export default convertChartData;
