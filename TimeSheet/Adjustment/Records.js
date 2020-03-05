import React from 'react';
import RecordTable from './RecordTable'
//import { connect } from 'react-redux'

class Records extends React.Component {

  constructor(props) {
    super(props);
    //  this.state.records = [];
    this.state = {records: this.props.records};
  }

  handleRowDel(record) {
      var index = this.state.records.indexOf(record);
      //console.log(this.props.adjustments)
      //if (this.state.records.length == 1) {
          this.state.records.splice(index, 1);
      //}
      //else {
      //    if (record.STOT == "S") {
      //        if (index % 2 == 0) {
      //            this.state.records.splice(index, 2);
      //        }
      //        else {
      //            this.state.records.splice(index - 1, 2);
      //        }
      //    }
      //    else {
      //        this.state.records.splice(index, 1);
      //    }
      //}
      this.setState(this.state.records);
      //console.log(this.props.adjustments)
  }
    
    render() {
    return (
        <div>
            {this.state.records.length != 0 ? <RecordTable onRowDel={this.handleRowDel.bind(this)} records={this.state.records} />: ""}
        </div>
    );

  }

}



export default Records

//const mapStateToProps = state => {
//    return { adjustments: state.adjustments.adjustments }
//}

//export default connect(mapStateToProps)(Records);