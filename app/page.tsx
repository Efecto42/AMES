import Image from "next/image";

const PHONE="529981117084";
const wa=(message="Hola Ángela, vi la liquidación y quiero conocer las prendas disponibles.")=>`https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
const looks=[
  ["/colecciones.jpg","Archivo 01"],["/galeria2.jpg","Archivo 02"],["/marca2.jpg","Archivo 03"],["/drops.jpg","Archivo 04"],["/marca.jpg","Archivo 05"],
];

export default function Home(){return <main className="sale">
  <div className="saleBar"><span>Liquidación especial</span><b>Piezas desde $150 MXN</b><span>Hasta agotar existencias</span></div>
  <header className="saleHeader"><a className="saleLogo" href="#inicio">Ángela España</a><p>Archivo abierto · Cancún</p><a href={wa()} target="_blank" rel="noreferrer">WhatsApp ↗</a></header>

  <section className="saleHero" id="inicio">
    <div className="salePhoto"><Image src="/hero.jpg" alt="Creación de Ángela España" fill priority sizes="(max-width:800px) 100vw, 52vw"/><span>Selección de archivo · 2026</span></div>
    <div className="saleOffer"><p>Una apertura excepcional del archivo</p><h1>Últimas<br/>piezas.</h1><div className="salePrice"><span>Desde</span><strong>$150</strong><b>MXN</b></div><p className="saleLead">Precios especiales en prendas seleccionadas para dar paso a una nueva etapa.</p><a className="saleMainCta" href={wa()} target="_blank" rel="noreferrer"><span>Ver prendas disponibles</span><b>WhatsApp de Ángela ↗</b></a><small>Disponibilidad confirmada personalmente · Showroom con cita en Cancún · Envíos en México</small></div>
  </section>

  <section className="saleStrip" aria-label="Universo visual de la liquidación">
    <div className="saleStripHead"><div><span>Selección en movimiento</span><h2>El archivo cambia cada día.</h2></div><p>Estas imágenes presentan el universo de la marca. Consulta por WhatsApp las piezas disponibles ahora.</p></div>
    <div className="saleRail">{looks.map((look,i)=><figure key={look[0]}><Image src={look[0]} alt={look[1]} fill sizes="(max-width:700px) 68vw, 24vw"/><figcaption>{String(i+1).padStart(2,"0")} · {look[1]}</figcaption></figure>)}<a className="saleRailCta" href={wa()} target="_blank" rel="noreferrer"><span>Atención personal</span><strong>¿Buscas algo<br/>especial?</strong><b>Hablar con Ángela ↗</b></a></div>
  </section>

  <section className="saleClose"><div><span>Compra como prefieras</span><h2>Showroom en Cancún<br/>o envío dentro de México.</h2></div><a href={wa("Hola Ángela, quiero ver la liquidación y conocer las opciones de entrega.")} target="_blank" rel="noreferrer">Abrir WhatsApp <b>↗</b></a></section>

  <aside className="saleFuture"><div><span>Nueva página oficial</span><i/>En construcción</div><p>Ángela España prepara una nueva casa digital para sus colecciones y diseños a la medida.</p><strong>Próximamente</strong></aside>
  <footer className="saleFooter"><a className="saleLogo" href="#inicio">Ángela España</a><span>Cancún · México</span><span>Una campaña digital de Efecto42 · © 2026</span></footer>
  <a className="saleDock" href={wa()} target="_blank" rel="noreferrer" aria-label="Ver prendas por WhatsApp"><i/><span><small>Ángela responde</small>Ver prendas</span><b>↗</b></a>
 </main>}
