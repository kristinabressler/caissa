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
      todaydate: new Date().toLocaleDateString(),
      date: props.date || "",
      number: props.number || "",
      buttonDisabled: this.props.buttonStatus
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
    
  };

    /* adds a new price to the list */
    addPrice = newPrice => {
      this.setState(prevState => ({
        addPricePopup: !prevState.addPricePopup,
        // spreads out the previous list and adds the new price with a unique id
        priceArr: [...prevState.priceArr, { ...newPrice }],
        buttonDisabled: true
      }));
    };
    
    handleDeletePrice = deletePrice => {
      // const { date } = this.props;
      this.setState(prevState => ({
        // spreads out the previous list and delete the price with a unique id
        priceArr: prevState.priceArr.filter(item => item.date !== deletePrice)
        
      }));
    };

    // handleDeletePrice = deletePrice => {
    //   // const { date } = this.props;
    //   this.setState(prevState => ({
    //     // spreads out the previous list and delete the price with a unique id
    //     priceArr: prevState.priceArr.filter(item => {
    //       if (item.date !== deletePrice) {
    //         return item;
    //       }
    //       if (deletePrice == todaydate) {
    //         return buttonDisabled: true;
    //       }
    //     })
    //   }));
    // };

    // handlePriceUpdate = (event, index) => {
    //   const target = event.target;
    //   const value = target.value;
    //   const name = target.name;
    //   this.setState({
    //     priceArr: this.state.priceArr.map((item, itemIndex) => {
    //       if (itemIndex === index) {
    //         return {
    //           ...item,
    //           [name]: value
    //         }
    //       }
    //       return item;
    //     })
    //   });
    // };

    // updateButtonStatus = (newPriceList) => {
    //   this.setState(prevState => {
    //     return {
    //       list: prevState.list.map(list => {
    //         if (list.id === newPriceList.id) {
    //           return { ...list, buttonstatus: newPriceList.buttonDisabled };
    //         } else {
    //           return list;
    //         }
    //       })
    //     };
    //   });
    // };


    handleFormSubmit = () => {
  
      const { priceArr, buttonDisabled } = this.state;
  
      const fields = {priceArr, buttonDisabled};
  
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
            <div className="add_btn">
              <button
                type="button"
                onClick={this.addPricePopup}
                className="btn add-button"
                disabled={this.state.buttonDisabled}
                >Add +</button>
                {this.state.addPricePopup && (
                      <AddPriceForm
                        addPrice={this.addPrice}
                        cancelPopup={this.addPricePopup}
                      />
                    )}
              {this.state.buttonDisabled ? <p>Only one entry per day.</p> : ""}
              </div>
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
