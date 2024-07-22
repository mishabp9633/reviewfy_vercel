import React, { useContext, useEffect, useState } from "react";
import classes from "./Home.module.css";
import Contact from "../../components/Contact/Contact";
import Suggestions from "../../components/Suggestions/Suggestions";
import Banner from "../../components/Banner/Banner";
import powerdby from "../../assets/powerdby.svg";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { UserContext } from "../../context/UseContext";
import PostGoogleCard from "../../components/PostGoogleCard/PostGoogleCard";

const Home = () => {
  const params = useParams();
  const { setCompanyDetails } = useContext(UserContext);

  const [title, setTitle] = useState("Bottle & Wire | Home");
  const [company, setCompany] = useState(null);
  const [banners, setBanners] = useState([]);
  const [bannerLoading, setBannerLoading] = useState(false);

  useEffect(() => {
    document.title = title;
  }, [title]);

  const fetchCompanyDetails = async () => {
    try {
      const response = await axios.get(`${baseUrl}/company/user`, {
        headers: {
          ApiKey: params.id
            ? params.id
            : "6eb06707-06ea-4315-993b-5dab4b65f080",
        },
      });
      setCompany(response?.data);
      setCompanyDetails(response?.data);
      setTitle(`${response?.data?.name} | Home`);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchBanners = async () => {
    setBannerLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/banner/user`, {
        headers: {
          ApiKey: params.id
            ? params.id
            : "6eb06707-06ea-4315-993b-5dab4b65f080",
        },
      });
      setBanners(response?.data?.mainBanners);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setBannerLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyDetails();
    fetchBanners();
  }, []);

  return (
    <div className={classes.main}>
      <div className={classes.banner_wrapper}>
        <img src={powerdby} alt="" className={classes.powerdby} />
        <Banner banners={banners} loading={bannerLoading} />
        <div className={classes.banner_heading}>
          {company?.name && `${company?.name},`}
          <br /> {company?.address}
        </div>
      </div>
      <Contact />
      <PostGoogleCard />
      <Suggestions params={params} />
    </div>
  );
};

export default Home;
