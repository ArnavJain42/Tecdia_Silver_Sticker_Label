const express = require('express');
const app = express();
const port = 5050;
const { execFile } = require('child_process');
const path = require('path');

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET endpoint to show confirmation page
app.get('/api/print', (req, res) => {
    const { PartsNumber, DrawingNumber, PrintQuantity } = req.query;

    if (!PartsNumber || !DrawingNumber || !PrintQuantity) {
        return res.status(400).send("Missing required query parameters.");
    }

    res.set('Content-Type', 'text/html');
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Confirm Print</title>
        </head>
        <body>
            <h2>Confirm Printing</h2>
            <p>Parts Number: <b>${PartsNumber}</b></p>
            <p>Drawing Number: <b>${DrawingNumber}</b></p>
            <p>Print Quantity: <b>${PrintQuantity}</b></p>
            <form method="POST" action="/api/confirm-print">
                <input type="hidden" name="PartsNumber" value="${PartsNumber}" />
                <input type="hidden" name="DrawingNumber" value="${DrawingNumber}" />
                <input type="hidden" name="PrintQuantity" value="${PrintQuantity}" />
                <button type="submit">Confirm & Print</button>
            </form>
        </body>
        </html>
    `);
});

// POST endpoint to trigger actual print
app.post('/api/confirm-print', (req, res) => {
    const { PartsNumber, DrawingNumber, PrintQuantity } = req.body;

    // Optional: logic for specific part number paths
    // if (PartsNumber === 'xyz') { exePath = 'CustomPath'; }

    const exePath = path.join(__dirname, 'BpacPrintLabel.exe'); // or hardcoded full path

    execFile(exePath, [PartsNumber, DrawingNumber, PrintQuantity], (error) => {
        if (error) {
            console.error('Print error:', error);
            return res.status(500).send('Print failed');
        }

        const countdownSeconds = 7;
        res.set('Content-Type', 'text/html');
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Print Complete</title>
                <script>
                    let seconds = ${countdownSeconds};
                    function updateCountdown() {
                        document.getElementById('countdown').textContent = seconds--;
                        if (seconds < 0) window.close();
                        else setTimeout(updateCountdown, 1000);
                    }
                    window.onload = updateCountdown;
                </script>
            </head>
            <body>
                <h2>Printed ${PrintQuantity} labels successfully<br>Please do not click print button repeatedly.</h2>
                <p>Closing tab in <span id="countdown">${countdownSeconds}</span> seconds...</p>
            </body>
            </html>
        `);
    });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
