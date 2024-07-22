import React from "react";
import classes from "./Banner.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = ({ banners, loading }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const hasValidImages = banners?.filter(
    (banner) => banner.images?.url && banner.images.url.trim() !== ""
  );

  return (
    <>
      {loading ? (
        <div className={classes.loading_banner} />
      ) : (
        <>
          {hasValidImages && hasValidImages.length > 0 ? (
            hasValidImages.length === 1 ? (
              <div>
                {hasValidImages[0].link ? (
                  <a
                    href={hasValidImages[0].link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={hasValidImages[0].images.url}
                      alt=""
                      className={classes.slick_slide_image}
                    />
                  </a>
                ) : (
                  <img
                    src={hasValidImages[0].images.url}
                    alt=""
                    className={classes.slick_slide_image}
                  />
                )}
              </div>
            ) : (
              <Slider {...settings}>
                {hasValidImages.map((banner, index) => (
                  <div key={index}>
                    {banner.link ? (
                      <a
                        href={banner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={banner.images.url}
                          alt=""
                          className={classes.slick_slide_image}
                        />
                      </a>
                    ) : (
                      <img
                        src={banner.images.url}
                        alt=""
                        className={classes.slick_slide_image}
                      />
                    )}
                  </div>
                ))}
              </Slider>
            )
          ) : (
            <div className={classes.loading_banner} />
          )}
        </>
      )}
    </>
  );
};

export default Banner;
