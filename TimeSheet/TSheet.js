import React from 'react';
import './Common.css';
import Penalty from './Penalty';
import axios from 'axios'
import { connect } from 'react-redux';
import { userActivities } from '../actions';
import { updateActivities } from '../actions';
import { saveStatus } from '../actions';




class TSheet extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

            jobID: '',
            subJobID: '',
            activityID: '',
            activities: this.props.uActivities != null ? this.props.uActivities : [],
            sActivity: {},
            sumHours: this.props.totalHours != null ? this.props.totalHours : { s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0, s7: 0, s8: 0, s9: 0, s10: 0, s11: 0, s12: 0, s13: 0, s14: 0, s15: 0, s16: 0, s17: 0, s18: 0, s19: 0, s20: 0, s21: 0, s22: 0, s23: 0, s24: 0, s25: 0, s26: 0, s27: 0, s28: 0, s29: 0, s30: 0, s31: 0, sS: 0, sO: 0 },
            jobList: [],
            subJobList: [],
            activitiyList: [],
            hDays: [],
            mode: this.props.mode,
            zeroRow: false
        };

        this.addActivity = this.addActivity.bind(this)
        this.totalHours = this.totalHours.bind(this)
        this.zRow = this.zRow.bind(this)
    }

    componentDidMount() {

        axios.get('/Jobs/getJobID', {
            params: {
                empID: this.props.empID
            }
        })
            .then((response) => {
                // handle success
                this.setState({ jobList: response.data })
            })
            .catch((error) => {
                // handle error
                this.setState({ jobList: [] })
                console.log("error", error);
            })

        axios.get('/Jobs/getSubID', {
            params: {
                empID: this.props.empID
            }
        })
            .then((response) => {
                // handle success
                this.setState({ subJobList: response.data })
                
            })
            .catch((error) => {
                // handle error
                this.setState({ subJobList: [] })
                console.log("error", error);
            })

        axios.get('/HOLLIDAY/Days', {
            params: {
                year: this.props.year,
                month: this.props.month
            }
        })
            .then((response) => {
                // handle success
                this.setState({ hDays: response.data })
            })
            .catch((error) => {
                // handle error
                this.setState({ hDays: [] })
                console.log("error", error);
            })

        if (this.props.mode === "edit" && this.props.updated != true ) {

            axios.get('/CHRGs/GetSavedActivities', {
                params: {
                    empID: this.props.empID,
                    month: this.props.month,
                    year: this.props.year
                }
            })
                .then((response) => {
                    // handle success
                    var aList = response.data
                    var newList = []
                    aList.map((j) => {
                        var sum = Number(j.D01) + Number(j.D02) + Number(j.D03) + Number(j.D04) + Number(j.D05) + Number(j.D06) + Number(j.D07) + Number(j.D08) + Number(j.D09) + Number(j.D10) + Number(j.D11) + Number(j.D12) + Number(j.D13) + Number(j.D14) + Number(j.D15) + Number(j.D16) + Number(j.D17) + Number(j.D18) + Number(j.D19) + Number(j.D20) + Number(j.D21) + Number(j.D22) + Number(j.D23) + Number(j.D24) + Number(j.D25) + Number(j.D26) + Number(j.D27) + Number(j.D28) + Number(j.D29) + Number(j.D30) + Number(j.D31)
                        var sumS = 0
                        var sumO = 0
                        if (j.STOT.trim() === "S") {
                            sumS = sum
                            sumO = 0
                        } else {
                            sumS = 0
                            sumO = sum
                        }
                        newList.push({ jobID: j.JOB_ID, subJobID: j.SUBJOB_ID, activityID: j.ACTIVITY_ID, sT: j.STOT.trim(), d1: j.D01, d2: j.D02, d3: j.D03, d4: j.D04, d5: j.D05, d6: j.D06, d7: j.D07, d8: j.D08, d9: j.D09, d10: j.D10, d11: j.D11, d12: j.D12, d13: j.D13, d14: j.D14, d15: j.D15, d16: j.D16, d17: j.D17, d18: j.D18, d19: j.D19, d20: j.D20, d21: j.D21, d22: j.D22, d23: j.D23, d24: j.D24, d25: j.D25, d26: j.D26, d27: j.D27, d28: j.D28, d29: j.D29, d30: j.D30, d31: j.D31, sSum: Number(sumS), oSum: Number(sumO), selected: false })
                    })
                    this.setState({ activities: newList }, function () {
                        this.totalHours()
                        this.props.updateActivities(true)
                    })
                })
                .catch((error) => {
                    // handle error
                    console.log("error", error);
                })

        }

        if (this.state.activities != null) {
            this.totalHours()
        }
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.state.jobID != prevState.jobID || this.state.subJobID != prevState.subJobID) {
            axios.get('/activityProcedure/getActivities', {
                params: {
                    job: this.state.jobID,
                    sub: this.state.subJobID,
                    dept: this.props.empDepartment,
                    id: this.props.empID
                }
            })
                .then((response) => {
                    // handle success
                    this.setState({ activitiyList: response.data })
                })
                .catch((error) => {
                    // handle error
                    this.setState({ activitiyList: [] })
                    console.log("error", error);
                })
        }

        if (this.state.activities != null) {

            this.props.userActivities(this.state.activities, this.state.sumHours, this.state.zeroRow)
        }
    }

    handleJobChange = event => {
        this.setState({
            jobID: event.target.value,
            subJobID: '',
            activityID: ''
        })
    }

    handleSubChange = event => {
        this.setState({
            subJobID: event.target.value,
            activityID: ''
        })
    }

    handleActivityChange = event => {
        this.setState({
            activityID: event.target.value
        })
    }

    addActivity() {

        if (this.state.jobID === '' || this.state.subJobID === '' || this.state.activityID === '') {

            alert('Please select Job, SubJob and Activity')

        } else {
            this.props.saveStatus(false)
            var newActivities = this.state.activities
            newActivities.push({ jobID: this.state.jobID, subJobID: this.state.subJobID, activityID: this.state.activityID, sT: 'S', d1: 0, d2: 0, d3: 0, d4: 0, d5: 0, d6: 0, d7: 0, d8: 0, d9: 0, d10: 0, d11: 0, d12: 0, d13: 0, d14: 0, d15: 0, d16: 0, d17: 0, d18: 0, d19: 0, d20: 0, d21: 0, d22: 0, d23: 0, d24: 0, d25: 0, d26: 0, d27: 0, d28: 0, d29: 0, d30: 0, d31: 0, sSum: 0, oSum: 0, selected: false })
            this.setState({
                activities: newActivities,
                jobID: '',
                subJobID: '',
                activityID: ''})
        }

        this.zRow()
    }

    deleteActivity = () => {

        var index = this.state.activities.indexOf(this.state.sActivity);
        if (index != -1) {
            this.props.saveStatus(false)
            this.state.activities.splice(index, 1);
            this.setState(this.state.activities);
        }
        this.totalHours()
    }

    totalHours() {

        var activities = this.state.activities
        var sum = { s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0, s7: 0, s8: 0, s9: 0, s10: 0, s11: 0, s12: 0, s13: 0, s14: 0, s15: 0, s16: 0, s17: 0, s18: 0, s19: 0, s20: 0, s21: 0, s22: 0, s23: 0, s24: 0, s25: 0, s26: 0, s27: 0, s28: 0, s29: 0, s30: 0, s31: 0, sS: 0, sO: 0 }
        activities.forEach((a) => {
            sum.s1 = Number(sum.s1) + Number(a.d1)
            sum.s2 = Number(sum.s2) + Number(a.d2)
            sum.s3 = Number(sum.s3) + Number(a.d3)
            sum.s4 = Number(sum.s4) + Number(a.d4)
            sum.s5 = Number(sum.s5) + Number(a.d5)
            sum.s6 = Number(sum.s6) + Number(a.d6)
            sum.s7 = Number(sum.s7) + Number(a.d7)
            sum.s8 = Number(sum.s8) + Number(a.d8)
            sum.s9 = Number(sum.s9) + Number(a.d9)
            sum.s10 = Number(sum.s10) + Number(a.d10)
            sum.s11 = Number(sum.s11) + Number(a.d11)
            sum.s12 = Number(sum.s12) + Number(a.d12)
            sum.s13 = Number(sum.s13) + Number(a.d13)
            sum.s14 = Number(sum.s14) + Number(a.d14)
            sum.s15 = Number(sum.s15) + Number(a.d15)
            sum.s16 = Number(sum.s16) + Number(a.d16)
            sum.s17 = Number(sum.s17) + Number(a.d17)
            sum.s18 = Number(sum.s18) + Number(a.d18)
            sum.s19 = Number(sum.s19) + Number(a.d19)
            sum.s20 = Number(sum.s20) + Number(a.d20)
            sum.s21 = Number(sum.s21) + Number(a.d21)
            sum.s22 = Number(sum.s22) + Number(a.d22)
            sum.s23 = Number(sum.s23) + Number(a.d23)
            sum.s24 = Number(sum.s24) + Number(a.d24)
            sum.s25 = Number(sum.s25) + Number(a.d25)
            sum.s26 = Number(sum.s26) + Number(a.d26)
            sum.s27 = Number(sum.s27) + Number(a.d27)
            sum.s28 = Number(sum.s28) + Number(a.d28)
            sum.s29 = Number(sum.s29) + Number(a.d29)
            sum.s30 = Number(sum.s30) + Number(a.d30)
            sum.s31 = Number(sum.s31) + Number(a.d31)
            sum.sS = Number(sum.sS) + Number(a.sSum)
            sum.sO = Number(sum.sO) + Number(a.oSum)
        })

        var checkSum = Object.values(sum)

        checkSum.forEach((a) => {


            if (Number(a) > 24) {

                if (Number(checkSum.indexOf(a)) < 31) {
                    alert('Day ' + Number(checkSum.indexOf(a) + 1) + ' exceeds 24 hours')
                }
            }
        })


        //if (Number(sum.sS) > Number(this.props.monthHours)) {
        //    alert('The total number of hours you have entered is greater than the total hours of this month')
        //}

        this.setState({
            sumHours: sum
        })

        this.zRow()

    }

    editActivity = () => {

        var index = this.state.activities.indexOf(this.state.sActivity);
        if (index != -1) {

            this.props.saveStatus(false)
            if (this.state.jobID === '' || this.state.subJobID === '' || this.state.activityID === '') {

                alert('Please select Job, SubJob and Activity')

            } else {

                var activities = this.state.activities
                activities[index].jobID = this.state.jobID
                activities[index].subJobID = this.state.subJobID
                activities[index].activityID = this.state.activityID

                this.setState({
                    activities: activities,
                    jobID: '',
                    subJobID: '',
                    activityID: ''})
            }

            this.zRow()
        }
    }

    onSelectRow = (selectedRow) => {

        var index = this.state.activities.indexOf(selectedRow);
        var activities = this.state.activities
        activities.forEach((a) => {
            a.selected = false
        })

        activities[index].selected = true


        this.setState({
            sActivity: selectedRow,
            activities: activities
        })

    }

    inputChange = (e, activity) => {

        var check = Number(e.target.value)
        if (check <= 24 && check >= 0) {
            var index = this.state.activities.indexOf(activity);
            var activities = this.state.activities

            if (Number(activities[index][e.target.id]) != check) {

                this.props.saveStatus(false)
            }

            if (activities[index].sT === 'S') {
                activities[index].sSum = Number(activities[index].sSum) - Number(activities[index][e.target.id]) + Number(e.target.value)
            } else {
                activities[index].oSum = Number(activities[index].oSum) - Number(activities[index][e.target.id]) + Number(e.target.value)
            }
            activities[index][e.target.id] = e.target.value
            this.totalHours()
            this.setState({ activities: activities })
        } else {
            
            var index = this.state.activities.indexOf(activity);
            var activities = this.state.activities

            if (Number(activities[index][e.target.id]) != 0) {

                this.props.saveStatus(false)
            }

            if (activities[index].sT === 'S') {
                activities[index].sSum = Number(activities[index].sSum) - Number(activities[index][e.target.id])
            } else {
                activities[index].oSum = Number(activities[index].oSum) - Number(activities[index][e.target.id])
            }
            activities[index][e.target.id] = 0
            this.totalHours()
            this.setState({ activities: activities })

            alert("Please insert a valid number")
        }

    }

    inputCheck = (e, activity) => {

        var check = Number(e.target.value)

        if ((check % 0.25) != 0)
        {
            var index = this.state.activities.indexOf(activity);
            var activities = this.state.activities

            if (Number(activities[index][e.target.id]) != 0) {

                this.props.saveStatus(false)
            }

            if (activities[index].sT === 'S') {
                activities[index].sSum = Number(activities[index].sSum) - Number(activities[index][e.target.id])
            } else {
                activities[index].oSum = Number(activities[index].oSum) - Number(activities[index][e.target.id])
            }
            activities[index][e.target.id] = 0
            this.totalHours()
            this.setState({ activities: activities })

            alert("Only multiples of 0.25 are allowed")
        }

    }

    tChange = (e, activity) => {

        this.props.saveStatus(false)

        var index = this.state.activities.indexOf(activity);
        var activities = this.state.activities
        activities[index].sT = e.target.value
        if (activities[index].sT === 'S') {
            activities[index].sSum = Number(activities[index].d1) + Number(activities[index].d2) + Number(activities[index].d3) + Number(activities[index].d4) + Number(activities[index].d5) + Number(activities[index].d6) + Number(activities[index].d7) + Number(activities[index].d8) + Number(activities[index].d9) + Number(activities[index].d10) + Number(activities[index].d11) + Number(activities[index].d12) + Number(activities[index].d13) + Number(activities[index].d14) + Number(activities[index].d15) + Number(activities[index].d16) + Number(activities[index].d17) + Number(activities[index].d18) + Number(activities[index].d19) + Number(activities[index].d20) + Number(activities[index].d21) + Number(activities[index].d22) + Number(activities[index].d23) + Number(activities[index].d24) + Number(activities[index].d25) + Number(activities[index].d26) + Number(activities[index].d27) + Number(activities[index].d28) + Number(activities[index].d29) + Number(activities[index].d30) + Number(activities[index].d31)
            activities[index].oSum = 0
        } else {
            activities[index].oSum = Number(activities[index].d1) + Number(activities[index].d2) + Number(activities[index].d3) + Number(activities[index].d4) + Number(activities[index].d5) + Number(activities[index].d6) + Number(activities[index].d7) + Number(activities[index].d8) + Number(activities[index].d9) + Number(activities[index].d10) + Number(activities[index].d11) + Number(activities[index].d12) + Number(activities[index].d13) + Number(activities[index].d14) + Number(activities[index].d15) + Number(activities[index].d16) + Number(activities[index].d17) + Number(activities[index].d18) + Number(activities[index].d19) + Number(activities[index].d20) + Number(activities[index].d21) + Number(activities[index].d22) + Number(activities[index].d23) + Number(activities[index].d24) + Number(activities[index].d25) + Number(activities[index].d26) + Number(activities[index].d27) + Number(activities[index].d28) + Number(activities[index].d29) + Number(activities[index].d30) + Number(activities[index].d31)
            activities[index].sSum = 0
        }
        this.totalHours()
        this.setState({ activities: activities })


    }

    isHoliday = (d) => {

        var flag = false
        var days = this.state.hDays

        days.forEach((a) => {

            if (Number(a) === Number(d)) {

                flag = true
            }
            
        })

        return flag
    }

    isWeekend = (d) => {

        var flag = false
        var dt = new Date(Number(this.props.year), Number(this.props.month) - 1, d)

        if (dt.getDay() === 5 || dt.getDay() === 6) {

            flag = true
        }

        return flag
    }

    zRow() {

        var flag = false
        var activities = this.state.activities
        activities.forEach((a) => {
            if ((Number(a.sSum) === 0) && (Number(a.oSum) === 0)) {

                flag = true
            }
            
        })

        this.setState({
            zeroRow: flag
        })
    }

    render() {

        return (
            <div>
                <div className="sheetBorder ml-1 mt-1">
                    <div class="d-flex justify-content-start TSForm ml-1 mr-1 mt-1">
                        <form className="TSForm1 ml-2 mt-1">

                            <div class="form-row">
                                <div class="form-group col-sm-6">
                                    <label for="Job_ID">Job</label>
                                    <select class="form-control" id="jobIDSelect" value={this.state.jobID} onChange={this.handleJobChange}>
                                        <option></option>
                                        {this.state.jobList.map((j) => {
                                            return (
                                                <option value={j.JOB_ID} title={j.JOB_ID}>{j.JOB_ID} :   {j.DESCRIPTION}</option>
                                            )
                                        })
                                        }                                     
                                    </select>
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="SubJob_ID">SubJob</label>
                                    <select class="form-control" id="subJobIDSelect" value={this.state.subJobID} onChange={this.handleSubChange}>
                                        <option></option>
                                        {this.state.subJobList.map((j) => {

                                            if (this.state.jobID === j.JOB_ID) {
                                                return (
                                                    <option value={j.SUBJOB_ID}>{j.SUBJOB_ID} :   {j.DESCRIPTION}</option>
                                                )
                                            }
                                           
                                        })
                                        }  
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="Activity_ID">Activity</label>
                                <select class="form-control" id="activityIDSelect" value={this.state.activityID} onChange={this.handleActivityChange}>
                                    <option></option>
                                    {this.state.activitiyList.map((a) => {
                                        if (this.state.jobID != '' && this.state.subJobID != '') {
                                            return (
                                                <option value={a.activity_id}>{a.activity_id} :   {a.desc_r}</option>
                                            )
                                        }
                                    })
                                    }                                  
                                </select>
                            </div>

                        </form>

                        <div class="tButtons m-auto">
                            <div class="btn-group-vertical btn-sm">
                                <button type="button" class="btn pBackground tButton" onClick={this.addActivity}>Add</button>
                                <button type="button" class="btn pBackground tButton mt-1" onClick={this.editActivity}>Edit</button>
                                <button type="button" class="btn pBackground tButton mt-1" onClick={this.deleteActivity}>Delete</button>
                            </div>
                        </div>
                    </div >
                    <div class="table-responsive mt-1">
                        <div className="tTable ml-2">
                            <table className="table table-bordered table-sm table-hover">
                                <thead class="pBackground">
                                    <tr>
                                        <th scope="col">Job_ID</th>
                                        <th scope="col">SubJob</th>
                                        <th scope="col">Activity</th>
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
                                        <th scope="col">S_Sum</th>
                                        <th scope="col">O_Sum</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {this.state.activities.map((a) => {
                                        return (
                                            <tr onClick={() => this.onSelectRow(a)} style={a.selected === true ? { background: 'rgb(224,242,251)' } : {background: ''}}>
                                                <td data-title="jobID">{a.jobID}</td>
                                                <td data-title="subJobID">{a.subJobID}</td>
                                                <td data-title="activityID">{a.activityID}</td>
                                                <td data-title="S/T">
                                                    <select id="sT" style={{ width: '35px', height: '25px' }} onChange={(e) => this.tChange(e, a)}>
                                                        <option>{'S'}</option>
                                                        <option>{'O'}</option>
                                                    </select>
                                                </td>
                                                <td style={this.isWeekend(1) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(1) === true ? { background: 'rgb(179,229,204)' } : { background: '' }} data-title="d1">
                                                    <input id="d1" style={{ width: '25px', height: '25px' }} type="text" value={a.d1} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)} />
                                                </td>
                                                <td data-title="d2" style={this.isWeekend(2) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(2) === true ? { background: 'rgb(179,229,204)' } : { background: '' }} >
                                                    <input id="d2" style={{ width: '25px', height: '25px' }} type="text" value={a.d2} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)} />
                                                </td>
                                                <td data-title="d3" style={this.isWeekend(3) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(3) === true ? {background: 'rgb(179,229,204)'} : {background: ''}} >
                                                    <input id="d3" style={{ width: '25px', height: '25px' }} type="text" value={a.d3} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d4" style={this.isWeekend(4) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(4) === true ? {background: 'rgb(179,229,204)'} : {background: ''}} >
                                                    <input id="d4" style={{ width: '25px', height: '25px' }} type="text" value={a.d4} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d5" style={this.isWeekend(5) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(5) === true ? {background: 'rgb(179,229,204)'} : {background: ''}} >
                                                    <input id="d5" style={{ width: '25px', height: '25px' }} type="text" value={a.d5} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d6" style={this.isWeekend(6) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(6) === true ? {background: 'rgb(179,229,204)'} : {background: ''}}>
                                                    <input id="d6" style={{ width: '25px', height: '25px' }} type="text" value={a.d6} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d7" style={this.isWeekend(7) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(7) === true ? {background: 'rgb(179,229,204)'} : {background: ''}}>
                                                    <input id="d7" style={{ width: '25px', height: '25px' }} type="text" value={a.d7} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d8" style={this.isWeekend(8) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(8) === true ? {background: 'rgb(179,229,204)'} : {background: ''}}>
                                                    <input id="d8" style={{ width: '25px', height: '25px' }} type="text" value={a.d8} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d9" style={this.isWeekend(9) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(9) === true ? {background: 'rgb(179,229,204)'} : {background: ''}}>
                                                    <input id="d9" style={{ width: '25px', height: '25px' }} type="text" value={a.d9} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d10" style={this.isWeekend(10) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(10) === true ? {background: 'rgb(179,229,204)'} : {background: ''}}>
                                                    <input id="d10" style={{ width: '25px', height: '25px' }} type="text" value={a.d10} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d11" style={this.isWeekend(11) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(11) === true ? {background: 'rgb(179,229,204)'} : {background: ''}}>
                                                    <input id="d11" style={{ width: '25px', height: '25px' }} type="text" value={a.d11} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d12" style={this.isWeekend(12) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(12) === true ? {background: 'rgb(179,229,204)'} : {background: ''}}>
                                                    <input id="d12" style={{ width: '25px', height: '25px' }} type="text" value={a.d12} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d13" style={this.isWeekend(13) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(13) === true ? {background: 'rgb(179,229,204)'} : {background: ''}}>
                                                    <input id="d13" style={{ width: '25px', height: '25px' }} type="text" value={a.d13} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d14" style={this.isWeekend(14) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(14) === true ? {background: 'rgb(179,229,204)'} : {background: ''}}>
                                                    <input id="d14" style={{ width: '25px', height: '25px' }} type="text" value={a.d14} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d15" style={this.isWeekend(15) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(15) === true ? {background: 'rgb(179,229,204)'} : {background: ''}}>
                                                    <input id="d15" style={{ width: '25px', height: '25px' }} type="text" value={a.d15} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d16" style={this.isWeekend(16) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(16) === true ? {background: 'rgb(179,229,204)'} : {background: ''}}>
                                                    <input id="d16" style={{ width: '25px', height: '25px' }} type="text" value={a.d16} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d17" style={this.isWeekend(17) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(17) === true ? {background: 'rgb(179,229,204)'} : {background: ''}}>
                                                    <input id="d17" style={{ width: '25px', height: '25px' }} type="text" value={a.d17} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d18" style={this.isWeekend(18) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(18) === true ? {background: 'rgb(179,229,204)'} : {background: ''}}>
                                                    <input id="d18" style={{ width: '25px', height: '25px' }} type="text" value={a.d18} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d19" style={this.isWeekend(19) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(19) === true ? {background: 'rgb(179,229,204)'} : {background: ''}}>
                                                    <input id="d19" style={{ width: '25px', height: '25px' }} type="text" value={a.d19} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d20" style={this.isWeekend(20) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(20) === true ? {background: 'rgb(179,229,204)'} : {background: ''}}>
                                                    <input id="d20" style={{ width: '25px', height: '25px' }} type="text" value={a.d20} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d21" style={this.isWeekend(21) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(21) === true ? {background: 'rgb(179,229,204)'} : {background: ''}}>
                                                    <input id="d21" style={{ width: '25px', height: '25px' }} type="text" value={a.d21} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d22" style={this.isWeekend(22) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(22) === true ? {background: 'rgb(179,229,204)'} : {background: ''}}>
                                                    <input id="d22" style={{ width: '25px', height: '25px' }} type="text" value={a.d22} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d23" style={this.isWeekend(23) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(23) === true ? {background: 'rgb(179,229,204)'} : {background: ''}}>
                                                    <input id="d23" style={{ width: '25px', height: '25px' }} type="text" value={a.d23} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d24" style={this.isWeekend(24) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(24) === true ? {background: 'rgb(179,229,204)'} : {background: ''}}>
                                                    <input id="d24" style={{ width: '25px', height: '25px' }} type="text" value={a.d24} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d25" style={this.isWeekend(25) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(25) === true ? {background: 'rgb(179,229,204)'} : {background: ''}}>
                                                    <input id="d25" style={{ width: '25px', height: '25px' }} type="text" value={a.d25} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d26" style={this.isWeekend(26) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(26) === true ? {background: 'rgb(179,229,204)'} : {background: ''}}>
                                                    <input id="d26" style={{ width: '25px', height: '25px' }} type="text" value={a.d26} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d27" style={this.isWeekend(27) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(27) === true ? {background: 'rgb(179,229,204)'} : {background: ''}}>
                                                    <input id="d27" style={{ width: '25px', height: '25px' }} type="text" value={a.d27} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d28" style={this.isWeekend(28) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(28) === true ? {background: 'rgb(179,229,204)'} : {background: ''}}>
                                                    <input id="d28" style={{ width: '25px', height: '25px' }} type="text" value={a.d28} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)}/>
                                                </td>
                                                <td data-title="d29" style={this.isWeekend(29) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(29) === true ? { background: 'rgb(179,229,204)' } : { background: '' }}>
                                                    <input id="d29" style={{ width: '25px', height: '25px' }} type="text" value={a.d29} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)} disabled={((Number(this.props.month) === 2) && ((Number(this.props.year) % 4) != 0))? "disabled" : ""} />
                                                </td>
                                                <td data-title="d30" style={this.isWeekend(30) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(30) === true ? {background: 'rgb(179,229,204)'} : {background: ''}}>
                                                    <input id="d30" style={{ width: '25px', height: '25px' }} type="text" value={a.d30} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)} disabled={(Number(this.props.month) === 2) ? "disabled" : ""}/>
                                                </td>
                                                <td data-title="d31" style={this.isWeekend(31) === true ? { background: 'rgb(203,204,204)' } : this.isHoliday(31) === true ? { background: 'rgb(179,229,204)' } : { background: '' }}>
                                                    <input id="d31" style={{ width: '25px', height: '25px' }} type="text" value={a.d31} onChange={(e) => this.inputChange(e, a)} onBlur={(e) => this.inputCheck(e, a)} disabled={(Number(this.props.month) === 2 || Number(this.props.month) === 4 || Number(this.props.month) === 6 || Number(this.props.month) === 9 || Number(this.props.month) === 11) ? "disabled" : ""} />
                                                </td>
                                                <td data-title="S_Sum">{a.sSum}</td>
                                                <td data-title="O_Sum">{a.oSum}</td>
                                            </tr>
                                        )
                                    })}

                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th>{this.state.sumHours.s1}</th>
                                        <th>{this.state.sumHours.s2}</th>
                                        <th>{this.state.sumHours.s3}</th>
                                        <th>{this.state.sumHours.s4}</th>
                                        <th>{this.state.sumHours.s5}</th>
                                        <th>{this.state.sumHours.s6}</th>
                                        <th>{this.state.sumHours.s7}</th>
                                        <th>{this.state.sumHours.s8}</th>
                                        <th>{this.state.sumHours.s9}</th>
                                        <th>{this.state.sumHours.s10}</th>
                                        <th>{this.state.sumHours.s11}</th>
                                        <th>{this.state.sumHours.s12}</th>
                                        <th>{this.state.sumHours.s13}</th>
                                        <th>{this.state.sumHours.s14}</th>
                                        <th>{this.state.sumHours.s15}</th>
                                        <th>{this.state.sumHours.s16}</th>
                                        <th>{this.state.sumHours.s17}</th>
                                        <th>{this.state.sumHours.s18}</th>
                                        <th>{this.state.sumHours.s19}</th>
                                        <th>{this.state.sumHours.s20}</th>
                                        <th>{this.state.sumHours.s21}</th>
                                        <th>{this.state.sumHours.s22}</th>
                                        <th>{this.state.sumHours.s23}</th>
                                        <th>{this.state.sumHours.s24}</th>
                                        <th>{this.state.sumHours.s25}</th>
                                        <th>{this.state.sumHours.s26}</th>
                                        <th>{this.state.sumHours.s27}</th>
                                        <th>{this.state.sumHours.s28}</th>
                                        <th>{this.state.sumHours.s29}</th>
                                        <th>{this.state.sumHours.s30}</th>
                                        <th>{this.state.sumHours.s31}</th>
                                        <th>{this.state.sumHours.sS}</th>
                                        <th>{this.state.sumHours.sO}</th>
                                    </tr>

                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
                <div>
                    <Penalty />
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {

        uActivities: state.Activities.activities,
        totalHours: state.Activities.totalHours,
        userName: state.newUser.name,
        empID: state.newUser.id,
        empTitle: state.newUser.description,
        empDepartment: state.newUser.department,
        empSup1: state.newUser.sup1ID,
        empSup2: state.newUser.sup2ID,
        month: state.createSheet.month,
        year: state.createSheet.year,
        monthHours: state.monthData.monthHours,
        mode: state.checkMode.mode,
        updated: state.Activities.updated,
        saved: state.Activities.saved
    };
}

//export default TSheet;
export default connect(mapStateToProps, { userActivities, updateActivities, saveStatus })(TSheet);