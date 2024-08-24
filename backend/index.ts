import productController from "./controller/productController";

type Path = '/products';
type Method = 'GET' | 'PUT' | 'POST' | 'DELETE';
type ApiEndpoint = `${Method} ${Path}`;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', 
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', 
  'Access-Control-Allow-Headers': 'Content-Type, Authorization', 
};

function handleCors(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }
  return null;
}

const server = Bun.serve({
  port: 3000,
  async fetch(req) { 
    try {
      const corsResponse = handleCors(req);
      if (corsResponse) return corsResponse;

      const url = new URL(req.url);
      const method = req.method;
      const apiEndpoint: ApiEndpoint = `${method as Method} ${url.pathname as Path}`;

      switch (apiEndpoint) {
        case 'PUT /products':
          return new Response(
            JSON.stringify({ message: `You called PUT /products` }),
            { headers: { 
              'Content-Type': 'application/json', ...corsHeaders }, status: 200 }
          );

        case 'GET /products':
          try {
            // Directly return the response from the controller
            return await productController.getProducts(req); 
          } catch (err) {
            console.error(err);
            return new Response(
              JSON.stringify({ message: 'Error fetching data' }),
              { headers: { 'Content-Type': 'application/json', ...corsHeaders }, status: 500 }
            );
          }
          case 'POST /products':
            try {
              // Directly return the response from the controller
              return await productController.createProduct(req); 
            } catch (err) {
              console.error(err);
              return new Response(
                JSON.stringify({ message: 'Error fetching data' }),
                { headers: { 'Content-Type': 'application/json', ...corsHeaders }, status: 500 }
              );
            }

        default:
          return new Response(
            JSON.stringify({ message: `You called ${apiEndpoint}, which I don't know how to handle!` }),
            { headers: { 'Content-Type': 'application/json', ...corsHeaders }, status: 404 }
          );
      }
    } catch (err) {
      console.log(err);
      return new Response(JSON.stringify({ message: 'Internal Server Error' }), { headers: { 'Content-Type': 'application/json', ...corsHeaders }, status: 500 });
    }
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
