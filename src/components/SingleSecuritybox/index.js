import React, { Component } from "react";
import SecurityForm from "../SecurityForm/index";
import PriceForm from "../PriceForm/index";

export default class SingleSecuritybox extends Component {
  constructor(props) {
    super(props);
      this.state = {
        showPopup: false,
        showPricePopup: false, //don't show popup
        pricelist: this.props.price
    };
    // console.log("price list", this.state.pricelist);
  }

  /* toggle and close popup edit form window */
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

  /* handles edit current security form submissions */
  handleEditSecuritySubmission = editSecurity => {
    const { editCurrentSecurity, id } = this.props;

    // toggle the pop up (close)
    this.togglePopup();

    // sends the editSecurity fields (name, isin, country) + id back to
    // App's "this.editCurrentSecurity"
    editCurrentSecurity({ ...editSecurity, id });
  };

    /* handles edit current price form submissions */
    handleEditPriceSubmission = editPrice => {
      const { editCurrentPrice, date } = this.props;
  
      // toggle the pop up (close)
      this.togglePopup();
  
      // sends the editSecurity fields (name, isin, country) + id back to
      // App's "this.editCurrentSecurity"
      editCurrentPrice({ ...editPrice, date });
    };

    /* handles delete current security form submissions */
  handleDeleteSecurity = () => {
    const { deleteSecurity, id } = this.props;

    // toggle the pop up (close)
    this.togglePopup();

    // sends the id back to  App's "this.deleteSecurity"
    deleteSecurity(id);
  };

  editCurrentPrice = editedPrice => {
    this.setState(prevState => ({
      pricelist: prevState.pricelist.map(pricelist =>
        pricelist.date === editedPrice.date ? { pricelist, ...editedPrice } : pricelist
      )
    }));
  };




  render() {
    return (
      <div className="box">
        <article className="securitytable">
          <div className="title">
            <h2>
              <strong>{this.props.name}</strong>
            </h2>
            <hr className="lightgray-line" />
          </div>
          <table>
            <tbody>
              <tr>
                <td className="isin-width">{this.props.isin}</td>
                <td className="country-width">{this.props.country}</td>
                <td>
                  <button type="button" className="price-btn" onClick={this.togglePricePopup}>Prices</button>
                  {this.state.showPricePopup ? (
                    <PriceForm
                      pricelist= {this.props.price}
                      handleEditSecuritySubmission={ this.handleEditSecuritySubmission }
                      editCurrentPrice={this.editCurrentPrice}
                      closePopup= {this.togglePricePopup}
                    />
                  ) : null}
                </td>
                <td className="editing-btn">
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={this.togglePopup}
                  >
                    Edit
                  </button>
                  {this.state.showPopup ? (
                    <SecurityForm
                      {...this.props}
                      handleEditSecuritySubmission={ this.handleEditSecuritySubmission }
                      handleDeleteSecurity={this.handleDeleteSecurity}
                      cancelPopup={this.togglePopup}
                    />
                  ) : null}
                </td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>
    );
  }
}
