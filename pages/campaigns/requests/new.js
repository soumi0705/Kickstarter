import React, { Component } from "react";
import Layout from "../../../components/layout";
import { Form, Button, Message, Input } from "semantic-ui-react";
import campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";

class RequestNew extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }
  state = {
    value: "",
    description: "",
    recipient: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const campaign = Campaign(this.props.address);
    this.setState({ loading: true });
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether"),
      });
      this.props.refreshPage();
    } catch (err) {
      this.setState({ errorMessage: `${err.message}` });
    }
    this.setState({ loading: false, value: "" });
  };
  render() {
    return (
      <Layout>
        <h3>Create a Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              label="ether"
              labelPosition="right"
              value={this.state.description}
              onChange={(event) => {
                this.setState({ errorMessage: "", description: event.target.value });
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Value in Ether</label>
            <Input
              label="ether"
              labelPosition="right"
              value={this.state.value}
              onChange={(event) => {
                this.setState({ errorMessage: "", value: event.target.value });
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              label="ether"
              labelPosition="right"
              value={this.state.recipient}
              onChange={(event) => {
                this.setState({ errorMessage: "", recipient: event.target.value });
              }}
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
