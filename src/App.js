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
    showPopup: false
  };

  /* toggle and close popup window */
  togglePopup = () => {
    // when toggling state, using the "prevState" callback function
    // ensures that the state is accurate when toggled! Not doing so,
    // can cause issues if you have many components updating the same
    // state variable. which can cause a racing condition.
    this.setState(prevState => ({
      showPopup: !prevState.showPopup // reciporates the previous "showPopup" value
    }));
  };

  /* edits current security */
  editCurrentSecurity = editedSecurity => {
    this.setState(prevState => ({
      // map over previous list and check if the edited security id matches
      // an id in our list -- if it does, overrides its "name", "isin",
      // and "country" fields
      list: prevState.list.map(list =>
        list.id === editedSecurity.id ? { list, ...editedSecurity } : list
      )
    }));
  };

  /* adds a new security to the list */
  addSecurity = newSecurity => {
    this.setState(prevState => ({
      showPopup: !prevState.showPopup,
      // spreads out the previous list and adds the new security with a unique id
      list: [...prevState.list, { ...newSecurity, id: uuid() }]
    }));
  };

  render() {
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
                editCurrentSecurity={this.editCurrentSecurity}
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
