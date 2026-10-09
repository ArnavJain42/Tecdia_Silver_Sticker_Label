require('dotenv').config();
const path = require('path');
const { execFile } = require('child_process');

function handleLabel4(req, res) {
    // FIX: Destructure directly from req.body
    const { ProductName, ModelNumber, PrintQuantity } = req.body;

    // Validation
    if (!ProductName || !ModelNumber || !PrintQuantity) {
        return res.status(400).send("Missing parameters for Label 4");
    }

    const exePath = process.env.exec4;

    // Assemble arguments correctly for the C# exe
    const args = [
        decodeURIComponent(ProductName), 
        decodeURIComponent(ModelNumber), 
        PrintQuantity
    ];

    execFile(exePath, args, (err) => {
        if (err) {
            console.error("Label 4 print error:", err);
            return res.status(500).send("Print failed for API 4. execPath: " + exePath + " Params: " + ProductName + " " + ModelNumber + " " + PrintQuantity);
        }

        res.send(`<html><body><h2>API 4 printed</h2><script>setTimeout(() => window.close(), 5000);</script></body></html>`);
    });
}

module.exports = handleLabel4;