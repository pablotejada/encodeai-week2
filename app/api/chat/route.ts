import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
 
export async function POST(req: Request) {
  let { messages } = await req.json();
  messages = [
    {
      role: 'system',
      content: `You are a professional standup comedy showman. I will tell you a quick prompt to come up with a joke. You should come up with a joke based on the following options: from a list of options (work, people, animals, food, television, etc), a tone for the joke (witty, sarcastic, silly, dark, goofy, etc), the kind of joke (pun, knock-knock, story, etc), and the "temperature" \n \n`

    },
    ...messages,
  ]
 
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  });
 
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}