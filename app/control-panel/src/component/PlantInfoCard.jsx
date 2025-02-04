import React, { useState } from 'react';
import { Card, CardContent, Button, Typography, TextField, Grid } from '@mui/material';



const PlantInfoCard = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [plantData, setPlantData] = useState({
    name: 'Ficus',
    species: 'Ficus elastica',
    wateringSchedule: 'Once a week'
  });

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlantData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Card style={{ width: '80%', margin: '30px auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Plant Information
        </Typography>
        <Grid container spacing={2} direction={'column'}>
          <Grid item xs={12}>
            <TextField
              label="Plant Name"
              name="name"
              value={plantData.name}
              onChange={handleChange}
              disabled={!isEditable}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Species"
              name="species"
              value={plantData.species}
              onChange={handleChange}
              disabled={!isEditable}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Watering Schedule"
              name="wateringSchedule"
              value={plantData.wateringSchedule}
              onChange={handleChange}
              disabled={!isEditable}
              fullWidth
            />
          </Grid>
        
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleEditToggle}
          style={{ marginTop: '20px' }}
        >
          {isEditable ? 'Save' : 'Edit'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlantInfoCard;