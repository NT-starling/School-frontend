// File: routes/api/yourRoute.ts
import type { APIEvent } from "@solidjs/start/server";

export async function POST({ request }: APIEvent) {
  // Parse the JSON body of the request
  const data = await request.json();

  // Your POST request handling logic here
  // For example, you might save the data to a database
    console.log(data)
  // Return a response
  return { status: 200, body: { message: 'Data received successfully' } };
}
