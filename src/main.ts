import { allPLanets } from "./Planets";

async function betoltes() {
  let eredmeny = await fetch('planets.json');
  if (!eredmeny.ok) {
    throw new Error ("Hiba történt a betőltéskor");
  }
  return await eredmeny.json() as allPLanets;
}

async function OsszesBolgyo() {
  let tartalom = await betoltes();
  const lista = document.getElementById('lista');
  const abc = Array.from(tartalom.planets).sort((a,b) => {
    return a.name.localeCompare(b.name);
  });
  for (const l of abc){
    const li1 = document.createElement("li");
    const li2 = document.createElement("li");
    const li3 = document.createElement("li");
    const li4 = document.createElement("li");
    const celltext1 = document.createTextNode(l.name);
    const celltext2 = document.createTextNode(l.area.toString());
    const celltext3 = document.createTextNode(l.dwarf.toString());
    li1.appendChild(celltext1);
    li2.appendChild(celltext2);
    li3.appendChild(celltext3);
    lista?.appendChild(li1);
    lista?.appendChild(li2);
    lista?.appendChild(li3);
    lista?.appendChild(li4);
  }
}

async function Atmerok() {
  let tartalom = await betoltes();
  const p = document.getElementById("atmerok");
  let valtozo = "";
  const abc = Array.from(tartalom.planets).sort((a,b) => {
    return a.name.localeCompare(b.name);
  });
  let atmerok :number[] = [];
  //2 * sqrt(terület / (4 * pi))
  for (const t of abc) {
    let atmero = 2 * Math.sqrt(t.area / (4 * Math.PI));
    atmerok.push(atmero);
  }
  for (const t of atmerok) {
    valtozo = valtozo+t+";";
  }
  p!.innerText= valtozo;

}
async function KisebbNagyyobb() {
  let tartalom = await betoltes();
  const lista = document.getElementById('lista2');
  let kisebbszam = (document.getElementById("Kisebbszam") as HTMLInputElement).value;
  let nagyobbszam = (document.getElementById("Nagyobbszam") as HTMLInputElement).value;
  const koztes = tartalom.planets.filter(atmero => {
    return atmero.area > parseInt(kisebbszam) && atmero.area < parseInt(nagyobbszam)
  }).map(tartalom => ({
    name: tartalom.name, area:tartalom.area, dwarf:tartalom.dwarf
  }));
  for (const l of koztes){
    const li1 = document.createElement("li");
    const li2 = document.createElement("li");
    const li3 = document.createElement("li");
    const li4 = document.createElement("li");
    const celltext1 = document.createTextNode(l.name);
    const celltext2 = document.createTextNode(l.area.toString());
    const celltext3 = document.createTextNode(l.dwarf.toString());
    li1.appendChild(celltext1);
    li2.appendChild(celltext2);
    li3.appendChild(celltext3);
    lista?.appendChild(li1);
    lista?.appendChild(li2);
    lista?.appendChild(li3);
    lista?.appendChild(li4);
  }
}

async function Torpebolygo() {
  let tartalom = await betoltes();
  let pipa = (document.getElementById("torpebolygo") as HTMLInputElement).checked;
  const terulet = document.getElementById("Eredmeny");
  let szamlalo = 0;
  if ( pipa == true) {
    for ( const t of tartalom.planets){
      if (t.dwarf == true) {
        szamlalo = szamlalo+t.area
      }
    }
  }
  else {
    for ( const t of tartalom.planets){
      if (t.dwarf == false) {
        szamlalo = szamlalo+t.area
      }
    }
  }
  terulet?.append(szamlalo.toString())
}

function init() {
  document.getElementById("Elsofeladat")?.addEventListener("click", OsszesBolgyo);
  document.getElementById("Masodikfeladat")?.addEventListener("click", Atmerok);
  document.getElementById("Harmadikfeladat")!.addEventListener("click", KisebbNagyyobb);
  document.getElementById("Negyedikfeladat")?.addEventListener("click", Torpebolygo);
}

document.addEventListener('DOMContentLoaded', 
  init
)