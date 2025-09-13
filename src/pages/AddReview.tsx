import React, {useState} from "react";
import Page from "../components/Page";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import api from "../api/client";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function AddReview(){
  const [sp] = useSearchParams();
  const providerId = Number(sp.get("providerId"));
  const [rating,setRating] = useState(5);
  const [comment,setComment] = useState("");
  const navigate = useNavigate();

  const submit = async (e:React.FormEvent) => {
    e.preventDefault();
    await api("/api/reviews", { method: "POST", json: { userId: Number(localStorage.getItem("smarterr_userId")), providerId, rating, comment }});
    navigate(`/providers/${providerId}`);
  };

  return (
    <Page title="Add Review">
      <form onSubmit={submit} style={{display:"grid",gap:12,maxWidth:600}}>
        <TextField label="Rating (1-5)" type="number" value={rating} onChange={e=>setRating(Number(e.target.value))} />
        <TextField label="Comment" multiline rows={4} value={comment} onChange={e=>setComment(e.target.value)} />
        <div>
          <Button type="submit" variant="contained">Submit Review</Button>
        </div>
      </form>
    </Page>
  );
}
