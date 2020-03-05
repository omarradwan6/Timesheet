import React from "react";
import { Link } from "react-router-dom";
import "./CreateSheet.css";
import { connect } from "react-redux";
import { createSheet } from "../actions";
import "../TimeSheet/Common.css";

class CreateSheet extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onSubmitForm(e) {
        e.preventDefault();
        this.props.createSheet(new Date().getMonth() + 1, new Date().getFullYear());
    }

    render() {
        return (
            <div className="d-flex justify-content-around ml-5 mr-5 p-3">
                <form>
                    <div className="form-row d-flex align-items-end">
                        <div className="col-sm-2 ml-3 mr-5">
                            <label htmlFor="start">Month: </label>
                            <input
                                className="form-control"
                                type="number"
                                id="start"
                                value={new Date().getMonth() + 1}
                                style={{ width: '100px' }}
                            />
                        </div>
                        <div className="col-sm-2 mr-5">
                            <label htmlFor="start1">Year: </label>
                            <input
                                className="form-control"
                                type="number"
                                id="start1"
                                value={new Date().getFullYear()}
                                style={{ width: '100px' }}
                            />
                        </div>
                        <div className="col-sm">
                            {
                                this.props.Mode === "new" && this.props.status == "loged-in" && (
                                    <button
                                        type="submit"
                                        onClick={this.onSubmitForm}
                                        className="btn pBackground btn-sm"
                                        disabled={
                                            this.props.SupSign == 1 || this.props.Locked == 1 ? true : false
                                        }
                                    >
                                        <Link id="new" className="nav-link" to="/newtimesheet/timesheet">
                                            Create Sheet
            </Link>
                                    </button>
                                )
                            }
                            {
                                this.props.Mode === "edit" && this.props.status == "loged-in" && (
                                    <button
                                        type="submit"
                                        onClick={this.onSubmitForm}
                                        className="btn pBackground btn-sm"
                                        disabled={
                                            this.props.SupSign == 1 || this.props.Locked == 1 ? true : false
                                        }
                                    >
                                        <Link
                                            id="new"
                                            className="nav-link"
                                            to={
                                                this.props.SupSign == 1 || this.props.Locked == 1
                                                    ? null
                                                    : "/newtimesheet/timesheet"
                                            }
                                        >
                                            Edit Sheet
            </Link>
                                    </button>
                                )}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        Mode: state.checkMode.mode,
        SupSign: state.checkMode.supSign,
        Locked: state.checkMode.locked,
        status: state.newUser.status
    };
};

export default connect(mapStateToProps, { createSheet })(CreateSheet);


//{
//    this.props.Mode === "new" && this.props.status == "loged-in" && (
//        <button
//            type="submit"
//            onClick={this.onSubmitForm}
//            className="btn pBackground btn-sm ml-3"
//            disabled={
//                this.props.SupSign == 1 || this.props.Locked == 1 ? true : false
//            }
//        >
//            <Link id="new" className="nav-link" to="/newtimesheet/timesheet">
//                New Sheet
//            </Link>
//        </button>
//    )
//}
//{
//    this.props.Mode === "edit" && this.props.status == "loged-in" && (
//        <button
//            type="submit"
//            onClick={this.onSubmitForm}
//            className="btn pBackground btn-sm ml-3"
//            disabled={
//                this.props.SupSign == 1 || this.props.Locked == 1 ? true : false
//            }
//        >
//            <Link
//                id="new"
//                className="nav-link"
//                to={
//                    this.props.SupSign == 1 || this.props.Locked == 1
//                        ? null
//                        : "/newtimesheet/timesheet"
//                }
//            >
//                Edit Sheet
//            </Link>
//        </button>
//)}