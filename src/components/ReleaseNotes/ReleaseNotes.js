import Header from '../Header/Header';
import {Paper, Typography, Stack, Box, Tabs, Tab} from '@mui/material';
import {useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import Footer from '../Footer/Footer'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function ReleaseNotes({currentTheme,handleThemeChange}){

    const [backgroundColor,setBackgroundColor]=useState('#333333')
    const [value,setValue] = useState(0)

    useEffect(()=>{
        if(currentTheme==='dark'){
            setBackgroundColor('#1E1E1E')
        }
        if(currentTheme==='lofi'){
            setBackgroundColor('#300E3F')
        }
        if(currentTheme==='banana'){
            setBackgroundColor('#fcba03')
        }
    },[currentTheme])

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const styles={
        releaseNotes:{
            backgroundColor:backgroundColor,
            width:'100vw',
            height:'100%',
            minHeight:'100vh',
            display: 'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'flex-start',
        },
        tabsAndPanels:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'flex-start',
            alignItems:'flex-start',
            width:'100%',
            height:'100%',
            minHeight:'100vh'
        },
        versionNote:{
            margin:'20px',
            display:'flex',
            flexDirection:'column',
            justifyContent:"center",
            alignItems:'left',
        },
        upcomingNote:{
            margin:'20px',
         
            textAlign:'left'
        },
        titleTypography:{
            width:'80%',
            textAlign:'center',
            marginTop:'25px',
            marginBottom:'5px',
            fontWeight:'bold',
        }
    }


    return(
        <div>
            <Paper sx={styles.releaseNotes}>
                <Header currentTheme={currentTheme} handleThemeChange={handleThemeChange}/>
                <div style={styles.tabsAndPanels}>
                    <Tabs orientation="vertical" onChange={handleChange} value={value} sx={{marginTop:'20%', minWidth:'110px'}}>
                        <Tab label="Release Notes" {...a11yProps(0)}/>
                        <Tab label="Upcoming Features" {...a11yProps(1)}/>
                    </Tabs>

                    <TabPanel value={value} index={0} style={{marginLeft:'7%', width:'100%'}}>
                        <Typography variant="h3" sx={styles.titleTypography}>Release Notes</Typography>
                        <Stack spacing={1} sx={styles.versionNote}>
                            <Typography variant="h4" sx={{fontWeight:'bold'}}>Version 1.0.0.1</Typography>
                            <Typography variant="h5">August 11, 2022</Typography>
                            <Typography variant="p" sx={{fontWeight:'bold'}}>Bug Fixes</Typography>
                            <Typography variant="p">• Fixed a bug where micronutrient amounts were calculated incorrectly</Typography>
                            <Typography variant="p">• Updated version number in footer</Typography>
                        </Stack>
                        <Stack spacing={1} sx={styles.versionNote}>
                            <Typography variant="h4" sx={{fontWeight:'bold'}}>Version 1.0.0.0</Typography>
                            <Typography variant="h5">August 10, 2022</Typography>
                            <Typography variant="p" sx={{fontWeight:'bold'}}>What's New</Typography>
                            <Typography variant="p">• Added release notes route (the page you are currently reading)</Typography>
                            <Typography variant="p">• Micronutrients added to tube feeding calculator</Typography>
                        </Stack>
                        <Stack spacing={1} sx={styles.versionNote}>
                            <Typography variant="h4" sx={{fontWeight:'bold'}}>Version 0.9.1.1</Typography>
                            <Typography variant="h5">July 26, 2022</Typography>
                            <Typography variant="p" sx={{fontWeight:'bold'}}>What's New</Typography>
                            <Typography variant="p">• Added version number to footer</Typography>
                            <Typography variant="p">• Theme is now saved for each user when logged in, so your chosen theme should automatically be used when logging in</Typography>
                            <Typography variant="p" sx={{fontWeight:'bold'}}>Bug Fixes</Typography>
                            <Typography variant="p">• Signing up will now correctly reroute user back to the home page</Typography>
                            <Typography variant="p">• Renalcal kcal information fixed to correct value</Typography>
                        </Stack>
                    </TabPanel>

                    <TabPanel value={value} index={1} style={{marginLeft:'7%', width:'100%'}}>
                        <Typography variant="h3" sx={styles.titleTypography}>Upcoming Features</Typography>
                        <Stack spacing={1} sx={styles.upcomingNote}>
                            <Typography variant="p">• Additional themes </Typography>
                            <Typography variant="h5" sx={{textDecoration:'underline', }}>Calculators</Typography>
                            <Typography variant="p">• Harris Benedict</Typography>
                            <Typography variant="p">• Ireton Jones</Typography>
                            <Typography variant="p">• Modified Penn State</Typography>
                            <Typography variant="p">• Kcal from Propofol</Typography>
                            <Typography variant="p">• Kcal from dextrose</Typography>
                            <Typography variant="p">• Kcal from alcohol</Typography>
                            <Typography variant="p">• Inches/Cm converter</Typography>
                            <Typography variant="p">• Supplement Nutrition Facts Database</Typography>
                        </Stack>
                    </TabPanel>

                </div>
            <Footer />
            </Paper>
        </div>
    )
}

export default ReleaseNotes;