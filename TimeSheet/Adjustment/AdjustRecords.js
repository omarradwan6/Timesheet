import React from 'react';
import Form from 'react-bootstrap/Form'
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { add_adjustments } from '../../actions';
import '../Common.css';

class AdjustRecords extends React.Component {
    state = {
        record: {},
        jobnumbers: [],
        subjobnumbers: [],
        activities: [],
        newrecord: {}
    }

    componentDidMount() {

        axios.get('/Jobs/getJobID', {
            params: {
                empID: this.props.empID
            }
        })
            .then((response) => {
                // handle success
                this.setState({ jobnumbers: response.data })
            })
            .catch((error) => {
                // handle error
                this.setState({ jobnumbers: [] })
                console.log("error", error);
            })

        axios.get('/Jobs/getSubID', {
            params: {
                empID: this.props.empID
            }
        })
            .then((response) => {
                // handle success
                this.setState({ subjobnumbers: response.data })
            })
            .catch((error) => {
                // handle error
                this.setState({ subjobnumbers: [] })
                console.log("error", error);
            })

    }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevProps.records) !== JSON.stringify(this.props.records)) {
            this.setState({ record: {}})
        }
    }

    render() {
        return (
            <div class="mt-2 TSForm2">
                <div class="mt-2 d-flex justify-content-center ">
                    <h5>Choose Required Record</h5>
                </div>
                <div class="d-flex justify-content-center TSForm">
                    <table class="table ml-2 mt-2 table-hover">
                        <thead class="pBackground">
                        <tr>
                            <th scope="col">Job ID</th>
                            <th scope="col">Sub Job</th>
                            <th scope="col">Activity</th>
                            <th scope="col">S/T</th>
                            <th scope="col">Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.records.map((record) => {
                            return (
                                <tr className={this.state.record === record ? "greyBackground" : ""} onClick={() => this.fillData(record)}>
                                    <td>{record.JOB_ID}</td>
                                    <td>{record.SUBJOB_ID}</td>
                                    <td>{record.ACTIVITY_ID}</td>
                                    <td>{record.STOT}</td>
                                    <td>{record.HOURS}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    </table>
                </div>
                <div class="mt-2 row">
                    <div class="col-md-4">
                        <Form.Group as={Col} controlId="formHorizontalEmail">
                            <h5>Old Data</h5>
                            <Form.Label class="">
                                Job No: <input class="form-control" value={this.state.record.JOB_ID} disabled />
                            </Form.Label>
                            <br></br>
                            <Form.Label >
                                Sub Job: <input class="form-control" value={this.state.record.SUBJOB_ID} disabled />
                            </Form.Label>
                            <br></br>
                            <Form.Label >
                                Activity: <input class="form-control" value={ this.state.record.ACTIVITY_ID } disabled />
                            </Form.Label>
                            <br></br>
                            <Form.Label >
                                Hours: <input class="form-control" value={this.state.record.HOURS} disabled />
                            </Form.Label>                           
                        </Form.Group>
                    </div>
                    <div class="col-md-8">
                        <Form.Group controlId="formHorizontalEmail">
                            <h5>New Data</h5>
                            <Form.Label class="form-row">
                                Job No: <Form.Control class="col-md-12" onChange={(e) => this.updateValue(e, 'JOB_ID')} as="select">
                                    <option key="" value=""></option>
                                    {this.state.jobnumbers.map((jobnumber) => <option key={jobnumber.JOB_ID} value={jobnumber.JOB_ID}>{jobnumber.JOB_ID} - {jobnumber.DESCRIPTION}</option>)}
                                </Form.Control>
                            </Form.Label>
                            <Form.Label class="form-row">
                                Sub Job: <Form.Control class="col-md-12" onChange={(e) => this.updateValue(e, 'SUBJOB_ID')} as="select">
                                    <option key="" value=""></option>
                                    {this.state.subjobnumbers.map((subjobnumber) => {

                                        if (this.state.newrecord.JOB_ID === subjobnumber.JOB_ID) {
                                            return (
                                                <option key={subjobnumber.SUBJOB_ID} value={subjobnumber.SUBJOB_ID}>{subjobnumber.SUBJOB_ID} - {subjobnumber.DESCRIPTION}</option>
                                            )
                                        }

                                    })
                                    }
                                </Form.Control>
                            </Form.Label>
                            <Form.Label class="form-row">
                                Activity: <Form.Control class="col-md-12" onChange={(e) => this.updateValue(e, 'ACTIVITY_ID')} as="select">
                                    <option key="" value=""></option>
                                    {this.state.activities.map((activity) => <option key={activity.activity_id} value={activity.activity_id}>{activity.activity_id} - {activity.desc_r}</option>)}
                                </Form.Control>
                            </Form.Label>
                            <Form.Label class="form-row">
                                Hours:  <Form.Control class="col-md-12" onChange={(e) => this.updateValue(e, 'HOURS')} type="number" placeholder="hours" min="0.25" max="10" step="0.25" />
                            </Form.Label>
                            </Form.Group>
                    </div>

                </div>
                <div class="d-flex justify-content-center">
                    <button class="btn pBackground" onClick={this.saveData}>Add</button>
                </div>
                
            </div>
        )
    }

    fillData = (record) => {
        this.setState({ record: record })
    }

    updateActivitylist = () => {
        if (this.state.newrecord.SUBJOB_ID != "") {
            axios.get('/activityProcedure/getActivities', {
                params: {
                    job: this.state.newrecord.JOB_ID,
                    sub: this.state.newrecord.SUBJOB_ID,
                    dept: this.props.dept,
                    id: this.props.empID
                }
            })
                .then((response) => {
                    // handle success
                    this.setState({ activities: response.data })
                   
                })
                .catch((error) => {
                    // handle error
                    this.setState({ activities: [] })
                    console.log("error", error);
                })
        }
        else {
            this.setState({ activities : [] })
        }
    }
  
    updateValue = (e, key) => {
        
        if (key == 'JOB_ID' || key == 'SUBJOB_ID') {
            var newRec = { ...this.state.newrecord, SUBJOB_ID: "", ACTIVITY_ID: "", STOT: 'S'}
            newRec = { ...newRec, [key]: e.target.value }
            this.setState({ newrecord: newRec }, this.updateActivitylist)
        }
        else {
            var obj = { ...this.state.newrecord, [key]: e.target.value }
            this.setState({newrecord:obj})
        }

    }
  
    saveData = () => {

        if (Object.keys(this.state.record).length == 0) {
            alert("Please Choose Valid Record")
        }
        else {
            if (this.state.newrecord.ACTIVITY_ID.length == 0 || this.state.newrecord.HOURS <= 0 || this.state.newrecord.HOURS % 0.25 != 0 || this.state.newrecord.HOURS > 10) {
                alert("Please Choose Valid Activity and Hours")
            }
            else {
                var oldrecord = { ...this.state.record, HOURS: -1 * this.state.newrecord.HOURS }
                var newrecord = { ...this.state.newrecord, year: oldrecord.year, month: oldrecord.month, day: oldrecord.day }
                if (newrecord.ACTIVITY_ID === oldrecord.ACTIVITY_ID && newrecord.SUBJOB_ID === oldrecord.SUBJOB_ID && newrecord.JOB_ID === oldrecord.JOB_ID) {
                    alert("Duplicate Job !")
                }
                else {
                    var oldRecIndex = this.props.adjustments.findIndex(rec => rec.ACTIVITY_ID + rec.year + rec.JOB_ID + rec.month + rec.SUBJOB_ID + rec.day + rec.STOT
                        === oldrecord.ACTIVITY_ID + oldrecord.year + oldrecord.JOB_ID + oldrecord.month + oldrecord.SUBJOB_ID + oldrecord.day + oldrecord.STOT)
                    var newRecIndex = this.props.adjustments.findIndex(rec => rec.ACTIVITY_ID + rec.year + rec.JOB_ID + rec.month + rec.SUBJOB_ID + rec.day + rec.STOT
                        === newrecord.ACTIVITY_ID + newrecord.year + newrecord.JOB_ID + newrecord.month + newrecord.SUBJOB_ID + newrecord.day + newrecord.STOT)
                    if (this.props.adjustments != null && oldRecIndex != -1 && newRecIndex != -1) {
                        alert("Duplicate Record !")
                    }
                    else {
                        this.props.uploadData(oldrecord, newrecord)
                    }
                    
                }
            }
        }
        
    };
}

const mapStateToProps = state => {
    return { empID: state.newUser.id, dept: state.newUser.department, adjustments: state.adjustments.adjustments }
}

export default connect(mapStateToProps, { add_adjustments })(AdjustRecords);