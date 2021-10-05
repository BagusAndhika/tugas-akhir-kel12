import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const DeskripsiContext = createContext();

export default function Keyboard()  {
    const [tugas, setKeyboard] = useState([]);
    const [name, setName] = useState('');
    const [deskripsi, setDeskripsi] = useState([]);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:3000/mouse",
            headers: {
                accept: "*/*",
            },
        })
        
        .then((data) => {
            setKeyboard(data.data);
        })
        
        .catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <div style={{ marginTop: 20 }}>
            <Typography variant="h4" style={{ margin: "auto 25% auto 25%", text: "center" }}>Katalog Mouse Gaming Terbaik 2021</Typography>
            <Grid container md={11} spacing={4} style={{margin: "auto", marginTop: "50px"}}>
                {tugas.map((results) => {
                    return (
                        <Grid item key={results.nama} md={3}>
                            <Card variant="outlined">
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image={results.img}
                                    alt={results.nama}
                                />
                                <CardActionArea onClick={() => {setOpen(true); setDeskripsi(results.info); setName(results.nama)}}>
                                    <CardContent style={{ backgroundColor: '#efefff', height: "120px" }}>
                                        <Typography variant="h6">{results.nama}</Typography>
                                        <Typography variant="body2">Harga: {results.harga}​​​​​​</Typography>
                                        <Button size="small">Detail</Button>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            <DeskripsiContext.Provider value={{info:deskripsi, nama: name}}>
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                    <Deskripsi/>    
                    </Modal>
                </div>
            </DeskripsiContext.Provider>
        </div>
    );
}

function Deskripsi() {
    const info = useContext(DeskripsiContext);
    return (
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {info.nama}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {info.info}
            </Typography>
        </Box>
    );
}