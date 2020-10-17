import "../assets/scss/styles.scss";
import objectFitImages from "object-fit-images";

objectFitImages();

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
