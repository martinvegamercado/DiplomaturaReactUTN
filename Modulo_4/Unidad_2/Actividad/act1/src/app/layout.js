import Encabezado from '@/components/Encabezado';
import PieDePagina from '@/components/PieDePagina';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f9', color: '#333' }}>
        
        {/* Componente estático reutilizable */}
        <Encabezado />

        {/* Aquí Next.js inyectará el contenido de cada page.js */}
        <main style={{ minHeight: '75vh', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
          {children}
        </main>

        {/* Componente estático reutilizable */}
        <PieDePagina />
        
      </body>
    </html>
  );
}
