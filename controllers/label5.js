require('dotenv').config();
const { execFile } = require('child_process');

// Case 2-2 (Rev2): Heisin Shiga / 兵神装備 滋賀
// Drawing Number TEC-4301259, regardless of # (e.g. "TEC-4301259", "TEC-4301259 #1", "TEC-4301259 #12")
const DRAWING_NUMBER_PATTERN = /^TEC-4301259(?!\d)/i;

function handleLabel5(req, res) {
    const { PartsNumber, DrawingNumber, PrintQuantity } = req.body;

    // Validation
    if (!PartsNumber || !DrawingNumber || !PrintQuantity) {
        return res.status(400).send("Missing parameters for Label 5");
    }

    const partsNumber = decodeURIComponent(PartsNumber);
    const drawingNumber = decodeURIComponent(DrawingNumber).trim();

    if (!DRAWING_NUMBER_PATTERN.test(drawingNumber)) {
        return res.status(400).send("Label 5 (Heisin Shiga) only accepts Drawing Number TEC-4301259");
    }

    const exePath = process.env.exec5;

    const args = [partsNumber, drawingNumber, PrintQuantity];

    execFile(exePath, args, (err) => {
        if (err) {
            console.error("Label 5 print error:", err);
            return res.status(500).send("Print failed for API 5. execPath: " + exePath);
        }

        res.send(`<html><body><h2>API 5 printed</h2><script>setTimeout(() => window.close(), 5000);</script></body></html>`);
    });
}

module.exports = handleLabel5;
