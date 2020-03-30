import React, { Component } from "react";
import PriceBox from "../SinglePricebox/index";
import SecurityForm from "../SecurityForm/index";
import { uuid } from "uuidv4";

export default class PriceForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      priceArr: this.props.pricelist,
      showPricePopup: false,
      addPricePopup: false
      date: props.date || "",
      number: props.number || ""
    };
  }

  updateInput = ({ target: { name, value } }) =>
  this.setState({ [name]: value });

  togglePopup = () => {
    this.setState(prevState => ({
      showPopup: !prevState.showPopup 
    }));
  };

  togglePricePopup = () => {
    this.setState(prevState => ({
      showPricePopup: !prevState.showPricePopup
    }));
  };
  togglePricePopup = () => {
    this.setState(prevState => ({
      showPricePopup: !prevState.showPricePopup
    }));
  };

    /* adds a new price to the list */
    addPrice = newPrice => {
      this.setState(prevState => ({
        showPopup: !prevState.showPopup,
        // spreads out the previous list and adds the new price with a unique id
        priceArr: [...prevState.priceArr, { ...newPrice, id: uuid() }]
      }));
    };

  render() {
    // const { date, price} = this.state;
    return (
      <div className="popup">
        <div className="popup-inner">
          <form className="price-form">
            <h2>Prices</h2>
            <div className="scroll-box">
            {this.state.priceArr.map(props => (
              <PriceBox
                {...props}
                key={props.id}
              />
            ))}
            </div>
            <div className="buttons-box flex-content-between">
              <button
                type="button"
                onClick={this.togglePopup}
                className="btn add-button">Add +</button>
                {this.state.showPopup && (
                      <AddPriceForm
                        addPrice={this.addPrice}
                        cancelPopup={this.togglePopup}
                      />
                    )}
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
