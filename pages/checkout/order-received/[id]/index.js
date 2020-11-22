import { withRouter } from "next/router";
import { useContext, useEffect } from "react";
import { BillingContext } from "../../../../components/context/BillingContext";
import { CartContext } from "../../../../components/context/CartContext";
import Layout from "../../../../components/Layout";
import Section from "../../../../components/Section";
import { defaultInitialProps } from "../../../../helpers/defaultInitialProps";

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
                        If you don't receive this email in 1 hour, please check
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
  const settingsProps = await defaultInitialProps();

  return settingsProps;
};

export default withRouter(OrderReceived);
