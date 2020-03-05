import React from "react";
import Calendar from "react-calendar";
import "./CustomizedCalendar.css";
import "./newCalendar.css";
import axios from 'axios';

class NewwCalendar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            hDays: [],
        };

        this.dayName = this.dayName.bind(this)
        this.monthName = this.monthName.bind(this)
    }

    componentDidMount() {

        axios.get('/HOLLIDAY/calendarHolliday', {
            params: {
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1
            }
        })
            .then((response) => {
                // handle success
                this.setState({ hDays: response.data })
            })
            .catch((error) => {
                // handle error
                this.setState({ hDays: [] })
                console.log("error", error);
            })
    }

    onChange = date => this.setState({ date })

    dayName() {

        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var d = new Date();
        var dayName = days[d.getDay()];
        return dayName;
    }

    monthName() {

        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        var d = new Date();
        return monthNames[d.getMonth()];
    }

    render() {

        return (

            <div className="row border border-secondary creation  mt-4 d-flex justify-content-center align-items-center" style={{ height: '450px', borderRadius: "20px 20px 20px 20px" }}>

                <div class="col-5 pBackground " style={{ height: '450px', borderRadius: "20px 0px 0px 20px"  }}>

                    <div className="d-flex justify-content-center day mt-5">
                        {this.monthName()}
                    </div>
                    <div className="d-flex justify-content-center num-date">
                        {new Date().getDate()}
                    </div>
                    <div className="d-flex justify-content-center day mb-4">
                        {this.dayName()}
                    </div>
                    <div style={{ fontSize: "15px" }}>Hollidays:
                        <br />
                        <ul>

                            {this.state.hDays === [] || this.state.hDays === null || this.state.hDays.length === 0 ?
                                <li>No hollidays in {this.monthName()} </li>
                                : this.state.hDays.map((j) => {
                                return (
                                    <li>{j.Day} - {j.DESCRIPTION}</li>
                                )
                            })
                            } 
                        </ul>
                        </div>            
              </div>

                <div className= "col-7 align-middle d-flex justify-content-center my-5">

                          <Calendar
                              calendarType="Hebrew"
                              onChange={this.onChange}
                              value={this.state.date}
                              style={{borderRadius: "20px 20px 20px 20px" }}
                            />

                </div >
            </div >

    );
  }
}

export default NewwCalendar;
