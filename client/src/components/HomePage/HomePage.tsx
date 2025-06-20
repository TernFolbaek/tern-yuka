import {Box, Typography} from '@mui/material'
import TopicsTree from './TopicsTree'
const HomePage = () => {

    return (
        <Box component="section" sx={{p: 5, display: 'flex'}}>
            <TopicsTree/>
            <Typography variant="h5">
                This site will contain a variety of topics, mainly topics which im not completely incompetent in, and they will accrescent runningly
                when I believe I meet a topic which I believe can be taught
                easier through interactivity or formulated in a different approach
                than from the approach the sources I have learnt from took.
            </Typography>
        </Box>
    )
}

export default HomePage;