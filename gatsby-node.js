const Promise = require("bluebird");
const path = require("path");

const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order. Following module has been added:/,
      }),
    ],
  });
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const PageTemplate = path.resolve("./src/templates/page.js");
    resolve(
      graphql(
        `
          {
            allDatoCmsPage {
              nodes {
                title
                slug
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          reject(result.errors);
        }

        const pages = result.data.allDatoCmsPage.nodes;
        pages.forEach((page) => {
          createPage({
            path: `/${page.slug}/`,
            component: PageTemplate,
            context: {
              slug: page.slug,
            },
          });
        });
      })
    );
  });
};
