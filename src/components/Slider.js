import React, { useRef, useEffect } from "react";
import Flickity from "react-flickity-component";
// import fade from "flickity-fade";

import "flickity/css/flickity.css";
// import "flickity-fade/flickity-fade.css";

const Slider = ({ children }) => {
  const flkty = useRef(null);

  const flickityOptions = {
    // autoPlay: true,
    fade: true,
    pageDots: false,
    prevNextButtons: false,
    wrap: true,
  };
  useEffect(() => {
    const docStyle = document.documentElement.style;
    const transformProp = typeof docStyle.transform === "string" ? "transform" : "WebkitTransform";
    flkty.current.on("scroll", () =>
      flkty.current.slides.forEach(function (slide, i) {
        const img = flkty.current.cells[i].element.querySelector(".image");
        const x = ((slide.target + flkty.current.x) * -1) / 3;
        const s = slide.target + flkty.current.x;
        return (img.style[transformProp] = `translateX(${x}px) scale(1)`);
      })
    );
  }, []);

  return (
    <Flickity
      flickityRef={(carouselRef) => {
        flkty.current = carouselRef;
      }}
      options={flickityOptions}
    >
      {children}
    </Flickity>
  );
};

export default Slider;
