import { MFWSClientBase } from "../mfws-client-base";


export abstract class MFWSVaultOperationsBase{
    protected client:MFWSClientBase;
    /**
     *
     */
    constructor(client:MFWSClientBase) {
        this.client=client;
    }
}