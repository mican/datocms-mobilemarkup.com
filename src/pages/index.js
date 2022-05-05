import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import locomotiveScroll from "locomotive-scroll";
import { ProjectsBlock, HomeBlock } from "../components/Blocks";

import { Link, graphql } from "gatsby";

import Layout from "../components/layout";

export default function IndexPage({ data: { projects, site } }) {
  const scrollRef = React.createRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const scroller = new locomotiveScroll({
      el: scrollRef.current,
      smooth: true,
    });
    scroller.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy(scrollRef.current, {
      scrollTop(value) {
        return arguments.length ? scroller.scrollTo(value, 0, 0) : scroller.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          left: 0,
          top: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: scrollRef.current.style.transform ? "transform" : "fixed",
    });
    window.addEventListener("load", function () {
      let pinWrap = document.querySelector("#projectsWrapper");
      let pinWrapWidth = pinWrap.offsetWidth;
      let horizontalScrollLength = pinWrapWidth - window.innerWidth;
      // Pinning and horizontal scrolling
      gsap.to("#projectsWrapper", {
        scrollTrigger: {
          scroller: scrollRef.current, //locomotive-scroll
          scrub: true,
          trigger: "#blockProjects",
          pin: true,
          // anticipatePin: 1,
          start: "top top",
          end: pinWrapWidth,
        },
        x: -horizontalScrollLength,
        ease: "none",
      });
      ScrollTrigger.addEventListener("refresh", () => scroller.update()); //locomotive-scroll
      ScrollTrigger.refresh();
    });
  });
  return (
    <Layout scrollRef={scrollRef}>
      <HomeBlock />
      <ProjectsBlock projects={projects.nodes} />
    </Layout>
  );
}

export const query = graphql`
  {
    site: datoCmsSite {
      favicon: faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    projects: allDatoCmsProject {
      nodes {
        name
        video {
          url
        }
        images {
          gatsbyImageData
        }
      }
    }
  }
`;
