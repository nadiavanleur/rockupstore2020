import Layout from "../../components/Layout";
import Section from "../../components/Section";
import CartItems from "../../components/cart/CartItems";
import { defaultInitialProps } from "../../helpers/defaultInitialProps";

/**
 * Cart
 */
const Cart = ({ menus, settings }) => {
  return (
    <Layout menus={menus} settings={settings} metaData={{ title: "Cart" }}>
      <div className="o-retain o-retain--wall">
        <Section title="Cart">
          <CartItems />
        </Section>
      </div>
    </Layout>
  );
};

Cart.getInitialProps = async () => {
  const settingsProps = await defaultInitialProps();

  return settingsProps;
};

export default Cart;
