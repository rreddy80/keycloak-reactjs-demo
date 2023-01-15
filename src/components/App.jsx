import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import BookBox from "../components/BookBox";
import Menu from "../components/Menu";
import UserContainer from '../components/UserContainer';
import StoreService from "../services/StoreService";
import RenderOnAnonymous from "./RenderOnAnonymous";
import RenderOnAuthenticated from "./RenderOnAuthenticated";
import Welcome from "./Welcome";

const store = StoreService.setup();

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div className="container">
        <RenderOnAnonymous>
          <Welcome/>
        </RenderOnAnonymous>
        <RenderOnAuthenticated>
          <Menu />
          <BookBox/>
          <UserContainer/>
        </RenderOnAuthenticated>
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
