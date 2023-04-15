import logo from './logo.svg';
import './App.css';
import UploadScreen from './Screens/UploadScreen';
import HomeScreen from './Screens/HomeScreen';
import DesignScreen from './Screens/DesignScreen';
import { BrowserRouter, Route,Routes } from 'react-router-dom';

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Typography} from "@mui/material";



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '50%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '50%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));






function App() {
  return (
    <>
    <div className='HeadBar'>
      <div className='Header'>
        <img className='HeaderIcon' src={require('./res/headericon.png')} />
      
        <Typography className='HeadTitle' variant='h5' fontFamily='italic' fontWeight='bold'>3dDesign</Typography>
        
      </div>

      <div className='HeadSearchBar'>
      <div className='SearchBar'>
      <Search>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Ara…"
              inputProps={{ 'aria-label': 'search' }}
              
            />
          </Search>
        </div>
        </div>
    </div>
     <BrowserRouter>
      <Routes>
        <Route path='/'  element={<UploadScreen/>} />
        <Route path='/home'  element={<HomeScreen/>} />
        <Route path='/design' element={<DesignScreen/>} />
      </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
