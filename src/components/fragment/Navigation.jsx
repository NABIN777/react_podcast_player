/** @format */

import { Button } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../../api/Theme";
import "../assets/scss/Navigation.scss";
import Brand from "./Brand";
import DropDownProfile from "./DropDownProfile";
import SearchBar from "./SearchBar";

function Navigation() {
  const [isLanguageListOpen, setLangList] = useState(false);
  const [isOpenProfile, setOpenProfile] = useState(false);

  function handleOpenLanguageList() {
    if (isOpenProfile === true) setOpenProfile(!isOpenProfile);
    setLangList(!isLanguageListOpen);
  }

  function handleOpenProfile() {
    if (isLanguageListOpen === true) setLangList(!isLanguageListOpen);
    setOpenProfile(!isOpenProfile);
  }
  const useStyle = useContext(ThemeContext);
  return (
    <nav style={useStyle.component}>
      <Brand />
      <div className={"navigation"}>
        {/* <NavigationButton href={"/home"} name={"Home"}/>*/}
        {/* <NavigationButton href={"/home/about"} name={"About"}/>*/}
        {/*<NavigationButton href={"/home/add"} name={"Add"}/>*/}
      </div>
      <SearchBar />

      <div className="profile" onClick={handleOpenProfile}>
        <Button
          className={"Dropdown-btn"}
          startIcon={<h3> {localStorage.getItem("username")}</h3>}
          endIcon={isOpenProfile ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        ></Button>
        {isOpenProfile && <DropDownProfile />}
      </div>
    </nav>
  );
}

export default Navigation;
