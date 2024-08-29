'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  TextField, 
  List, 
  ListItem, 
  ListItemText,
  Paper,
  Grid
} from '@mui/material';
//Create a config to import url
const API_BASE_URL = 'http://127.0.0.1:5001/626_hangout/events?city=pasadena'; // Replace with your Flask backend URL

export default function Home() {
  const [inputData, setInputData] = useState('');
  const [responseData, setResponseData] = useState('');
  const [dataList, setDataList] = useState([]);

  const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  const handleFetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/data`);
      setResponseData(response.data.message);
      setDataList(prevList => [...prevList, response.data.message]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponseData('Error fetching data');
    }
  };

  const handlePostData = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/data`, { message: inputData });
      setResponseData(response.data.message);
      setDataList(prevList => [...prevList, response.data.message]);
      setInputData('');
    } catch (error) {
      console.error('Error posting data:', error);
      setResponseData('Error posting data');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          626 Hangout
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Input Data
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={inputData}
                onChange={handleInputChange}
                placeholder="Enter data to send"
                sx={{ mb: 2 }}
              />
              <Button variant="contained" onClick={handlePostData} fullWidth>
                Post Data
              </Button>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Fetch Data
              </Typography>
              <Button variant="contained" onClick={handleFetchData} fullWidth>
                Fetch Data
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {responseData && (
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Latest Response
            </Typography>
            <Typography variant="body1">
              {responseData}
            </Typography>
          </Paper>
        )}

        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Data History
          </Typography>
          <List>
            {dataList.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
}