import React, { Component } from 'react';
import FormField from './FormFieldBox';
import { CountryDropdown } from 'react-country-region-selector';

function validate(name, isin, country) {
  // true means invalid, so our conditions got reversed
  return {
    name: name.length === 0,
    isin: isin.length === 0,
    country: country === ""
  };
}

export default class PopupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      isin: '',
      country: '',
      id: this.props.indexNumber
    }
  }

  selectCountry = (e) => {
    this.setState({ country: e });
  }

  updateInput = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }

  closePopupSubmit = (e) => {
    if (!this.canBeSubmitted()) {
      e.preventDefault();
    }
    let security = {     //1.gather security data from form submit
      name: this.state.name,
      isin: this.state.isin,
      country: this.state.country
     } 
     this.props.editPopup(security); //2.closePopup function, add security data
  }
  canBeSubmitted() {
    const errors = validate(this.state.name, this.state.isin, this.state.country);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  cancelPopupSubmit = (e) => {
    e.preventDefault();
     this.props.cancelPopup();
  }

  render() {
    const errors = validate(this.state.name, this.state.isin, this.state.country);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return (
      <div className='popup'>  
      <div className='popup-inner'>  
      <form onSubmit={this.closePopupSubmit} className="add-form">
        <h2>Edit Security</h2>
        <div className="form-input">
        <FormField onChange={this.updateInput} className={errors.name ? "input error" : "input"} label="Name" type="text" name="name" value={this.state.name} />
        <FormField onChange={this.updateInput} className={errors.isin ? "input error" : "input"} label="ISIN" type="text" name="isin" value={this.state.isin} />
        <div className="field">
          <label className="label">Country</label>
          <div className="control">
            <CountryDropdown onChange={this.selectCountry} className={errors.country ? "input error" : "input"} value={this.state.country} />
            {Boolean(this.state.country !== "") || (
            <div className="err-msg">
              Please select the country
            </div>
            )}
          </div>
        </div>
        {/* <FormField onChange={this.updateInput} label="Country" type="text" name="country" value={this.state.country} /> */}
        </div>
        <div className="buttons-box">
          <button type="button" onClick={this.cancelPopupSubmit} className="btn cancel-button">Cancel</button>
          <button type="submit" className="btn save-button" disabled={isDisabled}>Submit</button>
        </div>
      </form>
      </div>  
      </div>  
    )
  }
}
