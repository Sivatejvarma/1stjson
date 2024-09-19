const input = {
    "keys": { "n": 4, "k": 3 },
    "1": { "base": "10", "value": "4" },
    "2": { "base": "2", "value": "111" },
    "3": { "base": "10", "value": "12" },
    "4": { "base": "4", "value": "213" }
};

// Step 1: Extract keys n and k
const { n, k } = input.keys;

// Step 2: Decode the points
const points = Object.keys(input).filter(key => key !== "keys").map(key => {
    const base = parseInt(input[key].base, 10);
    const x = parseInt(key, 10);
    const y = parseInt(input[key].value, base);
    return { x, y };
});

// Step 3: Lagrange interpolation to find constant term (x = 0)
function lagrangeInterpolationConstant(points) {
    let c = 0;
    for (let i = 0; i < k; i++) {
        const { x: xi, y: yi } = points[i];
        let li = 1;
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                const { x: xj } = points[j];
                li *= -xj / (xi - xj);
            }
        }
        c += yi * li;
    }
    return c;
}

// Step 4: Compute and print constant term 'c'
const c = lagrangeInterpolationConstant(points);
console.log("Constant term (c):", c);