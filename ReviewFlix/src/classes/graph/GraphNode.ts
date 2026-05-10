type CityNodeProps = {
    tipo: "city";
    id: string;
    nombre: string;
};

type PersonNodeProps = {
    tipo: "person";
    id: string;
    nombre: string;
    edad: number;
    ciudadId: string;
};

type Props = CityNodeProps | PersonNodeProps;

export class Node {
    tipo: "city" | "person";
    id: string;
    nombre: string;
    edad: number | null;
    ciudadId: string | null;

    constructor(props: Props) {
        this.tipo = props.tipo;
        this.id = props.id;
        this.nombre = props.nombre;

        if (props.tipo === "person") {
            this.edad = props.edad;
            this.ciudadId = props.ciudadId;
            return;
        }

        this.edad = null;
        this.ciudadId = null;
    }
}