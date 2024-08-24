import productController from "./controller/productController";

type Path = '/flags';
type Method = 'GET' | 'PUT';
type ApiEndpoint = `${Method} ${Path}`;

const server = Bun.serve({
  port: 3000,
  async fetch(req) {  // Mark the fetch function as async
    try {
      const url = new URL(req.url);
      const method = req.method;

      const apiEndpoint: ApiEndpoint = `${method as Method} ${url.pathname as Path}`;

      switch (apiEndpoint) {
        case 'PUT /flags':
          return new Response(
            JSON.stringify({ message: `You called PUT /flags` }),
            { headers: { 'Content-Type': 'application/json' }, status: 200 }
          );
        case 'GET /flags': 
          try {
            // Assuming createData is an async function that returns data
            const data = await productController.getProducts(req); // Call createData
            return new Response(
              JSON.stringify(data),
              { headers: { 'Content-Type': 'application/json' }, status: 200 }
            );
          } catch (err) {
            console.error(err);
            return new Response(
              JSON.stringify({ message: 'Error fetching data' }),
              { headers: { 'Content-Type': 'application/json' }, status: 500 }
            );
          }
        default:
          return new Response(
            JSON.stringify({ message: `You called ${apiEndpoint}, which I don't know how to handle!` }),
            { headers: { 'Content-Type': 'application/json' }, status: 404 }
          );
      }
    } catch (err) {
      console.log(err);
      return new Response(JSON.stringify({ message: 'Internal Server Error' }), { headers: { 'Content-Type': 'application/json' }, status: 500 });
    }
  },
});


console.log(`Listening on http://localhost:${server.port} ...`);
