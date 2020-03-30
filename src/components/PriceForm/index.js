import React, { Component } from "react";
import PriceBox from "../SinglePricebox/index";

export default class PriceForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      priceArr: this.props.pricelist,
      showPricePopup: false,
      date: props.date || "",
      number: props.number || ""
    };
  }

  updateInput = ({ target: { name, value } }) =>
  this.setState({ [name]: value });

  togglePricePopup = () => {
    this.setState(prevState => ({
      showPricePopup: !prevState.showPricePopup
    }));
  };

  toggleItemEditing = index => {
    this.setState({
      items: this.state.priceArr.map((item, itemIndex) => {
        if (itemIndex === index) {
          return {
            ...item,
            isEditing: !item.isEditing
          }
        }
        return item;
      })
    });
  };

  render() {
    // const { date, price} = this.state;
    return (
      <div className="popup">
        <div className="popup-inner">
          <form className="price-form">
            <h2>Prices</h2>
            <div className="scroll-box">
            {this.state.priceArr.map(props => (
              <PriceBox
                {...props}
                key={props.id}
                item={item}
                toggleEditing={() => this.toggleItemEditing(index)}
              />
            ))}
            </div>
            <div className="buttons-box flex-content-between">
              <button
                type="button"
                onClick={this.togglePopup}
                className="btn add-button">Add +</button>
                {this.state.showPopup && (
              <PriceForm
                addPrice={this.addPrice}
                cancelPopup={this.togglePricePopup}
              />
            )}
              <div className="add-btns">
              <button
                type="button"
                onClick={() => this.props.cancelPopup()}
                className="btn cancel-button"
              >
                Close
              </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
