import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";




class Penalty extends React.Component {

    constructor(props) {
        super(props)

        this.state = { penalty: [], hollidays: [] }

        this.dimHollidays = this.dimHollidays.bind(this)
        this.getHollidays = this.getHollidays.bind(this)
        this.getPenaltyDates = this.getPenaltyDates.bind(this)

    }


    componentDidUpdate(prevProps, prevState) {
        if (this.props.checkPenalty != prevProps.checkPenalty) {
            axios.get(`/CHRGs/Penalty/${this.props.empID}`, { params: { month: this.props.month, year: this.props.year } })
                .then((response) => {
                    // handle success
                    this.setState({ penalty: response.data }, () => this.getPenaltyDates())
                })
                .catch((error) => {
                    // handle error

                    console.log("error", error);
                })
        }

    }



    getHollidays(year, month) {




            axios.get('/HOLLIDAY/Days', {
                params: {
                    year: year,
                    month: month
                }
            })

                .then((response) => {

                    // handle success
                    var newState = this.state.hollidays
                    
                    newState.push({ month: month, year: year, days: response.data })
                    this.setState({ hollidays: newState })
                })
                .catch((error) => {

                    // handle error
                    this.setState({ hollidays: [] })
                    console.log("error", error);
                })



        }
          


    // will run as soon as the component mounts and will send an api request to get penalty data
    componentDidMount() {

        axios.get(`/CHRGs/Penalty/${this.props.empID}`, { params: { month: this.props.month, year: this.props.year } })
            .then((response) => {
                // handle success
                this.setState({ penalty: response.data }, ()=> this.getPenaltyDates())
            })
            .catch((error) => {
                // handle error

                console.log("error", error);
            })


    }

    

    getPenaltyDates() {

        var arr = this.state.penalty.map((a) => {

            return [a.ACT_MONTH,a.ACT_YEAR]

        })

        var distinctArr=arr.map((date) => {
            if (arr.indexOf(date) === arr.lastIndexOf(date)) {

                return date

            }
        })


        distinctArr.forEach((a) => {

            this.getHollidays(a[1],a[0])

        })
        

    }


  



    dimHollidays(day,pen) {

        var dt = new Date(pen.ACT_YEAR, pen.ACT_MONTH-1, day)
    
        if (dt.getDay() === 5 ||	dt.getDay() === 6) {
            return true
        }



        return false
    }


    // return table with the new penalty data that returned from the api request
    render() {

      return (
          

          <div className="mb-3">
              {
                  this.state.penalty.length > 0
                  &&

              <div className="sheetBorder ml-1 mt-1">

                     {
                         this.state.penalty.length > 0
                         &&

                        <div class="alert greyBackground " role="alert">
                        <span className="font-weight-bold">Penalty Vacation!</span>
                 </div>

                     }
                     {
                         this.state.penalty.length > 0
                         &&
                         <div class="table-responsive mt-1">
                             <div className="tTable ml-2">
                                 <table className="table table-bordered table-sm table-hover">
                                      <thead class="pBackground">
                                         <tr>
                                             <th scope="col">Job_ID</th>
                                             <th scope="col">SubJob</th>
                                             <th scope="col">Activity</th>
                                             <th scope="col">Year</th>
                                             <th scope="col">Month</th>
                                             <th scope="col">1</th>
                                             <th scope="col">2</th>
                                             <th scope="col">3</th>
                                             <th scope="col">4</th>
                                             <th scope="col">5</th>
                                             <th scope="col">6</th>
                                             <th scope="col">7</th>
                                             <th scope="col">8</th>
                                             <th scope="col">9</th>
                                             <th scope="col">10</th>
                                             <th scope="col">11</th>
                                             <th scope="col">12</th>
                                             <th scope="col">13</th>
                                             <th scope="col">14</th>
                                             <th scope="col">15</th>
                                             <th scope="col">16</th>
                                             <th scope="col">17</th>
                                             <th scope="col">18</th>
                                             <th scope="col">19</th>
                                             <th scope="col">20</th>
                                             <th scope="col">21</th>
                                             <th scope="col">22</th>
                                             <th scope="col">23</th>
                                             <th scope="col">24</th>
                                             <th scope="col">25</th>
                                             <th scope="col">26</th>
                                             <th scope="col">27</th>
                                             <th scope="col">28</th>
                                             <th scope="col">29</th>
                                             <th scope="col">30</th>
                                             <th scope="col">31</th>
                                             <th scope="col">Sum</th>

                                         </tr>
                                     </thead>
                                     <tbody>

                                         {this.state.penalty.map((pen) => {
                                             // mapping each penalty row and returning its data in the table


                                                
                                             var hollidays=[]

                                          this.state.hollidays.forEach((date) => {

                                                 if (date.month === pen.ACT_MONTH && date.year === pen.ACT_YEAR) {
                                                     hollidays.push(date.days)
                                                 }

                                             })
                                              


                             
                     
                                    
                                            //summing the penalties of each day
                                                                                 
                                              var sum = 0
                                             Object.keys(pen).forEach((p)=>{

                                                 if (p.startsWith("D")) {

                                                     sum=sum+pen[p]

                                                 }

                                             })


                                         


                                             return (
                                                 <tr id="tableRow">
                                                     <th scope="row">{pen.JOB_ID}</th>
                                                     <td id="tableRow">{pen.SUBJOB_ID}</td>
                                                     <td>{pen.ACTIVITY_ID}</td>
                                                     <td>{pen.ACT_YEAR}</td>
                                                     <td>{pen.ACT_MONTH}</td>   

                                                     { hollidays.length != 0


                                                         &&
                                                         <>
                                                         <td style={pen.D01 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(1) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(1, pen) ? "bg-secondary text-white" : ""}*/>{pen.D01}</td>
                                                         <td style={pen.D02 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(2) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(2, pen) ? "bg-secondary text-white" : ""}*/>{pen.D02}</td>
                                                         <td style={pen.D03 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(3) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(3, pen) ? "bg-secondary text-white" : ""}*/>{pen.D03}</td>
                                                         <td style={pen.D04 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(4) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(4, pen) ? "bg-secondary text-white" : ""}*/>{pen.D04}</td>
                                                         <td style={pen.D05 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(5) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(5, pen) ? "bg-secondary text-white" : ""}*/>{pen.D05}</td>
                                                         <td style={pen.D06 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(6) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(6, pen) ? "bg-secondary text-white" : ""}*/>{pen.D06}</td>
                                                         <td style={pen.D07 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(7) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(7, pen) ? "bg-secondary text-white" : ""}*/>{pen.D07}</td>
                                                         <td style={pen.D08 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(8) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(8, pen) ? "bg-secondary text-white" : ""}*/>{pen.D08}</td>
                                                         <td style={pen.D09 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(9) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(9, pen) ? "bg-secondary text-white" : ""}*/>{pen.D09}</td>
                                                         <td style={pen.D10 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(10) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(10, pen) ? "bg-secondary text-white" : ""}*/>{pen.D10}</td>
                                                         <td style={pen.D11 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(11) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(11, pen) ? "bg-secondary text-white" : ""}*/>{pen.D11}</td>
                                                         <td style={pen.D12 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(12) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(12, pen) ? "bg-secondary text-white" : ""}*/>{pen.D12}</td>
                                                         <td style={pen.D13 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(13) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(13, pen) ? "bg-secondary text-white" : ""}*/>{pen.D13}</td>
                                                         <td style={pen.D14 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(14) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(14, pen) ? "bg-secondary text-white" : ""}*/>{pen.D14}</td>
                                                         <td style={pen.D15 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(15) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(15, pen) ? "bg-secondary text-white" : ""}*/>{pen.D15}</td>
                                                         <td style={pen.D16 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(16) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(16, pen) ? "bg-secondary text-white" : ""}*/> {pen.D16}</td>
                                                         <td style={pen.D17 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(17) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(17, pen) ? "bg-secondary text-white" : ""}*/>{pen.D17}</td>
                                                         <td style={pen.D18 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(18) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(18, pen) ? "bg-secondary text-white" : ""}*/>{pen.D18}</td>
                                                         <td style={pen.D19 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(19) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(19, pen) ? "bg-secondary text-white" : ""}*/>{pen.D19}</td>
                                                         <td style={pen.D20 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(20) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(20, pen) ? "bg-secondary text-white" : ""}*/>{pen.D20}</td>
                                                         <td style={pen.D21 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(21) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(21, pen) ? "bg-secondary text-white" : ""}*/>{pen.D21}</td>
                                                         <td style={pen.D22 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(22) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(22, pen) ? "bg-secondary text-white" : ""}*/>{pen.D22}</td>
                                                         <td style={pen.D23 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(23) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(23, pen) ? "bg-secondary text-white" : ""}*/>{pen.D23}</td>
                                                         <td style={pen.D24 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(24) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(24, pen) ? "bg-secondary text-white" : ""}*/>{pen.D24}</td>
                                                         <td style={pen.D25 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(25) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(25, pen) ? "bg-secondary text-white" : ""}*/>{pen.D25}</td>
                                                         <td style={pen.D26 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(26) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(26, pen) ? "bg-secondary text-white" : ""}*/>{pen.D26}</td>
                                                         <td style={pen.D27 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(27) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(27, pen) ? "bg-secondary text-white" : ""}*/>{pen.D27}</td>
                                                         <td style={pen.D28 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(28) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(28, pen) ? "bg-secondary text-white" : ""}*/>{pen.D28}</td>
                                                         <td style={pen.D29 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(29) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(29, pen) ? "bg-secondary text-white" : ""}*/>{pen.D29}</td>
                                                         <td style={pen.D30 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(30) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(30, pen) ? "bg-secondary text-white" : ""}*/>{pen.D30}</td>
                                                         <td style={pen.D31 != 0 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} /*style={hollidays[0].indexOf(31) != -1 ? { backgroundColor: "rgb(192,33,38)", color: "white" } : {}} className={this.dimHollidays(31, pen) ? "bg-secondary text-white" : ""}*/>{pen.D31}</td>
                                                         </>
                                                         }
                                                     <td>{sum}</td>

                                                 </tr>
                                             )



                                         })}





                                     </tbody>

                                 </table>
                             </div>
                         </div>
                      }
                  </div>
              }
           </div>
        );


    }

}


const mapStateToProps = state => {
    return { empID: state.newUser.id, month: state.createSheet.month, year: state.createSheet.year, checkPenalty:state.Activities.updatePenalty };
};
export default connect(mapStateToProps)(Penalty);

 //export default Penalty;





