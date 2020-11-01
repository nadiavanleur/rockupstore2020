import { withRouter } from "next/router";
import { useContext } from "react";
import { BillingContext } from "../../../../components/context/BillingContext";
import client from "../../../../components/ApolloClient";
import Layout from "../../../../components/Layout";
import Section from "../../../../components/Section";
import {
  TOP_MENU_QUERY,
  CATEGORIES_MENU_QUERY,
  FOOTER_MENU_QUERY,
  USER_MENU_QUERY,
} from "../../../../graphql/queries/get-menus";
import SETTINGS_QUERY from "../../../../graphql/queries/get-settings";

/**
 * OrderReceived
 */
const OrderReceived = ({ menus, settings }) => {
  return (
    <Layout menus={menus} settings={settings} title="Order received">
      <OrderReceivedContent />
    </Layout>
  );
};

const OrderReceivedContent = () => {
  const [billingInfo, setBillingInfo] = useContext(BillingContext);
  console.log(billingInfo);

  return (
    <div className="o-retain o-retain--wall">
      <Section title="Order received">
        <p className="u-margin-bottom-base">
          Thank you! Your order has been received. We've sent a copy of your
          order to{" "}
          {billingInfo?.email ? (
            <b>{billingInfo.email}</b>
          ) : (
            "your email address"
          )}
          .
        </p>
        {billingInfo.order && (
          <>
            <table>
              <tbody>
                <tr>
                  <th>Order number</th>
                  <td>{billingInfo.order.orderNumber}</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>
                    {new Date(billingInfo.order.date).toLocaleString("nl-NL", {
                      hour12: false,
                    })}
                  </td>
                </tr>
                <tr>
                  <th>Total</th>
                  <td>{billingInfo.order.total}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>{billingInfo.order.status}</td>
                </tr>
                <tr>
                  <th>Payment method</th>
                  <td>{billingInfo.order.paymentMethodTitle}</td>
                </tr>
                {billingInfo.paymentMethod === "bacs" && (
                  <tr>
                    <th>Payment instructions</th>
                    <td>
                      We've sent an email to{" "}
                      <b>{billingInfo.order.billing.email}</b> with further
                      payment instructions.
                      <br />
                      <small>
                        If you don't receive this email 15 minutes, please check
                        your spam folder or contact us.
                      </small>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </Section>
    </div>
  );
};

OrderReceived.getInitialProps = async () => {
  const settingsResult = await client.query({
    query: SETTINGS_QUERY,
  });

  const topMenuResult = await client.query({
    query: TOP_MENU_QUERY,
  });

  const categoriesMenuResult = await client.query({
    query: CATEGORIES_MENU_QUERY,
  });

  const footerMenuResult = await client.query({
    query: FOOTER_MENU_QUERY,
  });

  const userMenuResult = await client.query({
    query: USER_MENU_QUERY,
  });

  return {
    settings: {
      ...settingsResult?.data?.allSettings,
      logo: settingsResult?.data?.logo,
    },
    menus: {
      topMenu: topMenuResult?.data?.menus?.nodes?.[0]?.menuItems?.nodes,
      categoriesMenu:
        categoriesMenuResult?.data?.menus?.nodes?.[0]?.menuItems?.nodes,
      footerMenu: footerMenuResult?.data?.menus?.nodes?.[0]?.menuItems?.nodes,
      userMenu: userMenuResult?.data?.menus?.nodes?.[0]?.menuItems?.nodes,
    },
  };
};

export default withRouter(OrderReceived);
