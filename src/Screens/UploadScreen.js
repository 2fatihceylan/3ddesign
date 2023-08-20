import React, {useEffect,useState} from "react";
import axios from "axios";
import CircularProgressWithLabel from '../Components/CircularProgressWithLabel';
import { DropzoneArea } from "material-ui-dropzone";
import { Button } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Typography } from "@mui/material";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';



export default function UploadScreen(){


    const [file, setFile] = useState([]);
    const [filename, setFilename] = useState('Dosya Seç');
    const [uploadedFile, setUploadedFile] = useState({});
    const [uploadPercentage, setUploadPercentage] = useState(0);
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


    const onInputChange=(e)=>{
        setFile(e.target.files);
        setFilename(e.target.files.name);
    }


    async function uploadImage(){

        for(let i=0; i<file.length; i++){

            const formData=new FormData();
            formData.append('file',file[i]);


            try{
                await axios.post('/upload', formData,{
                    headers: {
                        'Content-Type':'multipart/form-data'
                    },
                    onUploadProgress: progressEvent=>{

                        //progressbar

                        setUploadPercentage(parseInt(Math.round((progressEvent.loaded*100)/progressEvent.total)));

                        setTimeout(() => {setUploadPercentage(0)}, 5000);

                    }
                }).then(res=>{
                    const {filename, filePath} = res.data;
                    setUploadedFile({filename,filePath});
                })
            }catch(err){
                if(err.response.status === 500){
                    console.log('Server ile ilgili bir problem oluştu...');
                } else{
                    console.log(err.response.data.msg);
                }
            }
        }
    }




    return(
        <div style={{"textAlign":"center","justifyContent":"center"}}>
        <div style={{"textAlign":"center","justifyContent":"center"}}>
            <form style={{"width":"100%"}}>
            <DropzoneArea
                //acceptedFiles={['image/*']}
                dropzoneText={"Resimleri buraya sürükleyin veya tıklayın..."}
                onChange={(files) => setFile(files)}
                filesLimit={40}
                showFileNames={true}
                Icon={DriveFolderUploadIcon}
                maxFileSize={90000000}  ///file size
            />
            </form>
        </div>
        <div style={{"height":"50px"}}></div>
        <div>
            <Button variant="outlined" onClick={uploadImage}>
                <FileUploadIcon ></FileUploadIcon>
                <Typography>Resimleri Yükle</Typography>
                <CircularProgressWithLabel value={uploadPercentage}   style={{"marginLeft":"10px"}}/>
            </Button>
        </div>


       <div>

        <ImageList sx={{ width: "100%", height: 450 }} cols={3} rowHeight={200}>
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

                        </Box></Box>

                    </Box>
             
                </Card>
            </ImageListItem>
         ))}
    </ImageList>
            </div>

            
    </div>
    )
}