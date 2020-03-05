import React from 'react';
import Attendance from './Attendance'
import DatePicker from 'react-datepicker'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Attendance.css'
import './Common.css';

class FilterAttendanceBar extends React.Component {

    constructor(props) {

        super(props)
        this.state = { dateFrom: new Date(), dateTo: new Date(), submit: false }
        this.onChangeFrom = this.onChangeFrom.bind(this)
        this.onChangeTo = this.onChangeTo.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChangeFrom(date) {


        this.setState({ submit: false, dateFrom: date })
    }

    onChangeTo(dates) {


        this.setState({ submit: false, dateTo: dates })

    }

    onSubmit() {

        if (this.state.dateFrom.getTime() <= this.state.dateTo.getTime()) {

            this.setState({ submit: true })


        }


    }

    componentDidMount() {

        console.log(this.props,'propsss')

    }


    render() {

        return (
          
            <div>


                <nav class="navbar ml-2 mr-2">
                    <form class="form-inline p-0 d-flex justify-content-center align-items-center" style={{ width: "100%" }}>
                        <div class= "">
                        <span className="rounded"className="font-weight-bold mx-2">From</span >
                        <DatePicker className="rounded" onChange={(date) => this.onChangeFrom(date)} selected={this.state.dateFrom} value={this.state.dateFrom} />
                        <span className="font-weight-bold mx-2">To</span >
                            <DatePicker className="rounded" onChange={(dates) => this.onChangeTo(dates)} selected={this.state.dateTo} value={this.state.dateTo} />
                        </div>

                        <div class="">
                            <button onClick={this.onSubmit} class="btn pBackground m-1 ml-2" type="button">Activate</button>
                        <ReactHTMLTableToExcel 
                            id="test-table-xls-button"
                            className="download-table-xls-button btn btn pBackground m-1"
                            table="Attendance Table"
                            filename={`${this.props.empId} Attendance`}
                            sheet="Attendance"
                            buttonText="Export" />
                            { /* <Link class="btn btn btn-outline-light m-1" to="/" type="button">Close</Link> */ }
                        </div>

                </form>
            </nav>
                {
                    this.state.submit &&
                    <div className="mt-1 ml-3 mr-3">

                        <table class="table table-striped table borderless table-sm align-items-center" id="Attendance Table">
                            <Attendance dateFrom={this.state.dateFrom} dateTo={this.state.dateTo} Filterpath={this.props.Filterpath}/>
                        </table>
                    </div>
 

        }
            </div>


            )


    }














}
const mapStateToProps = (state) => {

    return { empId: state.newUser.id}
}

export default connect(mapStateToProps)(FilterAttendanceBar)
