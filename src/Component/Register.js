export default function Register({logOut}){
    return(
        <>
        <h1 onClick={() => logOut()}>Log out</h1>
        </>
    );
}