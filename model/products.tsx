import { ContactProps } from "./contact";
import { AddressProps } from "./address";

export type Features = {
    key: string;
    label : string
}

export type OpeningInfo = {
    additionalInformation: string,
    validFrom : string,
    validThrough: string,
}

export type Representation = {
	credits: string,
	locator: string,
    title: string
}

export type ProductProps = {
    description: string;
    shortDescription: string;
    name: string;
    uuid: string;
    image: string;
    contact: ContactProps,
    address: AddressProps,
    createdBy: string,
    features: Features[]
    openingInfo: OpeningInfo
    hasRepresentation: Representation[]
}