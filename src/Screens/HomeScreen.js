import React, { useState, useEffect } from "react";
import '../Css/HomeScreen.css';

import { Typography } from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";





export default function HomeScreen(){

    const [listImages, setListImages] = useState([]);


    function importAll(r){
        let images = {};
        r.keys().map((item,index)=>{images[item.replace('./','')] = r(item)});
        return images;
    }


    
    useEffect(()=>{
        const images = importAll(require.context('../uploads', false, /\.(png|jpe?g|svg)$/));

        setListImages(Object.keys(images));
    },[]);

    return(
        <div  className="container">
            <h1>HomeScreen</h1>

            <div>

                <ImageList sx={{ width: "100%", height: "100%", marginLeft: 10 }} cols={4} rowHeight={200}>
                    {listImages.map((item) => (
                        <ImageListItem key={item}>
        
                            <Card sx={{ maxWidth: 400}}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5 }}>
                                    <img
                                        src={require(`../uploads/${item}`)}
                                        srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        alt={item}
                                        loading="lazy"
                                        style={{"width":"164px","height":"164px"}}
                                    />
                                <Box>
                    
                                <Typography>{item}</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5, alignItems: 'center' }}>
                                    <Button variant='outlined'>
                                        <DeleteOutlineTwoToneIcon />
                                    </Button>

                                </Box>
                                </Box>

                                </Box>
     
                            </Card>
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        </div>
    )
}