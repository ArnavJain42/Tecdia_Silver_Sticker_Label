// Test page: one print (quantity 1) of every label, to check print quality.
// Open http://localhost:5050/test
const TESTS = [
    { api: '1', name: 'API 1 - Type 0', params: { PartsNumber: 'TEST-PARTS-001', DrawingNumber: 'TEC-4300994 #2', PrintQuantity: '1', Type: '0' } },
    { api: '1', name: 'API 1 - Type 2', params: { PartsNumber: 'TEST-PARTS-001', DrawingNumber: 'TEC-4301332 #2', PrintQuantity: '1', Type: '2' } },
    { api: '1', name: 'API 1 - Type 3', params: { PartsNumber: 'TEST-PARTS-001', DrawingNumber: 'TEC-4301332 #5', PrintQuantity: '1', Type: '3' } },
    { api: '1', name: 'API 1 - Type 4 (serial -1)', params: { PartsNumber: 'TEST-PARTS-001', DrawingNumber: 'TEC-4301332 #4', PrintQuantity: '1', Type: '4' } },
    { api: '2', name: 'API 2', params: { PartsNumber: 'TEST-PARTS-001', DrawingNumber: 'TEC-4301332 #3', PrintQuantity: '1', CustomerItem: 'CUST-ITEM-001' } },
    { api: '3', name: 'API 3', params: { CustomerItem: 'CUST-ITEM-001', PrintQuantity: '1' } },
    { api: '4', name: 'API 4', params: { ProductName: 'P-TEST-HZ01', ModelNumber: 'MODEL-001', PrintQuantity: '1' } },
    { api: '5', name: 'API 5 - Heisin Shiga', params: { PartsNumber: 'TEST-PARTS-001', DrawingNumber: 'TEC-4301259 #1', PrintQuantity: '1' } },
];

function renderTestPage(req, res) {
    const rows = TESTS.map((t, i) => {
        const query = new URLSearchParams(t.params).toString();
        const shown = Object.entries(t.params).map(([k, v]) => `${k}=${v}`).join(', ');
        return `
            <tr>
                <td>${t.name}</td>
                <td><a href="/api/print/${t.api}?${query}" target="_blank">/api/print/${t.api}?${query}</a><br><small>${shown}</small></td>
                <td><button onclick="printOne(${i})">Print</button></td>
                <td id="status-${i}"></td>
            </tr>`;
    }).join('\n');

    res.set('Content-Type', 'text/html');
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Label Print Test</title>
            <style>
                body { font-family: sans-serif; margin: 20px; }
                table { border-collapse: collapse; }
                td, th { border: 1px solid #ccc; padding: 6px 10px; text-align: left; vertical-align: top; }
                small { color: #666; }
                .ok { color: green; } .fail { color: red; }
            </style>
        </head>
        <body>
            <h2>Label Print Test (quantity 1 each)</h2>
            <p>
                <button onclick="printAll()">Print all labels (one after another)</button>
                &nbsp; Each link opens the normal confirm page. "Print" sends directly.
            </p>
            <table>
                <tr><th>Label</th><th>URL</th><th></th><th>Result</th></tr>
                ${rows}
            </table>
            <script>
                const TESTS = ${JSON.stringify(TESTS)};

                async function printOne(i) {
                    const t = TESTS[i];
                    const status = document.getElementById('status-' + i);
                    status.className = '';
                    status.textContent = 'Printing...';
                    try {
                        const r = await fetch('/api/print/' + t.api, {
                            method: 'POST',
                            body: new URLSearchParams(t.params),
                        });
                        status.className = r.ok ? 'ok' : 'fail';
                        status.textContent = r.ok ? 'OK' : 'Failed (' + r.status + '): ' + (await r.text()).slice(0, 150);
                    } catch (e) {
                        status.className = 'fail';
                        status.textContent = 'Error: ' + e.message;
                    }
                }

                async function printAll() {
                    for (let i = 0; i < TESTS.length; i++) await printOne(i);
                }
            </script>
        </body>
        </html>
    `);
}

module.exports = { renderTestPage };
