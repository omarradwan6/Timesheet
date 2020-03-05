import React, { Component } from 'react';
import { render } from '@testing-library/react';
import {Link} from "react-router-dom";

class  Navigation extends React.Component{

     constructor(props){

        super(props);
        this.state={b1:true, b2:false, b3:false}
        this.handleClick1 = this.handleClick1.bind(this)
        this.handleClick2 = this.handleClick2.bind(this)
        this.handleClick3 = this.handleClick3.bind(this)

     }

     handleClick1(){

        this.setState({b1:true, b2:false, b3:false});

     }

     handleClick2(){

        this.setState({b1:false, b2:true, b3:false});

     }

     handleClick3(){

        this.setState({b1:false, b2:false, b3:true});

     }

    render(){
    return(
        <div>
            <ul class="nav nav-tabs greyBackground mb-1" id="myTab" role="tablist">
                <li class="nav-item ">
                    <Link class={" greyBackground nav-link" + (this.state.b1 ? " active" : "")} id="timesheet-tab" data-toggle="tab" to="/newtimesheet/timesheet" role="tab" aria-controls="timesheet" aria-selected="true" onClick = {this.handleClick1}>Timsheet</Link>
                    </li>
                <li class="nav-item ">
                    <Link class={" greyBackground nav-link" + (this.state.b2 ? " active" : "")} id="adjustment-tab" data-toggle="tab" to="/newtimesheet/adjustment" role="tab" aria-controls="adjustment" aria-selected="false" onClick = {this.handleClick2}>Adjustment</Link>
                    </li>
                <li class="nav-item ">
                    <Link class={" greyBackground nav-link " + (this.state.b3 ? " active" : "")} id="attendance-tab" data-toggle="tab"  to="/newtimesheet/attendance" role="tab" aria-controls="attendance" aria-selected="false" onClick = {this.handleClick3}>Attendance</Link>
                    </li>
                </ul>
        </div>   
    );   
}
}



export default Navigation;