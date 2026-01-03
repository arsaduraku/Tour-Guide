import React from "react";
import { Card, CardContent, Typography, Stack, Chip } from "@mui/material";

export default function ReviewCard({ review }) {
  return (
    <Card sx={{ borderRadius: 3, bgcolor: "#141418", color: "#fff", border: "1px solid rgba(255,255,255,.08)" }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {review.name}
          </Typography>
          <Chip
            label={"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
            sx={{
              bgcolor: "rgba(255,183,3,.12)",
              border: "1px solid rgba(255,183,3,.35)",
              color: "#ffb703",
              fontWeight: 700
            }}
          />
        </Stack>

        <Typography sx={{ opacity: 0.9 }}>
          {review.text}
        </Typography>

        <Typography variant="caption" sx={{ display: "block", mt: 1, opacity: 0.6 }}>
          {review.date}
        </Typography>
      </CardContent>
    </Card>
  );
}
