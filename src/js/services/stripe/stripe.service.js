import DataSource from "../../data-sources/data-source.js";

class StripeService {
    constructor(){
        this.dataSource = new DataSource();
        this.host = "https://belle-epoque-v3.onrender.com";
    }

    async getPublishableKey() {
        const response = await this.dataSource.get(this.host + "/api/stripe/config");
        return response.publishableKey;
    }


    async getClientSecretOrError(data) {
        return await this.dataSource.post(data, this.host + '/api/stripe/create-payment-intent'); 
    }
}

export default StripeService;