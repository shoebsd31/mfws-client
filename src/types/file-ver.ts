class FileVer{
    ID!:number;
    Version!:number;
    ExternalRepositoryFileID!:string;
    ExternalRepositoryFileVersionID!:string;
    FileVersionType!:MFFileVerVersionType;
    GetUriParameters(){
        return {
            fileId:"",
            fileVersionId:""
        }
    }
}

enum MFFileVerVersionType{
    MFFileVerVersionTypeUninitialized=0,
    MFFileVerVersionTypeLatest = 1,
    MFFileVerVersionTypeAny = 2,
    MFFileVerVersionTypeSpecific = 3
}