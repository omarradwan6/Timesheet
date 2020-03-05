import React from "react";
import DataCards from "./DataCards";
import SheetsTree from "./SheetsTree";
import CustomizedCalender from "./CustomizedCalendar";
import NewwCalendar from './NewwCalendar';
import { connect } from 'react-redux';
import { createUser, checkMode, updateActivities, userActivities, add_adjustments } from '../actions';
import axios from 'axios';




class MyTimesheet extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userName: null, id: null, lastMonth: 0, vacationBalance: 0,
            sickYTD: 0, takenVacation: 0, sheetData: []
        };
        //this.OnClickedSignOut = this.OnClickedSignOut.bind(this);
        this.OnButtonPressed = this.OnButtonPressed.bind(this);
    }

    componentDidMount() {
        axios.get("HOLLIDAY/Vacations")
            .then((response1) => {
                console.log(response1);
                var months = [];
                for (let i = 0; i < response1.data[0].length; i++) {
                    months.push.response1.data[i][Month];
                }

                console.log(months);


            })
            .catch((error) => {
                // handle error
                console.log("errors", error);
            });
        if (this.props.userName != null) {
            this.OnButtonPressed(this.props.userName);
        }



    }


    OnButtonPressed(name, password1) {

        axios.get(`EMP_DATA/details/${name}`)
            .then((response4) => {
                this.props.createUser(
                    response4.data[0].NAME,
                    response4.data[0].ID,
                    response4.data[0].DEP_ID,
                    response4.data[0].DESCRIPTION,
                    response4.data[0].SUP1ID,
                    response4.data[0].SUP2ID,
                    response4.data[0].NETWORKID,
                    response4.data[0].SUP1_NAME,
                    response4.data[0].SUP2_NAME,
                    response4.data[0].DEPT,
                    "loged-in"
                );
                this.setState({ userName: response4.data[0].NAME, id: response4.data[0].ID });
            })

            .catch((error) => {
                // handle error
                console.log("errors", error);
            });

    }



    componentDidUpdate(prevProps, prevState) {

        if (this.state.id !== null) {

            // Get Employee Vacation

            axios.get(`vTSheetVacationBalance/Details/${this.state.id}`)
                .then((response2) => {
                    if (response2.data.length != 0) {
                        if (this.state.lastMonth == 0) {
                            // handle success
                            this.setState({
                                lastMonth: response2.data[0].MONTH,
                                vacationBalance: response2.data[0].VAC_BALANCE,
                                sickYTD: response2.data[0].YTD_SICK,
                                takenVacation: response2.data[0].YTD_VAC_TAKEN
                            });
                        }
                    }
                })
                .catch((error) => {
                    // handle error
                    console.log("errors", error);
                });

            // Get Employee Sheets and Signing status

            axios.get(`MNTH_CTRL/Sheets/${this.state.id}`)
                .then((response3) => {
                    if (response3.data.length != 0) {
                        if (this.state.sheetData.length == 0) {
                            // handle success
                            this.setState({
                                sheetData: response3.data
                            });
                        }
                    }

                })
                .catch((error) => {
                    // handle error
                    console.log("errors", error);
                });


            axios.get(`/MNTH_CTRL/timesheetStatus/${this.props.empID}`,
                { params: { Month: new Date().getMonth() + 1, Year: new Date().getFullYear() } })
                .then((response1) => {
                    if (response1.data.result.length === 0) {
                        if (this.props.Mode === null || typeof this.props.Mode === "undefined") {
                            this.props.checkMode(
                                "new"
                            );
                        }

                    }
                    else {
                        if (this.props.Mode === null || typeof this.props.Mode == "undefined") {
                            this.props.checkMode(
                                "edit",
                                response1.data.result[0].EMP_SIGN,
                                response1.data.result[0].SUP_SIGN,
                                response1.data.result[0].LOCKED
                            );
                        }
                    }


                })
                .catch((error) => {
                    // handle error
                    console.log("errors", error);
                });

        }
    }



        render() {

            return (
                <div >
              
                        <div className="col-12 mb-4 mt-2">
                            <DataCards month={this.state.lastMonth} balance={this.state.vacationBalance} sick={this.state.sickYTD} taken={this.state.takenVacation} />
                        </div>

                    <div className="row">
                        <div className="col-12 col-lg-6 mb-2">
                            <SheetsTree data={this.state.sheetData} />
                        </div>
                        <div className="col-12 col-lg-6 mb-3 d-flex justify-content-center">
                            <NewwCalendar />
                        </div>
                    </div>
                </div>

            );

        }


    }





const mapStateToProps = state => {
    return { empID: state.newUser.id, userName: state.newUser.networkID, Status: state.newUser.status, Mode: state.checkMode.mode };
}

export default connect(mapStateToProps, { createUser, checkMode, userActivities, add_adjustments, updateActivities })(MyTimesheet);

