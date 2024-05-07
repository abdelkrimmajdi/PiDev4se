export enum availableday {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY}


export enum availabletime{
    TIME_09_00,
    TIME_09_30,
    TIME_10_00,
    TIME_10_30,
    TIME_11_00,
    TIME_11_30,
    TIME_14_00,
    TIME_14_30,
    TIME_15_00,
    TIME_15_30,
    TIME_16_00,
    TIME_16_30,
    TIME_17_00
}

export class Appointment{
    id! : number ;
    dayApp! :availableday ;
    timeapp! :availabletime ;
    physiotherapistid! : number;

}

