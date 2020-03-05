import React from "react";
import clock1 from "./Logos/clockbw.png";
import clock2 from "./Logos/clock.png";
import folder1 from "./Logos/folder1.png";
import folder2 from "./Logos/folder2.png";
import { Route, Switch, Link } from 'react-router-dom'
import Attendance from "../TimeSheet/Attendance"
import "../TimeSheet/Common.css";
import FilterAttendaceBar from '../TimeSheet/FilterAttendanceBar'
import SupervisorApprovalTimesheet from '../TimeSheet/SupervisorApprovalTimeSheet';
import { connect } from 'react-redux'
import { changePage } from '../actions'


class Supervisior extends React.Component {

    constructor(props) {
        super(props)
        this.state = { b1: false, b2: false }
        this.handleClick1 = this.handleClick1.bind(this)
        this.handleClick2 = this.handleClick2.bind(this)

    }

    
    componentDidMount() {

        this.props.changePage("supervisor")

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
                    <Link class={"nav-link " + (this.state.b1 || this.props.match.path === '/Supervisor/FirstApprovalAttendance' || this.props.match.path === '/Supervisor'? " active" : "text-white")} href="#" to="/Supervisor/FirstApprovalAttendance" onClick={this.handleClick1}>First Approval Attendance</Link>
                </li>
                <li class="nav-item text-center mt-2">
                    <Link class={"nav-link " + (this.state.b2 || this.props.match.path === '/Supervisor/FirstApprovalTimesheet' ? " active" : "text-white")} href="#" to="/Supervisor/FirstApprovalTimesheet" onClick={this.handleClick2}>First Approval Timesheet</Link>
                </li>
            </ul>


            <div >
                <Switch>
                    <Route exact path="/Supervisor" render={(routeProps) => <SupervisorApprovalTimesheet stringPath={"first"} {...routeProps} />} />
                    <Route exact path="/Supervisor/FirstApprovalTimesheet" render={(routeProps) => <SupervisorApprovalTimesheet stringPath={"first"} {...routeProps} />} />
                    <Route exact path="/Supervisor/FirstApprovalAttendance" render={(routeProps) => <FilterAttendaceBar Filterpath={"/Supervisor/FirstApprovalAttendance"} {...routeProps} />} />
                </Switch>
            </div>


            {/* <div className="d-flex mb-3 ml-2 justify-content-start">
         <Link to="/Supervisor/FirstApprovalAttendance">
            <button className="btn btn-primary">
            <img src={clock1} width="20px" height="20px" />
            First Approval Attendance
             </button>
          </Link>
          &nbsp;
        <Link to='/Supervisor/FirstApprovalTimesheet'>      
          <button className="btn btn-primary">
            <img src={folder1} width="20px" height="20px" />
            First Approval Timesheet
          </button>
        </Link>
          &nbsp;
         <Link to='/Supervisor/SecondApprovalAttendance'>          
          <button className="btn btn-primary">
            <img src={clock2} width="20px" height="20px" />
            Second Approval Attendance
          </button>
          </Link>
          &nbsp;
        <Link to='/Supervisor/SecondApprovalTimesheet'>              
          <button className="btn btn-primary">
            <img src={folder2} width="20px" height="20px" />
            Second Approval Timesheet
          </button>
                </Link>
        </div> */}
      </div>
    );
  }
}

export default connect(null, { changePage })(Supervisior);
