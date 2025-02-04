import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import Alert from '@mui/material/Alert';

const DataCard = ({ data }) => {
    return (
        <Card style={{ width: '80%', margin: '30px auto' }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Current Data
                </Typography>
                <Grid container spacing={3} direction={'column'}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Humidity Level</Typography>
                        <Typography>{data?.humidityLevel || 'N/A'}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            Optimal humidity is between 40% and 60%.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Soil Moisture</Typography>
                        <Typography>{data?.soilMoisture || 'N/A'}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            Ensure soil stays moderately moist.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Temperature</Typography>
                        <Typography>{data?.temperature || 'N/A'}°C</Typography>
                        <Typography variant="body2" color="textSecondary">
                            Ideal temperature range is 18°C to 24°C.
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            {(data?.humidityLevel === 0 || data?.soilMoisture === 0) && (
                <Alert severity="warning">
                    Ground humidity or soil moisture is at 0! Please check and water your plants if needed.
                </Alert>
            )}
            {data?.temperature < 15 && (
                <Alert severity="info">
                    Temperature is lower than usual. Consider adjusting the environment.
                </Alert>
            )}
        </Card>
    );
};

export default DataCard;