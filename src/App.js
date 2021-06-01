import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PageWrapper from "./components/PageWrapper";
import Welcome from "./components/WelcomePage";
import OrderList from "./components/OrderList";
import Payment from "./components/Payment";
import Basket from "./components/Basket";
import "./styles/main.scss";
import LaunchScreen from "./components/LaunchOrder";
const App = () => {
  return (
    <div className="App">
      <PageWrapper>
        <Router>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/order" component={OrderList} />
            <Route exact path="/basket" component={Basket} />
            <Route exact path="/payment" component={Payment} />
            <Route exact path="/launch" component={LaunchScreen} />
          </Switch>
        </Router>
      </PageWrapper>
    </div>
  );
};

export default App;
