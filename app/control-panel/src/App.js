import React, { useState, useEffect } from 'react';
import webSocketClient from './util/WebSocketClient';
import DataCard from './component/DataCard';
import CommandButtons from './component/PlantInfoCard';
import HistoryGraph from './component/HistoryGraph';
import { Container, Grid } from '@mui/material';
import PlantInfoCard from './component/PlantInfoCard';

function App() {
    const [currentData, setCurrentData] = useState(null);
    const [dataHistory, setDataHistory] = useState([]);
    const [isWebSocketReady, setIsWebSocketReady] = useState(false);

    useEffect(() => {
        // Listen for incoming data
        webSocketClient.onDataReceived((data) => {
            setCurrentData(data);
            setDataHistory((prev) => [...prev, data]);
        });

        // Listen for WebSocket readiness
        webSocketClient.onReady(() => {
            setIsWebSocketReady(true);
        });

        // Cleanup WebSocket connections on unmount
        return () => {
            webSocketClient.closeConnections();
        };
    }, []);

    const sendCommand = (command) => {
        if (!isWebSocketReady) {
            console.error('WebSocket is not ready to send commands.');
            return;
        }
        webSocketClient.sendCommand(command);
    };

    return (
        <Container maxWidth="lg" style={{ padding: '0px' }}>
            <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                    <DataCard data={currentData} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <PlantInfoCard/>
                </Grid>
                <Grid item xs={12}>
                    <HistoryGraph dataHistory={dataHistory} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;