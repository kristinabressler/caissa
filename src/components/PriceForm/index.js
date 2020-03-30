import React, { Component } from "react";

export default class PriceForm extends Component {
  constructor(props) {
    super(props);

    // initializes state from props if your editing a security
    // else it'll be a blank form
    this.state = {
      priceArr: this.props.pricelist,
    };
  }

  render() {
    // const { date, price} = this.state;
    return (
      <div className="popup">
        <div className="popup-inner">
          <form className="price-form">
            <h2>Prices</h2>
            <div className="form-input">
              <h3>testing price form</h3>
            </div>
            <div className="buttons-box">
              <div className="add-btns">
              <button
                type="button"
                onClick={() => this.props.cancelPopup()}
                className="btn cancel-button"
              >
                Close
              </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
