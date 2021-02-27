import React from 'react';

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      message: '',
    }
  }

  

  componentDidMount() {
    // update every second
    this.interval = setInterval(() => {
      //let diff1 = (Date.parse(new Date(this.props.date)) - Date.parse(new Date())) / 1000;
      const date = this.calculateCountdown(this.props.date);
     // date = (diff1<0) ? date = -date : date;
      date ? this.setState(date) : this.stop();
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  calculateCountdown(endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;
    // -ve sign indicates that the date has passed
    this.message = (diff<0) ? '-' : '';
    diff = Math.abs(diff);


    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0,
    };

    // calculate time difference between now and expected date
    if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
   //   console.log("Diff",diff);
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) { // 24 * 60 * 60
      
      timeLeft.days = Math.floor(diff / 86400);
      console.log("Days",timeLeft.days);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) { // 60 * 60
      //console.log("Diff",diff);
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
     // console.log("Diff",diff);
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }

 // console.log("Diff",diff);
  //  if(message = "")
    timeLeft.sec = diff;

    return timeLeft;
  }

  stop() {
    clearInterval(this.interval);
  }

  addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;
  }

  render() {
    const countDown = this.state;

    return (
      <div className="Countdown">
        <span >
          <strong>{this.message}</strong>
        </span>
        <span className="countdown-col">
          <strong>{this.addLeadingZeros(countDown.days)}</strong>
          <span>{countDown.days === 1 ? 'Day' : 'Days'}</span>
        </span>

        <span className="countdown-col">
          <strong>{this.addLeadingZeros(countDown.hours)}</strong>
          <span>Hours</span>
        </span>

        <span className="countdown-col">
          <strong>{this.addLeadingZeros(countDown.min)}</strong>
          <span>Min</span>
        </span>

        <span className="countdown-col">
          <strong>{this.addLeadingZeros(countDown.sec)}</strong>
          <span>Sec</span>
        </span>
      </div>
    );
  }
}

export default Countdown;
