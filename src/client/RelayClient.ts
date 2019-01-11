import * as RequestClient from 'request-promise-native';
import { RequestPromiseOptions, FullResponse } from 'request-promise-native';
import { SignedIntent } from "../model/SignedIntent"
import { IntentResponse } from "../model/response/IntentResponse"
import { transformSignedIntent } from "../utils/MarmoUtils";
import { FilterOptions, Log } from 'ethereumjs-blockstream'

export class RelayClient {
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    async post(signedIntent: SignedIntent): Promise<IntentResponse> {
        let options: RequestPromiseOptions = {};
        let requestBody = JSON.stringify(transformSignedIntent(signedIntent));
        console.log("RequestBody: ", requestBody);
        options.form = requestBody;
        options.resolveWithFullResponse = true;

        let intentResponse: IntentResponse = new IntentResponse(200)

        let response: FullResponse = await RequestClient.post(this.path, options)
        intentResponse.setStatusCode(response.statusCode);
        console.info("Respone: ", response);

        return intentResponse;
    }

    async getLogs(filterOptions: FilterOptions): Promise<Log[]> {
        const response = await fetch("http://localhost:8545", {
            method: "POST",
            headers: new Headers({"Content-Type": "application/json"}),
            body: { jsonrpc: "2.0", id: 1, method: "eth_getLogs", params: [filterOptions] }
        });
        return await response.json();
    }

}