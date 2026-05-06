

async function main() {
    let url1 = "http://20.207.122.201/evaluation-service/depots";
    let url2 = "http://20.207.122.201/evaluation-service/vehicles";

    let options = {
        headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5c..." }
    };

    let res1 = await fetch(url1, options);
    let data1 = await res1.json();
    let depots = data1.depots;

    let res2 = await fetch(url2, options);
    let data2 = await res2.json();
    let vehicles = data2.vehicles;

    for (let i = 0; i < depots.length; i++) {
        let budget = depots[i].MechanicHours;
        let selectedTasks = solveKnapsack(budget, vehicles);

        console.log("Depot ID:", depots[i].ID);
        console.log("Budget:", budget);
        console.log("Selected Tasks:", selectedTasks);
        console.log("----------------------------");
    }
}

function solveKnapsack(budget, vehicles) {
    let dp = [];
    let n = vehicles.length;

    for (let i = 0; i <= n; i++) {
        dp[i] = [];
        for (let j = 0; j <= budget; j++) {
            if (i === 0 || j === 0) {
                dp[i][j] = 0;
            } else {
                let weight = vehicles[i - 1].Duration;
                let value = vehicles[i - 1].Impact;

                if (weight <= j) {
                    let include = value + dp[i - 1][j - weight];
                    let exclude = dp[i - 1][j];
                    dp[i][j] = Math.max(include, exclude);
                } else {
                    dp[i][j] = dp[i - 1][j];
                }
            }
        }
    }

    let result = [];
    let w = budget;

    for (let i = n; i > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
            result.push(vehicles[i - 1].TaskID);
            w = w - vehicles[i - 1].Duration;
        }
    }

    return result;
}

main();
em chyela....nak q2 zip file prttu chesthuna pedtha sare