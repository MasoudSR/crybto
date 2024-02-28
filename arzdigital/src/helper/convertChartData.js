import { convertToDay, convertToFullDate } from "./dateConverter";

const convertChartData = (data) => {
	const convertedData = data?.map((item) => {
		const date = convertToFullDate(item[0]);
		const shortDate = convertToDay(item[0]);
		return {
			date: date,
			shortDate: shortDate,
			price: item[1],
		};
	});
	return convertedData;
};

export default convertChartData;
