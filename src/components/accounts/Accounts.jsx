import './Accounts.css'
import { useEffect, useState } from "react";

function Accounts() {

    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/accounts`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setAccounts(result.accounts);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);

    const getActiveAccount = () => {
        // No support for multiple accounts, so always return the first in the list.
        return accounts[0];
    }


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <div className="accounts__account">
                    <div className="accounts__balance">&euro; {getActiveAccount().balance}</div>
                    <div className="accounts__account-name">{getActiveAccount().name}</div>
                </div>
            </>
        );
    }
}

export default Accounts;