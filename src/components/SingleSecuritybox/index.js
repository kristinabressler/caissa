import React, { Component } from "react";
import SecurityForm from "../SecurityForm/index";
import PriceForm from "../PriceForm/index";

export default class SingleSecuritybox extends Component {
  constructor(props) {
    super(props);
      this.state = {
        showPopup: false //don't show popup
        // pricelist: {this.props.price}
    };
  }

  /* toggle and close popup edit form window */
  togglePopup = () => {
    this.setState(prevState => ({
      showPopup: !prevState.showPopup
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
    console.log("security id?", id);
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
                {/* <td>{this.props.price[0].number}</td> */}
                <td>
                  <button type="button" className="price-btn" onClick={this.togglePopup}>Prices</button>
                  {this.state.showPopup ? (
                    <PriceForm
                      pricelist= {this.props.price}
                      cancelPopup={this.togglePopup}
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