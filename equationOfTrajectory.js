const g = 9.81;
const radiousFromDegrees = (deg) => deg * Math.PI / 180;

function bulletPosition(angle, initialVelocity) {
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

bulletPosition(20, 5); // 20deg, 5m/s