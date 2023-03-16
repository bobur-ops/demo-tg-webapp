import React from "react";
import "./Addon.css";

interface IAddon {
  isChecked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  price: string;
}

const Addon: React.FC<IAddon> = ({ isChecked, price, label, onChange }) => {
  return (
    <label className={`addon ${isChecked ? "addon-active" : ""}`}>
      <div className="addon-checkbox">
        <input
          type="checkbox"
          checked={isChecked}
          id="2"
          onChange={(e) => onChange(e.target.checked)}
        />
      </div>
      <div className="addon-label">{label}</div>
      <div className="addon-price">{`+${price} сум`}</div>
    </label>
  );
};

export default Addon;
