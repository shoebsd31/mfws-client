import { ObjID } from "./obj-id";

export class ObjVer extends ObjID{
    Version!:number;
    ExternalRepositoryObjectVersionID!:string;
    VersionType!:MFObjVerVersionType;
    GetUriParameters(){
        return {
            objectTypeId:1,
            objectId:"",
            objectVersionId:""
        }
    }
}

enum MFObjVerVersionType
	{
		/// <summary>
		/// Based on M-Files API.
		/// </summary>
		All = 3,

		/// <summary>
		/// Based on M-Files API.
		/// </summary>
		Any = 2,

		/// <summary>
		/// Based on M-Files API.
		/// </summary>
		Latest = 1,

		/// <summary>
		/// Based on M-Files API.
		/// </summary>
		Specific = 4,

		/// <summary>
		/// Based on M-Files API.
		/// </summary>
		Uninitialized = 0
	}