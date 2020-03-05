import React from "react";
import Calendar from "react-calendar";
import "./CustomizedCalendar.css";

class CustomizedCalender extends React.Component {

    state = {
        date: new Date(),
    }

    onChange = date => this.setState({ date })

  render() {
      return (
       <div className="d-flex justify-content-center mt-4">
              <div className="card border border-secondary creation" style={{ height: '450px' }}>
              <div class="card-header text-center greyBackground">
                  <h3>Calendar</h3>
              </div>
              <div class="card-body">
                  <div class="d-flex justify-content-center cal">
                          <Calendar
                              calendarType="Hebrew"
                              onChange={this.onChange}
                              value={this.state.date}
                      />
                  </div>
              </div>
          </div>
       </div>
    );
  }
}

export default CustomizedCalender;
