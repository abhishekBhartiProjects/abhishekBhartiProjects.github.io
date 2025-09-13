import React, {useEffect, useState} from "react";
import Page from "../components/Page";
import api from "../api/client";
import { ServiceRequest, Provider } from "../types/models";
import Button from "@mui/material/Button";

export default function ProviderDashboard(){
  const [items, setItems] = useState<ServiceRequest[]>([]);
  const [providerId, setProviderId] = useState<number | null>(null);

  useEffect(()=>{
    // fetch provider for this user (simple approach)
    api<Provider[]>(`/api/providers`).then(list=>{
      const my = list.find(p => p.userId === Number(localStorage.getItem("smarterr_userId")));
      setProviderId(my?.id || null);
    }).catch(()=>{});
  },[]);

  useEffect(()=>{ if(providerId) api<ServiceRequest[]>(`/api/dashboard/requests/provider/${providerId}`).then(setItems).catch(()=>{}); },[providerId]);

  const setStatus = async (id:number, status:string) => {
    await api(`/api/requests/${id}/status`, { method: "PUT", json: { status }});
    if (providerId) setItems(await api(`/api/dashboard/requests/provider/${providerId}`));
  };

  return (
    <Page title="Provider Dashboard">
      {items.map(r => (
        <div key={r.id} style={{borderBottom:"1px solid #eee", padding:12}}>
          <div>{r.serviceDetails}</div>
          <div style={{fontSize:12,color:"#666"}}>{r.preferredDate} {r.preferredTime}</div>
          <div style={{marginTop:8}}>
            <Button variant="contained" onClick={()=>setStatus(r.id,"Accepted")}>Accept</Button>
            <Button variant="outlined" sx={{ml:1}} onClick={()=>setStatus(r.id,"Cancelled")}>Reject</Button>
          </div>
        </div>
      ))}
      {!items.length && <div>No incoming requests.</div>}
    </Page>
  );
}
