const server = require("./server/auth0-server");
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`\n*** portfolio server listening on port ${PORT} ***`);
});
