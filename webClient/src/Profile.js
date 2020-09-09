import React, { Component } from 'react'
import { Card, ListGroup, Col } from "react-bootstrap"

class Profile extends Component {
    constructor(props) {

        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            ainfo: {}
        };

        this.ACCOUNTS_PATH = `${props.pluginBaseUri}/accounts`;
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
        fetch(`${this.ACCOUNTS_PATH}/${id}`)
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
            this.props.setTitle(`Account:${first} ${last}` );
            return (<section className="details-section">
                <h1>Profile</h1>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Col>Name:</Col>
                            <Col><b>{first}  {last}</b></Col>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Col>Email</Col><Col><b>{email}</b></Col>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Col>Address</Col><Col><b>{address}</b></Col>                        </ListGroup.Item>
                    </ListGroup>
                </Card>

            </section>)
        }
    }
}

export default Profile;