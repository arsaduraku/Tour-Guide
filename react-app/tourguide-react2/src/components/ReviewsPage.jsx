import React, { useMemo, useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import AddReviewDialog from "./AddReviewDialog";
import ReviewCard from "./ReviewCard";

export default function ReviewsPage() {
  const [open, setOpen] = useState(false);

  const [reviews, setReviews] = useState([
    { id: 1, name: "Anna K.", rating: 5, text: "Prishtina surprised me! Monuments, cafés, and street art are unforgettable.", date: "28/12/2025" },
    { id: 2, name: "Marko L.", rating: 4, text: "Loved the urban vibe, especially the Night Observatory and local restaurants.", date: "28/12/2025" },
    { id: 3, name: "Elira P.", rating: 5, text: "Smooth transport apps made exploring easy. Highly recommend for first-time visitors!", date: "28/12/2025" }
  ]);

  const total = useMemo(() => reviews.map(r => r.rating).reduce((a, b) => a + b, 0), [reviews]); // map and reduce 
  const avg = useMemo(() => (reviews.length ? (total / reviews.length).toFixed(1) : "0.0"), [total, reviews.length]);

  function handleAdd(newReview) {
    setReviews(prev => [newReview, ...prev]);
  }

  // filter - shfaq vetem vleresimet qe jane 4 e me shume
  const topReviews = useMemo(() => reviews.filter(r => r.rating >= 4), [reviews]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0b0b10", color: "#fff", py: 6 }}>
      <Container maxWidth="md">
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={2}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#ffb703" }}>
              Traveler Reviews
            </Typography>
            <Typography sx={{ opacity: 0.75 }}>
              Average rating: <b>{avg}</b> / 5 • Total reviews: <b>{reviews.length}</b>
            </Typography>
          </Box>

          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            sx={{
              bgcolor: "#ffb703",
              color: "#111",
              fontWeight: 800,
              borderRadius: 999,
              px: 3,
              "&:hover": { bgcolor: "#ff9f1a" }
            }}
          >
            + Add review
          </Button>
        </Stack>

        <Box sx={{ mt: 4 }}>
          <Typography sx={{ mb: 2, opacity: 0.8 }}>
            Showing top reviews (4★ and above): {topReviews.length}
          </Typography>

          <Stack spacing={2}>
            {topReviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </Stack>
        </Box>

        <AddReviewDialog open={open} onClose={() => setOpen(false)} onAdd={handleAdd} />
      </Container>
    </Box>
  );
}
