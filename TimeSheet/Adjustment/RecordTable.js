import React from 'react';
import RecordRow from './RecordRow'
import '../Common.css';

class RecordTable extends React.Component {

    render() {
      var rowDel = this.props.onRowDel;
      var record = this.props.records.map(function(record) {
        return (<RecordRow record={record} onDelEvent={rowDel.bind(this)} /*key={record.id}*//>)
      });
      return (
          <div class="table-responsive sheetBorder">
              <div class="d-flex justify-content-center"> <h5>Adjustments</h5> </div>
          <table class="table table-striped my-2">
            <thead class="pBackground">
              <tr>
                <th scope="col">Year</th>
                <th scope="col">Month</th>
                <th scope="col">Day</th>
                <th scope="col">Job ID</th>
                <th scope="col">Sub Job</th>
                <th scope="col">Activity</th>
                <th scope="col">S/T</th>
                <th scope="col">Hours</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {record}
            </tbody>
          </table>
        </div>
      );
  
    }
  
  }

  export default RecordTable