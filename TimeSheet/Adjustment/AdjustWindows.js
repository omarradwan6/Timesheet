import React from 'react';
import Form from 'react-bootstrap/Form'
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import AdjustRecords from './AdjustRecords';
import axios from 'axios';
import { connect } from 'react-redux';
import '../Common.css';

class AdjustWindows extends React.Component {
    state = { selectedDate: new Date(), type: 'S',
        adjustments: [], recordsVisible: false};
    render() {
        return (

          <div>
                    <div class="d-flex justify-content-center ml-2 mt-2">
              <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label class="mx-2">Date:</Form.Label>
                  <DatePicker class="d-inline" selected={this.state.selectedDate} onChange={this.handleChange} />
                  
                    </Form.Group>
                </div>
                <div class="d-flex justify-content-center ">
                    <button class=" mb-2 mx-2 btn pBackground" onClick={this.onClickSelect}>Select</button>
                        </div>
         {/*<Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
              Type:
            </Form.Label>
            <Col sm={4}>
            <Form.Control disabled onChange={this.typeChange.bind(this)} as="select">
                <option>S</option>
                <option>O</option>
                <option>O2</option>
            </Form.Control>
            </Col>
          </Form.Group>*/}
                    <div>
          {this.state.recordsVisible && <AdjustRecords uploadData={this.uploadData2} records={this.state.adjustments} selectedDate={this.state.selectedDate}/>}
                </div>
            </div>
      )
    }
  
    uploadData2 = (record,newrecord)=>{
        this.props.uploadData(record, newrecord)
        this.onClickSelect()
    }
  
    typeChange(event){
      this.setState({type: event.target.value});
    };
  
    dropSelect = (eventKey,e) => {
      this.setState({type: eventKey});
    };
  
    onClickSelect = () => {
        this.setState({ recordsVisible: false });

        if (this.state.selectedDate.getMonth() + 1 < this.props.currentMonth || this.state.selectedDate.getFullYear() < this.props.currentYear) {
            axios.get('/CHRGs/Details/' + this.props.empID, {
                params: {
                    empID: this.props.empID,
                    day: this.state.selectedDate.getDate(),
                    month: this.state.selectedDate.getMonth() + 1,
                    year: this.state.selectedDate.getFullYear(),
                    type: this.state.type
                }
            })
                .then((response) => {
                    // handle success
                    this.setState(adjustments => ({
                        ...adjustments, adjustments: response.data.map(record => ({
                            ...record, year: this.state.selectedDate.getFullYear(), month: this.state.selectedDate.getMonth() + 1, day: this.state.selectedDate.getDate()
                        }))
                    }), function () {
                        if (this.state.adjustments.length == 0) {
                            alert("No records at the specified date")
                        }
                        else {
                            this.setState({ recordsVisible: true });
                        }
                    })
                })
                .catch((error) => {
                    // handle error
                    console.log("error", error);
                })
        }
        else {
            alert("Please Choose a Valid Month !")
        }
    }
  
    handleChange = date => {
      this.setState({
        selectedDate: date
      });
    };
}

const mapStateToProps = state => {
    return { empID: state.newUser.id, currentMonth: state.createSheet.month, currentYear: state.createSheet.year }
}

export default connect(mapStateToProps)(AdjustWindows);