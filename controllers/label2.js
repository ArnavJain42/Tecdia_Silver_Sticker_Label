require('dotenv').config();
const path = require('path');
const { execFile } = require('child_process');

function handleLabel2(req, res) {
    // FIX: Destructure directly from req.body (do not decode the whole object)
    const { PartsNumber, DrawingNumber, PrintQuantity, CustomerItem } = req.body;

    // Validate parameters
    if (!PartsNumber || !DrawingNumber || !PrintQuantity || !CustomerItem) {
        return res.status(400).send("Missing parameters for Label 2");
    }

    const exePath = process.env.exec2;

    // Decode individual strings here if they are URL-encoded
    const args = [
        decodeURIComponent(PartsNumber), 
        decodeURIComponent(DrawingNumber), 
        PrintQuantity, 
        decodeURIComponent(CustomerItem)
    ];

    execFile(exePath, args, (err) => {
        if (err) {
            console.error("Label 2 print error:", err);
            return res.status(500).send("Print failed for API 2. execPath: " + exePath);
        }

        res.send(`<html><body><h2>API 2 printed</h2><script>setTimeout(() => window.close(), 5000);</script></body></html>`);
    });
}

module.exports = handleLabel2;