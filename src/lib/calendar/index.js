export default class Calendar {

	weekList = [];
	nextDayWeek = 0;

	constructor({firstWeek = 'Mon'} = {}) {
		this.firstWeek = firstWeek;
		this.initWeekList(firstWeek);
	}

	getLastDateOfMonth(year, month) {
		if(month < 0){
			year = year - 1;
			month = 11;
		}

		return new Date(new Date(year, month + 1, 1).getTime() - 1000 * 60 * 60 * 24)
	}

	initWeekList(firstWeek) {
		let weekListBase = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

		let index = weekListBase.indexOf(firstWeek);

		this.nextDayWeek = index;

		weekListBase.push(weekListBase.splice(0, index)[0]);

		this.weekList = weekListBase;
	}

	generate({year = new Date().getFullYear(), month} = {}) {

		month = month > 0 ? month - 1 : new Date().getMonth();
		let lastDay = this.getLastDateOfMonth(year, month).getDate();


		let lastMonth = this.getLastDateOfMonth(year, month - 1).getDate();

		let firstDayWeek = new Date(year, month, 1).getDay() - this.nextDayWeek;;
		if(firstDayWeek < 0)
			firstDayWeek = 6

		let lastDayWeek = new Date(year, month, lastDay).getDay() - this.nextDayWeek;

		let dayList = []

		let prevDay = 0;
		let nextDay = 1;

		for (let i = 0; i < firstDayWeek; i++) {
			dayList.unshift({day:lastMonth, active:false, fullDate:new Date(year, month ? 12 : month- 1, lastMonth)})
			lastMonth--
			prevDay++
		}

		for (let i = 1; i <= lastDay; i++) {
			dayList.push({day:i, active:true, fullDate:new Date(year, month, i)})
		}

		for (var i = lastDayWeek; i < 6; i++) {
			dayList.push({day:nextDay, active:false, fullDate:new Date(year, month+1, nextDay)})
			nextDay++
		}

		let count = 0;
		let days = [];
		let dayWeek = [];

		dayList.forEach((item) => {
			dayWeek.push(item);
			count++;
			if (count === 7) {
				count = 0;
				days.push(dayWeek);
				dayWeek = [];
			}

		})

		console.log(days);

		return {weekList: this.weekList, days};
	}
}