import React from "react";
import "./DataCards.css";
import "../TimeSheet/Common.css";

const DataCards = (props) => {
  return (
    <div className="cards d-flex justify-content-around mt-3">
          
          <div class="card border border-secondary">
              <div class="card-header text-center greyBackground" style={{ borderRadius: "20px 20px 0px 0px" }}>YTD Sick</div>
              <div class="card-body">
                      <h1 class="card-text text-center">{props.sick}</h1>
          </div>
        </div>
          <div class="card border border-secondary">
              <div class="card-header text-center greyBackground" style={{ borderRadius: "20px 20px 0px 0px" }}>YTD Vacation</div>
          <div class="card-body">
                      <h1 class="card-text text-center">{props.taken}</h1>
          </div>
        </div>

          
          <div class="card border border-secondary">
              <div class="card-header text-center greyBackground" style={{ borderRadius: "20px 20px 0px 0px" }}>Vacation Balance</div>
          <div class="card-body">
                      <h1 class="card-text text-center">{props.balance}</h1>
          </div>
        </div>
          <div class="card border border-secondary">
              <div class="card-header text-center greyBackground" style={{ borderRadius: "20px 20px 0px 0px" }}>Last Month</div>
              <div class="card-body">
                      <h1 class="card-text text-center">{props.month}</h1>
          </div>
        </div>
      </div>
 
  );
};

export default DataCards;
