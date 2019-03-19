import React, { Component } from 'react'
import Profile from "./Profile";
import Cars from "./Cars";

class AccountDetail extends Component {
    constructor(props) {

        super(props);
        this.state = {
            id: props.match.params.accountId,

        };
    }

    componentWillReceiveProps(props) {
        const { match } = this.props;

        if (props.match !== match) {
            const id = props.match.params.accountId
            this.setState({ id });
        }
    }

    componentDidMount() {
        const id = this.props.match.params.accountId;
        this.setState({ id });
    }

    render() {

        const { id } = this.state;

        return (
            <div>
                <Profile id={id} match={this.props.match} pluginBaseUri={this.props.pluginBaseUri} />
                <Cars id={id} match={this.props.match} pluginBaseUri={this.props.pluginBaseUri} />
            </div>
        );
    }
}


export default AccountDetail;