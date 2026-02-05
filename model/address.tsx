export type AddressProps = {
    streetAddress: string;
    zip: string;
    city: string;
    geo: {
        latitude: number;
        longitude: number
    }
}