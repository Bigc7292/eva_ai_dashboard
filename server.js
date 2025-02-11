require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
import Link from 'next/link';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
    const { event, call } = req.body;
    const fullName = req.headers['full_name'];

    switch (event) {
        case 'call_started':
            console.log('Call started:', call.call_id, 'by', fullName);
            break;
        case 'call_ended':
            console.log('Call ended:', call.call_id, 'by', fullName);
            break;
        case 'call_analyzed':
            console.log('Call analyzed:', call.call_id, 'by', fullName);
            break;
        default:
            console.log('Unknown event:', event);
    }

    res.status(200).send('Webhook received');
});

const batchStartCalls = async (calls) => {
    const response = await fetch(`${process.env.RETELLAI_URL}/start-calls`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'full_name': 'Your Full Name Here'
        },
        body: JSON.stringify({ calls: csvData, agent_id: process.env.AGENT_ID })
    });

    if (!response.ok) {
        const errorData = await response.json(); // Get the error response
        console.error('Error response:', errorData);
        throw new Error('Failed to start calls');
    }
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const HomePage = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Welcome to My Application!</h1>
            <p>This is where you can start building your app.</p>
            <Link href="/about">Go to About Page</Link>
        </div>
    );
}; 