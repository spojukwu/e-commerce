

const connectToServer = process.env.PORT || 9000;
// Start server
server.listen(PORT, () => {
    console.log(`Server is running on ${connectToServer}`);
});

module.exports = connectToServer