export interface TypeFile{
    name:string,
    LastModified:string,
    size:string
}

export interface TypeFolder{
    name:string
}

export type ResponseType={
    files:TypeFile[],
    folders:TypeFolder[]

}