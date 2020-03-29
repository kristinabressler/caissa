import React from "react";

const FormBox = ({
  label,
  onChange,
  hasError,
  type,
  name,
  value,
  placeholder
}) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input
          onChange={onChange}
          className={hasError ? "input error" : "input"}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
        />
        {hasError && !value && (
          <div className="err-msg">Please fill in the blank field</div>
        )}
      </div>
    </div>
  );
};

export default FormBox;
