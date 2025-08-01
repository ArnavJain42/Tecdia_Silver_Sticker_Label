require('dotenv').config();
const path = require('path');
const { execFile } = require('child_process');

function handleLabel2(req, res) {
    const { PartsNumber, DrawingNumber, PrintQuantity, CustomerItem } = req.body;

    if (!PartsNumber || !DrawingNumber || !PrintQuantity || !CustomerItem) {
        return res.status(400).send("Missing parameters for Label 2");
    }

    const exePath = path.join(__dirname, process.env.exec2);

    execFile(exePath, [PartsNumber, DrawingNumber, PrintQuantity, CustomerItem], (err) => {
        if (err) {
            console.error("Label 2 print error:", err);
            return res.status(500).send("Print failed for API 2. execPath: " + exePath + " Params: " + PartsNumber + " " + DrawingNumber + " " + PrintQuantity + " " + CustomerItem);
        }

        res.send(`<html><body><h2>API 2 printed</h2><script>setTimeout(() => window.close(), 5000);</script></body></html>`);
    });
}

module.exports = handleLabel2;
