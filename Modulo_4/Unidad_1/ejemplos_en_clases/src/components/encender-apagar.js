"use client";
import React, { useState } from "react";

export function BotonLuz() {
  //inicializo estado
  const [isOn, setisOn] = useState(true);

  // Manejo del click
  const handleToggle = () => {
    //operador ! > negacion
    setisOn(!isOn); //false > apagado
  };

  return (
    <button onClick={handleToggle}>
      {/* Texto dinamico basado en el estado */}
      {isOn ? "Encendido" : "Apagado"}
    </button>
  );
}
