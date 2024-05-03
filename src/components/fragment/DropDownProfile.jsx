/** @format */

import { Backspace } from "@material-ui/icons";
import React, { useContext } from "react";
import { ThemeContext } from "../../api/Theme";
import "../assets/scss/DropDownProfile.scss";
import HoverButton from "./HoverButton";

const DropDownProfile = () => {
  const useStyle = useContext(ThemeContext);

  return (
    <div style={useStyle.component} className="dropdown-profile">
      <span
        onClick={() => {
          localStorage.removeItem("username");
          localStorage.removeItem("token");
          window.location.replace("/");
        }}
      >
        <HoverButton Icon={Backspace} variant={"text"} text={"Logout"} />
      </span>
      {/*<HoverButton Icon={Explore} variant={"text"} text={"About"}/>*/}
    </div>
  );
};
export default DropDownProfile;
