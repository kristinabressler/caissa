import React, { Component } from 'react';
import EditPopup from './EditPopupForm';

export default class SingleSecuritybox extends Component {
  constructor(props){
    super(props);
    this.state = {
        showPopup: false //don't show popup
    }
  }

  togglePopup = () => {  //triggle and close popup window
    this.setState({  
         showPopup: !this.state.showPopup  //toggle to show popup
    });  
  } 

  render() {
    return (
      <div className="box">
        <article className="securitytable">
          <div className="title">
              <h2>
                <strong>{this.props.theSecurity.name}</strong>
              </h2>
              <hr className="lightgray-line"/>
          </div>
          <table>
            <tbody>
              <tr>
                <td className="isin-width">{this.props.theSecurity.isin}</td>
                <td className="country-width">{this.props.theSecurity.country}</td>
                <td><button type="button">Prices</button></td>
                <td className="price-btn"><button type="button" className="edit-btn" onClick={this.togglePopup}>Edit</button>
                {this.state.showPopup ? <EditPopup submitPopup={(security) => this.submitPopup(security)} cancelPopup={this.togglePopup} /> 
        : null  }
                </td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>
    )
  }
}
