import { TituloPrincipal } from "@/components/tituloPrincipal";
import { ListaProductos } from "@/components/listaSuper";
import { NovedadItem } from "@/components/novedadItem";
import { Contador } from "@/components/contador";
import { BotonLuz } from "@/components/encender-apagar";
const titulo2 = "Hola, estoy aprendiendo Next!";
const productos = [
  { id: 1, nombre: "Bananas", precio: 3000 },
  { id: 2, nombre: "Manzanas", precio: 3500 },
  { id: 3, nombre: "Peras", precio: 4000 },
  { id: 4, nombre: "Pan", precio: 5000 },
];

const contenidoNovedad = {
  id: "1",
  titulo: "Next.js lanza componentes",
  subtitulo: "La Version 15 Introduce....",
  autor: "Flavia Ursino",
  cuerpo: "El nuevo enfoque en la arquitectura de Server Components permite",
};

export default function Home() {
  return (
    <div>
      <h2>Props</h2>
      {/* {propiedad simple} */}
      <TituloPrincipal titulo="hola curso!" />
      <hr />
      {/* Propiedad de variabel reutilizada */}
      <TituloPrincipal titulo={titulo2} />
      <hr />
      {/* props > array de productos*/}
      <ListaProductos items={productos} />
      <hr />
      {/* multiples props y destructuring */}
      <NovedadItem
        title={contenidoNovedad.titulo}
        subtitle={contenidoNovedad.subtitulo}
        body={contenidoNovedad.cuerpo}
        author={contenidoNovedad.autor}
      />
      <hr />
      <h2>Ejemplos de Estados</h2>
      <Contador />
      <hr />
      <BotonLuz />
    </div>
  );
}
