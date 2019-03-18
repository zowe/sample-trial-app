import React from "react";
import { MemoryRouter as Router, Route, Link } from "react-router-dom";
import AccountList from "./AccountList";
import AccountDetail from "./AccountDetail";
// import 'script-loader!./App-css.js';

// var styles;

function mergeStyles(...args) {
  let obj = {};
  for (let i = 0; i < args.length; i++) {
    Object.assign(obj, args[i]);
  }
  return obj;
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.log = this.props.resources.logger;
    let metadata = this.props.resources.launchMetadata;
    if (metadata != null && metadata.data != null && metadata.data.type != null) {
      this.handleLaunchOrMessageObject(metadata.data);
    } else {
      this.state = this.getDefaultState();
    }

  };

  getDefaultState() {
    const destination = ZoweZLUX.uriBroker.pluginRESTUri(this.props.resources.pluginDefinition.getBasePlugin(), 'trial', "");
    console.log(destination);
    return {
      destination
    };
  }

  render() {

    console.log('react trial app rendrer');
    console.log(this.state.destination);
    return (<Router>
      <div>
        <ul /*styles={styles.mainnav}*/>
          <li /*styles={styles.mainnavListItem}*/>
            <Link to="/">Home Page</Link>
          </li>
          <li /*styles={styles.mainnavListItem}*/>
            <Link to="/accounts">Accounts</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route exact path="/accounts" component={AccountList} />
        <Route path={`/accounts/:accountId`} component={AccountDetail} />

      </div>
    </Router>);
  }
};

const Home = () => (
  <div>
    <h2>Home Page Component</h2>
  </div>
);

export default App;