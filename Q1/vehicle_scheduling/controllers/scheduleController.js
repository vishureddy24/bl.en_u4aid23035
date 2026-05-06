const axios = require("axios");

exports.scheduleVehicles = async (req, res) => {
    try {
        const { depotID, taskIDs } = req.body;

        if (!depotID || !taskIDs || !Array.isArray(taskIDs)) {
            return res.status(400).json({ error: "Invalid request body" });
        }

        const depotRes = await axios.get(`http://localhost:3000/depots/${depotID}`);
        const depot = depotRes.data;

        const taskPromises = taskIDs.map(taskID =>
            axios.get(`http://localhost:3000/tasks/${taskID}`)
        );
        const taskRes = await axios.all(taskPromises);
        const tasks = taskRes.map(r => r.data);

        const totalDuration = tasks.reduce((acc, task) => acc + task.duration, 0);
        const totalImpact = tasks.reduce((acc, task) => acc + task.impact, 0);

        let maintenanceRequired = false;
        if (totalDuration > depot.mechanicHours) {
            maintenanceRequired = true;
        } else {
            for (const task of tasks) {
                if (task.impact < 5) {
                    maintenanceRequired = true;
                    break;
                }
            }
        }

        const schedule = {
            depotID,
            taskIDs,
            totalDuration,
            totalImpact,
            maintenanceRequired,
            scheduledAt: new Date().toISOString(),
        };


        console.log("Schedule created:", schedule);

        res.status(200).json(schedule);
    } catch (error) {
        console.error("Error scheduling vehicles:", error.message);
        res.status(500).json({ error: "Failed to schedule vehicles" });
    }
};
