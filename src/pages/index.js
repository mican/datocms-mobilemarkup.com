import React, { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, ScrollSmoother } from "gsap-trial/all";
import { ProjectsBlock, HomeBlock } from "../components/Blocks";

import { Link, graphql } from "gatsby";

import Layout from "../components/layout";

export default function IndexPage({ data: { projects, site } }) {
  const scrollRef = React.createRef();

  useEffect(() => {
    let pinWrap = document.querySelector("#projectsWrapper");
    let horizontalScrollLength = pinWrap.offsetWidth - window.innerWidth;
    // Pinning and horizontal scrolling
    gsap.to("#projectsWrapper", {
      scrollTrigger: {
        scrub: true,
        trigger: "#blockProjects",
        pin: true,
        start: "top top",
        end: () => "+=" + horizontalScrollLength,
      },
      x: -horizontalScrollLength,
      ease: "none",
    });
    ScrollTrigger.refresh();
  });
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
