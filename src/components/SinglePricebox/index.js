import React, { Component } from "react";

export default class SinglePricebox extends Component {
  state = {
    showPopup: false, //don't show popup
    todaydate: this.props.date
  };

  /* toggle and close popup edit form window */
  togglePopup = () => {
    this.setState(prevState => ({
      showPopup: !prevState.showPopup
    }));
  };


  // toggleEditPriceSubmission = getPriceIndex => {
  //     const { toggleItemEditing, date } = this.props;
  
  //     // toggle the pop up (close)
  //     this.showPopup();
  
  //     toggleItemEditing({ ...getPriceIndex, date });
  //     console.log("date?", date);
  //   };

  //   handleEditSecuritySubmission = editSecurity => {
  //     const { editCurrentSecurity, id } = this.props;
  
  //     // toggle the pop up (close)
  //     this.togglePopup();
  
  //     // sends the editSecurity fields (name, isin, country) + id back to
  //     // App's "this.editCurrentSecurity"
  //     editCurrentSecurity({ ...editSecurity, id });
  //   };

  render() {
    return (
      <div className="pricebox">
        <article className="pricetable">
          <table>
            <tbody>
              <tr>
                <td className="date-width">{this.props.date}</td>
                <td className="price-width">{this.props.number}</td>
                <td className="editing-btn">
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={this.toggleEditPriceSubmission}
                  >
                    {this.toggleEditPriceSubmission ? "Save" : "Edit"}
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
