import {ContractFactory, Network, providers} from "@hovoh/evmcontractsregistry";
import {maiPeripheral, MaiPeripherals} from "../src";
import {initMaiApi, MaiApi} from "../dist";

describe('ContractFactory', () => {
    let contractFactory: MaiPeripherals;

    beforeEach(function() {

        contractFactory = new ContractFactory(providers, maiPeripheral);
    });

    it('Should return the network contract factory', () => {
        const networkContractFactory = contractFactory.forNetwork(
            Network.OPERA_MAINNET
        );
        expect(networkContractFactory.networkProvider).not.toBeNull();
    });

    it('Should return the contracts properly typed and initialised', async () => {
        const mai = contractFactory
            .forNetwork(Network.OPERA_MAINNET).getContractInstance("MAI");
        const MAI_ADDRESS = "0xfb98b335551a418cd0737375a2ea0ded62ea213b"
        expect(mai.address).toEqual(MAI_ADDRESS);
        expect(await mai.symbol()).toEqual("miMATIC");
    });

    it("Should initialize the library", async function() {
        const maiApi: MaiApi = initMaiApi(providers);
        const vaults = maiApi.vaults;
        const wftmVault = vaults.forNetwork(Network.OPERA_MAINNET).getContractInstance("WFTMVault");
        expect(wftmVault.address).toEqual("0x1066b8FC999c1eE94241344818486D5f944331A0")
        const [symbol, closingFee] = await vaults.forNetwork(Network.OPERA_MAINNET).multiCall((get) => [
            get("WFTMVault").symbol(),
            get("WFTMVault").closingFee()
        ])
        expect(symbol).toEqual("FTMVT")
        expect(closingFee.toString()).toEqual("50")

    })

});

