import path from "path";
import fs from "fs";
import fetch, { blobFrom } from "node-fetch";

const imagePath = "scripts/team";

const GroupEnum = {
  UpravaSkole: { name: "Uprava škole", id: 1 },
  Saradnici: { name: "Saradnici", id: 2 },
  AktivBosanskogJezikaIKnjizevnosti: {
    name: "Aktiv Bosanskog jezika i književnosti",
    id: 3,
  },
  AktivMatematikeFizikeInformatike: {
    name: "Aktiv matematike, fizike i informatike",
    id: 4,
  },
  AktivHemijeIBiologije: { name: "Aktiv hemije i biologije", id: 5 },
  AktivStranihJezika: { name: "Aktiv stranih jezika", id: 6 },
  AktivHistorijeIGeografije: {
    name: "Aktiv historije i geografije",
    id: 7,
  },
  AktivDrustveneGrupePredmeta: {
    name: "Aktiv društvene grupe predmeta",
    id: 8,
  },
  AktivTjelesnogIZdravstvenogOdgoja: {
    name: "Aktiv tjelesnog i zdravstvenog odgoja",
    id: 9,
  },
  AktivUmjetnosti: { name: "Aktiv umjetnosti", id: 10 },
  AktivMedicinskeGrupePredmeta: {
    name: "Aktiv medicinske grupe predmeta",
    id: 11,
  },
  NenastavnoOsoblje: { name: "Nenastavno osoblje", id: 12 },
};

const employee_groups = [
  {
    group: { ...GroupEnum.UpravaSkole },
    employees: [
      {
        name: "Nedžad Milanović",
        title: "Direktor",
        picture: path.join(imagePath, "nedzad_milanovic.jpeg"),
      },
    ],
  },
  {
    group: { ...GroupEnum.Saradnici },
    employees: [
      {
        name: "Amna Haljeta",
        title: "Pedagog",
        picture: path.join(imagePath, "amna_haljeta.jpeg"),
      },
      {
        name: "Amra Jusufbašić",
        title: "Sekretar",
        picture: path.join(imagePath, "amra_jusufbasic.jpeg"),
      },
      {
        name: "Emina Hozić",
        title: "Administrativni radnik",
        picture: path.join(imagePath, "emina_hozic.jpeg"),
      },
      {
        name: "Mirza Bušatlić",
        title: "Bibliotekar",
        picture: path.join(imagePath, "mirza_busatlic.jpeg"),
      },
    ],
  },
  {
    group: { ...GroupEnum.AktivBosanskogJezikaIKnjizevnosti },
    employees: [
      {
        name: "Senada Milanović",
        title: "Profesorica bosanskog jezika i književnosti",
        picture: path.join(imagePath, "senada_milanovic.jpeg"),
      },
      {
        name: "Viktor Dundović",
        title: "Profesor bosanskog jezika i književnosti",
        picture: path.join(imagePath, "viktor_dundovic.jpeg"),
      },
      {
        name: "Ajla Sušić",
        title: "Profesorica bosanskog jezika i književnosti",
        picture: path.join(imagePath, "ajla_susic.jpeg"),
      },
      {
        name: "Belma Šabić",
        title: "Profesorica bosanskog jezika i književnosti",
        picture: path.join(imagePath, "belma_sabic.jpeg"),
      },
      {
        name: "Dalila Tekešić",
        title: "Profesorica bosanskog jezika i književnosti",
        picture: path.join(imagePath, "dalila_tekesic.jpeg"),
      },
    ],
  },
  {
    group: { ...GroupEnum.AktivMatematikeFizikeInformatike },
    employees: [
      {
        name: "Ermina Musić",
        title: "Profesorica matematike",
        picture: path.join(imagePath, "ermina_music.jpeg"),
      },
      {
        name: "Selmira Sarajlić",
        title: "Profesorica matematike",
        picture: path.join(imagePath, "selmira_sarajlic.jpeg"),
      },
      {
        name: "Fata Brzika",
        title: "Profesorica matematike",
        picture: path.join(imagePath, "fata_brzika.jpeg"),
      },
      {
        name: "Banina Bečić",
        title: "Profesorica fizike",
        picture: path.join(imagePath, "banina_becic.jpeg"),
      },
      {
        name: "Dženan Gazić",
        title: "Profesor fizike",
        picture: path.join(imagePath, "dzenan_gazic.jpeg"),
      },
      {
        name: "Amra Mirojević",
        title: "Profesorica informatike",
        picture: path.join(imagePath, "amra_mirojevic.jpeg"),
      },
    ],
  },
  {
    group: { ...GroupEnum.AktivHemijeIBiologije },
    employees: [
      {
        name: "Dina Tica",
        title: "Profesorica hemije",
        picture: path.join(imagePath, "dina_tica.jpeg"),
      },
      {
        name: "Amer Brčić",
        title: "Profesor hemije",
        picture: path.join(imagePath, "amer_brcic.jpeg"),
      },
      {
        name: "Irma Bušatlić",
        title: "Profesorica hemije",
        picture: path.join(imagePath, "irma_busatlic.jpeg"),
      },
      {
        name: "Orhana Burek",
        title: "Profesorica biologije",
        picture: path.join(imagePath, "orhana_burek.jpeg"),
      },
      {
        name: "Amer Ćemer",
        title: "Profesor biologije",
        picture: path.join(imagePath, "amer_cemer.jpeg"),
      },
      {
        name: "Dženana Karadža Vugdalić",
        title: "Profesorica biologije",
        picture: path.join(imagePath, "dzenana_karadza_vugdalic.jpeg"),
      },
    ],
  },
  {
    group: { ...GroupEnum.AktivStranihJezika },
    employees: [
      {
        name: "Emina Kurbegović",
        title: "Profesorica engleskog jezika",
        picture: path.join(imagePath, "emina_kurbegovic.jpeg"),
      },
      {
        name: "Dženana Velić",
        title: "Profesorica engleskog jezika",
        picture: path.join(imagePath, "dzenana_velic.jpeg"),
      },
      {
        name: "Džula Bušatlić",
        title: "Profesorica engleskog jezika",
        picture: path.join(imagePath, "dzula_busatlic.jpeg"),
      },
      {
        name: "Minela Ugarak",
        title: "Profesorica njemačkog jezika",
        picture: path.join(imagePath, "minela_ugarak.jpeg"),
      },
      {
        name: "Vanda Herceg",
        title: "Profesorica latinskog jezika",
        picture: path.join(imagePath, "vanda_herceg.jpeg"),
      },
    ],
  },
  {
    group: { ...GroupEnum.AktivHistorijeIGeografije },
    employees: [
      {
        name: "Mirsad Bušatlija",
        title: "Profesor historije",
        picture: path.join(imagePath, "mirsad_busatlija.jpeg"),
      },
      {
        name: "Selma Rustempašić",
        title: "Profesorica historije",
        picture: path.join(imagePath, "selma_rustempasic.jpeg"),
      },
      {
        name: "Mirsada Kulaš",
        title: "Profesorica historije",
        picture: path.join(imagePath, "mirsada_kulasic.jpeg"),
      },
      {
        name: "Orhana Kosterović",
        title: "Profesorica geografije",
        picture: path.join(imagePath, "orhana_kosterovic.jpeg"),
      },
      {
        name: "Lejla Alić",
        title: "Profesorica geografije",
        picture: path.join(imagePath, "lejla_alic.jpeg"),
      },
    ],
  },
  {
    group: { ...GroupEnum.AktivDrustveneGrupePredmeta },
    employees: [
      {
        name: "Alma Terzić",
        title: "Profesorica filozofije i sociologije",
        picture: path.join(imagePath, "alma_terzic.jpeg"),
      },
      {
        name: "Almira Šić",
        title: "Profesorica psihologije",
        picture: path.join(imagePath, "almira_sic.jpeg"),
      },
      {
        name: "Namir Haračić",
        title: "Profesor demokratije i ljudskih prava",
        picture: path.join(imagePath, "namir_haracic.jpeg"),
      },
      {
        name: "Amela Muharemović",
        title: "Profesorica vjeronauke",
        picture: path.join(imagePath, "amela_muharemovic.jpeg"),
      },
      {
        name: "Belma Dedić",
        title: "Profesorica vjeronauke",
        picture: path.join(imagePath, "belma_dedic.jpeg"),
      },
    ],
  },
  {
    group: { ...GroupEnum.AktivTjelesnogIZdravstvenogOdgoja },
    employees: [
      {
        name: "Samir Haljeta",
        title: "Profesor tjelesnog i zdravstvenog odgoja",
        picture: path.join(imagePath, "samir_haljeta.jpeg"),
      },
      {
        name: "Enaid Redžić",
        title: "Profesor tjelesnog i zdravstvenog odgoja",
        picture: path.join(imagePath, "enaid_redzic.jpeg"),
      },
      {
        name: "Suad Šahović",
        title: "Profesor tjelesnog i zdravstvenog odgoja",
        picture: path.join(imagePath, "suad_sahovic.jpeg"),
      },
    ],
  },
  {
    group: { ...GroupEnum.AktivUmjetnosti },
    employees: [
      {
        name: "Husein Šljivo",
        title: "Profesor likovne umjetnosti",
        picture: path.join(imagePath, "husein_sljivo.jpeg"),
      },
      {
        name: "Dino Haračić",
        title: "Profesor muzičke umjetnosti",
        picture: path.join(imagePath, "dino_haracic.jpeg"),
      },
    ],
  },
  {
    group: { ...GroupEnum.AktivMedicinskeGrupePredmeta },
    employees: [
      {
        name: "Hamira Sultanović Karadža",
        title: "Predavač praktične nastave",
        picture: path.join(imagePath, "hamira_sultanovic_karadza.jpeg"),
      },
      {
        name: "Alma Vekić Delić",
        title: "Predavač praktične nastave",
        picture: path.join(imagePath, "alma_veki_delic.jpeg"),
      },
      {
        name: "Emina Parić",
        title: "Predavač praktične nastave",
        picture: path.join(imagePath, "emina_paric.jpeg"),
      },
    ],
  },
  {
    group: { ...GroupEnum.NenastavnoOsoblje },
    employees: [
      {
        name: "Mehmed Merdžanić",
        title: "Kućni majstor",
        picture: path.join(imagePath, "mehmed_merdzanic.jpeg"),
      },
      {
        name: "Merima Gazić",
        title: "Higijeničarka",
        picture: path.join(imagePath, "merima_gazic.jpeg"),
      },
      {
        name: "Erika Halilović",
        title: "Higijeničarka",
        picture: path.join(imagePath, "erika_halilovic.jpeg"),
      },
      {
        name: "Enisa Katkić",
        title: "Higijeničarka",
        picture: path.join(imagePath, "enisa_katkic.jpeg"),
      },
      {
        name: "Hedija Alić",
        title: "Higijeničarka",
        picture: path.join(imagePath, "hedija_alic.jpeg"),
      },
    ],
  },
];

async function doFetch(route, options, isJson = true) {
  const res = await fetch(`${process.env.PUBLIC_GMNZ_API_URL}/api/${route}`, {
    ...options,
    headers: {
      ...(isJson ? { "Content-Type": "application/json" } : {}),
      Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(
      `${res.status}: ${res.statusText}. Error:\n${JSON.stringify(data, null, 2)}`,
    );
  }

  return res.json();
}

async function main() {
  if (!process.env.STRAPI_TOKEN) {
    throw new Error("Missing STRAPI_TOKEN");
  }

  if (!process.env.PUBLIC_GMNZ_API_URL) {
    throw new Error("Missing PUBLIC_GMNZ_API_URL");
  }

  let { data: employee_res } = await doFetch(
    "employee-groups?pagination[limit]=100",
    {
      method: "GET",
    },
  );

  if (employee_res.length === 0) {
    for (const group of Object.values(GroupEnum)) {
      const res = await doFetch("employee-groups", {
        method: "POST",
        body: JSON.stringify({
          data: {
            name: group.name,
          },
        }),
      });
      employee_res.push(res.data);
    }
  }

  for (const employee_group of employee_groups) {
    for (const employee of employee_group.employees) {
      const data = await doFetch("employees", {
        method: "POST",
        body: JSON.stringify({
          data: {
            name: employee.name,
            title: employee.title,
            group: `${
              employee_res.find((g) => g.name === employee_group.group.name).id
            }`,
          },
        }),
      });

      if (fs.existsSync(employee.picture)) {
        const file = await blobFrom(employee.picture, "image/jpeg");
        const form = new FormData();

        form.append("files", file, employee.name.replace(/\s/g, "_") + ".jpeg");
        form.append("refId", data.data.id);
        form.append("ref", "api::employee.employee");
        form.append("field", "picture");

        await doFetch(
          "upload",
          {
            method: "POST",
            body: form,
          },
          false,
        );
      }
    }
  }
}

main();
