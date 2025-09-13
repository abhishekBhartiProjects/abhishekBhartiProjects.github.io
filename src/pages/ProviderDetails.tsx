import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Page from "../components/Page";
import api from "../api/client";
import { Provider as ProvType, Review, Availability } from "../types/models";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export default function ProviderDetails(){
  const { id } = useParams();
  const pid = Number(id);
  const [prov, setProv] = useState<ProvType | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avail, setAvail] = useState<Availability[]>([]);
  const navigate = useNavigate();

  useEffect(()=>{
    if (!pid) return;
    api<ProvType>(`/api/providers/${pid}`).then(setProv).catch(()=>{});
    api<Review[]>(`/api/reviews/provider/${pid}`).then(setReviews).catch(()=>{});
    api<Availability[]>(`/api/availability/provider/${pid}`).then(setAvail).catch(()=>{});
  },[pid]);

  return (
    <Page title="Provider Details">
      {!prov ? <div>Loading...</div> : (
        <Box sx={{display:"flex",gap:4,flexDirection:{xs:"column",md:"row"}}}>
          <Box sx={{flex:2}}>
            <Typography variant="h6">{prov.serviceType} • #{prov.id}</Typography>
            <Typography color="text.secondary">{prov.location}</Typography>
            <Typography sx={{mt:1}}>₹{prov.hourlyRate}/hr</Typography>
            <Typography sx={{mt:2}}>{prov.description}</Typography>

            <Box sx={{mt:4}}>
              <Typography variant="h6">Reviews</Typography>
              <List>
                {reviews.length ? reviews.map(r => (
                  <ListItem key={r.id}>
                    <div>
                      <div>⭐ {r.rating} • {new Date(r.createdAt).toLocaleDateString()}</div>
                      <div>{r.comment}</div>
                    </div>
                  </ListItem>
                )) : <div>No reviews yet.</div>}
              </List>
            </Box>
          </Box>

          <Box sx={{width:320}}>
            <Typography variant="subtitle1">Availability</Typography>
            <List>
              {avail.length ? avail.map(a => <ListItem key={a.id}>{["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][a.dayOfWeek]} {a.startTime} - {a.endTime}</ListItem>) : <div>No availability published.</div>}
            </List>

            <Button variant="contained" sx={{mt:2}} onClick={()=>navigate(`/providers/${pid}/request`)}>Request Service</Button>
          </Box>
        </Box>
      )}
    </Page>
  );
}
