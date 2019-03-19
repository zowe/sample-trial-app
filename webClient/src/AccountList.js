import React, { Component } from 'react'
import { Link } from "react-router-dom";

import { stripTrailingSlash } from './utils.js';



class AccountList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };

    this.ACCOUNTS_PATH = `${props.pluginBaseUri}/accounts`;
  }

  componentDidMount() {
    fetch(this.ACCOUNTS_PATH)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {

    const { error, isLoaded, items } = this.state;
    const { match } = this.props;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {

      return (
        <div>
          <h1>Account(s) List</h1>
          <ul>
            {items.map(item => {
              const { _id, name: { first, last }, email, address } = item;
              const url = stripTrailingSlash(match.url)
              return (
                <li key={_id}>
                  <div><b>Name:</b><Link to={`${url}/${_id}`} >
                    <span>{first}  {last}</span>
                  </Link>
                  </div>
                  <div>
                    <b>Email:</b>{email}
                  </div>
                  <div>
                    <b>Address:</b>{address}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      );
    }
  }
}


export default AccountList