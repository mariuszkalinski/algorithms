const g = 9.81;
const radiousFromDegrees = (deg) => deg * Math.PI / 180;

function recurencyBulletPosition(angle, initialVelocity) {
  let trajectory = [];

  const angleCos = Math.cos(radiousFromDegrees(angle));
  const angleSin = Math.sin(radiousFromDegrees(angle));

  const initialHorizontalVelocity = initialVelocity * angleCos; // V0x
  const initialVerticalVelocity = initialVelocity * angleSin; // V0y

  function calculateBulletPosition(time, timeDistance) {
    const horizontalDistanceAfterTime = initialHorizontalVelocity * time;
    const verticalDistanceAfterTime = initialVerticalVelocity * time - g/2 * time * time;

    if (verticalDistanceAfterTime >= 0) {
      trajectory = [
        ...trajectory,
        [verticalDistanceAfterTime, horizontalDistanceAfterTime],
      ];
      calculateBulletPosition(time + timeDistance, timeDistance);
      return;
    }
  }
  calculateBulletPosition(0, 0.1);

  return trajectory;
}


function loopBulletPosition(angle, initialVelocity, timeDistance) {
  let trajectory = [];
  let time = 0;
  let horizontalDistanceAfterTime = 0;
  let verticalDistanceAfterTime = 0;
  const angleCos = Math.cos(radiousFromDegrees(angle));
  const angleSin = Math.sin(radiousFromDegrees(angle));
  
  const initialHorizontalVelocity = initialVelocity * angleCos; // V0x
  const initialVerticalVelocity = initialVelocity * angleSin; // V0y
  
  while(verticalDistanceAfterTime >= 0) {
    horizontalDistanceAfterTime = initialHorizontalVelocity * time;
    verticalDistanceAfterTime = initialVerticalVelocity * time - g/2 * time * time;
    
    time = time + timeDistance;
    trajectory = [
      ...trajectory,
      [verticalDistanceAfterTime, horizontalDistanceAfterTime],
    ];
  }
  
  return trajectory;
}

console.info(recurencyBulletPosition(40, 15)); // 20deg, 5m/
console.info(loopBulletPosition(40, 15)); // 20deg, 5m/
