import Header from '../Header/Header';
import {Paper, Typography, Stack, Box, Tabs, Tab} from '@mui/material';
import {SetStateAction, useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import Footer from '../Footer/Footer'

function TabPanel(props:any) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        style={{marginLeft:'7%', width:'100%'}}
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
  
function a11yProps(index:any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface ReleaseNotesProps {
    currentTheme:string;
    handleThemeChange: (event: {
        target: {
            value: SetStateAction<string>;
        };
    }) => void;
    setCurrentTheme:React.Dispatch<SetStateAction<string>>;
}

function ReleaseNotes({currentTheme,handleThemeChange, setCurrentTheme}:ReleaseNotesProps){

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

    const handleChange = (event:React.SyntheticEvent, newValue:number) => {
        setValue(newValue)
    }
    const styles:any={
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
                <Header currentTheme={currentTheme} handleThemeChange={handleThemeChange} setCurrentTheme={setCurrentTheme}/>
                <div style={styles.tabsAndPanels}>
                    <Tabs orientation="vertical" onChange={handleChange} value={value} sx={{marginTop:'20%', minWidth:'110px'}}>
                        <Tab label="Release Notes" {...a11yProps(0)}/>
                        <Tab label="Upcoming Features" {...a11yProps(1)}/>
                    </Tabs>

                    <TabPanel value={value} index={0}>
                        <Typography variant="h3" sx={styles.titleTypography}>Release Notes</Typography>
                        <Stack spacing={1} sx={styles.versionNote}>
                            <Typography variant="h4" sx={{fontWeight:'bold'}}>Version 1.1</Typography>
                            <Typography variant="h5">June 9, 2023</Typography>
                            <Typography sx={{fontWeight:'bold'}}>What's New</Typography>
                            <Typography>• Inches/Cm converter</Typography>
                            <Typography>• Improved input validation for calculators</Typography>
                            <Typography>• Calculators are now alphabetized in the select component</Typography>
                            <Typography sx={{fontWeight:'bold'}}>Bug Fixes</Typography>
                            <Typography>• Various app architecture and optimization changes</Typography>
                            <Typography>• Paraplegic/Quadriplegic should now be exclusive and so should AKA/BKA for same leg</Typography>
                        </Stack>
                        <Stack spacing={1} sx={styles.versionNote}>
                            <Typography variant="h4" sx={{fontWeight:'bold'}}>Version 1.0.1</Typography>
                            <Typography variant="h5">August 11, 2022</Typography>
                            <Typography sx={{fontWeight:'bold'}}>Bug Fixes</Typography>
                            <Typography>• Fixed a bug where micronutrient amounts were calculated incorrectly</Typography>
                            <Typography>• Updated version number in footer</Typography>
                        </Stack>
                        <Stack spacing={1} sx={styles.versionNote}>
                            <Typography variant="h4" sx={{fontWeight:'bold'}}>Version 1.0</Typography>
                            <Typography variant="h5">August 10, 2022</Typography>
                            <Typography sx={{fontWeight:'bold'}}>What's New</Typography>
                            <Typography>• Added release notes route (the page you are currently reading)</Typography>
                            <Typography>• Micronutrients added to tube feeding calculator</Typography>
                        </Stack>
                        <Stack spacing={1} sx={styles.versionNote}>
                            <Typography variant="h4" sx={{fontWeight:'bold'}}>Version 0.9.1</Typography>
                            <Typography variant="h5">July 26, 2022</Typography>
                            <Typography sx={{fontWeight:'bold'}}>What's New</Typography>
                            <Typography>• Added version number to footer</Typography>
                            <Typography>• Theme is now saved for each user when logged in, so your chosen theme should automatically be used when logging in</Typography>
                            <Typography sx={{fontWeight:'bold'}}>Bug Fixes</Typography>
                            <Typography>• Signing up will now correctly reroute user back to the home page</Typography>
                            <Typography>• Renalcal kcal information fixed to correct value</Typography>
                        </Stack>
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        <Typography variant="h3" sx={styles.titleTypography}>Upcoming Features</Typography>
                        <Stack spacing={1} sx={styles.upcomingNote}>
                            <Typography>• Additional themes </Typography>
                            <Typography variant="h5" sx={{textDecoration:'underline', }}>Calculators</Typography>
                            <Typography>• Harris Benedict</Typography>
                            <Typography>• Ireton Jones</Typography>
                            <Typography>• Modified Penn State</Typography>
                            <Typography>• Kcal from Propofol</Typography>
                            <Typography>• Kcal from dextrose</Typography>
                            <Typography>• Kcal from alcohol</Typography>
                            <Typography>• Inches/Cm converter</Typography>
                            <Typography>• Supplement Nutrition Facts Database</Typography>
                        </Stack>
                    </TabPanel>

                </div>
            <Footer />
            </Paper>
        </div>
    )
}

export default ReleaseNotes;