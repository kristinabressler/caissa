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
  // updateInput = ({ target: { name, value } }) =>
  // this.setState({ [name]: value });
  handlePriceUpdate = (event, index) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      priceArr: this.state.priceArr.map((item, itemIndex) => {
        if (itemIndex === index) {
          return {
            ...item,
            [name]: value
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
    this.btnReview.setAttribute("disabled", "disabled");
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
            {this.state.priceArr.map((props, index) => (
              <PriceBox
                {...props}
                key={props.date}
                toggleEditing={() => this.toggleItemEditing(index)}
                handleDeletePrice={this.handleDeletePrice}
                onChange={(e) => this.handlePriceUpdate(e, index)}
              />
            ))}
            </div>
            <div className="buttons-box flex-content-between">
              <button
                type="button"
                onClick={this.addPricePopup}
                className="btn add-button"
                ref={btnReview  => {this.btnReview = btnReview;}}
                >Add +</button>
                {this.state.addPricePopup && (
                      <AddPriceForm
                        addPrice={this.addPrice}
                        cancelPopup={this.addPricePopup}
                      />
                    )}
              {this.btnReview ? "testing" : ""}
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
