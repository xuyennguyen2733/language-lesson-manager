import React, { useEffect, useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Stack, Chip, Card, CardActions } from '@mui/material';

const App = () => {
  const [inputText, setInputText] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dignissim, nisl nec pharetra facilisis, sapien est efficitur magna, in vulputate purus nisl non orci. Fusce at nibh varius, accumsan est ac, dignissim augue. Vestibulum consequat enim in metus suscipit, sit amet efficitur urna egestas. Integer auctor libero sed lorem vestibulum, id elementum nibh vehicula. Sed laoreet diam at justo cursus, a laoreet nisi fermentum. Maecenas nec sagittis mauris, ac malesuada leo. Suspendisse potenti. Proin vitae venenatis elit, non tempor lectus. Vivamus vel ullamcorper ipsum. Aenean in sapien quis odio bibendum dictum. Nulla facilisi.');
  const [displayText, setDisplayText] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [savedVocab, setSavedVocab] = useState([]);
  const [highlighted, setHighlighted] = useState({})
  const [lastIndex, setLastIndex] = useState(-1);
  const margin = 2; // margin in rem

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = () => {
    const stringArr = inputText.split(' ');
    setDisplayText(stringArr);
    setInputText('');
  };
  
  const  handleSelectWords = (word, index) => {
    if (index == lastIndex) {
      setSelectedWords(current => (current.slice(0, current.length-1)));
      setLastIndex(index-1);
    }
    else {
      if (index - lastIndex == 1) {
        setSelectedWords(current => ([...current, index]));
      }
      else {
        setSelectedWords([index]);
      }
      setLastIndex(index);
    }
  }
  
  const handleSaveVocab = () => {
    if (selectedWords.length > 0) {
      const newVocab = selectedWords.map((index) => displayText[index]).join(' ')
      const removeCount = selectedWords[selectedWords.length - 1] - selectedWords[0] + 1;
      
      displayText.splice(selectedWords[0], removeCount);
      displayText.splice(selectedWords[0], 0, newVocab);
      
      setHighlighted(current => ({...current, [selectedWords[0]]: true}));
      
      console.log('index highlighted', selectedWords[0],highlighted);
      
      setSavedVocab(current => [...current, newVocab]);
      setSelectedWords([]);
      setLastIndex(-1);
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="background.default"
    >
      <Paper
        elevation={3}
        sx={{
          width: `calc(100vw - ${margin * 2}rem)`,
          height: `calc(100vh - ${margin * 4}rem)`,
          p: 2,
          m: `${margin}rem`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Displayed Text Area */}
        <Box mb={2}>
          <Typography variant="h5">Displayed Text:</Typography>
            {
              displayText.length > 0 ? displayText.map((word, index) => {
                if (!!highlighted[index]) {
                  console.log('index in highlighted ?', highlighted[index])
                  return (
                    <Typography 
                    key={index}
                    sx={{
                      display: 'inline-block',
                      margin: '0 0.2rem',
                      backgroundColor: 'green',
                      fontWeight: 700,
                      '&:hover': {
                        backgroundColor: 'pink'
                      }
                    }}
                    onClick={() => handleSelectWords(word, index)}
                  >
                    {word} 
                  </Typography>
                  )
                }
                return (
                  <Typography 
                    key={index}
                    sx={{
                      display: 'inline-block',
                      margin: '0 0.2rem',
                      '&:hover': {
                        backgroundColor: 'pink'
                      }
                    }}
                    onClick={() => handleSelectWords(word, index)}
                  >
                    {word} 
                  </Typography>
                )
              })
              : <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
              'Your submitted text will appear here.'
              </Typography>
            }
        </Box>

        <Box mt="auto" display="flex" alignItems="center">
          <Card sx={{width: '100%'}}>
          {selectedWords.map((index, key) => {
            console.log('word selected', index, displayText[index])
            return (
              <Chip label={displayText[index]} key={key} />
            )
          })}
          </Card>
          <CardActions>
            <Button onClick={handleSaveVocab}>save</Button>
          </CardActions>
        </Box>
        
        <Box mt="auto" display="flex" alignItems="center" sx={{border: '1px solid'}}>
          {Object.entries(savedVocab).map(([key, word]) => {
            // console.log('word selected', word)
            return (
              <Chip label={word} key={key} />
            )
          })}
        </Box>
        
        {/* Text Editor at Bottom */}
        <Box mt="auto" display="flex" alignItems="center">
          <TextField
            label="Enter your text"
            variant="outlined"
            fullWidth
            value={inputText}
            onChange={handleInputChange}
            multiline
            maxRows={4}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ ml: 2 }}
            disabled={!!!inputText}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default App;
