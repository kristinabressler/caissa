import React, { Component } from "react";

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
                    onClick={this.toggleEditing}
                  >
                    {this.toggleEditing ? "Save" : "Edit"}
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
