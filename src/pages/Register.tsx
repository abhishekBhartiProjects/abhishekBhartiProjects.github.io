import React, {useState} from "react";
import Page from "../components/Page";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import api from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const [role,setRole] = useState<"seeker"|"provider">("seeker");
  const [fullName,setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [password,setPassword] = useState("");
  const [location,setLocation] = useState("");
  const [serviceType,setServiceType] = useState("");
  const [hourlyRate,setHourlyRate] = useState<number>(50);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await api("/api/auth/register", { method: "POST", json: { fullName, email, phone, password, location, role }});
      if (role === "provider") {
        await api("/api/providers", { method: "POST", json: { userId: user.id, serviceType, description: `${serviceType} services`, location, hourlyRate, rating: 0 }});
      }
      alert("Registered — please login");
      navigate("/login");
    } catch (err:any) {
      alert(err.message || "Registration failed");
    }
  };

  return (
    <Page title="Register">
      <form onSubmit={submit} style={{display:"grid",gap:12,maxWidth:720}}>
        <TextField select label="Register as" value={role} onChange={e=>setRole(e.target.value as any)}>
          <MenuItem value="seeker">Service Seeker</MenuItem>
          <MenuItem value="provider">Service Provider</MenuItem>
        </TextField>
        <TextField label="Full name" value={fullName} onChange={e=>setFullName(e.target.value)} required />
        <TextField label="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <TextField label="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
        <TextField label="Password" value={password} onChange={e=>setPassword(e.target.value)} required type="password" />
        <TextField label="Location" value={location} onChange={e=>setLocation(e.target.value)} />
        {role === "provider" && (
          <>
            <TextField label="Service type" value={serviceType} onChange={e=>setServiceType(e.target.value)} />
            <TextField label="Hourly rate" type="number" value={hourlyRate} onChange={e=>setHourlyRate(Number(e.target.value))} />
          </>
        )}
        <div style={{display:"flex",gap:8}}>
          <Button variant="contained" type="submit">Create account</Button>
          <Button variant="outlined" onClick={()=>navigate("/")}>Cancel</Button>
        </div>
      </form>
    </Page>
  );
}
