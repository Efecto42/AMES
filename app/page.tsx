import Image from "next/image";

const PHONE = "529981117084";
const MESSAGE = "Hola Ángela, vi la liquidación especial y quiero conocer las prendas disponibles.";
const whatsapp = (message = MESSAGE) => `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
const image = (name: string) => `https://raw.githubusercontent.com/Efecto42/AMES/main/public/${name}`;

const facts = [
  { value: "$150", label: <>Precios desde<br />pesos mexicanos</> },
  { value: "Cancún", label: <>Showroom físico<br />con visita coordinada</> },
  { value: "México", label: <>Envíos nacionales<br />por cotizar</> },
];

export default function Home() {
  return <>
    <div className="grain" aria-hidden="true" />
    <div className="topline">Liquidación especial · Piezas desde $150 MXN · Hasta agotar existencias</div>
    <nav className="nav" aria-label="Navegación principal">
      <a className="brand" href="#inicio">Ángela España</a>
      <span className="navNote">Diseño con intención · Cancún</span>
      <a className="navCta" href={whatsapp()} target="_blank" rel="noreferrer"><span>Ver disponibles</span> ↗</a>
    </nav>
    <main>
      <section className="hero" id="inicio">
        <div className="heroCopy">
          <div className="aura" aria-hidden="true" /><div className="orb" aria-hidden="true" />
          <p className="eyebrow">Una despedida antes de algo extraordinario</p>
          <h1>Últimas piezas.<em>Nueva historia.</em></h1>
          <p className="heroLead">Estamos preparando una nueva experiencia para encontrar diseños únicos y hechos a tu medida. Mientras llega, descubre nuestra <strong>liquidación especial desde $150 MXN.</strong></p>
          <div className="actions">
            <a className="button light" href={whatsapp()} target="_blank" rel="noreferrer">Ver prendas por WhatsApp <span>↗</span></a>
            <a className="button ghost" href="#como-comprar">Cómo comprar</a>
          </div>
        </div>
        <div className="heroVisual">
          <Image src={image("hero.jpg")} alt="Diseño de Ángela España en Cancún" fill priority sizes="(max-width: 900px) 100vw, 47vw" />
          <div className="price"><small>Piezas desde</small><strong>$150</strong><span>MXN</span></div>
        </div>
      </section>
      <div className="marquee" aria-hidden="true"><div>{[0,1].map(copy => <span key={copy}>Liquidación especial　✦　Showroom en Cancún　✦　Envíos a todo México　✦　Hasta agotar existencias　✦　</span>)}</div></div>
      <section className="section intro">
        <div><p className="kicker">La selección</p><h2>El momento de encontrar algo inesperado.</h2></div>
        <div className="introBody"><p>Prendas seleccionadas salen del archivo de Ángela España con precios especiales. Escríbenos y te mostraremos lo disponible según tu talla, estilo y ocasión.</p><div className="facts">{facts.map(fact => <div className="fact" key={fact.value}><span>{fact.value}</span><small>{fact.label}</small></div>)}</div></div>
      </section>
      <section className="editorial" aria-label="Universo Ángela España">
        <figure className="large"><Image src={image("galeria4.jpg")} alt="Diseño blanco de Ángela España" fill sizes="(max-width: 900px) 100vw, 56vw" /><figcaption>Ángela España · Archivo</figcaption></figure>
        <div className="stack">
          <figure><Image src={image("galeria2.jpg")} alt="Conjunto de Ángela España" fill sizes="(max-width: 560px) 100vw, 42vw" /><figcaption>Hecho para sentirse propio</figcaption></figure>
          <figure><Image src={image("galeria3.jpg")} alt="Look de Ángela España" fill sizes="(max-width: 560px) 100vw, 42vw" /><figcaption>Detalles con intención</figcaption></figure>
        </div>
      </section>
      <section className="offer" id="como-comprar">
        <div className="offerVisual"><Image src={image("acento.jpg")} alt="Prenda artesanal de Ángela España" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
        <div className="offerCopy"><p className="kicker">Compra directa</p><h2>Tu próxima pieza está a un mensaje.</h2><p>El inventario cambia constantemente. Cuéntanos qué buscas y te enviaremos por WhatsApp las opciones disponibles para ti.</p><ol className="steps"><li><b>01</b><span>Escríbenos por WhatsApp.</span></li><li><b>02</b><span>Cuéntanos tu talla, estilo o lo que necesitas.</span></li><li><b>03</b><span>Elige visita al showroom en Cancún o envío dentro de México.</span></li></ol><a className="button light" href={whatsapp()} target="_blank" rel="noreferrer">Quiero ver lo disponible <span>↗</span></a></div>
      </section>
      <section className="section future"><p className="kicker">Próximamente</p><h2>Estamos creando algo tan único como tú.</h2><p>La nueva casa digital de Ángela España está en construcción: un espacio para descubrir diseños con carácter, piezas especiales y creaciones hechas a tu medida.</p><a className="button dark" href={whatsapp("Hola Ángela, quiero conocer las novedades de la marca.")} target="_blank" rel="noreferrer">Quiero enterarme primero <span>↗</span></a></section>
    </main>
    <footer><div><div className="brand">Ángela España</div><p className="kicker">Cancún · México</p></div><div className="footerMeta">Showroom con cita previa<br />Envíos disponibles a todo México<br />© 2026 Ángela España</div></footer>
    <a className="waFloat" href={whatsapp()} target="_blank" rel="noreferrer" aria-label="Consultar prendas por WhatsApp"><i /><span>WhatsApp</span></a>
  </>;
}
