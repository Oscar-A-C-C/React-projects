import { useForm } from "react-hook-form";
import useStore from "../store";
import toast from "react-hot-toast";
import { Input } from "@mui/icons-material";
import { Typography, Button} from "@mui/material";
import { DateRangeCalendar } from '@mui/x-date-pickers-pro';

function BookingForm({ hotel }){
    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm();

    const addReservation = useStore((state)=>state.addReservation);
    const onSubmit = (data) =>{
        addReservation(hotel, data);
        toast.success("Reservation made!"); 
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <DateRangeCalendar />
            {errors.startDate && (
                <Typography style={{ color : " red " }}>Started date is required</Typography>
            )}
            <br />
            <Input type="date"{...register("endDate", {required : true})} />
            {errors.endDate && (
                <Typography style={{ color : " red " }}>End date is required</Typography>
            )}
            <br />
            <br />
            <Button variant="contained" type="submid">
                Make Reservation
            </Button>
        </form>
    )
}

export default BookingForm;
