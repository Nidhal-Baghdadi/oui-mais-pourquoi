const MIN_RADIUS = 35;
const MAX_RADIUS = 56;
const DEPTH = 4;
const LEFT_COLOR = "ffa700";
const RIGHT_COLOR = "ffdb00";
const NUM_POINTS = 20;

const subjects = ["Math", "Physics", "AI", "Philosophy", "History", "Geography"]

/**
 * --- Credit ---
 * https://stackoverflow.com/questions/16360533/calculate-color-hex-having-2-colors-and-percent-position
 */
const getGradientStop = (ratio) => {
    // For outer ring numbers potentially past max radius,
    // just clamp to 0
    ratio = ratio > 1 ? 1 : ratio < 0 ? 0 : ratio;

    const c0 = LEFT_COLOR.match(/.{1,2}/g).map(
        (oct) => parseInt(oct, 16) * (1 - ratio)
    );
    const c1 = RIGHT_COLOR.match(/.{1,2}/g).map(
        (oct) => parseInt(oct, 16) * ratio
    );
    const ci = [0, 1, 2].map((i) => Math.min(Math.round(c0[i] + c1[i]), 255));
    const color = ci
        .reduce((a, v) => (a << 8) + v, 0)
        .toString(16)
        .padStart(6, "0");

    return `#${color}`;
};

const calculateColor = (x) => {
    const maxDiff = MAX_RADIUS * 2;
    const distance = x + MAX_RADIUS;

    const ratio = distance / maxDiff;

    const stop = getGradientStop(ratio);
    return stop;
};

const randomFromInterval = (min, max) => {
    return Math.random() * (max - min) + min;
};

export const pointsInner = Array.from(
    { length: NUM_POINTS },
    (v, k) => k
).map((num) => {
    const randomRadius = randomFromInterval(MIN_RADIUS, MAX_RADIUS);
    const randomAngle = Math.random() * Math.PI * 2;

    const x = Math.cos(randomAngle) * randomRadius;
    const y = Math.sin(randomAngle) * randomRadius;
    const z = randomFromInterval(-DEPTH, DEPTH);

    const color = calculateColor(x);

    return {
        idx: num,
        position: [x, y, z],
        color,
        data: {
            subject: subjects[num % subjects.length]

        }
    };
});

export const pointsOuter = Array.from(
    { length: NUM_POINTS / 4 },
    (v, k) => k + NUM_POINTS
).map((num) => {
    const randomRadius = randomFromInterval(MIN_RADIUS / 2, MAX_RADIUS * 2);
    const angle = Math.random() * Math.PI * 2;

    const x = Math.cos(angle) * randomRadius;
    const y = Math.sin(angle) * randomRadius;
    const z = randomFromInterval(-DEPTH * 10, DEPTH * 10);

    const color = calculateColor(x);

    return {
        idx: num,
        position: [x, y, z],
        color,
        data: {
            subject: subjects[num % subjects.length],
        }

    };
});