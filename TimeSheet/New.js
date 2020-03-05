import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Bar from './Bar';
import Navigation from './Navigation';
import Attendance from './Attendance';
import TSheet from './TSheet';
import AdjustmentMain from './Adjustment/AdjustmentMain'
import { connect } from 'react-redux';
import { add_adjustments } from '../actions';
import axios from 'axios';
import { userActivities, changePage } from '../actions';
import './Common.css';


class New extends Component{

    constructor(props) {
        super(props)

        this.state = {

            blocking: this.props.blockPage
        };

    }

    componentDidMount() {
        axios.get('/CHRGs/GetSavedAdjustments/', {
            params: {
                empID: this.props.empID,
                month: this.props.month,
                year: this.props.year
            }
        })
            .then((response) => {
                // handle success
                this.setState({ oldadjustments: response.data }, function () {
                    var result = [];
                    this.state.oldadjustments.forEach(adjust => {
                        Object.keys(adjust).forEach((key) => {
                            if (key.startsWith("D") && adjust[key] != 0) {
                                 result.push({
                                     year: adjust["ACT_YEAR"], month: adjust["ACT_MONTH"], day: parseInt(key.substr(1, 2)),
                                     HOURS: adjust[key], JOB_ID: adjust["JOB_ID"] , SUBJOB_ID: adjust["SUBJOB_ID"], 
                                     ACTIVITY_ID: adjust["ACTIVITY_ID"], STOT: adjust["STOT"].trim()
                                 })
                            }
                        })
                    })
                    this.props.add_adjustments(result.sort((a, b) =>
                        (new Date(a.year, a.month - 1, a.day) - new Date(b.year, b.month - 1, b.day)) != 0 ? (new Date(a.year, a.month - 1, a.day) - new Date(b.year, b.month - 1, b.day))
                            : b.HOURS - a.HOURS))
                })
                console.log("success", response.data);
            })
            .catch((error) => {
                // handle error
                this.props.add_adjustments(null)
                //console.log("error", error);
            })

        this.props.changePage("timesheet")

    }

    render()
    {
          return (
              <div class="fadingPage BGLogo">

                      <Bar />
                      <Navigation />

                      <div>
                          <Switch>
                              <Route exact path="/newtimesheet/timesheet" component={TSheet}></Route>
                              <Route exact path="/newtimesheet/adjustment" component={AdjustmentMain}></Route>
                              <Route exact path="/newtimesheet/attendance" render={(routeProps) => <Attendance Filterpath='/newtimesheet/attendance' {...routeProps} />} />
                          </Switch>
                      </div>

                      {this.props.blockPage ? 
                          <div class="d-flex justify-content-center align-items-center fadingSpinnerOut">
                          <div class="fadingSpinnerIn d-flex justify-content-center align-items-center" role="status">
                              <span class="spinner-border text-pBackground spinSize" role="status"></span>
                              <h5 className="spinFont">Please Wait... </h5>
                          </div>
                          </div>
                          :null}

              </div>
            );
    }

}

const mapStateToProps = state => {
    return {
        empID: state.newUser.id,
        adjustments: state.adjustments.adjustments,
        month: state.createSheet.month,
        year: state.createSheet.year,
        mode: state.checkMode.mode,
        blockPage: state.blockTimesheet.blockPage,
    }
}

export default connect(mapStateToProps, { add_adjustments, userActivities, changePage })(New);
