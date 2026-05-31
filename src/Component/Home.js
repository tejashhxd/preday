import Navbar from "./Navbar";
import Tasks from "./Upcoming"


export default function Home({logOut, username}){
    return(
        <>
        <Navbar username={username} logOut={logOut}/>
        <Tasks username={username}/>
        
        </>
    );
}