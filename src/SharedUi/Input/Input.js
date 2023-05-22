import React from "react";

function Input({ type, name, id, handleChange, value }) {
    return (
        <input
            value={value}
            type={type}
            name={name}
            id={id}
            onChange={handleChange}
            className="form-control"
        />
    );
}

export default Input;
