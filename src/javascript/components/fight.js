import { controls } from '../../constants/controls';


const {
  PlayerOneAttack,
  PlayerOneBlock,
  PlayerTwoAttack,
  PlayerTwoBlock,
  PlayerOneCriticalHitCombination,
  PlayerTwoCriticalHitCombination,
} = controls;




export async function fight(firstFighter, secondFighter) {

  return new Promise((resolve) => {

    const firstPlayer = {
      isBlocked: false,
      ...firstFighter,
      arrKey: [],
      healthIndicator: 100,

      changedHealthIndicator(value) {
        return this.healthIndicator = this.healthIndicator - value;
      }

    };
    const secondPlayer = {
      isBlocked: false,
      ...secondFighter,
      arrKey: [],
      healthIndicator: 100,

      changedHealthIndicator(value) {
        return this.healthIndicator = this.healthIndicator - value;
      }

    };

    function createListener() {
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('keyup', onKeyUp);
    }

    function winner(first, second) {
      if (second.healthIndicator <= 0) {
        document.removeEventListener('keydown', onKeyDown);
        document.removeEventListener('keyup', onKeyUp);
        resolve(first)
      }


    }

    function onKeyDown(evt) {
      switch (evt.code) {
        case PlayerOneAttack:

          attack(firstPlayer, secondPlayer)
          changeHealthStatus('right', secondPlayer)
          winner(firstPlayer, secondPlayer)

          break;

        case PlayerTwoAttack:

          attack(secondPlayer, firstPlayer)
          changeHealthStatus('left', firstPlayer)
          winner(secondPlayer, firstPlayer)

          break;

        case PlayerOneBlock:
          firstPlayer.isBlocked = true;
          break;

        case PlayerTwoBlock:
          secondPlayer.isBlocked = true;
          break;

        default: break;
      }

      let crit1 = firstPlayerCriticalKeyArray(firstPlayer.arrKey, evt.code)
      if (crit1 === 3) {

        critAttack(firstPlayer, secondPlayer)
        changeHealthStatus('right', secondPlayer)
      }

      let crit2 = secondPlayerCriticalKeyArray(secondPlayer.arrKey, evt.code)
      if (crit2 === 3) {

        critAttack(secondPlayer, firstPlayer)
        changeHealthStatus('left', firstPlayer)
      }

    };

    function onKeyUp(evt) {
      switch (evt.code) {

        case PlayerOneBlock:
          firstPlayer.isBlocked = false;
          break;
        case PlayerTwoBlock:
          secondPlayer.isBlocked = false;
          break;

        default: break;
      }
    }

    createListener(firstPlayer, secondPlayer);

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


function attack(attacker, defender) {

  let damage = attacker.isBlocked ? null : getDamage(attacker, defender);

  let damagePercent = damage * 100 / defender.health

  return defender.changedHealthIndicator(damagePercent)

}

function changeHealthStatus(position, defender) {

  const healthInd = document.querySelector(`#${position}-fighter-indicator`);

  defender.healthIndicator > 0 ? healthInd.style.width = `${defender.healthIndicator}%` : healthInd.style.width = 0;
}

function critAttack(attacker, defender) {

  let damage = attacker.isBlocked ? null : (getDamage(attacker, defender) * 2);

  let damagePercent = damage * 100 / defender.health

  return defender.changedHealthIndicator(damagePercent)
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
