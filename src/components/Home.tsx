import {Suspense, lazy, useState, useTransition} from "react";
// import {AdminData} from "./AdminData";
// import {sum} from "../sum";

const AdminData:any = lazy(()=>(wait(1000))
    .then(()=>(
        import("./AdminData")
        .then((module)=>{
            return {default: module.AdminData};
        })
    ))
);



function wait(time:number):any{
    return new Promise((resolve:any):any=>{
        setTimeout(resolve, time);
    });
};

export default ():JSX.Element => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isPending, startTransition] = useTransition();

    function handleSum():void{
        import("../sum").then((module)=>{
            alert(module.sum(2, 2))
        });
    };

    function handleSetIsAdmin():void{
        startTransition(()=>{
            setIsAdmin(prev => !prev);
        });
    };

    return (
        <>
            <h1>Home</h1>
            <button onClick={handleSum} >Add 2 + 2</button>
            <br />
            <br />
            <button onClick={handleSetIsAdmin}>Toggle Admin</button>
            {isPending && <h4 style={{display: "inline"}}>Loading...</h4>}
            <Suspense fallback={<h2>Loading...</h2>}>
                {isAdmin ? <AdminData /> : <h2>Not Admin</h2>}
            </Suspense>
        </>
    );
};