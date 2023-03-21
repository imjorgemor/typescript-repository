import { useState } from 'react';
import { useCustomer } from './hooks';

function App() {
    const [customer, setCustomer] = useState('');
    const {state, error, getCustomer} = useCustomer();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        getCustomer({customer});
    };

    //console.log(state)

    return (
        <div className="App">
            <h1>Customer documentation search</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder='Customer ID...'
                    value={customer}
                    name="query"
                    onChange={(event) => setCustomer(event.target.value)} />
                <button type='submit'>Search</button>
            </form>
            <div>
                {
                    error
                    ? <p>{error}</p>
                    : <img src={state?.image} alt={state?.name} />
                }
            </div>
        </div>
    );
}

export default App;
