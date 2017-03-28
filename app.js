import React, {Component, PropTypes}from 'react';
import CalendarTemplate from './src/calendar';

export default class App extends Component{

	state = {
		item:{}
	}

	handleSelect(item){
		this.setState({item})
	}

	render(){
		return (
			<div className={"container"}>

				<h1>День: {this.state.item.day ? this.state.item.day.date() : ''}</h1>
				<h1>Месяц: {this.state.item.day ? this.state.item.day.month() + 1 : ''}</h1>
				<CalendarTemplate firstWeekDay={"Mon"}
								  date={new Date('01/01/2017')}
								  styleDay={[{date:"27.03.2017",color:"#ca3a27"},{date:"28.03.2017",color:"#de5454"},{date:"02.03.2017",color:"#0f0"}]}
								  handleSelect={this.handleSelect.bind(this)}/>
			</div>
		)
	}
}
