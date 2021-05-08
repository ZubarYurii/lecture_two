import { controls } from '../../constants/controls';


const {
  PlayerOneAttack,
  PlayerOneBlock,
  PlayerTwoAttack,
  PlayerTwoBlock,
  PlayerOneCriticalHitCombination,
  PlayerTwoCriticalHitCombination,
} = controls;


const firstFighter = {
  isBlocked: false,
};
const secondFighter = {
  isBlocked: false,
};


// document.addEventListener('keydown', onKeyDown);
// document.addEventListener('keyup', onKeyUp);

// function onKeyDown(evt) {
//   switch (evt.code) {
//     case PlayerOneAttack:
//       console.log(evt.code);
//       break;
//     case PlayerTwoAttack:
//       console.log(evt.code);
//       break;
//     case PlayerOneBlock:
//       firstFighter.isBlocked = true;
//       console.log(evt.code);
//       break;
//     case PlayerTwoBlock:
//       secondFighter.isBlocked = true;
//       console.log(evt.code);
//       break;
//     case PlayerOneCriticalHitCombination:
//       console.log(evt.code);
//       break;
//     case PlayerTwoCriticalHitCombination:
//       console.log(evt.code);
//       break;

//     default: break;
//  }
// };


// function onKeyUp(evt) {
//   switch (evt.code) {

//     case PlayerOneBlock:
//       firstFighter.isBlocked = false;
//       console.log(evt.code, 'keyup');
//       break;
//     case PlayerTwoBlock:
//       secondFighter.isBlocked = false;
//       console.log(evt.code, 'keyup');
//       break;

//     default: break;
//   }
// }

export async function fight(firstFighter, secondFighter) {
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);

  function onKeyDown(evt) {
    switch (evt.code) {
      case PlayerOneAttack:
        const damage1 = getDamage(firstFighter, secondFighter)
        console.log(damage1);
        break;
      case PlayerTwoAttack:
        const damage2 = getDamage(secondFighter, firstFighter)
        console.log(damage2);
        break;
      case PlayerOneBlock:
        firstFighter.isBlocked = true;
        break;
      case PlayerTwoBlock:
        secondFighter.isBlocked = true;
        break;
      case PlayerOneCriticalHitCombination:
        break;
      case PlayerTwoCriticalHitCombination:
        break;

      default: break;
    }
  };


  function onKeyUp(evt) {
    switch (evt.code) {

      case PlayerOneBlock:
        firstFighter.isBlocked = false;
        console.log(evt.code, 'keyup');
        break;
      case PlayerTwoBlock:
        secondFighter.isBlocked = false;
        console.log(evt.code, 'keyup');
        break;

      default: break;
    }
  }
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
