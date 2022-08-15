import React, { Component } from "react";
import factory from '../ethereum/factory'
import {Card, Button} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import Layout from "../components/layout";
class CampaignIndex extends Component{
    static async getInitialProps() {
        var campaigns = await factory.methods
            .getDeployedCampaigns()
            .call();
        return {campaigns};
        
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address =>{
            return {
                header: address,
                description: <a>View Campaign</a>,
                fluid: true,
            }
        });
        return <Card.Group items={items} />
    }

    render(){
        return( 
        <Layout>
        <div>
        <h3>Open Campaigns</h3>
        
        <Button
            content="Create Campaign"
            icon="add circle"
            primary
            labelPosition="left"
            floated="right"
        />
        {this.renderCampaigns()}
        </div>
        </Layout>        
        )
    }
}

export default CampaignIndex;