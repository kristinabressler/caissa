import React, { Component } from "react";
import PriceBox from "../SinglePricebox/index";
// import SecurityForm from "../SecurityForm/index";
import AddPriceForm from "../AddPriceForm/index";
// import { uuid } from "uuidv4";

export default class PriceForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      priceArr: this.props.pricelist,
      // newPriceArr: this.props.updatePrice,
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

    // handlePriceSubmission = () => {
    //   const { updatePrice } = this.props;

    //   this.addPricePopup();

    //   updatePrice(priceArr);
    // };

    toggleItemEditing = (index) => {
      this.setState(prevState => ({
        priceArr: prevState.priceArr.map(priceItem => {

              // isToggleOn: !state.isToggleOn;
            
        })
      }));
    };

    // toggleItemEditing = index => {
    //   this.setState({
    //     items: this.state.items.map((item, itemIndex) => {
    //       if (itemIndex === index) {
    //         return {
    //           ...item,
    //           isEditing: !item.isEditing
    //         }
    //       }
    //       return item;
    //     })
    //   });
    // };


  render() {
    // const { updatePrice } = this.props;

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
                // toggleItemEditing={this.toggleItemEditing()}
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
                onClick={() => this.props.closeUpdatePopup()}
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
