import React, {Component, PropTypes} from 'react';
import DayItem from './dayItem';
import moment from 'moment';
import Calendar from './lib/calendar';


export default class CalendarTemplate extends Component {
	state = {
		activeDay:0,
		date:null
	}

	static defaultValue = {
		firstWeekDay:'Mon',
		date: new Date(),
		styleDay:[]
	}

	constructor(props) {
		super(props)
		this.calendar = new Calendar({firstWeek:this.props.firstWeekDay});
	}

	componentWillMount(){
		this.setState({date:moment(new Date(this.props.date)),
			activeDay:this.props.date.getDate()});
	}

	renderCalendar() {
		let month = this.state.date.month();
		let year =  this.state.date.year();
		let {weekList, days} = this.calendar.generate({year, month});
		let result = [];

		return (
			<div>
				{this.renderHeader({month,year})}
				{this.renderWeek(weekList)}
				{this.renderDays(days)}
			</div>
		)
	}

	handleClickDay(day){
		this.setState({activeDay:day},()=>{
			this.props.handleSelect({day:this.state.activeDay});
		});

	}

	handleMonthChange(e){
		let {name} = e.target;
		let {date} = this.state;



		if(name == 'prvMonth'){
			this.setState({date:date.add(-1, 'months')},()=>{
				this.props.handleSelect({month:this.state.date.format("MMMM")});
			});
		}
		else
			this.setState({date:date.add(1, 'months')},()=>{
				this.props.handleSelect({month:this.state.date.format("MMMM")});
			});
	}


	renderHeader({month,year}){
		return (
			<div className={"row"}>
				<div className="col-xs-1 text-left">
					<a name="prvMonth" onClick={this.handleMonthChange.bind(this)}>&lt;</a>
				</div>
				<div className="col-xs-5 text-center">
					{`${moment.months()[month]} ${year}` }
				</div>
				<div className="col-xs-1 text-right">
					<a name="nextMonth" onClick={this.handleMonthChange.bind(this)}>&gt;</a>
				</div>

			</div>
		)
	}

	renderDays(days) {
		return days.map((days, key) => {
			return (
				<div className={"row"} key={key}>
					{days.map((item, id) => {
						let color = '';

						let {styleDay} = this.props;

						if(item.day === this.state.activeDay)
							color = '#FF0000';
						else
							color ='#fff';


						let fullDate = moment(item.fullDate).format('DD.MM.YYYY');
						let findDay = styleDay.find((elem)=>{
							return elem.date == fullDate
						});

						color = findDay ? findDay.color : color ;

						return <DayItem day={item.day}
										key={id}
										handleClick={this.handleClickDay.bind(this)}
										color={color}
										currentMonth={item.active}/>})}
				</div>
			)
		})

	}

	renderWeek(weekList) {
		return (
			<div className={"row"}>
				{
					weekList.map((item, id) => {
						return (
							<div className="col-xs-1 text-center" key={item}>
								<p>
									{item}
								</p>
							</div>
						)
					})
				}
			</div>
		)
	}


	render() {
		return (
			<div className={"container"}>
				{this.renderCalendar()}
			</div>


		)
	}

}