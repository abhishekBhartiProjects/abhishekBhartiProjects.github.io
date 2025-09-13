import React, {useState} from "react";
import Page from "../components/Page";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import api from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api<{ token: string; user: any }>("/api/auth/login", { method: "POST", json: { email, password } });
      localStorage.setItem("smarterr_token", res.token);
      localStorage.setItem("smarterr_userId", String(res.user.id));
      localStorage.setItem("smarterr_role", res.user.role);
      navigate("/");
    } catch (err:any) {
      alert(err.message || "Login failed");
    }
  };

  return (
    <Page title="Login">
      <form onSubmit={submit} style={{display:"grid",gap:12,maxWidth:480}}>
        <TextField label="Email or Phone" value={email} onChange={e=>setEmail(e.target.value)} required />
        <TextField label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <div style={{display:"flex",gap:8}}>
          <Button variant="contained" type="submit">Login</Button>
          <Button variant="outlined" onClick={()=>navigate("/register")}>Register</Button>
        </div>
      </form>
    </Page>
  );
}
