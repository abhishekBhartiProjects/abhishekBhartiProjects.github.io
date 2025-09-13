import React, {useEffect, useState} from "react";
import Page from "../components/Page";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import api from "../api/client";
import { Provider as ProvType } from "../types/models";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

export default function ProvidersList(){
  const [serviceType,setServiceType] = useState("");
  const [location,setLocation] = useState("");
  const [items,setItems] = useState<ProvType[]>([]);

  const search = async () => {
    const qs = new URLSearchParams();
    if (serviceType) qs.set("serviceType", serviceType);
    if (location) qs.set("location", location);
    const path = qs.toString() ? `/api/providers/search?${qs.toString()}` : "/api/providers";
    const res = await api<ProvType[]>(path);
    setItems(res);
  };

  useEffect(()=>{ search(); }, []);

  return (
    <Page title="Browse Providers">
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        <TextField label="Service type" value={serviceType} onChange={e=>setServiceType(e.target.value)} />
        <TextField label="Location" value={location} onChange={e=>setLocation(e.target.value)} />
        <Button variant="contained" onClick={search}>Search</Button>
      </div>

      <Grid container spacing={2}>
        {items.map(p => (
          <Grid item xs={12} md={6} key={p.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{p.serviceType} • #{p.id}</Typography>
                <Typography variant="body2" color="text.secondary">{p.location}</Typography>
                <Typography variant="subtitle1" sx={{mt:1}}>₹{p.hourlyRate}/hr • ⭐ {p.rating?.toFixed?.(1)}</Typography>
                <Button component={RouterLink} to={`/providers/${p.id}`} sx={{mt:2}}>View Profile</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Page>
  );
}
