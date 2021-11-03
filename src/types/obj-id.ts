class ObjID{
    ID!:number;
    Type!:number;
    ExternalRepositoryName!:string;
    ExternalRepositoryObjectID!:string;
    GetUriParameters(){
        return {
            objectTypeId:1,
            objectId:""
        }
    }
}