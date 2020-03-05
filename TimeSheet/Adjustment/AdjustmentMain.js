import React from 'react';
// import logo from './icons8-delete-24.png'
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import Form from 'react-bootstrap/Form'
// import { Col } from 'react-bootstrap';
// import { Row } from 'react-bootstrap';
// import { Label } from 'react-bootstrap';
import Records from './Records'
import AdjustWindows from './AdjustWindows'
import { connect } from 'react-redux';
import { add_adjustments } from '../../actions';
import '../Common.css';


class AdjustmentMain extends React.Component
{
  constructor(props) {
    super(props);
      this.state = {
          adjustmentVisible: true, records: this.props.adjustments     }
  }

  adjustVisible = (e)=> {
    if(this.state.adjustmentVisible){
      e.target.innerText= 'New'
    }
    else{
      e.target.innerText= 'Cancel'
    }
    this.setState({adjustmentVisible: !this.state.adjustmentVisible})
  }

    uploadData3 = (oldrecord, newrecord) => {
        var obj;
        if (this.state.records == null) {
            obj = [newrecord, oldrecord]
        }
        else {
            obj = this.state.records
            obj.push(newrecord)
            obj.push(oldrecord)
        }
        this.setState({ records: obj })
        this.props.add_adjustments(obj)
  }

  render(){

    return (
      <div>
          <div class="d-flex justify-content-start mt-2">
              {/* <button class="btn btn-primary w-10 mr-2 ml-2" onClick={this.onClickSave}>Remove</button> */}
              {/*<button class="btn btn-primary w-10 mr-2 ml-2" onClick={this.adjustVisible}>New</button>*/}
              {/*<button class="btn btn-primary w-10 mr-2" onClick={this.onClickSave}>Balance</button>*/}
              {/*<button class="btn btn-primary w-10 mr-2" onClick={this.onClickSave}>Overtime</button>*/}
            </div>
        <div class="row">
            <div class="col-md-5">
                {this.state.adjustmentVisible && <AdjustWindows uploadData={this.uploadData3} />}
            </div>
            <div class="col-md-7">
                {(this.state.records != null && this.state.records.length != 0) ? <Records records={this.state.records} /> : ""}
            </div>
        </div>
      </div>     
  );
  }
}

const mapStateToProps = state => {
    return { adjustments: state.adjustments.adjustments }
}

export default connect(mapStateToProps, { add_adjustments })(AdjustmentMain);
