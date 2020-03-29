import React, { Component } from 'react';
// import FormField from './FormFieldBox';
// import { CountryDropdown } from 'react-country-region-selector';

export default class PopupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.slist.name,
      isin: '',
      country: '',
      id: this.props.indexNumber,
    }
  }

  // selectCountry = (e) => {
  //   this.setState({ country: e });
  // }

  // updateInput = (e) =>{
  //   this.setState({[e.target.name]: e.target.value})
  // }

  // closePopupSubmit = (e) => {
  //   if (!this.canBeSubmitted()) {
  //     e.preventDefault();
  //   }
  //   let security = {     //1.gather security data from form submit
  //     name: this.state.name,
  //     isin: this.state.isin,
  //     country: this.state.country
  //    } 
  //    this.props.editPopup(security); //2.closePopup function, add security data
  // }
  // canBeSubmitted() {
  //   const errors = validate(this.state.name, this.state.isin, this.state.country);
  //   const isDisabled = Object.keys(errors).some(x => errors[x]);
  //   return !isDisabled;
  // }

  // cancelPopupSubmit = (e) => {
  //   e.preventDefault();
  //    this.props.cancelPopup();
  // }

  render() {
    // const errors = validate(this.state.name, this.state.isin, this.state.country);
    // const isDisabled = Object.keys(errors).some(x => errors[x]);
    return (
      <div className='popup'>  
      <div className='popup-inner'>  
      <form onSubmit={this.closePopupSubmit} className="add-form">
        <h2>Edit Security</h2>
        <h3>{this.state.name}</h3>
   
        <div className="buttons-box">
          <button type="button" onClick={this.cancelPopupSubmit} className="btn cancel-button">Cancel</button>
          <button type="submit" className="btn save-button">Submit</button>
        </div>
      </form>
      </div>  
      </div>  
    )
  }
}
