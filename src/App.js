import React, { Component } from 'react';
import logo from './images/caissa-icon.png';
import './App.css';
import securitiesgroup from '../src/securities.json';
import SecurityBox from './components/SingleSecuritybox';
import AddPopup from './components/AddPopupForm'; 

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        list: securitiesgroup,
        showPopup: false, //don't show popup
    }
  }

  togglePopup = () => {  //triggle and close popup window
    this.setState({  
         showPopup: !this.state.showPopup  //toggle to show popup
    });  
  } 

  submitPopup = (security) => {  //triggle and close popup window
    this.setState({  
         showPopup: !this.state.showPopup  //toggle to show popup
    });  
    // console.log(security.name);
    if(security.name !== undefined && security.name !== "") { //I notice that every time I click "add" button, it also submit empty box so I had to set conditions
      this.addSecurity(security) 
    }//call addSecurity function when you click to open the popup and you submit the security to the array after you close
  } 

  addSecurity = (security) => { //get security data
    let newSecuritiesList = [...this.state.list] //create new array
    newSecuritiesList.push(security) //add it to food array
    this.setState({
      list: newSecuritiesList

    })
    // console.log(this.state, this.props)
 }

  showSecurity = () =>{
    return this.state.list.map((eachSecurity,i)=>{
        return(
        <SecurityBox
         key={i}
         theSecurity = {eachSecurity}
          />
        )
    })
  }


  render() {
    console.log([this.state.list]);
  return (
    <div className="App">
      <header className="App-header">
        <a href="#" className="App-link">
          <img src={logo} className="App-logo" alt="logo" />
          Annotations
        </a>
      </header>
      <div className="securities">
        <div className="container">
          <h2>Securities</h2>
          {this.showSecurity()}
          <button type="button" className="btn add-btn" onClick={this.togglePopup}>Add</button>
          {this.state.showPopup ? <AddPopup submitPopup={(security) => this.submitPopup(security)} cancelPopup={this.togglePopup} /> 
        : null  }
        </div>
      </div>
    </div>
  );
}
}


export default App;
