import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AdminDashboard() {
  // State to hold analytics and listings fetched from backend
  const [analytics, setAnalytics] = useState({ userCount: 0, listingCount: 0 });
  const [listings, setListings] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Fetch real analytics and listings data from your backend endpoints
  useEffect(() => {
    // Fetch analytics
    fetch("http://localhost:8000/admin/analytics")
      .then((res) => res.json())
      .then((data) => setAnalytics(data))
      .catch((err) => console.error("Error fetching analytics:", err));

    // Fetch listings
    fetch("http://localhost:8000/admin/listings")
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error("Error fetching listings:", err));
  }, []);

  // Compute monthly aggregated chart data from listings' date field
  useEffect(() => {
    if (listings.length > 0) {
      const monthlyData = {};
      listings.forEach((listing) => {
        if (listing.date) {
          // Assume date is stored in a standard format (like "YYYY-MM-DD")
          const dateObj = new Date(listing.date);
          // Create a formatted string for the month & year, e.g., "Apr 2025"
          const monthYear = dateObj.toLocaleString("default", {
            month: "short",
            year: "numeric",
          });
          monthlyData[monthYear] = (monthlyData[monthYear] || 0) + 1;
        }
      });
      const formattedChartData = Object.keys(monthlyData).map((month) => ({
        month,
        Listings: monthlyData[month],
      }));
      setChartData(formattedChartData);
    }
  }, [listings]);

  // Handler to approve ("thumbs up") a listing by calling the backend endpoint
  const handleApprove = (id) => {
    fetch(`http://localhost:8000/admin/listings/${id}/approve`, {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to approve listing");
        // Update the local state marking the listing as approved
        setListings((prev) =>
          prev.map((listing) =>
            listing.id === id ? { ...listing, approved: 1 } : listing
          )
        );
      })
      .catch((err) => console.error("Error approving listing:", err));
  };

  // Handler to delete a listing by calling the backend endpoint
  const handleDelete = (id) => {
    fetch(`http://localhost:8000/admin/listings/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete listing");
        // Remove the listing from state so that it disappears from the UI
        setListings((prev) => prev.filter((listing) => listing.id !== id));
      })
      .catch((err) => console.error("Error deleting listing:", err));
  };

  return (
    <div>
      {/* AppBar Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Admin Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: "20px" }}>
        <Grid container spacing={3}>
          {/* Analytics Cards */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">Total Users</Typography>
                <Typography variant="h2" color="primary">
                  {analytics.userCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">Total Listings</Typography>
                <Typography variant="h2" color="primary">
                  {analytics.listingCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Monthly Listings Activity Chart */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Monthly Listings Activity
                </Typography>
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="Listings" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <Typography>No chart data available.</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Listings Management Section */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Listings Management
                </Typography>
                {listings.length === 0 ? (
                  <Typography>No listings to display.</Typography>
                ) : (
                  listings.map((listing) => (
                    <Box
                      key={listing.id}
                      mb={2}
                      p={2}
                      border={1}
                      borderColor="grey.300"
                      borderRadius={2}
                    >
                      <Typography variant="subtitle1">
                        {listing.name}
                      </Typography>
                      <Typography variant="body2">
                        Approved: {listing.approved ? "Yes" : "No"}
                      </Typography>
                      <Box mt={1}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleApprove(listing.id)}
                          disabled={listing.approved === 1}
                        >
                          Thumbs Up
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          style={{ marginLeft: "10px" }}
                          onClick={() => handleDelete(listing.id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Box>
                  ))
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default AdminDashboard;
