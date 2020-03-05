import React from "react";
import logo1 from "./Logos/schedule.png";
import logo2 from "./Logos/notepad.png";
import { Route, Switch, Link } from 'react-router-dom'
import Attendance from "../TimeSheet/Attendance"
import "../TimeSheet/Common.css";
import FilterAttendaceBar from '../TimeSheet/FilterAttendanceBar'
import SupervisorApprovalTimesheet from '../TimeSheet/SupervisorApprovalTimeSheet';
import { changePage } from '../actions'
import { connect } from 'react-redux'

class Manager extends React.Component {

    constructor(props) {
        super(props)
        this.state = { b1: false, b2: false }
        this.handleClick1 = this.handleClick1.bind(this)
        this.handleClick2 = this.handleClick2.bind(this)

    }

    componentDidMount() {

        this.props.changePage("Manager")

    }


    handleClick1() {
        this.setState({ b1: true, b2: false });
    };

    handleClick2() {
        this.setState({ b1: false, b2: true });
    };

  render() {
    return (
        <div className="container-fluid p-0">

            <ul class="nav nav-tabs d-flex justify-content-start mb-2 pBackground">
                <li class="nav-item text-center mt-2">
                    <Link class={"nav-link " + (this.state.b1 || this.props.match.path === '/Supervisor/SecondApprovalAttendance' || this.props.match.path === '/Manager' ? " active" : "text-white")} href="#" to="/Supervisor/SecondApprovalAttendance" onClick={this.handleClick1}>Second Approval Attendance</Link>
                </li>
                <li class="nav-item text-center mt-2">
                    <Link class={"nav-link " + (this.state.b2 || this.props.match.path === '/Supervisor/SecondApprovalTimesheet' ? " active" : "text-white")} href="#" to="/Supervisor/SecondApprovalTimesheet" onClick={this.handleClick2}>Second Approval Timesheet</Link>
                </li>
            </ul>

            <div >
                <Switch>
                    <Route exact path="/Manager" render={(routeProps) => <FilterAttendaceBar Filterpath={"/Supervisor/SecondApprovalAttendance"} {...routeProps} />} />
                    <Route exact path="/Supervisor/SecondApprovalTimesheet" render={(routeProps) => <SupervisorApprovalTimesheet stringPath={"second"} {...routeProps} />} />
                    <Route exact path="/Supervisor/SecondApprovalAttendance" render={(routeProps) => <FilterAttendaceBar Filterpath={"/Supervisor/SecondApprovalAttendance"} {...routeProps} />} />
                </Switch>
            </div>



            { /*<div className="d-flex mb-3 ml-2 justify-content-start">
          <button className="btn btn-primary">
            <img src={logo1} width="20px" height="20px" /> Discipline Attendance
          </button>
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

export default connect(null, { changePage }) (Manager);
