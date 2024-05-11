/** @format */

import { Skeleton } from "@material-ui/lab";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../api/Theme";
import AddMusic from "../fragment/AddMusic";
import BottomNavigationMobile from "../fragment/BottomNavigationMobile";
import CurrentPlayingLarge from "../fragment/CurrentPlayingLarge";
import FavouriteContainer from "../fragment/Favourite";
import FooterMusicPlayer from "../fragment/FooterMusicPlayer";
import FooterSelectMusic from "../fragment/FooterSelectMusic";
import MobileTopNavigation from "../fragment/MobileTopNavigation";
import MusicCardContainer from "../fragment/MusicCardContainer";
import MyPodcasts from "../fragment/MyPodcasts";
import Navigation from "../fragment/Navigation";
import SideBar from "../fragment/SideBar";
import "./css/Home.scss";

function getCurrPage(pathName) {
  switch (pathName) {
    case "/home":
      return <MusicCardContainer />;
    case "/home/favourites":
      return <FavouriteContainer />;
    case "/home/my-podcasts":
      return <MyPodcasts />;

    case "/home/add":
      return <AddMusic />;

    default:
      return null;
  }
}

function Home() {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currMusic, setCurrMusic] = useState(null);
  const [Page, setCurrPage] = useState(<MusicCardContainer />);

  let pathname = window.location.pathname;
  useEffect(() => {
    setCurrPage(getCurrPage(pathname));
  }, [pathname]);

  window.addEventListener("resize", handleResize);

  function handleResize() {
    setScreenSize(window.innerWidth);
  }

  useEffect(() => {
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  });

  const useStyle = useContext(ThemeContext);
  const { playing, bannerOpen } = useSelector((state) => state.musicReducer);

  useEffect(() => {
    setCurrMusic(playing);
  }, [playing]);

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div style={useStyle.component} className={"home-container"}>
      {!loaded ? (
        <div className="Home-skeleton">
          <Skeleton animation={"wave"} variant={"rect"} height={"100vh"} />
        </div>
      ) : (
        <>
          {screenSize <= 970 ? <MobileTopNavigation /> : <Navigation />}
          <section className={"home-music-container"}>
            <div className="sidebar-home">
              <SideBar />
            </div>
            <div className="main-home">{Page}</div>
          </section>
          {bannerOpen && (
            <section className="current-large-banner">
              <CurrentPlayingLarge />
            </section>
          )}
          <React.Fragment>
            {currMusic ? (
              <FooterMusicPlayer music={currMusic} />
            ) : (
              <FooterSelectMusic />
            )}
            {screenSize <= 970 && <BottomNavigationMobile />}
          </React.Fragment>
        </>
      )}
    </div>
  );
}

export default Home;
