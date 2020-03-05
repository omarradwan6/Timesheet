import React from 'react';
import './Common.css';
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux';
import { monthData } from '../actions';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { updatePenalty } from '../actions';
import { blockPage } from '../actions';
import { saveStatus } from '../actions';
import previewIcon from './Icons/preview3.svg'
import signIcon from './Icons/sign.svg'
import unsignIcon from './Icons/unsign.svg'
import saveIcon from './Icons/save.svg'
import homeIcon from './Icons/home.svg'
import logo from "../Main Page/Logos/logo2.png";



class Bar extends React.Component {

    constructor(props) {

        super(props)

        this.state = {

            empSign: false,
            monthHours: 0

        };

    }

    checkAdjBalance = () => {
        var balance = 0;
        if (this.props.adjustments != null && this.props.adjustments.length != 0) {
            
            this.props.adjustments.forEach(adjust => balance = balance + parseFloat(adjust.HOURS))
        }
        return (balance == 0)
    }

    saveTSheet = () => {

        if (this.state.empSign === true) {
            alert("Timesheet is already signed please unsign your timesheet and save data first")

        } else if (!this.checkAdjBalance()) {
            alert("Adjustments Balance is Incorrect !")

        }
        else {
            if (this.props.activities.length === 0) {

                alert('There are no activities to be saved')

            } else {
                this.props.blockPage(true)
                axios.get('/CHRGs/saveActivities', {
                    params: {
                        
                        empID: this.props.empID,
                        month: this.props.month,
                        year: this.props.year,
                        empSup1: this.props.empSup1,
                        empSup2: this.props.empSup2,
                        activities: this.props.activities == null || this.props.activities.length == 0 ? "empty" : this.props.activities,
                        adjustments: this.props.adjustments == null || this.props.adjustments.length == 0 ? "empty":this.props.adjustments 
                    }
                }).then((response) => {
                    this.props.blockPage(false)
                    alert(response.data)
                    this.props.saveStatus((response.data === "Your Timesheet has been saved successfully") ? true : false)
                    this.props.updatePenalty(!this.props.checkPenalty);
                        
                    })
                    .catch((error) => {
                        this.props.blockPage(false)
                        console.log("error", error);
                    })
            }
        }

        
    }


        signTSheet = () => {
            if (this.props.saved != true) {
                alert("Save Timesheet first")

            } else if (this.state.empSign === true) {
                alert("Timesheet is already signed")

            } else if (this.props.zeroRow === true) {

                alert("There are activities with zero hours in your timesheet")

            } else {
                this.props.blockPage(true)
                axios.get('/CHRGs/signTimesheet', {
                    params: {
                        empID: this.props.empID,
                        month: this.props.month,
                        year: this.props.year,
                        empSup1: this.props.empSup1,
                        empSup2: this.props.empSup2,
                    }
                }).then((response) => {
                    this.props.blockPage(false)
                    alert(response.data)
                    this.setState({ empSign: (response.data === "Timesheet Signed") ? true : false })
                })
                    .catch((error) => {
                        this.props.blockPage(false)
                        console.log("error", error);
                    })
            }


        }

    unSignTSheet = () => {

        if (this.state.empSign === true) {

            axios.get('/CHRGs/unSignTimesheet', {
                params: {
                    empID: this.props.empID,
                    month: this.props.month,
                    year: this.props.year,
                }
            }).then((response) => {
                alert(response.data)
                this.setState({ empSign: (response.data === "Timesheet Unsigned") ? false : true }, function () {

                    if (this.state.empSign === false) {
                        this.props.saveStatus(false)
                    }
                })
                
            })
                .catch((error) => {
                    console.log("error", error);
                })
        }
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

    componentDidMount() {


        axios.get('/signValidations/monthTotalHours', {
            params: {
                empID: this.props.empID,
                month: this.props.month,
                year: this.props.year
            }
        })
            .then((response) => {
                // handle success
                this.setState({ monthHours: response.data }, function () { this.props.monthData(this.state.monthHours) })
                
            })
            .catch((error) => {
                // handle error
                this.setState({ monthHours: 0 })
                console.log("error", error);
            })

        if (this.props.mode === "edit") {

            if (this.props.tSignStatus === 1) {
                this.setState({ empSign: true })
            }
        }


    }


    render()
        {

                return(
                    <div>
                        <nav class="navbar navbar-dark pBackground d-flex justify-content-between">

                                <div class="navbar-brand" href="#">
                                        <img src={logo} alt="Logo" width="65px" />               
                                </div>

                                <div>
                                      <Dropdown class="pBackground">
                                        <Dropdown.Toggle split variant="pBackground" style={{ background: 'rgb(5,70,109)', color: 'white' }} class="bButton"><FontAwesomeIcon class="pBackground" icon={faUser} width="25px" /> <span class="pBackground">{this.props.userName}</span>  </Dropdown.Toggle >
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#">Employee No: <span class="ml-10">{this.props.empID}</span></Dropdown.Item>
                                            <Dropdown.Item href="#">Title: <span class="ml-15">{this.props.empTitle}</span></Dropdown.Item>
                                            <Dropdown.Item href="#">Department: <span class="ml-10">{this.props.empDepartmentName}</span></Dropdown.Item>
                                            <Dropdown.Item href="#">First Approval: <span class="ml-6">{this.props.empSup1Name}</span></Dropdown.Item>
                                            <Dropdown.Item href="#">Second Approval: {this.props.empSup2Name}</Dropdown.Item>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                </div>

                                <div> 
                                    <Link type="button" to='/timesheet/preview' class="btn  bButton" data-toggle="tooltip" data-placement="bottom" title="Preview"><img src={previewIcon} width='35px' height='35px' /></Link>
                                    <button type="button" class="btn  bButton" data-toggle="tooltip" data-placement="bottom" title="Sign" onClick={this.signTSheet}><img src={signIcon} width='35px' height='35px' /></button>
                                    <button type="button" class="btn  bButton" data-toggle="tooltip" data-placement="bottom" title="UnSign" onClick={this.unSignTSheet}><img src={unsignIcon} width='35px' height='35px' /></button>
                                    <button type="button" class="btn  bButton" data-toggle="tooltip" data-placement="bottom" title="Save" onClick={this.saveTSheet}><img src={saveIcon} width='35px' height='35px' /></button>
                                    <Link type="button" class="btn  bButton" data-toggle="tooltip" data-placement="bottom" title="Home" to="/"><img src={homeIcon} width='35px' height='35px' /></Link>
                                </div> 

                              
                        </nav>

                        <div class= "info greyBackground d-flex justify-content-around">

                            <span class="bBadge badge pBackground mt-3">{this.monthName(this.props.month)} - {this.props.year}</span>
                            <span class="bBadge badge pBackground mt-3">Total Hours: {Number(this.state.monthHours)}</span>
                            <span class={this.state.empSign === false ? "bBadge badge pBackground mt-3" : "bBadge badge badge-success mt-3"}>Status: {this.state.empSign === false ? "Unsigned" : "Signed" }</span>

                        </div>

                    </div>
        
                );

    
        }


    }
    const mapStateToProps = state => {
        return {
            activities: state.Activities.activities,
            userName: state.newUser.name,
            empID: state.newUser.id,
            empTitle: state.newUser.description,
            empDepartment: state.newUser.department,
            empSup1: state.newUser.sup1ID,
            empSup2: state.newUser.sup2ID,
            month: state.createSheet.month,
            year: state.createSheet.year,
            adjustments: state.adjustments.adjustments,
            empDepartmentName: state.newUser.departmentName,
            empSup1Name: state.newUser.sup1Name,
            empSup2Name: state.newUser.sup2Name,
            mode: state.checkMode.mode,
            tSignStatus: state.checkMode.empSign,
            checkPenalty: state.Activities.updatePenalty,
            saved: state.Activities.saved,
            zeroRow: state.Activities.zeroRow
        };
    }


    //export default Bar;

export default connect(mapStateToProps, { monthData, updatePenalty, blockPage, saveStatus })(Bar);