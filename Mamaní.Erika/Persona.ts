namespace Personas 
{
    export class Persona
    {
        private id:number;
        private nombre:string;
        private apellido:string;
        private edad:number;

        constructor(id:number,nombre:string,apellido:string,edad:number)
        {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        }

        public getId():number
        {
            return this.id;
        }
        public setId(id:number)
        {
            this.id = id;
        }

        public getNombre():string
        {
            return this.nombre;
        }
        public setNombre(nombre:string)
        {
            this.nombre = nombre;
        }

        public getApellido():string
        {
            return this.apellido;
        }
        
        public setApellido(apellido:string)
        {
            this.apellido = apellido;
        }

        public getEdad():number
        {
            return this.edad;
        }
        public setEdad(edad:number)
        {
            this.edad = edad;
        }


    }
}