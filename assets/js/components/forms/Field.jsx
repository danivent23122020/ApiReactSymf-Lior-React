import React from "react";

const Field = ({
  name,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error = "",
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input
      value={value}
      onChange={onChange}
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      className={"form-control" + (error && " is-invalid")}
    />
    {error && <p className="invalid-feedback">{error}</p>}
  </div>
);

export default Field;
