import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

class CampaignNew extends Component {
  state = {
    minimumContribution: "",
    errorMessage: "",
    loading: false,
  };
  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ errorMessage: "" });
    if (!this.state.loading) {
      this.setState({ loading: true });
      try {
        const accounts = await web3.eth.getAccounts();
        if (this.state.minimumContribution) {
          if (isNaN(this.state.minimumContribution)) {
            this.setState({
              errorMessage: "Minimum contribution has to be Number !",
            });
          } else {
            await factory.methods
              .createCampaign(this.state.minimumContribution)
              .send({
                from: accounts[0],
              });
          }
        } else {
          this.setState({
            errorMessage: "Minimum contribution can't be Empty !",
          });
        }
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }
      this.setState({ loading: false });
    }
  };
  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={(event) =>
                this.setState({ minimumContribution: event.target.value })
              }
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

export default CampaignNew;
