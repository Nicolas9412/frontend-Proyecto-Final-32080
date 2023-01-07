import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Provider } from "react-redux";
import { store } from "../src/app/store";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Toaster />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
