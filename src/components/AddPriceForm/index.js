import React, { Component } from "react";
import FormField from "../FormFieldBox/index";

export default class AddPriceForm extends Component {
  constructor(props) {
    super(props);

    // initializes state from props if your editing a security
    // else it'll be a blank form
    this.state = {
      date: new Date().toLocaleDateString(),
      number: props.number || "",
      formErrors: false
    };
  }

  /* 
    updates the "date" and "number" form fields via 
    [e.target.name]: e.target.value 
  */
  updateInput = ({ target: { name, value, type } }) =>
    this.setState({ [name]: type === 'number' ? Number(value) : value });

  /* handles security form submissions */
  handlePriceFormSubmit = e => {
    // prevents page refreshes on submission
    e.preventDefault();

    const { date, number } = this.state;
    const { addPrice } = this.props;

    const fields = {
      date,
      number
    };

    // checks if any of the form fields contain empty values
    const formErrors = Object.values(fields).some(value => !value);

    this.setState({ formErrors }, () => {
      if (!formErrors) {
        if (addPrice) addPrice(fields);
      }
    });
  };

  render() {
    const { date, number, formErrors } = this.state;

    return (
      <div className="mini-popup">
        <div className="mini-popup-inner">
          <form onSubmit={this.handlePriceFormSubmit} className="addprice-form">
            <h2>Add Price</h2>
            <div className="addform-input">
              <h4>Today's date:</h4>
              <h3>{date}</h3>
              <FormField
                onChange={this.updateInput}
                hasError={formErrors}
                label="Price Number"
                type="number"
                name="number"
                value={number}
              />
            </div>
            <div className="buttons-box flex-content-end">
              <div className="add-btns">
              <button
                type="button"
                onClick={() => this.props.cancelPopup()}
                className="btn cancel-button"
              >
                Cancel
              </button>
              <button type="submit" className="btn save-button">
                Submit
              </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
