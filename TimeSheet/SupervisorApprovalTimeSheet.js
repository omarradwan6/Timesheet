import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import history from '../history'

class SupervisorApprovalTimesheet extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            timesheets: {},
            selectedTimesheet: {
                timesheet: {},
                name: ""
            },
            selectedRow:null


        }


    }


    changeFirst(e,ID,Month,Year,signed) {

        if (signed) {
            axios.post("/MNTH_CTRL/EditTimesheet/", null, {
                params: {

                    timesheet: "first",
                    ID: ID,
                    Month: Month,
                    Year: Year

                }

            })
                .then((response) => {
                    // handle success

                    //console.log("success", response);
                    alert("Timesheet edited successfully")
                })
                .catch((error) => {
                    // handle error
                    console.log("error", error);
                })
        }

        else {

            alert("Employee must sign before 1st Supervisor can sign.")
            e.preventDefault()
            e.stopPropagation();                  

        }

      

    }

    changeSecond(e, ID, Month, Year,signed) {

        if (signed) {
            axios.post("/MNTH_CTRL/EditTimesheet/", null, {
                params: {

                    timesheet: "second",
                    ID: ID,
                    Month: Month,
                    Year: Year

                }

            })
                .then((response) => {
                    // handle success

                    //console.log("success", response);
                })
                .catch((error) => {
                    // handle error

                    console.log("error", error);
                })
        }
        else {
            alert(" 1st Supervisor must sign before 2nd Supervisor can sign.")
            e.preventDefault()
            
        }
 

    }


    componentDidMount() {


        axios.get(`/MNTH_CTRL/SupervisorTimesheet/${this.props.empID}`, { params: { supervisor:this.props.stringPath,year:this.props.Empyear,month:this.props.Empmonth}})
            .then((response) => {
                // handle success
                this.setState({timesheets:response.data})
                //console.log("success", response.data);
            })
            .catch((error) => {
                // handle error
                this.setState({ timesheets: {}})
                console.log("error", error);
            })

        //history.push(this.props.stringPath)
    }

    rowSelect(e,index,name) {
   
        this.setState({ selectedTimesheet: { timesheet: this.state.timesheets.timesheet[index],name:name},selectedRow:index})
    }


    render() {

        return (
            
            <div>
            <nav class="flex navbar navbar-light pBackround justify-content-center">
                    <form class="form-inline"> 
                    
                        <Link class={`btn btn-lg pBackground m-1  ${this.state.selectedRow != null ? "" : "disabled"}`} to={{ pathname: "/Supervisor/Brief", state: { timesheet: this.state.selectedTimesheet.timesheet, EmployeeName: this.state.selectedTimesheet.name } }} type="button">Brief</Link>    
                        <Link className={`btn btn-lg pBackground m-1 ${this.state.selectedRow != null ? "" : "disabled"}`} to={{ pathname: "/SupervisorTimesheet/preview", state: { timesheet: this.state.selectedTimesheet.timesheet, EmployeeName: this.state.selectedTimesheet.name } }} type="button">Preview</Link>
                        { /* <Link class="btn btn btn-primary m-1 btn-lg" to='/' type="button">Close</Link> */ }
                </form>
                </nav>
                <hr class = "mt-0"></hr>
                <div class='container-fluid'>
            <table class="table table-bordered" id="Attendance Table">

                <thead className="thead pBackground">
                    <tr>
                        <th scope="col">Emp No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Emp Signed</th>
                        <th scope="col">First Signed</th>
                        <th scope="col">Second Signed</th>
                        <th scope="col">LOCKED</th>
                        <th scope="col">YEAR</th>
                        <th scope="col">MONTH</th>
                    </tr>
                </thead>


                        <tbody>
                            {this.state.timesheets.timesheet &&
                                this.state.timesheets.timesheet.map((timesheet,index) => {

                                    var Name = ""
                                


                                    if (this.state.timesheets.names) {



                                        var dataArr = this.state.timesheets.names
                                        for (let i = 0; i <= dataArr.length - 1; i++) {

                                            if (dataArr[i].ID == timesheet.EMP_ID.trim()) {

                                                Name = dataArr[i].NAME
                                                
                                                break
                                            }


                                        }

                                    }




                                    return (
                                        <tr style={this.state.selectedRow === index ? { backgroundColor: "#91AEC1", color: "white" } : {}} /*className={this.state.selectedRow === index ? "bg-dark text-white" : ""}*/ onClick={(e)=>this.rowSelect(e,index,Name)}>
                                    <th scope="row">{timesheet.EMP_ID}</th>
                                    <td id="tableRow">{Name}</td>
                                    <td><input type="checkbox" aria-label="Checkbox for following text input" defaultChecked={timesheet.EMP_SIGN === 1 ? "checked" : ""} disabled/></td>
                                    <td><input onChange={(e) => this.changeFirst(e, timesheet.EMP_ID, timesheet.MONTH, timesheet.YEAR, timesheet.EMP_SIGN)}  type="checkbox" aria-label="Checkbox for following text input" defaultChecked={timesheet.SUP_SIGN === 1 ? "checked" : ""} disabled={this.props.stringPath==="first" ? false : true } /></td>
                                    <td><input onChange={(e) => this.changeSecond(e, timesheet.EMP_ID, timesheet.MONTH, timesheet.YEAR, timesheet.SUP_SIGN)} type="checkbox" aria-label="Checkbox for following text input" defaultChecked={timesheet.SUP2_SIGN === 1 ? "checked" : ""} disabled={this.props.stringPath === "second" ? false : true} /></td>
                                    <td>{timesheet.LOCKED ? "True" : "False"}</td>
                                    <td>{timesheet.YEAR}</td>
                                    <td>{timesheet.MONTH}</td>
                                </tr>



                                )}

                            )}
             

                    </tbody>
            </table>
                    </div >
            </div >
            
            
            
            
            
            
            )
    }




}

const mapStateToProps = state => {

    return {
        empID: state.newUser.id,
        Empmonth: state.createSheet.month,
        Empyear: state.createSheet.year
    };
};
export default connect(mapStateToProps)(SupervisorApprovalTimesheet);



