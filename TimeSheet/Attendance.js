import React from 'react';
import axios from 'axios'
import './Attendance.css'
import { connect } from "react-redux";
import './Common.css';


class Attendance extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

            employeeInOut: {},
            filteredEmployeeInOut: {},
            selectedRow: null,
            IDfiltered: "",
            Latefiltered: "",
            StatusFiltered: ""

        }
        this.selectRow = this.selectRow.bind(this)
        this.configDate = this.configDate.bind(this)
        this.attendanceReq = this.attendanceReq.bind(this)
        this.clearFilter = this.clearFilter.bind(this)
        this.filterTable = this.filterTable.bind(this)
    }

    configDate() {

        var monthFrom = (this.props.dateFrom.getMonth() + 1).toString().length === 1 ? `0${(this.props.dateFrom.getMonth() + 1).toString()}` : (this.props.dateFrom.getMonth() + 1).toString()
        var monthTo = (this.props.dateTo.getMonth() + 1).toString().length === 1 ? `0${(this.props.dateTo.getMonth() + 1).toString()}` : (this.props.dateTo.getMonth() + 1).toString()

        var DayFrom = this.props.dateFrom.getDate().toString().length === 1 ? `0${this.props.dateFrom.getDate().toString()}` : this.props.dateFrom.getDate().toString()
        var DayTo = this.props.dateTo.getDate().toString().length === 1 ? `0${this.props.dateTo.getDate().toString()}` : this.props.dateTo.getDate().toString()


        var dateFrom = `${this.props.dateFrom.getFullYear()}${monthFrom}${DayFrom}`
        var dateTo = `${this.props.dateTo.getFullYear()}${monthTo}${DayTo}`
        var params = { person: "", dateFrom: dateFrom, dateTo: dateTo }
        return params
    }

    attendanceReq(stringPath, params) {

        axios.get(stringPath, { params })
            .then((response) => {
                // handle success
                this.setState({ employeeInOut: response.data, filteredEmployeeInOut: response.data })
                //console.log("successINOUT", response);
            })
            .catch((error) => {
                // handle error
                this.setState({ employeeInOut: {}, filteredEmployeeInOut: {}})
                console.log("error", error);
            })

    }




    checkPath() {


        var params = {}
        var stringPath = ''



        if (this.props.Filterpath === '/Supervisor/FirstApprovalAttendance') {
            var paramsDate = this.configDate()

            stringPath = `/IN_OUT/Details/${this.props.empID}`

            params = { ...paramsDate, person: "first" }
        }
        else if (this.props.Filterpath === '/Supervisor/SecondApprovalAttendance') {
            var paramsDate = this.configDate()
            stringPath = `/IN_OUT/Details/${this.props.empID}`
            params = { ...paramsDate, person: "second" }
        }
        else if (this.props.Filterpath === '/MyAttendance') {
            var paramsDate = this.configDate()

            stringPath = `/IN_OUT/Details/${this.props.empID}`
            params = { ...paramsDate, person: "My" }

        }

        else if (this.props.match.path === '/newtimesheet/attendance') {

            stringPath = `/MNTH_CTRL/details/${this.props.empID}`

        }

        return [ stringPath, params ]
    }

    clearFilter(e, filter) {


        if (this.state.IDfiltered === "" && this.state.Latefiltered === "" && this.state.StatusFiltered === "") {
            this.setState({ filteredEmployeeInOut: this.state.employeeInOut}) 
        }

        if (filter === 'name') {

            this.setState({ IDfiltered: "" },()=>this.filterTable("","clear"))

        }
        else if (filter === 'late') {

            this.setState({ Latefiltered: "" }, () => this.filterTable("", "clear"))

        }
        else if (filter === 'status'){

            this.setState({ StatusFiltered: "" }, () => this.filterTable("", "clear"))

        }


    }

    componentDidMount() {
        var [stringPath,params]=this.checkPath()
        this.attendanceReq(stringPath, params)


    }

    filterTable(ID, filter) {


        if (filter === "names") {

            var attendance = this.state.employeeInOut.attendance.filter((att) => {

                this.setState({ IDfiltered: ID })



                return (this.state.StatusFiltered != "" ? att.STATUS === this.state.StatusFiltered : true) && (this.state.Latefiltered!="" ? att.IS_LATE === this.state.Latefiltered: true) &&  att.EMP_ID.trim() === ID

            })
        }
        else if (filter === "late") {
            var attendance = this.state.employeeInOut.attendance.filter((att) => {

                this.setState({ Latefiltered: "LATE" })

                return (this.state.IDfiltered != "" ? att.EMP_ID.trim() === this.state.IDfiltered: true)  && (this.state.StatusFiltered !="" ? att.STATUS === this.state.StatusFiltered:true) && att.IS_LATE === "LATE"

            })
        }

        else if (filter === "clear") {

            var attendance = this.state.employeeInOut.attendance.filter((att) => {

                var ID = this.state.IDfiltered != "" ? att.EMP_ID.trim() === this.state.IDfiltered : true
                var status = this.state.StatusFiltered != "" ? att.STATUS === this.state.StatusFiltered : true
                var late = this.state.Latefiltered != "" ? att.IS_LATE === this.state.Latefiltered : true
                
                return ID && status && late

            })



        }

        else{
            var attendance = this.state.employeeInOut.attendance.filter((att) => {

                this.setState({ StatusFiltered: filter })


                return (this.state.IDfiltered != "" ? att.EMP_ID.trim() === this.state.IDfiltered : true) && (this.state.Latefiltered != "" ? att.IS_LATE === this.state.Latefiltered : true) && att.STATUS === filter

            })
        }

        
        var data = this.state.employeeInOut.data.filter((data) => {

            return data.ID.trim() === ID
        })

        var emp = { attendance, data}

        this.setState({ filteredEmployeeInOut: emp })

    }





    selectRow(event,index) {

        this.setState({ selectedRow: index })

    }



    render() {


        return (
     <>
                    <div className="table-responsive-sm">
           
                    <table class="table table-striped table table-bordered table-sm text-center" id="Attendance Table">

                        <thead className="pBackground">
                        <tr>
                                <th scope="col" class="align-middle">ID</th>
                                <th scope="col" class="align-middle">Name
                                                 {this.props.Filterpath != undefined && this.props.Filterpath != "/MyAttendance" && this.props.Filterpath != "/newtimesheet/attendance" &&
                                        <>
                                            <span class="dropdown">
                                                <button class="m-2 btn btn-outline-light btn-sm dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                </button>
                                                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                    {this.state.employeeInOut.attendance &&
                                                        
                                                        this.state.employeeInOut.data.map((name) => {
                                                            return <button onClick={(e) => this.filterTable(name.ID, "names")} class={`dropdown-item ${this.state.IDfiltered === name.ID ? "greyBackground font-weight-bold" : ""}`} type="button">{name.NAME}</button>

                                                        }

                                                        )}
                                                </div>
                                            </span>
                                            <button className="btn btn-outline-light" data-toggle="tooltip" data-placement="top" title="Clear Filter" onClick={(e) => this.clearFilter(e, "name")}></button>
                                        </>
                                    }

                                    </th>
                                <th scope="col" class="align-middle">Title</th>
                                <th scope="col" class="align-middle">Date</th>
                                <th scope="col" class="align-middle">IN Time</th>
                                <th scope="col" class="align-middle">Late
                                         {this.props.Filterpath != undefined  &&
                                            <>
                                                <span class="dropdown">
                                                    <button class="m-2 btn btn-outline-light pBackground btn-sm dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    </button>
                                                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                <a class={`dropdown-item ${this.state.Latefiltered === 'LATE' ? "greyBackground font-weight-bold" : ""}`} onClick={(e) => this.filterTable(name.ID,"late")}>Late</a>                                                
                                                    </div>
                                                </span>
                                                <button className="btn btn-outline-light" data-toggle="tooltip" data-placement="top" title="Clear Late Filter" onClick={(e)=>this.clearFilter(e,"late")}></button>
                                            </>
                                        }
                                        </th>
                                <th scope="col" class="align-middle">OUT Time</th>
                                <th scope="col" class="align-middle">Balance</th>
                                <th scope="col" class="align-middle">Status
                                    {this.props.Filterpath != undefined &&
                                            <>
                                                <span class="dropdown">
                                                    <button class="m-2 btn btn-outline-light pBackground btn-sm dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    </button>
                                                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                <a class={`dropdown-item ${this.state.StatusFiltered === 'ABSENT' ? "greyBackground font-weight-bold":""}`} onClick={(e) => this.filterTable( "", "ABSENT")}>ABSENT</a>
                                                <a class={`dropdown-item ${this.state.StatusFiltered === 'UNDER' ? "greyBackground font-weight-bold" : ""}`} onClick={(e) => this.filterTable( "", "UNDER")}>UNDER</a>
                                                <a class={`dropdown-item ${this.state.StatusFiltered === 'OVER' ? "greyBackground font-weight-bold" : ""}`} onClick={(e) => this.filterTable( "", "OVER")}>OVER</a>
                                                <a class={`dropdown-item ${this.state.StatusFiltered === 'U-EARLY' ? "greyBackground font-weight-bold" : ""}`} onClick={(e) => this.filterTable( "", "U-EARLY")}>Under and Early Leave</a>
                                                <a class={`dropdown-item ${this.state.StatusFiltered === 'O-EARLY' ? "greyBackground font-weight-bold" : ""}`} onClick={(e) => this.filterTable( "", "O-EARLY")}>Early Leave</a>
                                                    </div>
                                                </span>
                                            <button className="btn btn-outline-light" data-toggle="tooltip" data-placement="top" title="Clear Filter" onClick={(e) => this.clearFilter(e, "status")}></button>
                                            </>
                                        }
                                        </th>
                            <th scope="col" class="align-middle">Justification</th>
                        </tr>
                            </thead>

         
                <tbody>
              
                            { this.state.employeeInOut.attendance &&
                                
                                
                                this.state.filteredEmployeeInOut.attendance.map((employee, index) => {
                                    var attDate = employee.ATT_DATE.toString()
                                    var date = new Date(parseInt(attDate.substr(6)))

                                    var Name = ""
                                    var Description = ""


                                    if (this.state.filteredEmployeeInOut.data) {
                                        var dataArr = this.state.employeeInOut.data
                                        for (let i = 0; i <= dataArr.length - 1; i++) {

                                            if (dataArr[i].ID == employee.EMP_ID.trim()) {

                                                Name = dataArr[i].NAME
                                                Description = dataArr[i].DESCRIPTION
                                                break
                                            }


                                        }

                                    }

                                    return (
                                        <tr /*style={{ height: "5px"}}*/ style={this.state.selectedRow === index ? { backgroundColor: "#91AEC1", color: "white" }:{}} /*className={this.state.selectedRow === index ? "bg-dark text-white" :""}*/ id="tableRow" onClick={(event) => this.selectRow(event, index)}>
                                    <th scope="row">{employee.EMP_ID}</th>
                                    <td id="tableRow">{Name}</td>
                                    <td>{Description}</td>
                                    <td>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</td>
                                    <td>{`${employee.IN_HR}:${employee.IN_MINUT}`}</td>
                                            <td /*className="font-weight-bold"*/ className={`font-weight-bold ${employee.IS_LATE ? "text-warning" : ""}`}>{employee.IS_LATE === "LATE"  ? "LATE" : ""}</td>
                                    <td>{`${employee.OUT_HR}:${employee.OUT_MINUT}`}</td>
                                    <td>{`${employee.BALANCE_HR}:${employee.BALANCE_MINUT}`}</td>
                                            <td /*className="font-weight-bold"*/ className={`${employee.STATUS === 'UNDER' || employee.STATUS === 'U-EARLY' || employee.STATUS === 'O-EARLY' ? "font-weight-bold text-danger" : employee.STATUS === 'ABSENT' ? "font-weight-bold text-danger" : ""}`}>{employee.STATUS ==='O-EARLY'? "Early Leave": employee.STATUS ==='U-EARLY' ? "Under and Early Leave": employee.STATUS}</td>
                                    <td>{employee.JUSTFY}</td>

                                </tr>
                            )



                        })}


                    </tbody>
                    </table>
                    </div>
          </>
        );



    }





}


const mapStateToProps = state => {
    //console.log(state);
    return { empID: state.newUser.id,empName:state.newUser.name,empDepartment:state.newUser.department };
};
export default connect(mapStateToProps)(Attendance);

