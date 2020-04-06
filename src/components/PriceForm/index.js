import React, { Component } from "react";
import PriceBox from "../SinglePricebox/index";
// import SecurityForm from "../SecurityForm/index";
import AddPriceForm from "../AddPriceForm/index";
// import { uuid } from "uuidv4";

export default class PriceForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      priceArr: this.props.pricelist,
      // newPriceArr: this.props.updatePrice,
      showPricePopup: false,
      addPricePopup: false,
      isToggleOn: true,
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

  addPricePopup = () => {
    this.setState(prevState => ({
      addPricePopup: !prevState.addPricePopup
    }));
  };

    /* adds a new price to the list */
    addPrice = newPrice => {
      this.setState(prevState => ({
        addPricePopup: !prevState.addPricePopup,
        // spreads out the previous list and adds the new price with a unique id
        priceArr: [...prevState.priceArr, { ...newPrice }]
      }));
    };

    // addPrice = newPrice => {
    //   this.setState(prevState => ({
    //     addPricePopup: !prevState.addPricePopup,
    //     // spreads out the previous list and adds the new price with a unique id
    //     priceArr: [...prevState.priceArr, { ...newPrice }]
    //   }));
    // };

    handleFormSubmit = e => {
      // prevents page refreshes on submission
      e.preventDefault();
  
      const { priceArr } = this.state;
      const { updatePrice } = this.props;
  
      const fields = {priceArr};

      this.props.closePopup();
  
      this.setState(() => {
          // if (addPrice) addPrice(fields);
          updatePrice(fields);
      });
      console.log("submission", fields);
      console.log("Is this button working?");
    };


  render() {
    // const { priceArr } = this.state;
    // console.log("PriceForm PriceArr", priceArr);
    return (
      <div className="popup">
        <div className="popup-inner">
          <div className="price-form">
            <h2>Prices</h2>
            <div className="scroll-box">
            {this.state.priceArr.map((props) => (
              <PriceBox
                {...props}
                key={props.date}
              />
            ))}
            </div>
            <div className="buttons-box flex-content-between">
              <button
                type="button"
                onClick={this.addPricePopup}
                className="btn add-button">Add +</button>
                {this.state.addPricePopup && (
                      <AddPriceForm
                        addPrice={this.addPrice}
                        cancelPopup={this.addPricePopup}
                      />
                    )}
              <div className="add-btns">
              <button
                type="button"
                onClick={this.handleFormSubmit}
                className="btn cancel-button"
              >
                Close
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
