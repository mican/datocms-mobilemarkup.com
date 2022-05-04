import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import locomotiveScroll from "locomotive-scroll";
import { ProjectsBlock } from "../components/Blocks";

import { Link, graphql } from "gatsby";

import Layout from "../components/layout";

import * as styles from "../styles/page-home.module.sass";

gsap.registerPlugin(ScrollTrigger);

export default function IndexPage({ data: { projects, site } }) {
  const scrollRef = React.createRef();

  useEffect(() => {
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
      console.log(pinWrap);
      let pinWrapWidth = pinWrap.offsetWidth;
      let horizontalScrollLength = pinWrapWidth - window.innerWidth;
      // Pinning and horizontal scrolling
      gsap.to("#projectsWrapper", {
        scrollTrigger: {
          scroller: scrollRef.current, //locomotive-scroll
          scrub: true,
          trigger: "#blockProjects",
          pin: true,
          anticipatePin: 1,
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
      <section className={styles.blockHome}>
        <div className="container">
          <h1 className={styles.title}>
            <span className={styles.t1}>Responsive &amp; responsible</span>
            <span className={styles.t2}>web development with edge</span>
            <span className={styles.t3}>solutions and great performance</span>
          </h1>
          <div className={styles.actions}>
            <Link to="/contact" className={styles.button}>
              Get in touch
            </Link>
          </div>
        </div>
      </section>
      <ProjectsBlock projects={projects.nodes} />
      <section className={styles.blockFooter}></section>
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
