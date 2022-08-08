const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");
const provider = new HDWalletProvider(
  "pipe hurt obey polar write process rely blanket slam provide balance tube",
  "https://rinkeby.infura.io/v3/9a4b5b6a684b410989aa81cdbb21aca7"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account: ", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Contract deployed to", result.options.address);
  //0x0555545B4E8bfeFa53B72CC4AF3B2cd1881d7cd7 
};
deploy();
