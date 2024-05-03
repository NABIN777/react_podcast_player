/** @format */

import {
  Favorite,
  HomeOutlined,
  MusicNote,
  MusicNoteSharp,
} from "@material-ui/icons";
import React, { useContext } from "react";
import { ThemeContext } from "../../api/Theme";
import "../assets/scss/SideBar.scss";
import SideBarOptions from "./SideBarOptions";

function SideBar() {
  const useStyle = useContext(ThemeContext);
  return (
    <aside style={useStyle.component} className={"aside-bar"}>
      <div className="aside-bar-container playlist">
        <p className={"p1"}>
          <span>Menus</span>
        </p>
        <SideBarOptions
          className={"lib-sub"}
          Icon={HomeOutlined}
          href={"/home"}
          title={"Home"}
        />
        <SideBarOptions
          className={"lib-sub"}
          Icon={MusicNote}
          href={"/home/add"}
          title={"Add Podcast"}
        />
        <SideBarOptions
          className={"lib-sub"}
          Icon={Favorite}
          href={"/home/favourites"}
          title={"Favourite"}
        />
        <SideBarOptions
          className={"lib-sub"}
          Icon={MusicNoteSharp}
          href={"/home/my-podcasts"}
          title={"My Podcasts"}
        />
      </div>
    </aside>
  );
}

/*
 *
 * */
export default SideBar;
