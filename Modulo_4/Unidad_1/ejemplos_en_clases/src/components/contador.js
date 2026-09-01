"use client";
import React, { useState } from "react";

export function Contador() {
  const [contador, setContador] = useState(0);

  const handleClick = () => {
    setContador(contador + 1); // actualiza el estado
    //  del cliente (solo en el cliente)
  };
  return (
    <div>
      <p>Has hecho click {contador} veces.</p>
      {/* Manejo el evento del lado del cliente */}
      <button onClick={handleClick}>
        Incrementar
      </button>
    </div>
  );
}
