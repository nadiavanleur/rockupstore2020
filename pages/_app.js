import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import objectFitImages from "object-fit-images";
import "../assets/scss/styles.scss";

NProgress.configure({ minimum: 0.8 });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

objectFitImages();

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
