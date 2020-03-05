import React from "react";
import "./Head.css";
import { connect } from "react-redux";
import { createUser } from "../actions";
import "../TimeSheet/Common.css";
import { Link } from "react-router-dom";

class FirstPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "" };
        this.OnSubmitSignIn = this.OnSubmitSignIn.bind(this);
        this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
    }

    OnSubmitSignIn(event, name, password) {
        event.preventDefault();
        this.props.onButtonClicked(name, password);
    }

    OnSubmitSignOut(event) {
        event.preventDefault();
        if (window.confirm('Are you sure you want to log out??')) {
            this.props.OnSignOut();
        }
    }

    onChangeUser(event) {
        this.setState({ username: event.target.value });
    }

    onChangePass(event) {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <div class="container-fluid ">
                    <div
                    className={this.props.status == "loged-in" ? " d-flex justify-content-center d-none" : " d-flex justify-content-center d-block"}
                    >
                    <form
                        className = ""
                            onSubmit={event =>
                                this.OnSubmitSignIn(
                                    event,
                                    this.state.username,
                                    this.state.password
                                )
                            }
                    >
                        <div class="text-center col-sm-12">
                            <h4 style={{ color: 'white' }}>Timesheet App</h4>
                        </div>

                            <div class="col-sm-12 mt-3">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Username"
                                onChange={this.onChangeUser}
                                />
                             </div>

                            <div class="col-sm-12 mt-3">
                            <input
                                className="form-control"
                                type="password"
                                placeholder="Password"
                                onChange={this.onChangePass}
                                />
                            </div>
                            <div class="d-flex justify-content-center col-sm-12 mt-3">
                            <button type="submit" className="btn btn-light ">
                                    Sign-In                            
                            </button>
                            </div>
                        </form>
                    </div>
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
        empSup2Name: state.newUser.sup2Name
    };
};

export default connect(mapStateToProps, { createUser })(FirstPage);
