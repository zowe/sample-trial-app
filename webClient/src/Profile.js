import React, { Component } from 'react'
import { BASE_URL } from './utils.js'

const ACCOUNTS_PATH = `${BASE_URL}/accounts`;

class Profile extends Component {
    constructor(props) {

        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            ainfo: {}
        };
    }

    componentWillReceiveProps(props) {
        const { match } = this.props;

        if (props.match !== match) {
            console.log('did not match');
            this.fetchAccountDetail(props.match.params.accountId);
        }
    }

    componentDidMount() {
        const id = this.props.match.params.accountId;
        this.fetchAccountDetail(id)
    }

    fetchAccountDetail(id) {
        fetch(`${ACCOUNTS_PATH}/${id}`)
            .then(async (res) => {
                let resp = await res.json();
                return resp;
            }
            )
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        ainfo: result
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
        const { error, isLoaded, ainfo } = this.state;

        if (error) {
            return (<div>Error: {error.message}</div>);
        } else if (!isLoaded) {
            return (<div>Loading...</div>);
        } else {
            const { name: { first, last }, address, email } = ainfo;
            return (<section className="details-section">
                <h1>Profile</h1>
                <div><b>Name:</b>
                    {first}  {last}
                </div>
                <div>
                    <b>Email:</b>{email}
                </div>
                <div>
                    <b>Address:</b>{address}
                </div>
            </section>)
        }
    }
}

export default Profile;