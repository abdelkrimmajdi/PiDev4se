
export enum State{
    Done =0 , Undone=1
}
export class PersonalObjectif{
    idPerOb!: number;
    title!: string;
    description!: string;
    priorite!: number;
    endDate!: Date;
    statut!: State

}