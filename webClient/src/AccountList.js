import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap"

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
    fetch(this.ACCOUNTS_PATH, {credentials: 'include'})
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
          <Table responsive striped="true">
            <thead key={0}><tr>
              <th>Name
              </th>
              <th>
                Email
              </th>
              <th>
                Address
              </th>
            </tr>
            </thead>
            <tbody>
              {items.map(item => {
                const { _id, name: { first, last }, email, address } = item;
                const url = stripTrailingSlash(match.url)
                return (
                  <tr key={_id}>
                    <td>
                      {/* uncomment block below to add each of user detail */}
                      {/*<Link to={`${url}/${_id}`} >
                      <span>{first}  {last}</span>
                </Link>*/}
                    </td>
                    <td>
                      {email}
                    </td>
                    <td>
                      {address}
                    </td>
                  </tr>
                )
              })}</tbody>
          </Table>
        </div>
      );
    }
  }
}


export default AccountList