import { ObjVer } from "./obj-ver";
import { ObjectFile } from "./object-file";

export class ObjectVersion{

    AccessedByMeUtc!:Date;
    CheckedOutAtUtc!:Date;
    CheckedOutTo!:number;
    CheckedOutFrom!:string;
    CheckedOutToUserName!:string;
    Class!:string;
    Score!:number;
    CreatedUtc!:Date;
    Deleted!:boolean;
    DisplayID!:string;
    Files!:ObjectFile[];
    HasAssignments!:boolean;
    HasRelationshipsFromThis!:boolean;
    HasRelationshipsToThis!:boolean;
    IsStub!:boolean;
    LastModifiedUtc!:Date;
    ObjectCheckedOut!:boolean;
    ObjectCheckedOutToThisUser!:boolean;
    ObjectVersionFlags!:MFObjectVersionFlag;
    ObjVer!:ObjVer;
    SingleFile!:boolean;
    ThisVersionLatestToThisUser!:boolean;
    Title!:string;   
    EscapedTitleWithID!:string;
    VisibleAfterOperation!:boolean;
    ObjectGUID!:string;
}

enum MFObjectVersionFlag{
    		/// <summary>
		/// 
		/// </summary>
		None  = 0,
		
		/// <summary>
		/// 
		/// </summary>
		Completed  = 1,

		/// <summary>
		/// 
		/// </summary>
		HasRelatedObjects  = 2,
		
}