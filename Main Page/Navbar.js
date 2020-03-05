import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import "../TimeSheet/Common.css";
import { connect } from 'react-redux'
// import logo from "./Logos/logo.png";

class Navbar extends React.Component {

    constructor(props) {
        super(props)
        this.state = { b1: false, b2: false, b3: false }
        this.handleClick1 = this.handleClick1.bind(this)
        this.handleClick2 = this.handleClick2.bind(this)
        this.handleClick3 = this.handleClick3.bind(this)

    }


  handleClick1 ()  {
    this.setState({ b1: true, b2: false, b3: false });
  };

  handleClick2  ()  {
    this.setState({ b1: false, b2: true, b3: false });
  };

  handleClick3  ()  {
    this.setState({ b1: false, b2: false, b3: true });
  };

  render() {
    return (
        <div className="container-fluid p-0">
            {
                console.log(this.props.currentPage)
            }
            <ul className="nav d-flex justify-content-center mr-auto pBackground">
                <li className="nav-item text-center pBackground">
                    <Link
                        className={"nav-link" + ((this.state.b1 || this.props.currentPage === 'employee' || this.props.currentPage === null) ? " nav-border" : " nav-text")}
                  to="/"
                  onClick={this.handleClick1}
                >
                  Employee
                </Link>
              </li>
                <li className="nav-item text-center pBackground">
                <Link
                        className={"nav-link" + (this.state.b2 || this.props.currentPage === 'supervisor' ? " nav-border" : " nav-text")}
                        to="/Supervisor/FirstApprovalAttendance"
                  onClick={this.handleClick2}
                >
                  Supervisor
                </Link>
              </li>
                <li className="nav-item text-center pBackground">
                <Link
                        className={"nav-link" + (this.state.b3 || this.props.currentPage === 'Manager' ? " nav-border" : " nav-text")}
                  to="/Manager"
                  onClick={this.handleClick3}
                >
                  Manager
                </Link>
              </li>
            </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {currentPage: state.currentPage.page };
}

export default connect(mapStateToProps)(Navbar);

