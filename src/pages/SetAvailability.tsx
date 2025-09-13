import React, {useState, useEffect} from "react";
import Page from "../components/Page";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import api from "../api/client";

export default function SetAvailability(){
  const [providerId, setProviderId] = useState<number | null>(null);
  const [day, setDay] = useState(1);
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("17:00");
  useEffect(()=>{ /* resolve provider id similar to ProviderDashboard */ },[]);

  const save = async () => {
    if(!providerId) return alert("Provider not found");
    await api("/api/availability", { method: "POST", json: { providerId, dayOfWeek: day, startTime: `${start}:00`, endTime: `${end}:00` }});
    alert("Saved");
  };

  return (
    <Page title="Set Availability">
      <div style={{display:"grid",gap:12,maxWidth:600}}>
        <TextField label="Day of week (0 Sun - 6 Sat)" type="number" value={day} onChange={e=>setDay(Number(e.target.value))} />
        <TextField label="Start time" type="time" value={start} onChange={e=>setStart(e.target.value)} />
        <TextField label="End time" type="time" value={end} onChange={e=>setEnd(e.target.value)} />
        <Button variant="contained" onClick={save}>Save Availability</Button>
      </div>
    </Page>
  );
}
