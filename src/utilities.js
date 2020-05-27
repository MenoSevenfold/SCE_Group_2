const getMonthsNames = () => {
  return [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
};

const createChartDefaultDataByDate = () => {
  return getMonthsNames().map((month) => {
    return { name: month, sales: 0 };
  });
};
export { createChartDefaultDataByDate, getMonthsNames };
