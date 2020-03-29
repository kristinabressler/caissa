import React from "react";

const FormBox = props => {
  return (
    <div className="field">
      <label className="label">{props.label}</label>
      <div className="control">
        <input onChange={props.onChange}
          className={props.className}
          type={props.type}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder} />
          {Boolean(props.value.length) || (
          <div className="err-msg">
            Please fill in the blank field
          </div>
          )}
      </div>
    </div>
  )
}

export default FormBox;
