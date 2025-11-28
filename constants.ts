import { MineralCategory, MineralData } from './types';

export const MINERALS: MineralData = {
  [MineralCategory.POPULAR]: [
    { id: 'p1', name: "Cuarzo", file: "models/popular/cuarzo.glb", uses: "Joyería, electrónica", description: "El mineral más abundante de la corteza terrestre." },
    { id: 'p2', name: "Amatista", file: "models/popular/amatista.glb", uses: "Decoración, joyería", description: "Variedad violeta del cuarzo, muy apreciada." },
    { id: 'p3', name: "Pirita", file: "models/popular/pirita.glb", uses: "Obtención de azufre", description: "Conocida como el 'oro de los tontos'." },
    { id: 'p4', name: "Obsidiana", file: "models/popular/obsidiana.glb", uses: "Cirugía, artesanía", description: "Vidrio volcánico natural de color negro." },
    { id: 'p5', name: "Jade", file: "models/popular/jade.glb", uses: "Arte, joyería", description: "Piedra ornamental muy dura y tenaz." },
    { id: 'p6', name: "Turmalina", file: "models/popular/turmalina.glb", uses: "Instrumentos, joyería", description: "Mineral con propiedades piezoeléctricas." },
    { id: 'p7', name: "Calcita", file: "models/popular/calcita.glb", uses: "Cemento, óptica", description: "Carbonato de calcio muy común." },
    { id: 'p8', name: "Malaquita", file: "models/popular/malaquita.glb", uses: "Piedra ornamental", description: "Mineral de cobre con bandas verdes." },
  ],
  [MineralCategory.PHOSPHORESCENT]: [
    { id: 'f1', name: "Fluorita", file: "models/phosphorescent/fluorita.glb", uses: "Óptica, fundente", description: "Famosa por su fuerte fluorescencia." },
    { id: 'f2', name: "Willemita", file: "models/phosphorescent/willemita.glb", uses: "Mina de zinc", description: "Brilla intensamente verde bajo luz UV." },
    { id: 'f3', name: "Scheelita", file: "models/phosphorescent/scheelita.glb", uses: "Mena de wolframio", description: "Fluorescencia azul-blanca característica." },
    { id: 'f4', name: "Autunita", file: "models/phosphorescent/autunita.glb", uses: "Mena de uranio", description: "Amarillo-verdoso brillante y radiactivo." },
    { id: 'f5', name: "Calcita Fluo", file: "models/phosphorescent/calcita_fluor.glb", uses: "Coleccionismo", description: "Variedad que reacciona a luz UV." },
    { id: 'f6', name: "Esfalerita", file: "models/phosphorescent/esfalerita.glb", uses: "Mena de zinc", description: "Puede mostrar triboluminiscencia." },
    { id: 'f7', name: "Ópalo Hialita", file: "models/phosphorescent/opalo_hyalita.glb", uses: "Joyería rara", description: "Parece vidrio, brilla verde neón." },
    { id: 'f8', name: "Aragonito", file: "models/phosphorescent/aragonito.glb", uses: "Ornamental", description: "Forma cristalina del carbonato de calcio." },
  ]
};