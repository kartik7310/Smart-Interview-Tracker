export const healthCheck = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Smart Interview Tracker backend is running",
    timestamp: new Date().toISOString()
  });
};

