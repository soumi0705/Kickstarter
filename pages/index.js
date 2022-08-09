import React, { Component } from "react";
import factory from '../ethereum/factory'

class CampaignIndex extends Component{
    async componentDidMount(){
        var campaigns = await factory.methods.getDeployedCampaigns().call();

        console.log(campaigns);
    }

    render(){
        return <div>Campaigns Index!</div>
    }
}

export default CampaignIndex;