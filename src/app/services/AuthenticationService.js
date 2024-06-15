import { createPassportClient } from "@0xpass/passport-viem";

import { http } from "viem";
import { mainnet } from "viem/chains";

class AuthenticaionService {
    constructor() {
    }

    async register(username) {
      // frontend
    };

    async authenticate(username) {
      // frontend
    };

    async sign(authenticatedHeader, message) {
      const client = await this.createWalletClient(authenticatedHeader);
      const [address] = await client.getAddresses();
      const response = await client.signMessage({
        account: address,
        message,
      });
      return response;
    }

    async createWalletClient(authenticatedHeader) {
      const alchemyUrl = process.env.NEXT_PUBLIC_ALCHEMY_URL;
      const fallbackProvider = http(alchemyUrl);

      return createPassportClient(authenticatedHeader, fallbackProvider, mainnet);
    }
  }
  
  const theWalletAuthenticaionService = new AuthenticaionService();
  Object.freeze(theWalletAuthenticaionService);
  
  export default theWalletAuthenticaionService;
