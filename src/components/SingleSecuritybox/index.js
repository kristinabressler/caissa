import React, { Component } from "react";
import SecurityForm from "../SecurityForm/index";

export default class SingleSecuritybox extends Component {
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

    // toggle the pop up (close)
    this.togglePopup();

    // sends the editSecurity fields (name, isin, country) + id back to
    // App's "this.editCurrentSecurity"
    editCurrentSecurity({ ...editSecurity, id });
  };

    /* handles delete current security form submissions */
    handleDeleteSecuritySubmission = deleteSecurity => {
      const { deleteCurrentSecurity, id } = this.props;
  
      // toggle the pop up (close)
      this.togglePopup();
  
      // sends the deleteSecurity fields (name, isin, country) + id back to
      // App's "this.deleteCurrentSecurity"
      deleteCurrentSecurity({ ...deleteSecurity, id });
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
                  <button type="button">Prices</button>
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
                      handleDeleteSecuritySubmission={ this.handleDeleteSecuritySubmission }
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
