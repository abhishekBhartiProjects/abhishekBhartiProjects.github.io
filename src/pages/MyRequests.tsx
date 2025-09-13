import React, {useEffect, useState} from "react";
import Page from "../components/Page";
import api from "../api/client";
import { ServiceRequest } from "../types/models";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export default function MyRequests(){
  const [items, setItems] = useState<ServiceRequest[]>([]);
  const userId = Number(localStorage.getItem("smarterr_userId") || 0);

  useEffect(()=>{ if(userId) api<ServiceRequest[]>(`/api/requests/user/${userId}`).then(setItems).catch(()=>{}); },[userId]);

  return (
    <Page title="My Requests">
      <List>
        {items.map(r => (
          <ListItem key={r.id}>
            <div>
              <div>{r.serviceDetails}</div>
              <div style={{fontSize:12,color:"#666"}}>{r.status} • {new Date(r.requestedAt).toLocaleDateString()}</div>
            </div>
          </ListItem>
        ))}
      </List>
    </Page>
  );
}
