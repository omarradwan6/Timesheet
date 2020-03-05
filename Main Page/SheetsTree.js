import React from "react";
import "./CreateSheet.css";
import { connect } from 'react-redux';
import { createPreview } from '../actions';
import { Link } from 'react-router-dom';

import CreateSheet from "./CreateSheet";

class SheetsTree extends React.Component {

    handleClick = (event, month, year) => {
        //event.preventDefault();
        this.props.createPreview(
            month,
            year
        );
    }

    monthName = (m) => {

        var num = Number(m)
        var name = ''

        if (num === 1) {
            name = 'Jan'
        } else if (num === 2) {
            name = 'Feb'
        } else if (num === 3) {
            name = 'Mar'
        } else if (num === 4) {
            name = 'Apr'
        } else if (num === 5) {
            name = 'May'
        } else if (num === 6) {
            name = 'Jun'
        } else if (num === 7) {
            name = 'Jul'
        } else if (num === 8) {
            name = 'Aug'
        } else if (num === 9) {
            name = 'Sep'
        } else if (num === 10) {
            name = 'Oct'
        } else if (num === 11) {
            name = 'Nov'
        } else if (num === 12) {
            name = 'Dec'
        }

        return name
    }


    render() {

        if (this.props.data.length != 0) {
            var year1 = this.props.data[0][0].YEAR;
            var rev1 = this.props.data[0];
            var list1 = rev1.map(el => {
                return (
                    <Link to='/previousTimesheet/preview' onClick={(event) => this.handleClick(event, el.MONTH, el.YEAR)}>
                        <button type="button" class="btn pBackground mr-1">{this.monthName(el.MONTH)}</button>
                    </Link>
                );

            });
            if (this.props.data.length >= 2) {
                var year2 = this.props.data[1][0].YEAR;
                var rev2 = this.props.data[1];
                var list2 = rev2.map(el => {
                    return (
                        <Link to='/previousTimesheet/preview' onClick={(event) => this.handleClick(event, el.MONTH, el.YEAR)}>
                            <button type="button" class="btn pBackground mr-1">{this.monthName(el.MONTH)}</button>
                        </Link>
                    );
                });
            }
            if (this.props.data.length >= 3) {
                var year3 = this.props.data[2][0].YEAR;
                var rev3 = this.props.data[2];
                var list3 = rev3.map(el => {
                    return (
                        <Link to='/previousTimesheet/preview' onClick={(event) => this.handleClick(event, el.MONTH, el.YEAR)}>
                            <button type="button" class="btn pBackground mr-1">{this.monthName(el.MONTH)}</button>
                        </Link>
                    );
                });
            }
        }

        return (
            <div className="d-flex justify-content-center mt-4">

                <div className="card border border-secondary mb-3 creation" style={{ height: '450px', borderRadius: "20px 20px 0px 0px" }}>

                    <div class="card-header text-center greyBackground" style={{ borderRadius: "20px 20px 0px 0px" }}>
                        <h3>Timesheets</h3>
                    </div>
                    <CreateSheet />
                    <hr className = "mb-0" />
                    <div class="text-center greyBackground">
                        <h5>All Sheets</h5>
                    </div>
                    <div class="card-body text-center" style={{ overflow: 'scroll' }}>


                        <h6>
                            <a data-toggle="collapse" data-target="#collapse1" className="dropdown-toggle pointer">  <strong> {year3} </strong>  </a>
                        </h6>
                        <div class="collapse" id="collapse1">
                        <div class="btn-toolbar d-flex justify-content-center mb-2" role="toolbar" aria-label="Toolbar with button groups">
                            <div class="btn-group" role="group" aria-label="Second group">
                                {list3}
                             </div>
                            </div>
                           </div> 


                        <h6>
                            <a data-toggle="collapse" data-target="#collapse2" className="dropdown-toggle pointer"> <strong> {year2} </strong> </a>
                        </h6>
                        <div class="collapse" id="collapse2">
                            <div class="btn-toolbar d-flex justify-content-center mb-2" role="toolbar" aria-label="Toolbar with button groups">
                            <div class="btn-group" role="group" aria-label="Second group">
                                {list2}
                            </div>
                            </div>
                        </div>


                        <h6>
                            <a data-toggle="collapse" data-target="#collapse3" className="dropdown-toggle pointer"> <strong> {year1} </strong> </a>
                        </h6>
                        <div class="collapse" id="collapse3">
                            <div class="btn-toolbar d-flex justify-content-center mb-2" role="toolbar" aria-label="Toolbar with button groups">
                            <div class="btn-group" role="group" aria-label="Second group">
                                {list1}
                            </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { monthS: state.createPreview.monthSelected, yearS: state.createPreview.yearSelected };
}

export default connect(mapStateToProps, { createPreview })(SheetsTree);
