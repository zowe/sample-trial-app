import React from "react";
import { MemoryRouter as Router, Route, Link } from "react-router-dom";
import AccountList from "./AccountList";
import AccountDetail from "./AccountDetail";
import { getBaseUrl } from './utils.js'
import { Navbar, Nav, Jumbotron, Container } from "react-bootstrap"
// import 'script-loader!./App-css.js';

// var styles;

function mergeStyles(...args) {
  let obj = {};
  for (let i = 0; i < args.length; i++) {
    Object.assign(obj, args[i]);
  }
  return obj;
}

const BASE_URL = getBaseUrl()

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
    const pluginBaseUri = BASE_URL || ZoweZLUX.uriBroker.pluginRESTUri(this.props.resources.pluginDefinition.getBasePlugin(), 'trial', "");
    console.log(pluginBaseUri);
    return {
      pluginBaseUri
    };
  }

  render() {

    const pluginBaseUri = this.getDefaultState();
    return (<Router>
      <div>

        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="#home">React Trial App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link ><Link to="/">Home Page</Link></Nav.Link>
              <Nav.Link ><Link to="/accounts">Accounts</Link></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <hr />

        <Route exact path="/" component={Home} />
        <Route exact path="/accounts" render={(routeProps) => (
          <AccountList {...routeProps} {...pluginBaseUri} />
        )} />
        <Route path={`/accounts/:accountId`} render={(routeProps) => (
          <AccountDetail {...routeProps} {...pluginBaseUri} />
        )} />
      </div>
    </Router>);
  }
};

const Home = () => (
  <Jumbotron fluid>
    <Container>
      <h1>Home Page Component</h1>
      <p>
        This is a sample react zlux app connected to its own backend node app
    </p>
    </Container>
  </Jumbotron>
);

export default App;