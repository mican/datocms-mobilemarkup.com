import React, { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "gsap-trial/all";
import { ProjectsBlock, HomeBlock } from "../components/Blocks";

import { Link, graphql } from "gatsby";

import Layout from "../components/layout";

export default function IndexPage({ data: { projects, site } }) {
  useEffect(() => {
    let pinWrap = document.querySelector("#projectsWrapper");
    let horizontalScrollLength = pinWrap.offsetWidth - window.innerWidth;

    ScrollTrigger.matchMedia({
      "(min-width: 1024px)": function () {
        // setup animations and ScrollTriggers for screens over 800px wide (desktop) here...
        // ScrollTriggers will be reverted/killed when the media query doesn't match anymore.
        gsap.to("#projectsWrapper", {
          scrollTrigger: {
            scrub: true,
            trigger: "#blockProjects",
            pin: true,
            anticipatePin: 1,
            start: "top top",
            end: () => "+=" + horizontalScrollLength,
          },
          x: -horizontalScrollLength,
          ease: "none",
        });
      },
    });

    ScrollTrigger.refresh();

    // gsap.to(".project-name", {
    //   scrollTrigger: {
    //     containerAnimation: horizontalProjects,
    //     trigger: ".project-name",
    //     toggleActions: "play none none reverse",
    //     // horizontal: true,
    //     toggleClass: "animated",
    //     scrub: true,
    //     markers: true,
    //   },
    //   duration: 3,
    //   x: -100,
    // });
  }, []);
  return (
    <Layout>
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
    projects: allDatoCmsProject(sort: { order: DESC, fields: meta___updatedAt }) {
      nodes {
        name
        video {
          providerUid
          title
        }
        images {
          gatsbyImageData
        }
      }
    }
  }
`;
