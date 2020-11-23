import { withRouter } from "next/router";
import client from "../../../components/ApolloClient";
import Layout from "../../../components/Layout";
import Section from "../../../components/Section";
import { defaultInitialProps } from "../../../helpers/defaultInitialProps";
import PAGE_QUERY from "../../../graphql/queries/get-page-by-slug";
import PageNotFound from "../../../components/PageNotFound";

/**
 * ContentPage
 */
const ContentPage = ({ page, menus, settings }) => {
  if (!page) return <PageNotFound menus={menus} settings={settings} />;

  return (
    <Layout menus={menus} settings={settings} metaData={{ title: page.title }}>
      <div className="o-retain o-retain--wall">
        <Section title={page.title}>
          <div
            dangerouslySetInnerHTML={{ __html: page.content }}
            className="c-editor-content"
          />
        </Section>
      </div>
    </Layout>
  );
};

ContentPage.getInitialProps = async (router) => {
  const { slug } = router.query;

  const pageResult = await client.query({
    query: PAGE_QUERY,
    variables: {
      id: slug,
    },
  });

  const settingsProps = await defaultInitialProps();

  return {
    ...settingsProps,
    page: pageResult?.data?.page,
  };
};

export default withRouter(ContentPage);
