/** @format */

import Box from "@material-ui/core/Box";
import { Delete, Edit } from "@material-ui/icons";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import { Skeleton } from "@material-ui/lab";
import { Button, Descriptions, Modal, Tooltip, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { setCurrentPlaying } from "../../actions/actions";
import "../assets/scss/MusicCard.scss";
import Name from "./Name";

function MusicCard(props) {
  const { title, image, author, _id,description,category } = props.music;
  const [isHovered, setHovered] = useState(false);
  const [isDetailOpen,setIsDetailOpen] = useState(false);
  const history = useHistory();
  function handleResponse() {
    setHovered(!isHovered);
  }

  const dispatch = useDispatch();

  function handlePlay() {
    dispatch(setCurrentPlaying(props.music));
  }

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);
  const removeFromFavourite = async () => {
    try {
      message.loading("Removing from Favourite. Please Wait...", {
        duration: 20000,
      });
      const response = await axios.post(
        `http://localhost:3000/favorite/remove/${_id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("response", response);

      if (response) {
        message.destroy();
        message.success("Podcast removed from favorites successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        message.destroy();

        message.error("Something went wrong");
      }
    } catch (error) {
      message.destroy();
      message.error("Something went wrong");

      message.error(error?.response?.data?.error);
    }
  };

  const deleteMyPodcast = async () => {
    try {
      message.loading("Deleting Podcast. Please Wait...", {
        duration: 20000,
      });
      const response = await axios.delete(
        `http://localhost:3000/podcasts/${_id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response) {
        message.destroy();
        message.success("Podcast deleted successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        message.destroy();
        message.error("Something went wrong");
      }
    } catch (error) {
      message.destroy();
      message.error("Something went wrong");

      message.error(error?.response?.data?.error);
    }
  };

  return (
    <div className={"music-card"}>
      <Modal footer={null} open={isDetailOpen} onCancel={() => {
        setIsDetailOpen(false)
      }} title="Podcast Details" >
         <Descriptions  items={[{
    key: '1',
    label: 'Title',
    children: title,
    span:3
  },
  {
    key: '2',
    label: 'Author',
    children: author,
    span:3
  },
  {
    key: '3',
    label: 'Description',
    children: description,
    span:3
  },
  {
    key: '4',
    label: 'Category',
    children: category,
    span:3
  },
  ]} />

      </Modal>
      {!loaded ? (
        <div className={"Skeleton-top"}>
          <Skeleton variant="rect" width={210} height={210} />
          <Box pt={0.5}>
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        </div>
      ) : (
        <>
          <div
            onClick={handlePlay}
            className={"music-card-cover"}
            onMouseOver={handleResponse}
          >
            <img
              src={`http://localhost:3000/albumPictures/${image}`}
              alt={title}
            />
            <div className="play-circle">
              <PlayCircleFilledWhiteIcon />
            </div>
          </div>
          <React.Fragment>
            <Name name={title} className={"song-name"} length={title.length} />
            <Name
              name={author}
              className={"author-name"}
              length={author.length}
            />
            <Button style={{marginTop:"0.5rem"}} type="default" onClick={() => {setIsDetailOpen(true)}}>View Details</Button>
            {window.location.pathname == "/home/favourites" && (
              <div
                onClick={() => {
                  removeFromFavourite();
                }}
              >
                <Tooltip title="Remove From Favourite">
                  <Delete style={{ color: "red", cursor: "pointer" }} />
                </Tooltip>
              </div>
            )}
            {window.location.pathname == "/home/my-podcasts" && (
              <div style={{ display: "flex", gap: "2px" }}>
                <div
                  onClick={() => {
                    dispatch({
                      type: "SET_ACTIVE_PODCAST_FOR_EDIT",
                      payload: props.music,
                    });
                    history.push({
                      pathname: "/home/add",
                      state: props.music,
                    });
                  }}
                >
                  <Tooltip title="Edit Podcast">
                    <Edit style={{ cursor: "pointer" }} />
                  </Tooltip>
                </div>
                <div
                  onClick={() => {
                    deleteMyPodcast();
                  }}
                >
                  <Tooltip title="Remove Podcast">
                    <Delete style={{ color: "red", cursor: "pointer" }} />
                  </Tooltip>
                </div>
              </div>
            )}
          </React.Fragment>
        </>
      )}
    </div>
  );
}

export default MusicCard;
