import { controls } from '../../constants/controls';


const {
  PlayerOneAttack,
  PlayerOneBlock,
  PlayerTwoAttack,
  PlayerTwoBlock,
  PlayerOneCriticalHitCombination,
  PlayerTwoCriticalHitCombination,
} = controls;


function attack(attacker, defender) {

  return attacker.isBlocked ? null : defender.health2(getDamage(attacker, defender))

}

function critAttack(attacker, defender) {

  return attacker.isBlocked ? null : defender.health2(2 * attacker.attack)
}

function firstPlayerCriticalKeyArray(arr, key) {
  if (arr.length <= 3 && PlayerOneCriticalHitCombination.includes(key)) {
    arr.push(key)
  }
  setTimeout(() => arr.length = 0, 10000)
  return arr.length
}

function secondPlayerCriticalKeyArray(arr, key) {
  if (arr.length <= 3 && PlayerTwoCriticalHitCombination.includes(key)) {
    arr.push(key)
  }
  setTimeout(() => arr.length = 0, 10000)
  return arr.length
}

function createListener(one, second) {
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);

  function onKeyDown(evt) {
    switch (evt.code) {
      case PlayerOneAttack:
        attack(one, second)


        console.log(second.health);


        break;
      case PlayerTwoAttack:

        attack(second, one)

        console.log(one.health);
        break;
      case PlayerOneBlock:
        one.isBlocked = true;
        break;
      case PlayerTwoBlock:
        second.isBlocked = true;
        break;

      default: break;
    }

    let crit1 = firstPlayerCriticalKeyArray(one.arrKey, evt.code)
    if (crit1 === 3) {

      critAttack(one, second)

      console.log(second.health);
    }

    let crit2 = secondPlayerCriticalKeyArray(second.arrKey, evt.code)
    if (crit2 === 3) {

      critAttack(second, one)

      console.log(one.health);
    }

  };


  function onKeyUp(evt) {
    switch (evt.code) {

      case PlayerOneBlock:
        one.isBlocked = false;
        console.log(evt.code, 'keyup');
        break;
      case PlayerTwoBlock:
        second.isBlocked = false;
        console.log(evt.code, 'keyup');
        break;

      default: break;
    }
  }
}



export async function fight(firstFighter, secondFighter) {

  const firstPlayer = {
    isBlocked: false,
    ...firstFighter,
    arrKey: [],

    health2(value) {
      return this.health = this.health - value;
    }

  };
  const secondPlayer = {
    isBlocked: false,
    ...secondFighter,
    arrKey: [],

    health2(value) {
      return this.health = this.health - value;
    }

  };

  createListener(firstPlayer, secondPlayer);


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
  return fighter.isBlocked ? fighter.defense * dodgeChance : 0;
}
