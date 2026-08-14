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
        <div className="priceIntro"><p className="kicker">Liquidación de archivo / 2026</p><h2>Una ocasión<br />excepcional.</h2></div>
        <div className="priceCard" aria-label="Piezas con precios desde 150 pesos mexicanos"><span>Piezas seleccionadas</span><div><small>Desde</small><strong>$150</strong><b>MXN</b></div><p>El valor de una pieza no cambia.<br />La oportunidad de encontrarla, sí.</p></div>
        <div className="priceAside"><p>Piezas seleccionadas se despiden del archivo para abrir espacio a la próxima etapa de Ángela España.</p><a className="button inkButton" href={whatsapp()} target="_blank" rel="noreferrer">Ver selección disponible <span>↗</span></a></div>
      </section>
      <section className="selection" aria-label="Universo visual de Ángela España">
        <div className="selectionHead"><p className="kicker">Piezas con historia</p><h2>Una selección que<br />seguirá creciendo.</h2><div><p>Muy pronto sumaremos más piezas. Por ahora, explora el universo de la marca y consulta lo disponible con Ángela.</p><span>Desliza para explorar →</span></div></div>
        <div className="lookbook">
          {[{src:"colecciones.jpg",label:"Siluetas con carácter"},{src:"galeria2.jpg",label:"Detalles con intención"},{src:"marca2.jpg",label:"Diseño que permanece"},{src:"drops.jpg",label:"Piezas para recordar"},{src:"marca.jpg",label:"Universo Ángela España"}].map((look,index)=><figure className="lookCard" key={look.src}><Image src={image(look.src)} alt={look.label} fill sizes="(max-width: 760px) 76vw, 28vw" /><figcaption>{String(index+1).padStart(2,"0")} / {look.label}</figcaption></figure>)}
          <div className="moreCard"><span>Próxima actualización</span><strong>Más piezas<br />muy pronto.</strong><a href={whatsapp()} target="_blank" rel="noreferrer">Preguntar por disponibilidad ↗</a></div>
        </div>
        <p className="disclaimer">Las imágenes presentan el universo de la marca. La disponibilidad se confirma directamente por WhatsApp.</p>
      </section>
      <section className="concierge" id="como-comprar">
        <div className="conciergeVisual"><Image src={image("acento.jpg")} alt="Diseño blanco del universo Ángela España" fill sizes="(max-width: 900px) 100vw, 48vw" /><div className="verticalCaption">Showroom · Cancún · Con cita previa</div></div>
        <div className="conciergeCopy"><p className="kicker lightKicker">Atención personal</p><h2>Tu próxima pieza,<br />elegida contigo.</h2><p className="conciergeLead">Escríbele directamente a Ángela. Cuéntale qué buscas y recibe una selección pensada para ti.</p><ol><li><span>01</span><div><b>Cuéntanos qué buscas</b><p>Talla, estilo u ocasión.</p></div></li><li><span>02</span><div><b>Recibe opciones disponibles</b><p>Una selección personal enviada por WhatsApp.</p></div></li><li><span>03</span><div><b>Recíbela como prefieras</b><p>Showroom en Cancún o envío dentro de México.</p></div></li></ol><a className="conciergeButton" href={whatsapp()} target="_blank" rel="noreferrer"><span className="waMark">WA</span><span><small>WhatsApp de Ángela</small>Ver piezas disponibles</span><i>↗</i></a></div>
      </section>
      <section className="future" id="nueva-casa">
        <div className="futureTop"><p className="kicker">La próxima etapa de Ángela España</p><div className="status"><i /> En construcción</div></div><div className="futureLabel">PÁGINA OFICIAL</div><h2>Una nueva casa digital está tomando forma.</h2><div className="comingSoon">PRÓXIMAMENTE</div><div className="futureGrid"><p>Un espacio completamente nuevo para conocer colecciones, diseños especiales y creaciones hechas a tu medida.</p><a className="futureCta" href={whatsapp("Hola Ángela, quiero conocer las novedades de la próxima etapa de la marca.")} target="_blank" rel="noreferrer">Quiero enterarme primero <span>↗</span></a></div><div className="effectCredit">Proyecto digital de Efecto42 · Cancún</div>
      </section>
    </main>
    <footer><div><a className="brand" href="#inicio">Ángela España</a><p>Cancún · México</p></div><div className="footerCenter">Una experiencia digital por <strong>Efecto42</strong></div><div className="footerMeta">Showroom con cita previa<br />Envíos disponibles a todo México<br />© 2026 Ángela España</div></footer>
    <a className="waDock" href={whatsapp()} target="_blank" rel="noreferrer" aria-label="Hablar con Ángela por WhatsApp"><span className="waPulse"><i /></span><span><small>Ángela responde</small>Ver piezas disponibles</span><b>↗</b></a>
  </>;
}
