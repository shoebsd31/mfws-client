import { FileVer } from ".";

export class ObjectFile extends FileVer
{
    ChangeTimeUtc!:Date;
    Extension!:string;
    Name!:string;
    EscapedName!:string;
    Size!:number;
    FileGUID!:string;

}

