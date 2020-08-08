namespace Personas
{
    export class Empleado extends Persona
    {
        public legajo:number;
        public horario:string;

        constructor(id:number,nombre:string,apellido:string,edad:number,legajo:number,horario:string)
        {
            super(id,nombre,apellido,edad);
            this.legajo = legajo;
            this.horario = horario;
        }

        public getHorario():string
        {
            return this.horario;
        }

        public setHorario(horario:string)
        {
            this.horario = horario;
        }

        public getLegajo():number
        {
            return this.legajo;
        }
        public setLegajo(legajo:number)
        {
            this.legajo = legajo;
        }

    }
}