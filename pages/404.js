import Link from "next/link";
import Layout from "../components/Layout";
import Section from "../components/Section";

/**
 * Index
 */
const Index = () => {
  return (
    <Layout>
      <div className="o-retain o-retain--wall u-margin-top-base">
        <Section title="Page not found">
          <p>
            {`This page does not exist. :(`}
            <br />
            <br />
            Click <Link href="/">here</Link> to go back to the homepage.
          </p>
        </Section>
      </div>
    </Layout>
  );
};

export default Index;
