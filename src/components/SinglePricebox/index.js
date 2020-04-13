import React, { Component } from "react";

export default class SinglePricebox extends Component {
  state = {
    todaydate: this.props.date
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
                    onClick={this.toggleEditPriceSubmission}
                  >
                    {this.toggleEditPriceSubmission ? "Save" : "Edit"}
                  </button>
                </td>
                <td>
                {this.props.handleDeletePrice && (
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => this.props.handleDeletePrice(this.props.date)}
                    >
                      X
                    </button>
                    )}
                </td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>
    );
  }
}
