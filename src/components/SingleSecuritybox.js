import React, { Component } from 'react';
import EditPopup from './EditPopupForm';

export default class SingleSecuritybox extends Component {
  constructor(props){
    super(props);
    this.state = {
        toggle: this.props.toggleEditing,
        editing: this.props.editingPopup,
        idlength: this.props.theSecurityList.length,
        item: this.props.theSecurity
    }
  }
  // <SecurityBox
  //        key={eachSecurity.id}
  //        index={index}
  //        theSecurity = {eachSecurity}
  //        toggleEditing={() => this.toggleItemEditing(index)}
  //        editingPopup = {(index) => this.editPopup(index)}
  //        onChange={this.handleItemUpdate}
  //        theSecurityList={this.state.list}
  //         />


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
                <td className="edit-btn"><button type="button" className="edit-btn" onClick={this.toggle}>Edit</button>
                {this.state.toggle ? <EditPopup editPopup={(index) => this.editing(index)} cancelPopup={this.toggle} indexNumber={this.idlength} slist={this.state.item} /> 
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
