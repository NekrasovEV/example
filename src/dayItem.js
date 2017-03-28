import React, {Component, PropTypes} from 'react';

export default class DayItem extends Component {

	makeDay(currentMonth, styleLink, day, fullDate){
		if(currentMonth == false)
			return <p style={styleLink} >{day}</p>
		else
			return <a style={styleLink} onClick={() => {this.props.handleClick(fullDate)}}>{day}</a>
	}

	render() {
		let {day, color, currentMonth, fullDate} = this.props;

		let style = {
			backgroundColor: color
		};

		let styleLink = {
			color: "#000"
		};

		if (currentMonth === false) {
			styleLink.color = '#D3D3D3';
			style.backgroundColor = '#fff'
		}


		return (
			<div className={"col-xs-1 text-center"} key={day} style={style}>
				{this.makeDay(currentMonth, styleLink, day, fullDate)}
			</div>
		)
	}
}