import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css'; // Import default styles
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
    </Typography>
  );
}

const theme = createTheme({
	typography: {
	  fontFamily: '"Poppins", sans-serif', // Example font family
	  // You can also specify font size, weight, etc., here
	},
	palette: {
	  primary: {
		main: '#734F96', // Example primary color
	  },
	  // Define other colors as needed
	  text: {
		primary: '#333333', // Example text color
		secondary: '#555555', // Example secondary text color
	  },
	},
	// You can also define other theme aspects here
  });
  
const steps = ['Emotional State', 'Meditation preferences', 'Personalization Details'];


export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [audioUrl, setAudioUrl] = React.useState('');
  const [formData, setFormData] = React.useState({});
  const [feedbackText, setFeedbackText] = React.useState('');
  const [library, setLibrary] = useState([]); // State to hold library of audio links
  useEffect(() => {
    fetchLibrary(); // Fetch the library when the component mounts
  }, []);

    // Function to generate a random color
	const getRandomColor = () => {
	return '#E6E6FA';
	};

	const libraryWithColors = library.map((audioLink) => ({
		url: audioLink,
		color: getRandomColor(), // Add a random color for each item
	  }));
	

  const fetchLibrary = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/library'); // Adjust the URL as needed
      if (!response.ok) throw new Error('Failed to fetch library');
      const data = await response.json();
      setLibrary(data); // Assuming the response is the array of audio links
    } catch (error) {
      console.error('Error fetching library:', error);
    }
  };

  function getStepContent(step) {
	switch (step) {
	  case 0:
		  return <AddressForm formData={formData} updateFormData={setFormData} />;
	  case 1:
		  return <PaymentForm formData={formData} updateFormData={setFormData} />;
	  case 2:
		  return <Review formData={formData} updateFormData={setFormData} />;
	  default:
		throw new Error('Unknown step');
	}
  }
  
  const pollForFileAvailability = (url) => {
	const maxAttempts = 36; // Polling up to 3 minutes, every 5 seconds
	let attempts = 0;
  
	const checkFile = async () => {
	  try {
		const response = await fetch(url, {
		  method: 'HEAD', // Use HEAD to check file existence without downloading it
		});
		if (response.ok) {
		  setAudioUrl(url); // File is ready
		  setLoading(false); // Stop loading
		} else {
		  throw new Error('File not ready');
		}
	  } catch (error) {
		if (attempts < maxAttempts) {
		  attempts++;
		  setTimeout(checkFile, 5000); // Wait 5 seconds before retrying
		} else {
		  setLoading(false); // Stop loading after max attempts
		  console.error('Failed to load audio file within 3 minutes.');
		}
	  }
	};
	checkFile();
  };
  
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleMeditateClick = async () => {
	try {
	  setLoading(true); // Start loading
	  console.log(JSON.stringify(formData))
	  // Replace `yourApiEndpoint` with your actual API endpoint
	  const videoName = Math.floor(100000 + Math.random() * 900000);
	  const response = await fetch('http://127.0.0.1:5000/api/generate_meditation', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({
		  mood: formData.mood, // Example mapping, adjust according to your formData structure
		  level: formData.level,
		  sound: formData.sound,
		  condition: formData.conditions, // Assuming you have such a field
		  env: formData.env,
		  accent: formData.accent.toLowerCase(),
		  gender: formData.gender,
		  name: videoName,
		  uname: formData.uname,
		}),
	  });	
	  
	  if (!response.ok) {
		setLoading(false)
		throw new Error('Network response was not ok');
	  } else {
		pollForFileAvailability("https://teletubby.s3.us-east-2.amazonaws.com/"+videoName+".mp3");
	  }
	} catch (error) {
	  console.error('Failed to fetch audio:', error);
	} 
  };
  const [openFeedbackDialog, setOpenFeedbackDialog] = React.useState(false);
  const audioPlayerRef = React.useRef(null);


  return (
	<ThemeProvider theme={theme}>
    <React.Fragment>
      <CssBaseline />
	  
      <Container component="main" maxWidth="md" sx={{
				mb: 2,
				backgroundColor: '#f3e5f5', // Example solid color
				// Or for a gradient:
				background: 'linear-gradient(to right, #734F96, #a2b9bc)', // Example gradient
				}}>
	  {
		loading && (
			<Box sx={{
			position: 'absolute', 
			top: 0, 
			left: 0, 
			width: '100%', 
			height: '100%', 
			backgroundColor: 'rgba(255, 255, 255, 0.7)',
			zIndex: 2,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			}}>
			<CircularProgress /> {/* Don't forget to import CircularProgress from @mui/material */}
			</Box>
		)
		}
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

					<Button
					variant="contained"
					onClick={activeStep === steps.length - 1 ? handleMeditateClick : handleNext}
					sx={{ mt: 3, ml: 1 }}
					>
					{activeStep === steps.length - 1 ? 'Meditate' : 'Next'}
					</Button>              
				</Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
	  {audioUrl && (
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, width: '100%' }}>
				<AudioPlayer
				src={audioUrl}
				ref={audioPlayerRef}
				onPlay={e => {
					// Access the native audio element from the ref and set playback rate
					const player = audioPlayerRef.current.audio.current;
					if (player) {
					player.playbackRate = 1;
					}
				}}
				onEnded={() => setOpenFeedbackDialog(true)} // Open dialog when audio ends
				style={{ width: '50%' }} // Adjust width as needed
				/>
			</Box>
			)}
			<Dialog open={openFeedbackDialog} onClose={() => setOpenFeedbackDialog(false)}>
			<DialogTitle>Feedback</DialogTitle>
			<DialogContent>
				<DialogContentText>
				How was your meditation experience?
				</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="feedback"
					label="Your feedback"
					type="text"
					fullWidth
					variant="standard"
					value={feedbackText}
					onChange={(e) => setFeedbackText(e.target.value)}
					/>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setOpenFeedbackDialog(false)}>Cancel</Button>
				<Button onClick={() => {
					console.log("Feedback:", feedbackText);
					// Implement your submission logic here
					setFeedbackText(''); // Clear the feedback text
					setOpenFeedbackDialog(false); // Close the dialog
				}}>Submit</Button>
			</DialogActions>
			</Dialog>
        {/* Library Section */}
        <Container maxWidth="lg" sx={{ mt: 4 }}>
		  <Typography variant="h4" gutterBottom textAlign="center">
            Past Meditation's Library
          </Typography>
          <Grid container spacing={4}>
			{libraryWithColors.map((item, index) => (
				<Grid item key={index} xs={12} sm={6} md={4}>
					<Card sx={{ backgroundColor: item.color }}> {/* Apply the random color here */}
					<CardMedia
						component="img"
						height="140"
						image="https://media.discordapp.net/attachments/1199152760357134376/1208502032236019772/teevee77_77abc_photorealistic_background_image_for_a_webpage_wi_57351824-eee3-4f5c-b32d-3dbb82536287.png?ex=65e38439&is=65d10f39&hm=99826e2eab9d1f575dab3774fda7037c77ffd288929a86ef9867ca618026b8e7&=&format=webp&quality=lossless&width=1012&height=1012" // Placeholder image
						alt="Meditation audio"
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
						Meditation {index + 1}
						</Typography>
						<AudioPlayer src={item.url} style={{ width: '100%' }} />
					</CardContent>
					</Card>
				</Grid>
				))}

          </Grid>
        </Container>
    </React.Fragment>
	</ThemeProvider>
  );
}