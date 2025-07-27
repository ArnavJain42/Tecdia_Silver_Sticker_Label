function renderConfirmationPage(req, res, labelType) {
    res.set('Content-Type', 'text/html');
    res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Confirm Print</title></head>
        <body>
            <h2>Ready to Print</h2>
            <form method="POST" action="/api/print/${labelType}">
                ${Object.entries(req.query)
                    .map(([key, value]) => `<input type="hidden" name="${key}" value="${value}" />`)
                    .join('\n')}
                <button type="submit">Confirm & Print</button>
            </form>
        </body>
        </html>
    `);
}

module.exports = { renderConfirmationPage };
