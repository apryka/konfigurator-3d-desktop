import App from "./App";
import MobileApp from "./MobileApp";
import { useMediaQuery } from "./hooks/useMediaQuery"

function MainApp() {
  const matches = useMediaQuery('(min-width: 1024px)');

  return matches ? <App /> : <MobileApp />;
};

export default MainApp;