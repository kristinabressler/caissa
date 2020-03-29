import React, { Component } from "react";
import { CountryDropdown } from "react-country-region-selector";
import FormField from "../FormFieldBox/index";

export default class SecurityForm extends Component {
  constructor(props) {
    super(props);

    // initializes state from props if your editing a security
    // else it'll be a blank form
    this.state = {
      name: props.name || "",
      isin: props.isin || "",
      country: props.country || "",
      formErrors: false
    };
  }

  /* updates the "country" form field */
  selectCountry = selectedCountry =>
    this.setState({ country: selectedCountry });

  /* 
    updates the "name" and "isin" form fields via 
    [e.target.name]: e.target.value 
  */
  updateInput = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  /* handles form submissions */
  handleFormSubmit = e => {
    // prevents page refreshes on submission
    e.preventDefault();

    const { name, isin, country } = this.state;
    const { addSecurity, handleEditSecuritySubmission } = this.props;

    const fields = {
      name,
      isin,
      country
    };

    // checks if any of the form fields contain empty values
    const formErrors = Object.values(fields).some(value => !value);

    // this sets formError state, then after setting state
    // it'll check if there are errors, if no errors, then
    // it will either call addSecurity or editSecurity depending on if
    // one of them was passed in from a parent component
    this.setState({ formErrors }, () => {
      if (!formErrors) {
        if (addSecurity) addSecurity(fields);
        else handleEditSecuritySubmission(fields);
      }
    });
  };

  render() {
    const { country, isin, name, formErrors } = this.state;
    return (
      <div className="popup">
        <div className="popup-inner">
          <form onSubmit={this.handleFormSubmit} className="add-form">
            <h2>{this.props.addSecurity ? "Add Security" : "Edit Security"}</h2>
            <div className="form-input">
              <FormField
                onChange={this.updateInput}
                hasError={formErrors}
                label="Name"
                type="text"
                name="name"
                value={name}
              />
              <FormField
                onChange={this.updateInput}
                hasError={formErrors}
                label="ISIN"
                type="text"
                name="isin"
                value={isin}
              />
              <div className="field">
                <label className="label">Country</label>
                <div className="control">
                  <CountryDropdown
                    onChange={this.selectCountry}
                    className={!country ? "input error" : "input"}
                    value={country}
                  />
                  {formErrors && !country && (
                    <div className="err-msg">Please select the country</div>
                  )}
                </div>
              </div>
              {/* <FormField onChange={this.updateInput} label="Country" type="text" name="country" value={this.state.country} /> */}
            </div>
            <div className="buttons-box">
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
          </form>
        </div>
      </div>
    );
  }
}
