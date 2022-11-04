import server from './adapters/config/express/express.config';

const port = process.env.PORT || 3000;


(() => {
  server.listen(port, () => {
    console.log(` [ * ] SERVER listening on http://localhost:${port}`);
  });
})()
