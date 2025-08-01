require('dotenv').config();
const path = require('path');
const { execFile } = require('child_process');

function handleLabel3(req, res) {
    const { CustomerItem, PrintQuantity } = req.body;

    if (!CustomerItem || !PrintQuantity) {
        return res.status(400).send("Missing parameters for Label 3");
    }

    const exePath = path.join(__dirname, process.env.exec3);

    execFile(exePath, [CustomerItem, PrintQuantity], (err) => {
        if (err) {
            console.error("Label 3 print error:", err);
            return res.status(500).send("Print failed for API 3. execPath: " + exePath + " Params: " + CustomerItem + " " + PrintQuantity);
        }

        res.send(`<html><body><h2>API 3 printed</h2><script>setTimeout(() => window.close(), 5000);</script></body></html>`);
    });
}

module.exports = handleLabel3;
