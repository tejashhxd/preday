import "../Style/navbar.css";

export default function Navbar({username, logOut}){
    return(
        <>
        <div className="navbar">
            <div className="logo decor"><div>PreDay</div></div>
            <div className="userCred">
                {/* <div className="username">{username}</div> */}
                <div className="logout" onClick={() => {logOut()}}>logout?</div>
            </div>
        </div>
        </>
    );
}