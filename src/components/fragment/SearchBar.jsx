import CancelIcon from "@material-ui/icons/Cancel";
import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import { message } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSearch } from "../../actions/actions";
import '../assets/scss/SearchBar.scss';



const SearchBar = () => {
    const [isSearchBarOpen, setSearchBarOpen] = useState(false);
    const { podcasts } = useSelector((state) => state.musicReducer);
    const handleSearchBarOpen = () => {
        setSearchBarOpen(!isSearchBarOpen);
    };
    const [isLoading, setIsLoading] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value);
    };
    const searchRef = useRef();
    useEffect(() => {
        if (isSearchBarOpen === true) {
            searchRef.current.focus();
        }
    });

    const dispatch = useDispatch();
    const searchLink = useRef();
    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setSearch(searchQuery.toLowerCase()));
        if (searchQuery !== "")
            searchLink.current.click();
    };

    console.log("search query", podcasts);

    const getPodcastData = async () => {
        try {
          setIsLoading(true);
          message.loading("Fetching Podcasts. Please Wait...", { duration: 20000 });
          const response = await axios.get("http://localhost:3000/podcasts", {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
    
          if (response) {
            message.destroy();
            setIsLoading(false);
            dispatch({
              type: "SAVE_PODCASTS",
              payload: response.data.podcasts,
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
    useEffect( () => {
        if (searchQuery) {
            const lowerCaseSearchQuery = searchQuery.toLowerCase();
            const filteredPodcasts = podcasts.filter((item) =>
                item.title.toLowerCase().includes(lowerCaseSearchQuery)
            );

            console.log(filteredPodcasts);
            dispatch({
                type: "SAVE_PODCASTS",
                payload: filteredPodcasts
            })
  

        } else {
                getPodcastData()
        }
    }, [searchQuery]);

    return (
        <div className={`${isSearchBarOpen ? "SearchBar  open" : "SearchBar"}`}>
            <form onSubmit={handleSearch} className={"search-container"}>
                {
                    isSearchBarOpen &&
                    <>
                        <Link to={"/home/search"} ref={searchLink} />
                        <SearchSharpIcon style={{ color: "grey" }} className="search-icon" fontSize="small" />
                        <input id={"search-input"}
                            name={"searchQuery"}
                            value={searchQuery}
                            onChange={handleSearchQuery}
                            placeholder={"Search a podcast..."}
                            type="text"
                            ref={searchRef}
                        />
                    </>
                }
            </form>
            {
                !isSearchBarOpen &&
                <div className={"SearchBar-customPlaceholderOpen"}
                    onClick={handleSearchBarOpen}>
                    <SearchSharpIcon style={{ color: "grey" }} className="search-icon" fontSize="small" />
                    <p className={"hide"}>&nbsp;Search</p>
                </div>
            }
            {
                isSearchBarOpen &&
                <div className={"SearchBar-customPlaceholderClose"}
                    onClick={handleSearchBarOpen}>
                    {/*
                    <p>Close&nbsp;</p>*/}
                    <CancelIcon style={{ color: "grey" }} className="cancel hide" fontSize="small" />
                </div>
            }


        </div>
    );
};

export default SearchBar;