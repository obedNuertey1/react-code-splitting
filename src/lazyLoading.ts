import {lazy} from "react";

export const LazyLoad = (path:string, namedExport?: string):any=>{
    // if(cb != null){
    //     return lazy(()=>cb.then(async ()=>{
    //             const promise = await import(path);
    //             if(namedExport == null){
    //                 return promise;//Return tsx file if no named export is specified
    //             }else{
    //                 return promise
    //                 .then((module:any)=>{
    //                     return {default:module[namedExport]};
    //                 })
    //             }
    //         }    
    //     ))
    // }
    
    return lazy(()=>{
        const promise:any = import(path);
        if(namedExport == null){
            return promise;//Return tsx file if no named export is specified
        }else{
            return promise
            .then((module:any)=>{
                return {default:module[namedExport]};
            })
        }
    });
};