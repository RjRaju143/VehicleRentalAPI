export interface RegisterUser {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface VehicleDataInterface {
    userId: string,
    vehiclename: string,
    vehicletype: string,
    startdate: string,
    wheeltype: number,
    enddate: string
}

export interface bookVehicleInterface {
    userId: string,
    wheeltype: number,
    vehicleData: any
}


