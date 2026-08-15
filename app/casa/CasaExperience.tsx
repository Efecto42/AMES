"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./casa.module.css";

const PHONE = "529981117084";
const whatsapp = (message: string) =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

const colors = [
  { name: "Marfil", value: "#e9e1d5" },
  { name: "Vino", value: "#652334" },
  { name: "Noche", value: "#181719" },
  { name: "Azul humo", value: "#64727d" },
];

const chapters = [
  { image: "/colecciones.jpg", name: "Colecciones", note: "Piezas listas para encontrarte" },
  { image: "/galeria2.jpg", name: "Atelier", note: "Diseñado y creado para ti" },
  { image: "/marca2.jpg", name: "Archivo", note: "Una carrera contada en prendas" },
];

export default function CasaExperience() {
  const [tone, setTone] = useState(colors[0]);

  return (
    <main className={styles.site}>
      <div className={styles.preview}>Vista privada · Nueva casa digital en construcción</div>
      <header className={styles.header}>
        <a className={styles.wordmark} href="#inicio">Ángela España</a>
        <nav aria-label="Navegación de la tienda">
          <a href="#colecciones">Colecciones</a>
          <a href="#atelier">A la medida</a>
          <a href="#historia">La diseñadora</a>
        </nav>
        <div className={styles.actions}><button type="button">Buscar</button><button type="button">Bolsa · 0</button></div>
      </header>

      <section className={styles.hero} id="inicio">
        <div className={styles.heroImage}><Image src="/hero.jpg" alt="Creación de Ángela España" fill priority sizes="58vw" /></div>
        <div className={styles.heroCopy}>
          <p className={styles.overline}>Diseño de autor · Cancún, México</p>
          <h1>Vestir también<br />es una forma<br />de <i>recordar.</i></h1>
          <p>Prendas con carácter, creadas para acompañar historias. Descubre las colecciones o comienza una pieza diseñada exclusivamente para ti.</p>
          <div className={styles.heroLinks}><a href="#colecciones">Explorar colecciones</a><a href="#atelier">Crear a mi medida</a></div>
        </div>
        <span className={styles.heroIndex}>Casa digital · 01</span>
      </section>

      <section className={styles.chapters} id="colecciones">
        <div className={styles.sectionHead}><p>Dos maneras de encontrar tu pieza</p><h2>Hecho por Ángela.<br />Elegido por ti.</h2></div>
        <div className={styles.chapterGrid}>
          {chapters.map((chapter, index) => <article key={chapter.name} className={styles.chapter}>
            <div><Image src={chapter.image} alt={chapter.name} fill sizes="33vw" /></div>
            <span>0{index + 1}</span><h3>{chapter.name}</h3><p>{chapter.note}</p><a href="#atelier">Entrar <b>↗</b></a>
          </article>)}
        </div>
      </section>

      <section className={styles.stage} aria-labelledby="prenda-dia">
        <div className={styles.curtainLeft} aria-hidden="true" /><div className={styles.curtainRight} aria-hidden="true" />
        <div className={styles.beam} aria-hidden="true" />
        <div className={styles.stageLabel}><span>Edición diaria</span><b>15 · 08 · 26</b></div>
        <div className={styles.stageProduct}>
          <p>Una sola pieza. Un solo día.</p>
          <div className={styles.pedestal}><div className={styles.productImage}><Image src="/marca2.jpg" alt="Presentación conceptual de la prenda del día" fill sizes="36vw" /></div></div>
          <div className={styles.productMeta}><div><small>Prenda del día</small><h2 id="prenda-dia">La protagonista</h2><p>El nombre, talla y disponibilidad se cargarán desde el inventario real.</p></div><div className={styles.gift}><span>Obsequio del día</span><strong>Incluida al comprar una prenda participante desde $950 MXN</strong><small>Sujeto a disponibilidad y condiciones de la promoción.</small></div></div>
        </div>
        <p className={styles.stageFoot}>El telón cambia cada día.</p>
      </section>

      <section className={styles.atelier} id="atelier">
        <div className={styles.atelierCopy}>
          <p className={styles.overline}>Atelier a la medida</p><h2>Antes de existir,<br />puedes imaginarla.</h2>
          <p>Una experiencia guiada para elegir silueta, ocasión, acabados y color. La visualización te ayuda a explorar; Ángela convierte la idea en una pieza real.</p>
          <div className={styles.swatches} aria-label="Visualizador de color">
            {colors.map(color => <button key={color.name} className={tone.name === color.name ? styles.activeSwatch : ""} onClick={() => setTone(color)} aria-label={`Ver en ${color.name}`}><i style={{ background: color.value }} /><span>{color.name}</span></button>)}
          </div>
          <a className={styles.atelierCta} href={whatsapp(`Hola Ángela, quiero comenzar un vestido a la medida en color ${tone.name}.`)} target="_blank" rel="noreferrer">Comenzar con Ángela <span>↗</span></a>
        </div>
        <div className={styles.dressRoom} style={{ "--dress-tone": tone.value } as React.CSSProperties}>
          <span className={styles.aiLabel}>Visualización de color · {tone.name}</span>
          <div className={styles.dressHalo} /><div className={styles.dress} aria-label={`Silueta conceptual en color ${tone.name}`}><i /><b /></div>
          <p>Representación conceptual. El diseño final, textiles y tonos se confirman personalmente en el Atelier.</p>
        </div>
      </section>

      <section className={styles.legacy} id="historia">
        <div className={styles.legacyImage}><Image src="/marca.jpg" alt="Archivo visual de Ángela España" fill sizes="45vw" /></div>
        <div className={styles.legacyCopy}><p className={styles.overline}>Historia · Oficio · Permanencia</p><h2>Una carrera completa,<br />contada puntada<br />por puntada.</h2><p>Este espacio reunirá la historia real de Ángela, sus años de oficio, colecciones, momentos y la calidad que distingue cada creación. El archivo se construirá con fechas, fotografías y relatos verificados.</p><a href={whatsapp("Hola Ángela, quiero conocer más sobre tus diseños y tu trayectoria.")} target="_blank" rel="noreferrer">Conocer a la diseñadora ↗</a></div>
      </section>

      <footer className={styles.footer}><div className={styles.wordmark}>Ángela España</div><p>Colecciones · Atelier · Historia<br />Cancún, México</p><p>Nueva casa digital<br />Un proyecto de Efecto42</p></footer>
    </main>
  );
}
