<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shamir's Secret Sharing</title>
</head>
<body>
    <script>
        // Function to perform Lagrange interpolation to find the secret
        function generateSecret(x, y, M) {
            let ans = 0;

            for (let i = 0; i < M; ++i) {
                let l = y[i];
                
                for (let j = 0; j < M; ++j) {
                    if (i !== j) {
                        l *= -x[j] / (x[i] - x[j]);
                    }
                }
                
                ans += l;
            }

            return Math.round(ans); // Return rounded secret value
        }

        // Function to decode JSON values
        function decodeJsonValues(data) {
            const decodedJson = {};

            function convertToDecimal(value, base) {
                return parseInt(value, base);
            }

            let index = 1; // Start indexing from 1
            for (const key in data) {
                if (!data.hasOwnProperty(key) || key === 'keys') {
                    continue; // Skip if it's not a numbered entry or if it's 'keys'
                }

                const base = parseInt(data[key].base);
                const value = data[key].value;

                // Convert the value to decimal and store it in the new JSON with index
                decodedJson[index] = {
                    base: 10,
                    value: convertToDecimal(value, base)
                };

                index++; // Increment index for the next entry
            }

            return decodedJson;
        }

        // Fetch the JSON data from data.json file
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                // Decode JSON values
                const decodedValues = decodeJsonValues(data);

                // Extract x and y values for Lagrange interpolation
                const xValues = [];
                const yValues = [];

                // Using all decoded values as points for reconstruction
                for (let i = 1; i <= Object.keys(decodedValues).length; i++) {
                    xValues.push(i);
                    yValues.push(decodedValues[i].value);
                }

                // Choose K points (in this case, we can take any K points)
                const K = data.keys.k; // As per your JSON input keys
                const M = K; // Number of points we are using for reconstruction

                // Generate secret using Lagrange interpolation
                const secretC = generateSecret(xValues.slice(0, M), yValues.slice(0, M), M);

                console.log(`The constant term c (secret code) is: ${secretC}`);
            })
            .catch(error => {
                console.error('Error fetching or processing data:', error);
            });
    </script>
</body>
</html>