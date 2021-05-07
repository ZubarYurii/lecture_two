import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
  });
}

export function getDamage(attacker, defender) {
  
  const damage = getHitPower(attacker) - getBlockPower(defender);
  return damage > 0 ? damage : 0;
}

export function getHitPower(fighter) {
  
  const criticalHitChance = 1 + Math.random();
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  
  const dodgeChance = 1 + Math.random();
  return fighter.defense * dodgeChance
}
