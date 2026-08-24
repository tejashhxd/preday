import Navbar from "./Navbar";
import Tasks from "./Upcoming"


export default function Home({userLogOut, isLoggedIn}){
    return(
        <>
        <Navbar userLogOut={userLogOut}/>
        <Tasks isLoggedIn={isLoggedIn}/>
        
        </>
    );
}