const gradient = require("gradient-string");
const fs = require("fs");
const chalk = require("chalk");
const inquirer = require("inquirer");
const { pause } = require("./helpers/utils");
const data = fs.readFileSync("./text.txt", "utf-8");

console.clear();
console.log("\n" + gradient("#B2FEFA", "#0ED2F7")(data));
console.log();

const SUBSTATS_VALUES = {
  HP: 299,
  ATK: 19,
  DEF: 23,
  HP_PERCENTAGE: 5.8,
  ATK_PERCENTAGE: 5.8,
  DEF_PERCENTAGE: 7.3,
  ELEMENTAL_MAESTERY: 23,
  ENERGY_RECHARGE: 6.5,
  CRIT_RATE: 3.9,
  CRIT_DMG: 7.8,
};

let SUBSTATS_LIST = {
  DEFENSE_PLANA: {
    name: "DEFENSA PLANA",
    value: 1,
  },
  DEFENSE_PERCENTAGE: {
    name: "DEFENSA PORCENTUAL",
    value: 2,
  },
  HP_PLANA: {
    name: "VIDA PLANA",
    value: 3,
  },
  HP_PERCENTAGE: {
    name: "VIDA PORCENTUAL",
    value: 4,
  },
  ATK_PLANO: {
    name: "ATAQUE PLANO",
    value: 5,
  },
  ATK_PERCENTAGE: {
    name: "ATAQUE PORCENTAUAL",
    value: 6,
  },
  RECHARGE: {
    name: "RECARGA",
    value: 7,
  },
  ELEMENTAL_MAESTERY: {
    name: "MAESTRIA ELEMENTAL",
    value: 8,
  },
  CRIT_RATE: {
    name: "PROBABILIDAD DE CRITICO",
    value: 9,
  },
  CRIT_DMG: {
    name: "DAÑO CRITICO",
    value: 10,
  },
};

async function main() {
  const op = await inquirer.prompt([
    {
      loop: true,
      type: "list",
      name: "option",
      message: "Que deseas hacer?\t",
      choices: [
        {
          name: "[1] Calcular probabilidad de artefactos\t",
          value: 1,
        },
        {
          name: "[2] Ver porcentajes de calculos\t",
          value: 2,
        },
        {
          name: "[3] Salir\t\n",
          value: 3,
        },
      ],
    },
  ]);
  console.clear();

  for (const substat of Object.values(SUBSTATS_LIST)) {
    console.log(`[${substat.value}] ${substat.name}`);
  }
  console.log();
  switch (op.option) {
    case 1: {
      const substats = [];
      let THIRD_SUBSTAT_VALUE = null;

      for (let index = 0; index < 3; index++) {
        const res = await inquirer.prompt([
          {
            name: "substat",
            message: `Escribe la substat nro.${index + 1}:`,
          },
        ]);
        substats.push(res.substat);
        if (index == 2) {
          const res = await inquirer.prompt([
            {
              name: "value",
              message: chalk.greenBright(
                `Escribe el valor de la substat nro.${index + 1}:`
              ),
            },
          ]);
          THIRD_SUBSTAT_VALUE = res.value;
        }
      }

      substats.forEach((value) => {
        const substatForDelete = Object.entries(SUBSTATS_LIST).find(
          ([SUBSTAT_KEY, subs]) => {
            console.log(SUBSTAT_KEY)
            return subs.value === value;
          }
        );

        console.log(substatForDelete);
        //delete SUBSTATS_LIST[substatForDelete.name];
      });

      //  console.log(SUBSTATS_LIST)
      break;
    }
  }
  await pause();
}

main();
