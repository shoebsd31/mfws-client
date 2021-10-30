export interface KeyValuePair {
    [key: string]: string;
 }

export interface PluginInfoConfiguration{
    Name:string;
    IsDefault:boolean;
    AssemblyName:string;
    BridgeClassName:string;
    IsScopeIndependent:boolean;
    Protocol:string;
    Configuration:KeyValuePair;
    ConfigurationSource:KeyValuePair;
    VaultGuid:string;
}