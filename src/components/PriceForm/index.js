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

    // editCurrentSecurity = editedSecurity => {
    //   this.setState(prevState => ({
    //     list: prevState.list.map(list =>
    //       list.id === editedSecurity.id ? { list, ...editedSecurity } : list
    //     )
    //   }));
    // };

    handleFormSubmit = e => {
      // prevents page refreshes on submission
      e.preventDefault();
  
      const { date, price } = this.state;
      const { addPrice, handleEditPriceSubmission } = this.props;
  
      const fields = {
        date,
        price
      };
  
      // checks if any of the form fields contain empty values
      const formErrors = Object.values(fields).some(value => !value);
  
      // this sets formError state, then after setting state
      // it'll check if there are errors, if no errors, then
      // it will either call addSecurity or editSecurity or deleteSecurity depending on if
      // one of them was passed in from a parent component
      this.setState({ formErrors }, () => {
        if (!formErrors) {
          if (addPrice) addPrice(fields);
          else handleEditPriceSubmission(fields);
        }
      });
      closePopup();
      // console.log("submission", fields);
      console.log("Is this button working?");
    };

    // handleEditPriceSubmission = editPrice => {
    //   const { editCurrentPrice, date } = this.props;
  
    //   // toggle the pop up (close)
    //   this.togglePopup();
  
    //   // sends the editSecurity fields (name, isin, country) + id back to
    //   // App's "this.editCurrentSecurity"
    //   editCurrentPrice({ ...editPrice, date });
    // };


  render() {
    // const { updatePrice } = this.props;
    console.log("PriceArr", this.state.priceArr);
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
                // editCurrentSecurity={this.editCurrentSecurity}
                // toggleItemEditing={this.toggleItemEditing()}
                // onChange={this.handleItemUpdate}
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
