import React, {useEffect, useState} from "react";
import Page from "../components/Page";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import api from "../api/client";
import { User } from "../types/models";

export default function Profile(){
  const [user, setUser] = useState<User | null>(null);
  const id = Number(localStorage.getItem("smarterr_userId") || 0);

  useEffect(()=>{ if(id) api<User>(`/api/users/${id}`).then(setUser).catch(()=>{}); },[id]);

  const save = async () => {
    if(!user) return;
    await api(`/api/users/${user.id}`, { method: "PUT", json: user });
    alert("Saved");
  };

  if(!user) return <Page title="Profile"><div>Loading...</div></Page>;

  return (
    <Page title="Profile">
      <div style={{display:"grid",gap:12, maxWidth:720}}>
        <TextField label="Full name" value={user.fullName} onChange={e=>setUser({...user, fullName:e.target.value})} />
        <TextField label="Email" value={user.email} onChange={e=>setUser({...user, email:e.target.value})} />
        <TextField label="Phone" value={user.phone||""} onChange={e=>setUser({...user, phone:e.target.value})} />
        <TextField label="Location" value={user.location||""} onChange={e=>setUser({...user, location:e.target.value})} />
        <div>
          <Button variant="contained" onClick={save}>Save changes</Button>
        </div>
      </div>
    </Page>
  );
}
