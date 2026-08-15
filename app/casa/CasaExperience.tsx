"use client";
import Image from "next/image";
import { useState } from "react";
import s from "./casa.module.css";

const phone="529981117084";
const wa=(t:string)=>`https://wa.me/${phone}?text=${encodeURIComponent(t)}`;
const edits=[["/colecciones.jpg","Vestidos","Siluetas de autor"],["/galeria2.jpg","Piezas especiales","Detalles que permanecen"],["/marca2.jpg","Archivo","Creaciones con historia"],["/drops.jpg","Ediciones","Series limitadas"]];
const tones=[["Marfil","#e8dfd2"],["Vino","#642538"],["Noche","#171619"],["Azul humo","#65727c"]] as const;

export default function CasaExperience(){
 const [tone,setTone]=useState<(typeof tones)[number]>(tones[0]);
 return <main className={s.store}>
  <div className={s.preview}>Vista privada · Sitio oficial en construcción</div>
  <header className={s.header}><a className={s.logo} href="#top">Ángela España</a><nav><a href="#shop">Colecciones</a><a href="#atelier">Atelier</a><a href="#marca">La diseñadora</a></nav><div><button>Buscar</button><button>Bolsa · 0</button></div></header>
  <section className={s.hero} id="top"><div className={s.heroMedia}><Image src="/hero.jpg" alt="Diseño Ángela España" fill priority sizes="56vw"/></div><div className={s.heroCopy}><span>Colección · 2026</span><h1>Diseño que<br/>empieza en ti.</h1><p>Piezas listas para descubrir y creaciones concebidas a tu medida en el Atelier de Ángela España.</p><div><a href="#shop">Ver colección</a><a href="#atelier">Crear a la medida</a></div></div></section>
  <section className={s.shop} id="shop"><div className={s.shopHead}><div><span>Selección actual</span><h2>Descubre la casa.</h2></div><p>El catálogo real se incorporará conforme fotografiemos y documentemos cada prenda.</p><a href={wa("Hola Ángela, quiero conocer las piezas disponibles.")} target="_blank">Consultar disponibles ↗</a></div><div className={s.products}>{edits.map((shelf,i)=><article key={shelf[0]}><div className={s.productImage}><Image src={shelf[0]} alt={shelf[2]} fill sizes="25vw"/>{i===0&&<b>Nueva selección</b>}</div><small>{shelf[1]}</small><h3>{shelf[2]}</h3><button>Explorar ＋</button></article>)}</div></section>
  <section className={s.features}>
   <article className={s.daily}><div className={s.curtains}/><div className={s.moduleTop}><span>Prenda del día</span><small>Una pieza · Un día</small></div><div className={s.dailyImage}><Image src="/marca2.jpg" alt="Prenda del día" fill sizes="38vw"/></div><div className={s.moduleCopy}><div><span>Edición diaria</span><h2>Hoy en escena.</h2></div><p>Una pieza elegida por Ángela puede ser tu obsequio en compras participantes desde $950 MXN.<small>Sujeto a disponibilidad y condiciones.</small></p><a href={wa("Hola Ángela, quiero conocer la prenda del día.")} target="_blank">Ver hoy ↗</a></div></article>
   <article className={s.atelier} id="atelier"><div className={s.moduleTop}><span>Atelier digital</span><small>Servicio personalizado</small></div><div className={s.dressArea} style={{"--tone":tone[1]} as React.CSSProperties}><div className={s.dress}/><span>{tone[0]}</span></div><div className={s.atelierCopy}><h2>Tu vestido,<br/>antes de existir.</h2><p>Explora colores y comienza una creación a la medida acompañada por Ángela.</p><div className={s.tones}>{tones.map(t=><button key={t[0]} onClick={()=>setTone(t)} className={tone[0]===t[0]?s.selected:""}><i style={{background:t[1]}}/><span>{t[0]}</span></button>)}</div><a href={wa(`Hola Ángela, quiero comenzar un vestido a la medida en ${tone[0]}.`)} target="_blank">Iniciar mi diseño ↗</a></div></article>
  </section>
  <section className={s.brand} id="marca"><div><Image src="/marca.jpg" alt="Archivo Ángela España" fill sizes="42vw"/></div><article><span>La diseñadora</span><h2>Una trayectoria<br/>con espacio propio.</h2><p>La historia completa de Ángela vivirá en su archivo: colecciones, técnicas, momentos y relatos documentados sin reducir su carrera a un párrafo de portada.</p><a href={wa("Hola Ángela, quiero conocer más sobre tu trayectoria.")} target="_blank">Conocer su historia ↗</a></article></section>
  <section className={s.services}><div><b>Atención personal</b><p>Ángela te acompaña por WhatsApp.</p></div><div><b>Showroom en Cancún</b><p>Visitas coordinadas previamente.</p></div><div><b>Envíos en México</b><p>Condiciones confirmadas al comprar.</p></div></section>
  <footer className={s.footer}><div className={s.logo}>Ángela España</div><p>Colecciones · Atelier · Historia</p><p>Una experiencia digital de Efecto42<br/>© 2026 Ángela España</p></footer>
 </main>
}
