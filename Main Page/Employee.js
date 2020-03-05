import React from "react";
import {
    Link, Switch, Route
} from "react-router-dom";
import logo1 from "./Logos/schedule.png";
import logo2 from "./Logos/notepad.png";
import "../TimeSheet/Common.css";
import MyTimesheet from './MyTimesheet'
import FilterAttendaceBar from '../TimeSheet/FilterAttendanceBar'
import { changePage } from '../actions'
import {connect} from 'react-redux'


class Employee extends React.Component {

    constructor(props) {
        super(props)
        this.state = { b1: false, b2: false}
        this.handleClick1 = this.handleClick1.bind(this)
        this.handleClick2 = this.handleClick2.bind(this)

    }

    componentDidMount() {

        this.props.changePage("employee")

    }


    handleClick1() {
        this.setState({ b1: false, b2: false});
    };

    handleClick2() {
        this.setState({ b1: false, b2: true});
    };


    render() {
        return (
            <div className="container-fluid p-0">
                <ul class="nav nav-tabs d-flex justify-content-start mb-2 pBackground">
                    <li class="nav-item text-center mt-2">
                        <Link class={"nav-link " + (this.state.b1 || this.props.match.path === '/' || this.props.match.path === '/MyTimesheet' ? " active" : "text-white")} href="#" to="/MyTimesheet" onClick={this.handleClick1}>My Timesheet</Link>
                    </li>
                    <li class="nav-item text-center mt-2">
                        <Link class={"nav-link " + (this.state.b2 || this.props.match.path === '/MyAttendance' ? " active" : "text-white")} href="#" to="/MyAttendance" onClick={this.handleClick2}>My Attendance</Link>
                    </li>
                </ul>


                <div >
                    <Switch>
                        <Route exact path="/MyAttendance" render={(routeProps) => <FilterAttendaceBar Filterpath={"/MyAttendance"} {...routeProps} />} />
                        <Route exact path="/MyTimesheet" component={MyTimesheet}></Route>
                        <Route exact path="/" component={MyTimesheet}></Route>

                    </Switch>
                </div>





                { /* <div className="d-flex mb-3 ml-2 justify-content-start">
                    <Link to="/MyAttendance">
                        <button className="btn btn-primary ">
                            <img src={logo1} width="20px" height="20px" />
                            My Attendance
                        </button>
                    </Link>
                    &nbsp;
                        <button className="btn btn-primary">
                            <img src={logo2} width="20px" height="20px" /> Attendance and
                            Time-Sheets Reports
                        </button>
                </div> */}
            </div>
        );
    }
}

export default connect(null, { changePage }) (Employee);
