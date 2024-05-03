/** @format */

import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import { Favorite } from "@material-ui/icons";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import { Tooltip, message } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setBannerOpen } from "../../actions/actions";
import { ThemeContext } from "../../api/Theme";
import "../assets/scss/FooterPlayer.scss";
import ControlsToggleButton from "./ControlsToggleButton";
import Name from "./Name";

function FooterMusicPlayer({ music }) {
  console.log("---music---", music);

  const [{ _id, author, image, audioUrl, title }, setCurrTrack] =
    useState(music);
  const [isRepeatClicked, setRepeatClick] = useState(false);
  const [isPrevClicked, setPrevClicked] = useState(false);
  const [isNextClicked, setNextClicked] = useState(false);
  const [isPlaying, setPlayPauseClicked] = useState(false);
  const [isVolumeClicked, setVolumeClicked] = useState(false);
  const [volume, setVolume] = useState(50);
  const [seekTime, setSeekTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currTime, setCurrTime] = useState(0);
  const [bannerToggle, setBannerToggle] = useState(false);

  const audioElement = useRef();
  const dispatch = useDispatch();
  const { playlists } = useSelector((state) => state.musicReducer);
  const useStyle = useContext(ThemeContext);
  const pointer = { cursor: "pointer", color: useStyle.theme };

  const handleToggle = (type, val) => {
    switch (type) {
      case "repeat":
        setRepeatClick(val);
        break;
      case "prev":
        setPrevClicked(val);
        break;
      case "play-pause":
        setPlayPauseClicked(val);
        break;
      case "next":
        setNextClicked(val);
        break;
      case "volume":
        setVolumeClicked(val);
        break;
      default:
        break;
    }
  };
  const handleSeekChange = (event, newValue) => {
    audioElement.current.currentTime = (newValue * duration) / 100;
    setSeekTime(newValue);
  };
  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };
  const handleBannerToggle = () => {
    setBannerToggle(!bannerToggle);
  };

  useEffect(() => {
    dispatch(setBannerOpen(bannerToggle));
  }, [dispatch, bannerToggle]);

  useEffect(() => {
    isPlaying
      ? audioElement.current
          .play()
          .then(() => {})
          .catch((e) => {
            audioElement.current.pause();
            audioElement.current.currentTime = 0;
          })
      : audioElement.current.pause();
    audioElement.current.loop = isRepeatClicked;
    audioElement.current.volume = volume / 100;
    audioElement.current.muted = isVolumeClicked;
    audioElement.current.onloadeddata = () => {
      if (audioElement.current != null)
        setDuration(audioElement.current.duration);
    };
    setInterval(() => {
      if (audioElement.current !== null)
        setCurrTime(audioElement.current.currentTime);
    });
  });

  useEffect(() => {
    setCurrTrack(music);
  }, [music]);

  useEffect(() => {
    setSeekTime(currTime / (duration / 100));
  }, [currTime, duration]);

  useEffect(() => {
    // audioElement.current.onended = ()=> {
    //     setNextClicked(true);
    // };
  });

  // useEffect(()=>{
  //     if (isNextClicked){
  //         let currTrackId = (id+1) % playlists.length;
  //         dispatch(setCurrentPlaying(playlists[currTrackId]));
  //         setNextClicked(false);
  //     }
  //     if (isPrevClicked){
  //         let currTrackId = (id-1) % playlists.length;
  //         if ((id-1)<0){
  //             currTrackId = playlists.length - 1;
  //         }
  //         dispatch(setCurrentPlaying(playlists[currTrackId]));
  //         setPrevClicked(false);
  //     }
  // },[dispatch, id, isNextClicked, isPrevClicked, playlists]);

  function formatTime(secs) {
    const t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    let s = t.toTimeString().substr(0, 8);
    if (secs > 86399)
      s = Math.floor((t - Date.parse("1/1/70")) / 3600000) + s.substr(2);
    return s.substring(3);
  }

  const makeFavourite = async () => {
    try {
      message.loading("Making Favourite. Please Wait...", {
        duration: 20000,
      });
      const response = await axios.post(
        `http://localhost:3000/favorite/add/${_id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response) {
        message.destroy();

        message.success("Added to Favourites Successfully",{duration: 2});
        setTimeout(() => {
message.destroy();
        },2000)
      } else {
        message.destroy();

        toast.error("Something went wrong");
      }
    } catch (error) {
      message.destroy();

      message.error(error?.response?.data?.error);
    }
  };
  return (
    <div style={useStyle.component} className={"footer-player"}>
      <div className="playback">
        {!isNaN(seekTime) && (
          <Slider
            style={{ color: useStyle.theme }}
            className={"playback-completed"}
            value={seekTime}
            onChange={handleSeekChange}
          />
        )}
      </div>
      <Button
        startIcon={
          <Avatar
            variant="square"
            src={`http://localhost:3000/albumPictures/${image}`}
            alt={title}
          />
        }
        onClick={handleBannerToggle}
        className="curr-music-container"
      >
        <div className="curr-music-details">
          <Name name={title} className={"song-name"} length={title.length} />
          <Name
            name={author}
            className={"author-name"}
            length={author.length}
          />
        </div>
      </Button>
      <div className="playback-controls">
        {/* <ControlsToggleButton
          style={pointer}
          type={"repeat"}
          defaultIcon={<RepeatIcon fontSize={"large"} />}
          changeIcon={<RepeatOneIcon fontSize={"large"} />}
          onClicked={handleToggle}
        /> */}

        {/* <ControlsToggleButton style={pointer} type={"prev"}
                                      defaultIcon={<SkipPreviousIcon fontSize={"large"}/>}
                                      changeIcon={<SkipPreviousIcon fontSize={"large"}/>}
                                      onClicked={handleToggle}/> */}

        <audio
          ref={audioElement}
          src={`http://localhost:3000/podcastAudios/${audioUrl}`}
          preload={"metadata"}
        />

        <ControlsToggleButton
          style={pointer}
          type={"play-pause"}
          defaultIcon={<PlayArrowIcon fontSize={"large"} />}
          changeIcon={<PauseIcon fontSize={"large"} />}
          onClicked={handleToggle}
        />
        <div
          onClick={() => {
            makeFavourite();
          }}
        >
          <Tooltip title="Make Favourite">
            <Favorite style={{ color: "red", cursor: "pointer" }} />
          </Tooltip>
        </div>

        {/* <ControlsToggleButton style={pointer} type={"next"}
                                      defaultIcon={<SkipNextIcon fontSize={"large"}/>}
                                      changeIcon={<SkipNextIcon fontSize={"large"}/>}
                                      onClicked={handleToggle}/> */}
      </div>
      <div className="playback-widgets">
        <div className="timer">
          <p>
            <span>{formatTime(currTime)}</span>/
            <span>{formatTime(duration)}</span>
          </p>
        </div>
        <div className={"slider"}>
          <Slider
            style={{ color: useStyle.theme }}
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
        <ControlsToggleButton
          style={pointer}
          type={"volume"}
          defaultIcon={<VolumeUpIcon />}
          changeIcon={<VolumeOffIcon />}
          onClicked={handleToggle}
        />
      </div>
    </div>
  );
}

export default FooterMusicPlayer;
