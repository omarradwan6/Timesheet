import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import logo from "../Main Page/Logos/logo.png";
import './print.css'
import { changePage } from '../actions'
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import history from '../history'

class Preview extends React.Component {

    constructor(props) {

        super(props)

        this.state = { timesheet: null, tsheetStatus: null, totalSThours: 0, totalOThours: 0, totalHours: 0, Month: "", Year: "", Employee:null}

        this.dimHollidays = this.dimHollidays.bind(this)
        this.apiRequests = this.apiRequests.bind(this)
        this.sumHours = this.sumHours.bind(this)
    }


    dimHollidays(day, tsheet) {

        var dt = new Date(tsheet.ACT_YEAR, tsheet.ACT_MONTH - 1, day)

        if (dt.getDay() === 5 || dt.getDay() === 6) {
            return true
        }



        return false
    }

   apiRequests(id) {

        axios.get(`/CHRGs/Preview/${id==="" ? this.props.empID: id}`,
            { params: { month: this.state.Month, year: this.state.Year } })
            .then((response) => {
                // handle success
                this.setState({ timesheet: response.data },this.sumHours)
                //console.log("success", response);
            })
            .catch((error) => {
                // handle error
                this.setState({ timesheet: null })
                console.log("error", error);
            })


       axios.get(`/MNTH_CTRL/timesheetStatus/${id === "" ? this.props.empID : id}`,
            { params: { Month: this.state.Month, year: this.state.Year } })
            .then((response) => {
                // handle success
                this.setState({ tsheetStatus: response.data } )
                //console.log("success", response);
            })
            .catch((error) => {
                // handle error
                this.setState({ tsheetStatus: null })
                console.log("error", error);
            })

       if (id != "") {

           axios.get(`/EMP_DATA/EmployeePreview/${id}`)
               .then((response) => {
                   // handle success
                   this.setState({ Employee: response.data })
                   //console.log("successEMPPL", response);
               })
               .catch((error) => {
                   // handle error
                   this.setState({ Employee: null })
                   console.log("error", error);
               })


       }

    }


    componentDidMount() {

        if (this.props.match.path === '/timesheet/preview') {

            this.setState({ Month: this.props.Empmonth, Year: this.props.Empyear }, () => this.apiRequests(""))

        }
        else if (this.props.match.path === '/previousTimesheet/preview') {

            this.setState({ Month: this.props.prevMonth, Year: this.props.prevYear }, () => this.apiRequests(""))

        }

        else if (this.props.match.path === '/SupervisorTimesheet/preview') {

            this.setState({ Month: this.props.location.state.timesheet.MONTH, Year: this.props.location.state.timesheet.YEAR }, () => this.apiRequests(this.props.location.state.timesheet.EMP_ID))
        }

  this.props.changePage("preview")

    }

    sumHours() {

        var sumT = 0
        var sumO=0

        this.state.timesheet.map((tsheet) => {

            Object.keys(tsheet).forEach((t) => {
            if (t.startsWith("D")) {
                if (tsheet.STOT.trim() === "S") {

                    sumT = sumT + tsheet[t]
                }

                if (tsheet.STOT.trim() === "O") {

                    sumO = sumO + tsheet[t]
                }

            }

        })

        this.setState({
            totalSThours: sumT,
            totalOThours: sumO,
            totalHours: sumO + sumT

        })

        })
    }



    render() {


        return (

            <div>


                <nav className='navbar p-0 pBackground d-flex justify-content-end'>

                    <Link id="hideButton" onClick={history.goBack} className='mt-2 mb-2 btn pBackground btn-lg'><FontAwesomeIcon class="pBackground" icon={faArrowCircleLeft} width="40px" /></Link>

                {/* <button id="hideButton" onClick={window.print} className='btn btn-outline-primary btn-lg'>PRINT</button>*/ }

                </nav>
            
            <div className="container-fluid">                              
                

                <div class="my-3 d-flex bd-highlight align-items-center border border-dark justify-content-between">
                    <div class="p-2 bd-highlight align-items-center">
                        <img src={logo} alt="Logo"  />

                        </div>
                    <div class="p-2 bd-highlight align-items-center">
              
                        <h1 className="font-weight-bold">TimeSheet</h1>
                        <h1 className="text-center font-weight-bold">{`${this.state.Month}/${this.state.Year}`}</h1>
                 

                    </div>

                    <div class="mr-4 justify-content-between">
                        <div className="d-flex flex-column">
                            
                            <h4 class="my-2 font-weight-bold  align-items-center">Employee Number: <span className=" font-weight-normal ml-3">{this.state.Employee != null ? this.state.Employee[0].ID : this.props.empID}</span> </h4>
                            <h4 class="my-2 font-weight-bold align-items-center">Department: <span className="font-weight-normal ml-3">{this.state.Employee != null ? this.state.Employee[0].DEPT : this.props.empDepartment}</span> </h4>

       
                        </div>

                        <div className="d-flex flex-column">
                            <h4 class="my-2 font-weight-bold align-items-center">Employee Name: <span className="font-weight-normal ml-3">{this.state.Employee != null ? this.state.Employee[0].NAME : this.props.empName}</span> </h4>

                            <h4 class="my-2 font-weight-bold align-items-center" >Title: <span className="font-weight-normal ml-3">{this.state.Employee != null ? this.state.Employee[0].DESCRIPTION : this.props.empTitle}</span> </h4>
                        </div>

                        </div>
                    
                </div>


                {this.state.timesheet && this.state.timesheet.length != 0 &&

                <div className="table-responsive border border-dark" >
                    <table className="table table-sm table-bordered table-hover">
                        <thead id="TableHead" className="thead-light">
                        <tr>
                            <th scope="col">Job_ID</th>
                            <th scope="col">SubJob</th>
                            <th scope="col">Activity</th>
                            <th scope="col">Month</th>
                            <th scope="col">S/T</th>
                            <th scope="col">1</th>
                            <th scope="col">2</th>
                            <th scope="col">3</th>
                            <th scope="col">4</th>
                            <th scope="col">5</th>
                            <th scope="col">6</th>
                            <th scope="col">7</th>
                            <th scope="col">8</th>
                            <th scope="col">9</th>
                            <th scope="col">10</th>
                            <th scope="col">11</th>
                            <th scope="col">12</th>
                            <th scope="col">13</th>
                            <th scope="col">14</th>
                            <th scope="col">15</th>
                            <th scope="col">16</th>
                            <th scope="col">17</th>
                            <th scope="col">18</th>
                            <th scope="col">19</th>
                            <th scope="col">20</th>
                            <th scope="col">21</th>
                            <th scope="col">22</th>
                            <th scope="col">23</th>
                            <th scope="col">24</th>
                            <th scope="col">25</th>
                            <th scope="col">26</th>
                            <th scope="col">27</th>
                            <th scope="col">28</th>
                            <th scope="col">29</th>
                            <th scope="col">30</th>
                            <th scope="col">31</th>
                            <th scope="col">ST</th>
                            <th scope="col">OT</th>
                        </tr>
                    </thead>
                        <tbody>
                            {this.state.timesheet != null && this.state.tsheetStatus !=null &&

                                
                                
                               this.state.timesheet.map((tsheet) => {
                                   var sumT = 0
                                   var sumO = 0

                                   Object.keys(tsheet).forEach((t) => {

                                       
                                       if (t.startsWith("D")) {
                                           if (tsheet.STOT.trim() === "S") {

                                               sumT = sumT + tsheet[t]
                                           }

                                           if (tsheet.STOT.trim() === "O") {

                                               sumO = sumO + tsheet[t]
                                           }
                                          

                                       }

                                   })

                          
                                  

                             return(
                                <tr>
                                     <th scope="row" id={tsheet.PENFLAG.trim() === "P" ? "penalty" : ""} className={tsheet.PENFLAG.trim() === "P" ? "bg-danger text-white":""}>{tsheet.JOB_ID}</th>
                                     <td id={tsheet.PENFLAG.trim() === "P" ? "penalty" : ""}  className={tsheet.PENFLAG.trim() === "P" ? "bg-danger text-white" : ""} >{tsheet.SUBJOB_ID}</td>
                                     <td id={tsheet.PENFLAG.trim() === "P" ? "penalty" : ""}  className={tsheet.PENFLAG.trim() === "P" ? "bg-danger text-white" : ""}>{tsheet.ACTIVITY_ID}</td>
                                     <td id={tsheet.PENFLAG.trim() === "P" ? "penalty" : ""} className={tsheet.PENFLAG.trim() === "P" ? "bg-danger text-white" : ""}>{tsheet.ACT_MONTH}</td>
                                     <td id={tsheet.PENFLAG.trim() === "P" ? "penalty" : ""} className={tsheet.PENFLAG.trim() === "P" ? "bg-danger text-white" : ""}>{tsheet.STOT}</td>
                                     <td id={this.dimHollidays(1, tsheet) ? "holliday" : ""} className={this.dimHollidays(1, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D01===0 ? "": tsheet.D01}</td>
                                     <td id={this.dimHollidays(2, tsheet) ? "holliday" : ""} className={this.dimHollidays(2, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D02 === 0 ? "" : tsheet.D02}</td>
                                     <td id={this.dimHollidays(3, tsheet) ? "holliday":""} className={this.dimHollidays(3, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D03===0 ? "": tsheet.D03}</td>
                                     <td id={this.dimHollidays(4, tsheet) ? "holliday":""} className={this.dimHollidays(4, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D04===0 ? "": tsheet.D04}</td>
                                     <td id={this.dimHollidays(5, tsheet) ? "holliday":""} className={this.dimHollidays(5, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D05===0 ? "": tsheet.D05}</td>
                                     <td id={this.dimHollidays(6, tsheet) ? "holliday":""} className={this.dimHollidays(6, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D06===0 ? "": tsheet.D06}</td>
                                     <td id={this.dimHollidays(7, tsheet) ? "holliday":""} className={this.dimHollidays(7, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D07===0 ? "": tsheet.D07}</td>
                                     <td id={this.dimHollidays(8, tsheet) ? "holliday":""} className={this.dimHollidays(8, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D08===0 ? "": tsheet.D08}</td>
                                     <td id={this.dimHollidays(9, tsheet) ? "holliday":""} className={this.dimHollidays(9, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D09===0 ? "": tsheet.D09}</td>
                                     <td id={this.dimHollidays(10, tsheet) ? "holliday" : ""} className={this.dimHollidays(10, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D10 === 0 ? "" : tsheet.D10}</td>
                                     <td id={this.dimHollidays(11, tsheet) ? "holliday":""} className={this.dimHollidays(11, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D11===0 ? "": tsheet.D11}</td>
                                     <td id={this.dimHollidays(12, tsheet) ? "holliday":""} className={this.dimHollidays(12, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D12===0 ? "": tsheet.D12}</td>
                                     <td id={this.dimHollidays(13, tsheet) ? "holliday":""} className={this.dimHollidays(13, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D13===0 ? "": tsheet.D13}</td>
                                     <td id={this.dimHollidays(14, tsheet) ? "holliday":""} className={this.dimHollidays(14, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D14===0 ? "": tsheet.D14}</td>
                                     <td id={this.dimHollidays(15, tsheet) ? "holliday":""} className={this.dimHollidays(15, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D15===0 ? "": tsheet.D15}</td>
                                     <td id={this.dimHollidays(16, tsheet) ? "holliday":""} className={this.dimHollidays(16, tsheet) ? "bg-secondary text-white" : ""}> {tsheet.D16===0 ? "": tsheet.D16}</td>
                                     <td id={this.dimHollidays(17, tsheet) ? "holliday":""} className={this.dimHollidays(17, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D17===0 ? "": tsheet.D17}</td>
                                     <td id={this.dimHollidays(18, tsheet) ? "holliday":""} className={this.dimHollidays(18, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D18===0 ? "": tsheet.D18}</td>
                                     <td id={this.dimHollidays(19, tsheet) ? "holliday":""} className={this.dimHollidays(19, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D19===0 ? "": tsheet.D19}</td>
                                     <td id={this.dimHollidays(20, tsheet) ? "holliday":""} className={this.dimHollidays(20, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D20===0 ? "": tsheet.D20}</td>
                                     <td id={this.dimHollidays(21, tsheet) ? "holliday":""} className={this.dimHollidays(21, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D21===0 ? "": tsheet.D21}</td>
                                     <td id={this.dimHollidays(22, tsheet) ? "holliday":""} className={this.dimHollidays(22, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D22===0 ? "": tsheet.D22}</td>
                                     <td id={this.dimHollidays(23, tsheet) ? "holliday":""} className={this.dimHollidays(23, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D23===0 ? "": tsheet.D23}</td>
                                     <td id={this.dimHollidays(24, tsheet) ? "holliday":""} className={this.dimHollidays(24, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D24===0 ? "": tsheet.D24}</td>
                                     <td id={this.dimHollidays(25, tsheet) ? "holliday":""} className={this.dimHollidays(25, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D25===0 ? "": tsheet.D25}</td>
                                     <td id={this.dimHollidays(26, tsheet) ? "holliday":""} className={this.dimHollidays(26, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D26===0 ? "": tsheet.D26}</td>
                                     <td id={this.dimHollidays(27, tsheet) ? "holliday":""} className={this.dimHollidays(27, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D27===0 ? "": tsheet.D27}</td>
                                     <td id={this.dimHollidays(28, tsheet) ? "holliday":""} className={this.dimHollidays(28, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D28===0 ? "": tsheet.D28}</td>
                                     <td id={this.dimHollidays(29, tsheet) ? "holliday":""} className={this.dimHollidays(29, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D29===0 ? "": tsheet.D29}</td>
                                     <td id={this.dimHollidays(30, tsheet) ? "holliday":""} className={this.dimHollidays(30, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D30===0 ? "": tsheet.D30}</td>
                                     <td id={this.dimHollidays(31, tsheet) ? "holliday":""} className={this.dimHollidays(31, tsheet) ? "bg-secondary text-white" : ""}>{tsheet.D31===0 ? "": tsheet.D31}</td>
                                     <td>{sumT}</td>
                                     <td>{sumO}</td>


                                </tr>

                                    )
                            })}
              
                    </tbody>
                    </table>
                    
                </div>
                }
                {this.state.timesheet && this.state.timesheet.length != 0 &&

                    <>
                <div className='mx-3 my-2 d-flex justify-content-between'>
                        <div className="font-weight-bold">Total OT Hours: <span className="font-weight-normal">{this.state.totalOThours}</span></div>
                        <div className="font-weight-bold">Total ST Hours: <span className="font-weight-normal">{this.state.totalSThours}</span></div>            
                        <div className="font-weight-bold">Total Hours: <span className="font-weight-normal">{this.state.totalHours}</span></div>
   
                </div>
                <hr></hr>
                    
                <div className="d-flex align-items-end border border-dark">
                       
                    <table class="table table-sm table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Employee</th>
                                <th scope="col">First Approval</th>
                                <th scope="col">Second Approval</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.tsheetStatus && this.state.tsheetStatus.length != 0
                                &&
                            <tr>
                                <th scope="row">Name</th>
                                <td>{this.state.Employee != null ? this.state.Employee[0].NAME : this.props.empName}</td>
                                <td>{this.state.tsheetStatus.sup1Name[0]}</td>
                                <td>{this.state.tsheetStatus.sup2Name[0]}</td>
                            </tr>
                        }
                            <tr>
                                {this.state.tsheetStatus && this.state.tsheetStatus.result.length !=0

                                    && 
                                    
                                <>
                                <th scope="row">Electronic Signature</th>
                                <td>{this.state.tsheetStatus.result[0].EMP_SIGN===1 ? "Signed" : "XXXX"}</td>
                                <td>{this.state.tsheetStatus.result[0].SUP_SIGN===1 ? "Signed" : "XXXX"}</td>
                                <td>{this.state.tsheetStatus.result[0].SUP2_SIGN===1 ? "Signed" : "XXXX"}</td>
                                </>
                                }
                            </tr>
                            <tr>
                                <th scope="row">Signature</th>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    </>
                }
                </div>
                </div>
            
            )

    }






}
const mapStateToProps = state => {

    return {
        empID: state.newUser.id,
        empName: state.newUser.name,
        empDepartment: state.newUser.departmentName,
        empTitle: state.newUser.description,
        empSup1: state.newUser.sup1Name,
        empSup2: state.newUser.sup2Name,
        Empmonth: state.createSheet.month,
        Empyear: state.createSheet.year,
        prevMonth: state.createPreview.monthSelected,
        prevYear: state.createPreview.yearSelected
    };
};
export default connect(mapStateToProps, {changePage})(Preview)


