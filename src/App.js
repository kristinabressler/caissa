import React, { Component } from "react";
import SecurityBox from "./components/SingleSecuritybox/index";
import SecurityForm from "./components/SecurityForm";
import logo from "./images/caissa-icon.png";
import { uuid } from "uuidv4";
import securitiesgroup from "../src/securities.json";
import "./App.css";


class App extends Component {
  state = {
    list: securitiesgroup,
    showPopup: false,
    prices: [],
    newlist: [],
    id: ""
  };

  /* toggle and close popup window */
  togglePopup = () => {
    this.setState(prevState => ({
      showPopup: !prevState.showPopup 
    }));
  };

  /* edits current security */
  editCurrentSecurity = editedSecurity => {
    this.setState(prevState => ({
      list: prevState.list.map(list =>
        list.id === editedSecurity.id ? { list, ...editedSecurity } : list
      )
    }
    )
    );
  };

    /* edits current price */
    editCurrentPrice = editedPrices => {
      this.setState(prevState => {
        return {
          list: prevState.list.map(list => {
            if (list.id === this.state.test.id) {
              return { ...list, prices: editedPrices };
            } else {
              return list;
            }
          })
        };
      });
    };

  /* delete the security from the list */
  deleteSecurity = deleteSecurityId => {
    this.setState(prevState => ({
      list: prevState.list.filter(item => item.id !== deleteSecurityId)
    }));
  };

  /* adds a new security to the list */
  addSecurity = newSecurity => {
    this.setState(prevState => ({
      showPopup: !prevState.showPopup,
      // spreads out the previous list and adds the new security with a unique id
      list: [...prevState.list, { ...newSecurity, id: uuid(), prices: [] }]
    }));
  };

  render() {
    console.log("ListArr", this.state.list);
    console.log("newlist", this.state.newlist);
    console.log("id", this.state.id);
    return (
      <div className="App">
        <header className="App-header">
          <a href="/" className="App-link">
            <img src={logo} className="App-logo" alt="logo" />
            Annotations
          </a>
        </header>
        <div className="securities">
          <div className="container">
            <h2>Securities</h2>
            {this.state.list.map(props => (
              <SecurityBox
                {...props}
                key={props.id}
                securitylist = {this.state.list}
                editCurrentSecurity={this.editCurrentSecurity}
                editCurrentPrice={this.editCurrentPrice}
                deleteSecurity={this.deleteSecurity}
              />
            ))}
            <button
              type="button"
              className="btn add-btn"
              onClick={this.togglePopup}
            >
              Add
            </button>
            {this.state.showPopup && (
              <SecurityForm
                addSecurity={this.addSecurity}
                cancelPopup={this.togglePopup}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
