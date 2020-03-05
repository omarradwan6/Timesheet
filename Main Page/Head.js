import React from "react";
import "./Head.css";
import logo from "./Logos/logo2.png";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../TimeSheet/Common.css";
import { createUser, checkMode, updateActivities, userActivities, add_adjustments } from '../actions';
import history from '../history'
import { Link } from "react-router-dom";


class Head extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "" };
        this.OnSubmitSignOut=this.OnSubmitSignOut.bind(this)
    }


    OnSubmitSignOut() {
        
        //if (window.confirm('Are you sure you want to log out??')) {
            //this.props.OnSignOut();
            this.props.createUser(
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                "loged-out"
            );
            this.props.checkMode(
                null,
                0,
                0,
                0
            );
            this.props.userActivities(
                null
            );
            this.props.add_adjustments(
                []
            );
            this.props.updateActivities(
                false
            );

            //history.push("/");


        //}
    }


    render() {
        return (
            <div class="container-fluid pBackground">
                <nav className = "d-flex justify-content-between align-items-center">
                    <div>
                        <a className="navbar-brand pl-1" href="#">
                            <img src={logo} alt="Logo" width="65px" />
                        </a>
                    </div>
                    <div>
                    <a class="navbar-brand" href="#">
                            <Dropdown>
                                <Dropdown.Toggle
                                    split
                                    variant="pBackground"
                                    id="dropdown-split-basic"
                                    size = "lg"
                                    style={{ background: 'rgb(5,70,109)', color: 'white' }}
                                >
                                    {/*<FontAwesomeIcon class="pBackground" icon={faUser} width="25px" /> {"  "}*/}
                                    {this.props.userName} {" "}
                                    </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#">
                                        Employee No: <span class="ml-10">{this.props.empID}</span>
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#">
                                        Title: <span class="ml-15">{this.props.empTitle}</span>
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#">
                                        Department:{" "}
                                        <span class="ml-10">{this.props.empDepartmentName}</span>
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#">
                                        First Approval:{" "}
                                        <span class="ml-6">{this.props.empSup1Name}</span>
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#">
                                        Second Approval: {this.props.empSup2Name}
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> 
                        </a>   
                        </div>
                    <div className="justify-content-end">
                  
                        <Link onClick={this.OnSubmitSignOut} to='/' className="btn pBackground" data-toggle="tooltip" data-placement="bottom" title="Sign Out">
                                Sign Out {"  "} <FontAwesomeIcon class="pBackground" icon={faSignOutAlt} width="25px" />
                            </Link>
                   
                    </div>
                 </nav>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        status: state.newUser.status,
        userName: state.newUser.name,
        empID: state.newUser.id,
        empTitle: state.newUser.description,
        empDepartment: state.newUser.department,
        empDepartmentName: state.newUser.departmentName,
        empSup1Name: state.newUser.sup1Name,
        empSup2Name: state.newUser.sup2Name,
        Mode: state.checkMode.mode
    };
};

export default connect(mapStateToProps, { createUser, checkMode, userActivities, add_adjustments, updateActivities })(Head);

//export default connect(mapStateToProps, { createUser })(Head);


//const mapStateToProps = state => {
//    return { empID: state.newUser.id, userName: state.newUser.networkID, Status: state.newUser.status, Mode: state.checkMode.mode };
//}

