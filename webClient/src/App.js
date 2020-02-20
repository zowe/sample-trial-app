
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import { MemoryRouter as Router, Route, Link } from "react-router-dom";
import AccountList from "./AccountList";
import AccountDetail from "./AccountDetail";
import { getBaseUrl } from './utils.js'
import { Navbar, Nav, Jumbotron, Container, NavItem } from "react-bootstrap"
// import './App.css';

// var styles;

// function mergeStyles(...args) {
//   let obj = {};
//   for (let i = 0; i < args.length; i++) {
//     Object.assign(obj, args[i]);
//   }
//   return obj;
// }

const BASE_URL = getBaseUrl()
const APP_DEFAULT_TITLE = 'Sample Trial App';

class App extends React.Component {

  constructor(props) {
    super(props);
    // this.log = this.props.resources.logger;
    // let metadata = this.props.resources.launchMetadata;
    // if (metadata != null && metadata.data != null && metadata.data.type != null) {
    //   this.handleLaunchOrMessageObject(metadata.data);
    // } else {
      this.state = this.getDefaultState();
    //}
    this.setTitle();
  };

  getDefaultState() {
    const pluginBaseUri = BASE_URL //|| ZoweZLUX.uriBroker.pluginRESTUri(this.props.resources.pluginDefinition.getBasePlugin(), 'trial', "");
    console.log(pluginBaseUri);
    return {
      pluginBaseUri
    };
  }

  render() {

    const pluginBaseUri = this.getDefaultState();
    const setTitle = this.setTitle.bind(this);
    return (<Router>
      <div>

        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="#home">React Trial App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <NavItem>
              <Link to="/">Home Page</Link>
            </NavItem>
            <NavItem>
              <Link to="/accounts">Accounts</Link>
            </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <hr />

        <Route exact path='/' render={() => <Home setTitle={setTitle} />} />
        <Route exact path="/accounts" render={(routeProps) => (
          <AccountList {...routeProps} {...pluginBaseUri} setTitle={setTitle} />
        )} />
        <Route path={`/accounts/:accountId`} render={(routeProps) => (
          <AccountDetail {...routeProps} {...pluginBaseUri} setTitle={setTitle} />
        )} />
      </div>
    </Router>);
  }

  setTitle(title) {
    let newTitle = APP_DEFAULT_TITLE;
    if (title) {
      newTitle = [title, newTitle].join(' | ');
    }

    // if(this.props.resources.windowActions ) {
    //   this.props.resources.windowActions.setTitle(newTitle);
    // } else {
      document.title=newTitle;
    //}
  }
};

const Home = ({setTitle}) =>{
  setTitle();
  return (
    <Jumbotron fluid>
      <Container>
        <h1>Home Page Component</h1>
        <p>
          This is a sample react zlux app connected to its own backend node app
      </p>
      </Container>
    </Jumbotron>
  );
}

export default App;