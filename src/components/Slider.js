import React, { useRef, useEffect } from 'react'
import Flickity from 'react-flickity-component'
// import fade from "flickity-fade";

import 'flickity/css/flickity.css'
// import "flickity-fade/flickity-fade.css";

const Slider = ({ children }) => {
  const flickityInstance = useRef(null)
  const flickityOptions = {
    autoPlay: false,
    // pauseAutoPlayOnHover: false,
    pageDots: false,
    prevNextButtons: false,
    freeScroll: false,
    wrapAround: false
  }
  useEffect(() => {
    const docStyle = document.documentElement.style
    const transformProp = typeof docStyle.transform === 'string' ? 'transform' : 'WebkitTransform'
    const flkty = flickityInstance.current

    flkty.on('staticClick', function (event, pointer, cellElement, cellIndex) {
      if (!cellElement) {
        return
      }
      if (cellIndex == flkty.selectedIndex) {
        flkty.next()
      } else {
        flkty.select(cellIndex)
      }
    })

    flkty.on('scroll', () =>
      flkty.slides.forEach(function (slide, i) {
        const img = flkty.cells[i].element.querySelector('.image')
        const x = ((slide.target + flkty.x) * -1) / 3

        // const s = slide.target + flkty.current.x;
        return (img.style[transformProp] = `translateX(${x}px)`)
      })
    )
  }, [])

  return (
    <Flickity
      flickityRef={carouselRef => {
        flickityInstance.current = carouselRef
      }}
      options={flickityOptions}
    >
      {children}
    </Flickity>
  )
}

export default Slider
