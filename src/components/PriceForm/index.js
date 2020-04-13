import React, { Component } from "react";
import PriceBox from "../SinglePricebox/index";
import AddPriceForm from "../AddPriceForm/index";

export default class PriceForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      priceArr: this.props.pricelist,
      showPricePopup: false,
      addPricePopup: false,
      isToggleOn: true,
      date: props.date || "",
      number: props.number || ""
    };
  }

  updateInput = ({ target: { name, value } }) =>
  this.setState({ [name]: value });

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

  toggleItemEditing = index => {
    this.setState({
      priceArr: this.state.priceArr.map((item, itemIndex) => {
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

  handleItemUpdate = (event, index) => {
    const target = event.target;
    const value = target.value;
    const number = target.number;
    this.setState({
      items: this.state.items.map((item, itemIndex) => {
        if (itemIndex === index) {
          return {
            ...item,
            [number]: value
          }
        }
        return item;
      })
    });
  };

  addPricePopup = () => {
    this.setState(prevState => ({
      addPricePopup: !prevState.addPricePopup
    }));
  };

    /* adds a new price to the list */
    addPrice = newPrice => {
      this.setState(prevState => ({
        addPricePopup: !prevState.addPricePopup,
        // spreads out the previous list and adds the new price with a unique id
        priceArr: [...prevState.priceArr, { ...newPrice }]
      }));
    };

    handleDeletePrice = deletePrice => {
      // const { date } = this.props;
      this.setState(prevState => ({
        // spreads out the previous list and delete the price with a unique id
        priceArr: prevState.priceArr.filter(item => item.date !== deletePrice)
      }));
      console.log("delete price", deletePrice);
    };


    handleFormSubmit = () => {
  
      const { priceArr } = this.state;
  
      const fields = {priceArr};
  
      this.props.updatePrice(fields);

      console.log("submission", fields);
    };


  render() {
    return (
      <div className="popup">
        <div className="popup-inner">
          <div className="price-form">
            <h2>Prices</h2>
            <div className="scroll-box">
            {this.state.priceArr.map((props) => (
              <PriceBox
                {...props}
                key={props.date}
                toggleEditing={this.toggleItemEditing}
                handleDeletePrice={this.handleDeletePrice}
                onChange={this.handleItemUpdate}
              />
            ))}
            </div>
            <div className="buttons-box flex-content-between">
              <button
                type="button"
                onClick={this.addPricePopup}
                className="btn add-button">Add +</button>
                {this.state.addPricePopup && (
                      <AddPriceForm
                        addPrice={this.addPrice}
                        cancelPopup={this.addPricePopup}
                      />
                    )}
              <div className="add-btns">
              <button
                type="button"
                onClick={this.handleFormSubmit}
                className="btn cancel-button"
              >
                Close
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
