import { OpenAIModel } from "@/types";
import { createClient } from "@supabase/supabase-js";
import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";

export const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const OpenAIStream = async (prompt: string, apiKey: string) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    method: "POST",
    body: JSON.stringify({
      // model: "gpt-3.5-turbo",
      model:"gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that accurately answers queries using the provided content. The book provides guide to stock options for European entrepreneurs. Use the text provided to form your answer, no more than 500 words. Be accurate, helpful, concise, and clear. If the question does not make sense, say that you don't know. If you can't find the anser in the context, say it is out of scope. If you don't know the answer, just say that you don't know, don't try to make up an answer."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.0,
      stream: true
    })
  });

  if (res.status !== 200) {
    throw new Error("OpenAI API returned an error");
  }

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;

          if (data === "[DONE]") {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    }
  });

  return stream;
};
