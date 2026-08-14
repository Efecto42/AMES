import Image from "next/image";

const PHONE = "529981117084";
const MESSAGE = "Hola Ángela, vi la selección de archivo y quiero conocer las prendas disponibles.";
const whatsapp = (message = MESSAGE) => `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
const image = (name: string) => `https://raw.githubusercontent.com/Efecto42/AMES/main/public/${name}`;

export default function Home() {
  return <>
    <div className="grain" aria-hidden="true" />
    <header>
      <div className="topline"><span>Acceso especial al archivo</span><b>Piezas desde $150 MXN</b><span>Hasta agotar existencias</span></div>
      <nav className="nav" aria-label="Navegación principal">
        <a className="brand" href="#inicio">Ángela España</a>
        <div className="navLinks"><a href="#archivo">Archivo</a><a href="#como-comprar">Cómo comprar</a><a href="#nueva-casa">Nueva etapa</a></div>
        <a className="navCta" href={whatsapp()} target="_blank" rel="noreferrer">Hablar con Ángela <span>↗</span></a>
      </nav>
    </header>
    <main>
      <section className="hero" id="inicio">
        <div className="heroCopy"><p className="eyebrow">Edición de transición · Cancún</p><h1>El archivo<br />se abre por<br /><em>última vez.</em></h1><div className="heroFoot"><p>Una selección excepcional de piezas Ángela España cambia de manos antes de nuestra próxima etapa.</p><a className="textLink" href="#archivo">Descubrir la selección <span>↓</span></a></div></div>
        <div className="heroVisual"><Image src={image("hero.jpg")} alt="Diseño blanco de Ángela España en Cancún" fill priority sizes="(max-width: 900px) 100vw, 52vw" /><div className="heroStamp"><small>A partir de</small><strong>$150</strong><span>MXN</span></div><div className="imageNote">Archivo visual · Ángela España</div></div>
      </section>
      <div className="marquee" aria-hidden="true"><div>{[0,1].map(n => <span key={n}>Archivo privado　✦　Precios especiales　✦　Showroom en Cancún　✦　Envíos a todo México　✦　</span>)}</div></div>
      <section className="priceStory" id="archivo">
        <div className="priceIntro"><p className="kicker">Liquidación de archivo / 2026</p><p>El precio cambia.<br /><strong>La firma permanece.</strong></p></div>
        <div className="priceMonument" aria-label="Precios desde 150 pesos mexicanos"><span>DESDE</span><strong>150</strong><small>MXN</small></div>
        <div className="priceAside"><p>No es una colección producida para descuento. Son piezas seleccionadas que se despiden del archivo para hacer espacio a lo que sigue.</p><a className="button inkButton" href={whatsapp()} target="_blank" rel="noreferrer">Solicitar selección disponible <span>↗</span></a></div>
      </section>
      <section className="selection" aria-label="Universo visual de Ángela España">
        <div className="selectionHead"><p className="kicker">Piezas con historia</p><h2>No elegimos por tendencia.<br /><em>Elegimos por conexión.</em></h2><p>Cuéntanos tu talla, estilo u ocasión. Ángela te compartirá personalmente las opciones que estén disponibles.</p></div>
        <div className="lookbook"><figure className="lookTall"><Image src={image("colecciones.jpg")} alt="Universo de diseño Ángela España" fill sizes="(max-width: 760px) 100vw, 46vw" /><figcaption>01 / Siluetas con carácter</figcaption></figure><div className="lookColumn"><figure className="lookWide"><Image src={image("galeria2.jpg")} alt="Detalle floral del universo Ángela España" fill sizes="(max-width: 760px) 100vw, 42vw" /><figcaption>02 / Detalles con intención</figcaption></figure><div className="lookQuote"><span>ÁE</span><blockquote>“Una pieza especial no se usa una vez. Se vuelve parte de tu historia.”</blockquote></div></div></div>
        <p className="disclaimer">Las imágenes presentan el universo de la marca. La disponibilidad se confirma directamente por WhatsApp.</p>
      </section>
      <section className="concierge" id="como-comprar">
        <div className="conciergeVisual"><Image src={image("acento.jpg")} alt="Diseño blanco del universo Ángela España" fill sizes="(max-width: 900px) 100vw, 48vw" /><div className="verticalCaption">Showroom · Cancún · Con cita previa</div></div>
        <div className="conciergeCopy"><p className="kicker lightKicker">Concierge de archivo</p><h2>No necesitas buscar entre todo.<br /><em>Te ayudamos a encontrar la tuya.</em></h2><p className="conciergeLead">La atención ocurre directamente por WhatsApp con Ángela. Una conversación breve, una selección más personal.</p><ol><li><span>01</span><div><b>Cuéntanos qué buscas</b><p>Talla, estilo, ocasión o simplemente lo que te gustaría sentir.</p></div></li><li><span>02</span><div><b>Recibe una selección</b><p>Te mostramos las piezas disponibles que mejor conecten contigo.</p></div></li><li><span>03</span><div><b>Elige cómo recibirla</b><p>Visita al showroom en Cancún o envío dentro de México.</p></div></li></ol><a className="conciergeButton" href={whatsapp()} target="_blank" rel="noreferrer"><span className="waMark">WA</span><span><small>Atención personal por WhatsApp</small>Quiero ver las piezas disponibles</span><i>↗</i></a></div>
      </section>
      <section className="future" id="nueva-casa">
        <div className="futureGlow" aria-hidden="true" /><div className="futureTop"><p className="kicker">La próxima casa digital</p><div className="status"><i /> En construcción</div></div><h2>Mientras el archivo encuentra nuevos hogares, estamos construyendo <em>el siguiente capítulo.</em></h2><div className="futureGrid"><p>Una nueva experiencia para descubrir el universo de Ángela España: diseños con carácter, piezas especiales y creaciones hechas a tu medida.</p><div className="progress"><div><span>Archivo</span><b>Disponible ahora</b></div><div><span>Nueva experiencia</span><b>Próximamente</b></div><i /></div></div><a className="futureCta" href={whatsapp("Hola Ángela, quiero conocer las novedades de la próxima etapa de la marca.")} target="_blank" rel="noreferrer">Quiero conocer lo que viene <span>↗</span></a><div className="futureWord" aria-hidden="true">PRÓXIMAMENTE</div>
      </section>
    </main>
    <footer><div><a className="brand" href="#inicio">Ángela España</a><p>Cancún · México</p></div><div className="footerCenter">Una experiencia digital por <strong>Efecto42</strong></div><div className="footerMeta">Showroom con cita previa<br />Envíos disponibles a todo México<br />© 2026 Ángela España</div></footer>
    <a className="waDock" href={whatsapp()} target="_blank" rel="noreferrer" aria-label="Hablar con Ángela por WhatsApp"><span className="waPulse"><i /></span><span><small>Ángela responde</small>Ver piezas disponibles</span><b>↗</b></a>
  </>;
}
