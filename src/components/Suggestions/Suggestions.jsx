import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "./Suggestions.module.css";
import SuggestionCard from "../SuggestionCard/SuggestionCard";
import InfiniteScroll from "react-infinite-scroll-component";
import Lottie from "react-lottie";
import loadingAnimation from "../../assets/bawLoading.json";
import CopiedDialog from "../CopiedDialog/CopiedDialog";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { UserContext } from "../../context/UseContext";

const Suggestions = ({ params }) => {
  const { setSuggestionId } = useContext(UserContext);

  const [suggestions, setSuggestions] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [totalReviews, setTotalReviews] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5;

  useEffect(() => {
    fetchReviews();
  }, [page]);

  // ----- Get Sample Reviews --------
  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/review/user?page=${page}&limit=${limit}`,
        {
          headers: {
            ApiKey: params.id
              ? params.id
              : "6eb06707-06ea-4315-993b-5dab4b65f080",
          },
        }
      );

      const newReviews = response?.data?.reviews || [];
      setSuggestions((prevReviews) => [...prevReviews, ...newReviews]);
      setTotalReviews(response?.data?.total);

      if (newReviews.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  //------------------------------

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const openDialog = (suggestionId) => {
    setSuggestionId(suggestionId);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  useEffect(() => {
    if (showDialog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showDialog]);

  console.log(suggestions);

  return (
    <div className={classes.main}>
      <h2 className={classes.heading}>Suggestions</h2>
      <InfiniteScroll
        dataLength={suggestions.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
        loader={
          suggestions &&
          suggestions?.length && (
            <div className={classes.loader_container}>
              <Lottie options={defaultOptions} width={60} />
            </div>
          )
        }
      >
        <div className={classes.suggestions_list}>
          {suggestions && suggestions?.length === 0 && (
            <>
              {Array.from({ length: 3 }, (_, index) => (
                <SuggestionCard key={index} isLoading={true} />
              ))}
            </>
          )}
          {suggestions?.map((suggestion, index) => (
            <SuggestionCard
              key={suggestion?._id + index}
              text={suggestion?.review || ""}
              onClick={() => openDialog(suggestion?._id)}
            />
          ))}
        </div>
      </InfiniteScroll>
      {showDialog && (
        <CopiedDialog
          open={showDialog}
          closeDialog={closeDialog}
          params={params}
        />
      )}
    </div>
  );
};

export default Suggestions;
