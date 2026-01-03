import React, { useMemo, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem, Typography
} from "@mui/material";

export default function AddReviewDialog({ open, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const today = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString("en-GB"); // date manipulation 
  }, []);

  function reset() {
    setName("");
    setRating(5);
    setText("");
    setError("");
  }

  function handleClose() {
    reset();
    onClose();
  }

  function handleSubmit() {
    if (name.trim().length < 3) return setError("Name must be at least 3 characters.");
    if (text.trim().length < 10) return setError("Review must be at least 10 characters.");

    setError("");

    onAdd({
      id: Date.now(),
      name: name.trim(),
      rating: Number(rating),
      text: text.trim(),
      date: today
    });

    handleClose();
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add your review</DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <TextField
          fullWidth
          label="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mt: 1 }}
        />

        <TextField
          fullWidth
          select
          label="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          sx={{ mt: 2 }}
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <MenuItem key={r} value={r}>
              {"★".repeat(r) + "☆".repeat(5 - r)} ({r})
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Review"
          multiline
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ mt: 2 }}
        />

        {error && (
          <Typography sx={{ mt: 1, color: "error.main", fontWeight: 600 }}>
            {error}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} variant="outlined">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
