import { CustomerModel } from "../../models/customer";
import { appFetch } from "../fetch";
import { BASE_URL } from "../endpoints";

interface CustomerResponse {
    meta: Meta
    data: CustomerModel
    error: string
}

//ejemplo enums
enum Meta {
    none = "",
    ERROR = "ERROR",
    SUCCESS = "SUCCESS"
}

type DTO = CustomerModel

export default class CustomerRepository {

    public async getByCustomer({ customer }: { customer: string }): Promise<Partial<CustomerResponse>> {
       
        let customerResponseData: Partial<CustomerResponse> = {
            meta: Meta.none
        };
        //console.log(customerResponseData);

        if (customer === "") return customerResponseData ={
            meta:Meta.SUCCESS,
            error: "Debes introducir un código"
        };

        try {
            const response = await appFetch<DTO>(`${BASE_URL}${customer}`);
            const data = await response.json();

            if (response.status === 200) {
                const customerDataAdapted: CustomerModel = {
                    id: data.id,
                    name: data.name,
                    status: data.status,
                    species: data.species,
                    type: data.type,
                    gender: data.gender,
                    image: data.image
                };

                customerResponseData = {
                    meta:Meta.SUCCESS,
                    data: customerDataAdapted,
                };

            } else {
                customerResponseData = {
                    meta:Meta.SUCCESS,
                    error: 'user not found'
                };
            }

        } catch (error) {
            customerResponseData = {
                meta: Meta.ERROR,
                error: 'service error'
            };
        }

        return customerResponseData;
    }
}