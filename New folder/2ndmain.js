const input = {
    "keys": { "n": 9, "k": 6 },
    "1": { "base": "10", "value": "28735619723837" },
    "2": { "base": "16", "value": "1A228867F0CA" },
    "3": { "base": "12", "value": "32811A4AA0B7B" },
    "4": { "base": "11", "value": "917978721331A" },
    "5": { "base": "16", "value": "1A22886782E1" },
    "6": { "base": "10", "value": "28735619654702" },
    "7": { "base": "14", "value": "71AB5070CC4B" },
    "8": { "base": "9", "value": "122662581541670" },
    "9": { "base": "8", "value": "642121030037605" }
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
function lipc(points) {
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

// Step 4: Compute and print Required output 'c'
const c = lipc(points);
console.log("Requried Output (c):", c);