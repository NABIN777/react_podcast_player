/** @format */

import Button from "@material-ui/core/Button";
import { Favorite, MusicNote } from "@material-ui/icons";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/scss/BottomNavigation.scss";

function BottomNavigationMobile() {
  const [menuItems, setMenuItem] = useState([
    {
      id: 0,
      icon: <HomeOutlinedIcon />,
      href: "/home",
      label: "Home",
    },
    {
      id: 1,
      icon: <Favorite />,
      href: "/home/favourites",
      label: "Favourites",
    },
    {
      id: 2,
      icon: <MusicNote />,
      href: "/home/my-podcasts",
      label: "My Podcasts",
    },
    {
      id: 3,
      icon: <MusicNote />,
      href: "/home/add",
      label: "Add Podcast",
    },
  ]);
  let currPath = window.location.pathname;
  return (
    <div className="bottom-navigation">
      {menuItems.map(({ id, icon, href, label }) => (
        <Link className={"bottom-navigation-link"} key={id} to={href}>
          <Button
            className={`${
              currPath === href ? "BottomNavAction active" : "BottomNavAction"
            }`}
            style={{ borderRadius: 0 }}
          >
            {icon}
          </Button>
          <span className="label">{label}</span>
        </Link>
      ))}
    </div>
  );
}

export default BottomNavigationMobile;
