import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import history from '../history'
import { connect } from 'react-redux'
import { changePage } from '../actions'



class Brief extends React.Component {


    constructor(props) {

        super(props)
        this.state = {
            timesheet: [],
            vacationDetails: {},
            name:""
        }


    }


    //sumHours() {

    //    var sumTotal = 0


    //    this.state.timesheet.map((tsheet) => {

    //        Object.keys(tsheet).forEach((t) => {
    //            if (t.startsWith("D")) {

    //                sumTotal = sumTotal + tsheet[t]
    //            }

    //        })


    //    })
    //}

    componentDidMount() {



        axios.get(`/CHRGs/Preview/${this.props.location.state.timesheet.EMP_ID}`,
            { params: { month: this.props.location.state.timesheet.MONTH, year: this.props.location.state.timesheet.YEAR } })
            .then((response) => {
                // handle success
                this.setState({ timesheet: response.data, name: this.props.location.state.EmployeeName }, this.sumHours)
                //console.log("success", response);
            })
            .catch((error) => {
                // handle error
                this.setState({ timesheet: null })
                console.log("error", error);
            })


        axios.get(`/vTSheetVacationBalance/Details/${this.props.location.state.timesheet.EMP_ID}`)

            .then((response) => {
                this.setState({ vacationDetails: response.data[0] })
                //console.log("success vaca", response);
     
            })
            .catch((error) => {
                // handle error
                console.log("errors", error);
            })
        this.props.changePage('brief')
        
    }




    render() {

        return (
            <div className="container-fluid">

                <div className='my-3 text-center'>
                    <Link  /*to='/'*/  onClick={history.goBack}  className='mx-2 btn btn-lg pBackground'>CLOSE</Link>
                </div>

                <h2 class="card-title my-5 text-center">{this.state.name}</h2>

                <div className="d-flex justify-content-around">
                <div class="card border mb-3 ml-1">
                    <div class="card-header text-center greyBackground">Month</div>
                    <div class="card-body">
                            <h1  class="font-weight-bold card-text text-center">{this.state.vacationDetails.MONTH}</h1>
                    </div>
                    </div>
                    <div class="card border mb-3 ml-1">
                        <div class="card-header text-center greyBackground">Vacation Balance</div>
                        <div class="card-body">
                            <h1  class="font-weight-bold card-text text-center">{this.state.vacationDetails.VAC_BALANCE}</h1>
                        </div>
                    </div>
                    <div class="card border mb-3 ml-1">
                        <div class="card-header text-center greyBackground">Year To Date Sick</div>
                        <div class="card-body">
                            <h1 class="font-weight-bold card-text text-center">{this.state.vacationDetails.YTD_SICK}</h1>
                        </div>
                    </div>
                    <div class="card border mb-3 ml-1">
                        <div class="card-header text-center greyBackground">YTD Vacation Taken</div>
                        <div class="card-body">
                            <h1  class="font-weight-bold card-text text-center">{this.state.vacationDetails.YTD_VAC_TAKEN}</h1>
                        </div>
                    </div>
                </div>

                <table class="border table table-hover table-bordered ">
                    <thead class="thead greyBackground">
                    <tr>
                        <th scope="col">JOB_ID</th>
                        <th scope="col">SUBJOB_ID</th>
                        <th scope="col">ACTIVITY_ID</th>
                        <th scope="col">STOT</th>
                        <th scope="col">HOURS</th>
                    </tr>
                </thead>
                <tbody>

                        {this.state.timesheet.length != 0 && this.state.timesheet.length != undefined &&



                            this.state.timesheet.map((tsheet) => {


                                var sum = 0

                                Object.keys(tsheet).forEach((t) => {

                                    if (t.startsWith("D")) {

                                        sum = sum + tsheet[t]

                                        }


                                })
             
                        
                        return(
                        <tr>
                            <th scope="row">{tsheet.JOB_ID}</th>
                            <td>{tsheet.SUBJOB_ID}</td>
                            <td>{tsheet.ACTIVITY_ID}</td>
                            <td>{tsheet.STOT.trim()}</td>
                            <td>{sum}</td>
                        </tr>



                            )
                    })}

       

                </tbody>
            </table>
            
            </div>
            
            )

    }












}

export default connect(null, {changePage})(Brief)