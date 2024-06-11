/** @format */

import { Empty, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import "../assets/scss/MusicCardContainer.scss";
import Container from "./Container";
import MusicCard from "./MusicCard";
function FavouriteContainer() {
  const { favouritesPodcasts } = useSelector((state) => state.musicReducer);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const getPodcastData = async () => {
    try {
      setIsLoading(true);
      message.loading("Fetching Your Favourite Podcasts. Please Wait...", {
        duration: 20000,
      });
      const response = await axios.get(
        "http://localhost:3000/favorite/podcast",
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response) {
        message.destroy();
        setIsLoading(false);
        dispatch({
          type: "SAVE_FAVOURITES_PODCASTS",
          payload: response.data,
        });
      } else {
        setIsLoading(false);
        message.destroy();
        toast.error("Something went wrong");
      }
    } catch (error) {
      setIsLoading(false);
      message.destroy();
      toast.error("Something went wrong");
      //   dispatch(HideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getPodcastData();
  }, []);
  return (
    <Container>
      {!isLoading && (
        <div className={"music-card-container"}>
          {favouritesPodcasts?.length > 0 ? (
            favouritesPodcasts?.map((item) => (
              <MusicCard key={item._id} music={item} />
            ))
          ) : (
            <Empty description="You haven't added any podcasts to favouritte" />
          )}
        </div>
      )}
    </Container>
  );
}

export default FavouriteContainer;
