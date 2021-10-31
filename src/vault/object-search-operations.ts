import axios from "axios";
import { ObjectVersion } from "../types/object-version";
import { MFWSVaultOperationsBase } from "./vault-operations-base";
interface ISearchCondition{

}

class QuickSearchCondition implements ISearchCondition{

    constructor(searchTerm:string) {
        
    }
}

class ObjectTypeSearchCondition implements ISearchCondition{
    /**
     *
     */
    constructor(objectTypeId:number) {
        
    }
}
export class MFWSVaultObjectSearchOperations extends MFWSVaultOperationsBase{
    readonly defaultSearchLimit:number=1;

    async SearchForObjectsByString(searchTerm:string,objectTypeId?:number,limit:number=this.defaultSearchLimit):Promise<ObjectVersion[]>{

        let conditions:ISearchCondition[]=[
            new QuickSearchCondition(searchTerm)
        ];

        if (objectTypeId)
        {
            conditions.push(new ObjectTypeSearchCondition(objectTypeId));
        }

        let requestUrl=`${this.client.url}/REST/objects`
      const response = await axios.get<ObjectVersion[]>(requestUrl);
      return response.data;
    }
}