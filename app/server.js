const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 1. Serve Static Files (HTML, CSS, Images)
app.use(express.static(path.join(__dirname, 'public')));

// 2. Health Check Endpoint (CRITICAL for AWS Load Balancer)
app.get('/healthz', (req, res) => {
    res.status(200).send('OK');
});

// 3. Fallback Route (sends index.html for everything else)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 4. Start Server
app.listen(PORT, () => {
    console.log(`Teamfolio app running on port ${PORT}`);
});