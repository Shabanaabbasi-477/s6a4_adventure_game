#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Game Variables
let enemies = ["Skeleton", "Zombie", " Warrior", "Assassin"];
let maxEnemyHealth = 75;
let enemyAttackDamageToHero = 25;
// Player Variables
let heroHealth = 100;
let attackDamageToEnemy = 50;
let numHealthPotions = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50;
// While loop  condition
let gameRunning = true;
console.log(chalk.magentaBright('\t<<<<<<<<<<<<<<<<<000000000000000000000>>>>>>>>>>>>>>>>>>>>>>\t'));
console.log(chalk.magentaBright.bold("\t                  Welcome to the DeadZone!\t"));
console.log(chalk.magentaBright('\t<<<<<<<<<<<<<<<<<000000000000000000000>>>>>>>>>>>>>>>>>>>>>>\t'));
GAME: while (gameRunning) {
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1);
    let enemyIndex = Math.floor(Math.random() * enemies.length);
    let enemy = enemies[enemyIndex];
    console.log(chalk.redBright.bold.underline(`\n ${enemy} has appeared\n`));
    while (enemyHealth > 0) {
        console.log(`Your Health: ${heroHealth}`);
        console.log(`${enemy} health: ${enemyHealth}`);
        let options = await inquirer.prompt({
            name: "ans",
            type: "list",
            message: "What would you like to do?",
            choices: ["1. Attack", "2. Take Health Potion", "3. Run"],
        });
        if (options.ans === "1. Attack") {
            let attackDamageToEnemy = 50;
            let damageToEnemy = Math.floor(Math.random() * attackDamageToEnemy + 1);
            let damageToHero = Math.floor(Math.random() * enemyAttackDamageToHero + 1);
            enemyHealth -= damageToEnemy;
            heroHealth -= damageToHero;
            console.log(`You strike the ${enemy} for ${damageToEnemy} damage.`);
            console.log(`${enemy} strikes you for ${damageToHero} damage.`);
            if (heroHealth < 1) {
                console.log("You have taken too much damage, you are too weak to continue.");
                break;
            }
        }
        else if (options.ans === "2. Take Health Potion") {
            if (numHealthPotions > 0) {
                heroHealth += healthPotionHealAmount;
                numHealthPotions--;
                console.log(` You use health potion for ${healthPotionHealAmount}.`);
                console.log(` You now have ${heroHealth} health.`);
                console.log(` You have ${numHealthPotions} health potions left.`);
            }
            else {
                console.log(" You have no health potions left, Defeat enemies for a chance to get health potion");
            }
        }
        else if (options.ans === "3. Run") {
            console.log(`You run away from the ${enemy}`);
            continue GAME;
        }
    }
    if (heroHealth < 1) {
        console.log("You are out from battle, you are too weak.");
        break;
    }
    console.log(`${enemy} was defeated.`);
    console.log(` You have ${heroHealth} health. `);
    let randomNumber = Math.floor(Math.random() * 100 + 1);
    if (randomNumber < healthPotionDropChance) {
        numHealthPotions++;
        console.log(`enemy give you health potion.`);
        console.log(`your health potion is ${heroHealth}.`);
        console.log(`You now have ${numHealthPotions} health potion.`);
    }
    let userOptions = await inquirer.prompt({
        name: "ans",
        type: "list",
        message: "What would you like to do now?",
        choices: ["1. Continue", "2. Exit"],
    });
    if (userOptions.ans === "1. Continue") {
        console.log(" You continue on your adventure game");
    }
    else if (userOptions.ans === "2. Exit") {
        console.log("You exit successfully from  Deadzone");
        break;
    }
    console.log(" Thank you for playing adventure game");
}
