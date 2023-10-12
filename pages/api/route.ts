import { NextApiRequest, NextApiResponse } from 'next';
import { Humanloop} from "humanloop";

if (!process.env.HUMANLOOP_API_KEY) {
  throw Error(
    "no Humanloop API key provided; add one to your .env.local file with: `HUMANLOOP_API_KEY=..."
  );
}

const humanloop = new Humanloop({
  basePath: "https://api.humanloop.com/v4",
  apiKey: process.env.HUMANLOOP_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const userMessages = req.body.userMessages;
    const response = await humanloop.chatDeployed({
      project: "RewardingTalent",
      messages: [
          {
            role: "user",
            content: userMessages,    
          },
        ],
    });
    res.status(200).json({ data: response.data.data[0].output });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
