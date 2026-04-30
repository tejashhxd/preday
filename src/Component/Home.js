import Navbar from "./Navbar";


export default function Home({logOut, username}){
    return(
        <>
        <Navbar username={username} logOut={logOut}/>
        
        </>
    );
}