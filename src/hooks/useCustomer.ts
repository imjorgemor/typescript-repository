import { useCallback, useState } from 'react';
import { CustomerModel } from '../models/customer';
import CustomerRepository from '../infra/repository/CustomerRepository';

export const useCustomer = () => {

    const [state, setState] = useState<CustomerModel | null>();
    const [error, setError] = useState<string>("");
    //loading

    const getCustomer = useCallback(async ({ customer }: { customer: string }) => {
        try {
            //setLoading a true & setErrors
            setError("");
            setState(null);
            const customerSearch = await new CustomerRepository().getByCustomer({ customer });
            console.log(customerSearch);

            if (customerSearch.meta === 'SUCCESS') {
                setState(customerSearch.data);
            }

            if (customerSearch.meta === 'ERROR' && customerSearch.error) {
                setError(customerSearch.error);
            }

        } catch (error) {
            console.log("error", error);
        } finally {
            //setloading a false
        }
    }, []);

    return {state, getCustomer, error};
};