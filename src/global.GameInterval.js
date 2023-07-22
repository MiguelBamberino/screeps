class GameInterval {
  constructor() {
    // Initialize the class without a tick property
  }

  is3rdTick() {
    // Check if the current game tick is divisible by 3
    return Game.time % 3 === 0;
  }

  is5thTick() {
    // Check if the current game tick is divisible by 5
    return Game.time % 5 === 0;
  }

  is10thTick() {
    // Check if the current game tick is divisible by 10
    return Game.time % 10 === 0;
  }

  is20thTick() {
    // Check if the current game tick is divisible by 20
    return Game.time % 20 === 0;
  }

  is50thTick() {
    // Check if the current game tick is divisible by 50
    return Game.time % 50 === 0;
  }

  is100thTick() {
    // Check if the current game tick is divisible by 100
    return Game.time % 100 === 0;
  }

  is500thTick() {
    // Check if the current game tick is divisible by 500
    return Game.time % 500 === 0;
  }

  is1000thTick() {
    // Check if the current game tick is divisible by 1000
    return Game.time % 1000 === 0;
  }

  isXthTick(n) {
    // Check if the current game tick is divisible by n
    return Game.time % n === 0;
  }
}

module.exports = GameInterval;