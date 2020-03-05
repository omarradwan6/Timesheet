

import React from 'react';
import MainPage from "./Main Page/MainPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import New from './TimeSheet/New'
import FilterAttendaceBar from './TimeSheet/FilterAttendanceBar'
import SupervisorApprovalTimesheet from './TimeSheet/SupervisorApprovalTimeSheet';
import Preview from './TimeSheet/Preview'
import Brief from './TimeSheet/Brief'
import Navbar from './Main Page/Navbar'
import Head from './Main Page/Head'
import Employee from './Main Page/Employee'
import Supervisior from './Main Page/Supervisior'
import Manager from './Main Page/Manager'
import axios from 'axios'
import { connect } from 'react-redux'
import { createUser } from './actions'
import FirstPage from "./Main Page/FirstPage";
import history from './history'
import './TimeSheet/Common.css'




class App extends React.Component {

    constructor(props) {

        super(props)
        this.state = { userName: null, id: null}
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



    OnButtonPressed= (name, password1) =>{


              axios.get("Auth/Login",
            { params: { UserName: name, Password: password1, Check: this.props.Status } })
                  .then((response11) => {
                      console.log(response11, "UFUIFTUIF")
                if (response11.data == true) {
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
                            
                            this.setState({ userName: response4.data[0].NAME, id: response4.data[0].ID});
                        })

                        .catch((error) => {
                            // handle error
                            console.log("errors", error);
                        });
                }
                else {
                    //if (this.props.userName === null || this.state.userName === null) {
                        alert("Wrong Username or Password !!!");
                    //}

                }
            })
            .catch((error) => {
                // handle error
                console.log("errors", error);
            });
    }


    render() {

        return (
            <div>
                {this.props.Status === 'loged-in' &&
                    <div>
                    {this.props.currentPage != 'preview' && this.props.currentPage != 'timesheet' &&
                    <>
                        <Head />
                        {this.props.currentPage!='brief' &&
                            <Navbar />
                        }
                        </>
                        }
                    <Switch>


                        
                    <Route exact path="/" component={Employee}></Route>
                    <Route exact path="/Supervisor" component={Supervisior}></Route>
                    <Route exact path="/Manager" component={Manager}></Route>
                    <Route exact path="/newtimesheet/timesheet" component={New}></Route>
                    <Route exact path="/newtimesheet/adjustment" component={New}></Route>
                    <Route exact path="/newtimesheet/attendance" component={New}></Route>
                     
                    <Route exact path="/timesheet/preview" component={Preview}></Route>
                    <Route exact path="/previousTimesheet/preview" component={Preview}></Route>
                    <Route exact path="/SupervisorTimesheet/preview" component={Preview}></Route>
                    <Route exact path="/Supervisor/Brief" component={Brief}></Route>

                    
                    <Route exact path="/Supervisor/FirstApprovalTimesheet" component={Supervisior}></Route>
                    <Route exact path="/Supervisor/FirstApprovalAttendance" component={Supervisior}></Route>
                    <Route exact path="/Supervisor/SecondApprovalTimesheet" component={Manager}></Route>
                    <Route exact path="/Supervisor/SecondApprovalAttendance" component={Manager}></Route>
                    <Route exact path="/MyTimesheet" component={Employee}></Route>
                    <Route exact path="/MyAttendance" component={Employee}></Route>


                 
                </Switch>
                </div>
                }

                {this.props.Status != "loged-in" &&
                    <div className="d-flex justify-content-center align-items-center main-background" style={{ zIndex: '2' }}>
                        <FirstPage onButtonClicked={this.OnButtonPressed} />
                    </div>
                }

                </div>

        );

    }


}




const mapStateToProps = state => {
    return { Status: state.newUser.status, currentPage: state.currentPage.page, userName: state.newUser.name };
}

export default connect(mapStateToProps, { createUser })(App);






//<Route exact path="/" component={MainPage}></Route>
//    <Route exact path="/Manager" component={MainPage}></Route>
//    <Route exact path="/Supervisior" component={MainPage}></Route>

//<Route exact path="/Supervisor/FirstApprovalTimesheet" render={(routeProps) => <SupervisorApprovalTimesheet stringPath={"first"} {...routeProps} />} />
