import { useQuery } from "@tanstack/react-query";
import { useRoute }from "wouter";

import { Typography, Card, CardActions, CardContent, CardMedia } from "@mui/material";
import BookingForm from "./BookingForm";

const fetchHotel = async (id)=>{
    const res = await fetch(`http://localhost:3001/hotels/${id}`);
    if(!res.ok){
        throw new Error('Could not find hotel');
    }
    return res.json();
}

function HotelDetails(){
    const [match, params] = useRoute("/hotel/:id");
    const {
        data: hotel,
        isLoading,
        error,
    }= useQuery({
        queryKey: ["hotel",params.id],
        queryFn: ()=>fetchHotel(params.id),
    });

    if (isLoading){
        return <div>loading...</div>;
    }
    if (error) {
        console.log("Error", error);
        return <div>Error!</div>;
    }

    return(
        <Card sx={{maxWidth: 345, backgroundColor: "#e8e8e8" }}>
            <CardMedia sx={{ height: 140}} image={hotel.image}/>
            <CardContent>
            
                <Typography gutterBottom variant="h6">{hotel.name}</Typography>
                <Typography variant="body2" color="text.secondary">{hotel.description}</Typography>
            </CardContent>
            <CardActions>
                <BookingForm hotel={hotel}></BookingForm>
            </CardActions>
                
        </Card>
    )
}

export default HotelDetails;