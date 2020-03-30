import React, { Component } from "react";
// import PriceForm from "../PriceForm/index";

export default class SinglePricebox extends Component {
  state = {
    showPopup: false //don't show popup
  };

  /* toggle and close popup edit form window */
  togglePopup = () => {
    this.setState(prevState => ({
      showPopup: !prevState.showPopup
    }));
  };

  /* handles edit current security form submissions */
  handleEditSecuritySubmission = editSecurity => {
    const { editCurrentSecurity, id } = this.props;

    // sends the editSecurity fields (name, isin, country) + id back to
    // App's "this.editCurrentSecurity"
    editCurrentSecurity({ ...editSecurity, id });
  };

    /* handles delete current security form submissions */
  handleDeleteSecurity = () => {
    const { deleteSecurity, id } = this.props;

    // toggle the pop up (close)
    this.togglePopup();

    // sends the id back to  App's "this.deleteSecurity"
    deleteSecurity(id);
  };

  render() {
    return (
      <div className="box">
        <article className="pricetable">
          <table>
            <tbody>
              <tr>
                <td className="isin-width">{this.props.isin}</td>
                <td className="country-width">{this.props.country}</td>
                <td>
                  <button type="button" className="price-btn" onClick={this.togglePopup}>Prices</button>
                </td>
                <td className="editing-btn">
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={this.togglePopup}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="delete-btn">
                      X
                    </button>
                </td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>
    );
  }
}
