require('dotenv').config();
const path = require('path');
const { execFile } = require('child_process');

function handleLabel1(req, res) {
    const { PartsNumber, DrawingNumber, PrintQuantity, Type } = req.body;

    if (!PartsNumber || !DrawingNumber || !PrintQuantity || Type === undefined) {
        return res.status(400).send("Missing required form parameters.");
    }

    const exePath = path.join(__dirname, process.env.exec1);

    execFile(exePath, [PartsNumber, DrawingNumber, PrintQuantity, Type], (err) => {
        if (err) {
            console.error("Label 1 print error:", err);
            return res.status(500).send("Print failed API 1 execPath: " + exePath + "Params: " + PartsNumber +" " + DrawingNumber +" " + PrintQuantity +" " + Type);
        }

        res.send(`
            <html><body>
            <h2>Print successful for API 1</h2>
            <script>setTimeout(() => window.close(), 5000);</script>
            </body></html>
        `);
    });
}

module.exports = handleLabel1;
