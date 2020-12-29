import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import objectFitImages from "object-fit-images";
import { useEffect } from "react";
import "../assets/scss/styles.scss";

NProgress.configure({ minimum: 0.8 });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

objectFitImages();

const App = ({ Component, pageProps }) => {
  // Clear session if session is older than 24 hours
  useEffect(() => {
    const storageCleared = parseInt(
      localStorage.getItem("storageCleared") || "0"
    );
    const yesterday = Date.now() - 1000 * 60 * 60 * 24;
    if (!storageCleared || storageCleared <= yesterday) {
      localStorage.clear();
      localStorage.setItem("storageCleared", Date.now());
    }
  }, []);

  return <Component {...pageProps} />;
};

export default App;
