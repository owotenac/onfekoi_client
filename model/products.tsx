import { AddressProps } from "./address";
import { ContactProps } from "./contact";

export type Type = {
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
    features: Type[]
    openingInfo: OpeningInfo
    hasRepresentation: Representation[]
    type: Type[]
}