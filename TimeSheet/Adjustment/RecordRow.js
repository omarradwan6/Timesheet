import React from 'react'; 
import logo from './icons8-delete-24.png'
import { connect } from 'react-redux';
import { add_adjustments } from '../../actions';

class RecordRow extends React.Component {
    //onDelEvent() {
    //    console.log(this.props.record)
    //    var index = this.props.adjustments.indexOf(this.props.record);
    //    var records = this.props.adjustments;
    //    if (this.props.record.STOT == "S") {
    //        if (index % 2 == 0) {
    //            records.splice(index, 2);
    //        }
    //        else {
    //            records.splice(index - 1, 2);
    //        }
    //    }
    //    else {
    //        records.splice(index, 1);
    //    }
    //    this.props.add_adjustments(records);
    //}

    onDelEvent() {
        this.props.onDelEvent(this.props.record);
    }

    render() {
  
      return (
        <tr className="eachRow">
          <td>{this.props.record.year}</td>
          <td>{this.props.record.month}</td>
          <td>{this.props.record.day}</td>
          <td>{this.props.record.JOB_ID}</td>
          <td>{this.props.record.SUBJOB_ID}</td>
          <td>{this.props.record.ACTIVITY_ID}</td>
          <td>{this.props.record.STOT}</td>
          <td>{this.props.record.HOURS}</td>
          <td className="del-cell">
                  <button type="button" class="btn p-0 btn-outline-light"><img src={logo} onClick={this.onDelEvent.bind(this)}/></button>
          </td>
        </tr>
      );
  
    }
  
  }

const mapStateToProps = state => {
    return { adjustments: state.adjustments.adjustments }
}

export default connect(mapStateToProps, { add_adjustments })(RecordRow);