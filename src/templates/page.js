import React from "react";
import { graphql } from "gatsby";
// import get from "lodash/get";
import Layout from "../components/layout";
import { TeamBlock, TechnologyBlock } from "../components/Blocks";

import * as styles from "../styles/page.module.sass";

export default function Page({ data: { site, page } }) {
  return (
    <Layout className={styles.page}>
      {page.blocks.map((block) => {
        switch (block.__typename) {
          case "DatoCmsBlockTechnology":
            return <TechnologyBlock key={block.id} technologies={block.technologies} />;
          case "DatoCmsBlockTeam":
            return <TeamBlock key={block.id} people={block.people} content={block.content} />;
          default:
            console.log(`Sorry, we are out of ${block.__typename}.`);
            return true;
        }
      })}
    </Layout>
  );
}

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    site: datoCmsSite {
      favicon: faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    page: datoCmsPage(slug: { eq: $slug }) {
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      slug
      blocks {
        __typename
        ... on DatoCmsBlockTechnology {
          id
          technologies {
            name
            collection {
              name
              image {
                url
              }
            }
          }
        }
        ... on DatoCmsBlockTeam {
          id
          people {
            name
            specialization
            image {
              gatsbyImageData(width: 64, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`;
