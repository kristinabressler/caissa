import React, { Component } from "react";

export default class SinglePricebox extends Component {
  constructor(props) {
    super(props);

    this.state = {
    isInEditMode: false,
    todaydate: this.props.date
  };

  this.toggleEditPriceSubmission = this.toggleEditPriceSubmission.bind(this);
}

toggleEditPriceSubmission() {
  this.setState(state => ({ isInEditMode: !state.isInEditMode }));
}


  render() {
    const { isInEditMode, index } = this.state;
    return (
      <div className="pricebox">
        <article className="pricetable">
          <table>
            <tbody>
              <tr>
                <td className="date-width">{this.props.date}</td>
                <td className="price-width">
                {isInEditMode ? (
                    <input type="text" name="number" value={this.props.number} onChange={event => this.props.onChange(event, index)}  />
                  ) : (
                    this.props.number
                  )}
                </td>
                <td className="editing-btn">
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={this.toggleEditPriceSubmission}
                  >
                    {isInEditMode ? "Save" : "Edit"}
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
