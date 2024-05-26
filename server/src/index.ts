import cors from 'cors';
import express, { Request, Response } from 'express';
import { Query } from './/types/types';
import { DefaultProvider } from './providers/defaultProvider';
import { Provider } from './providers/provider.interface';
import { Accommodation } from './apiModels';

const app = express();
const port = process.env.PORT || 5000;

// In-memory cache
const cache: { [key: string]: Accommodation[] } = {};

// Provider instance
const defaultProvider: Provider = new DefaultProvider();

app.use(express.json());
app.use(cors());

app.post('/api/search', async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    const { ski_site, from_date, to_date, group_size } = query;

    const cacheKey = `${ski_site}-${from_date}-${to_date}-${group_size}`;

    // Set up Server-Sent Events (SSE)
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Check if the results are already in the cache
    if (cache[cacheKey]) {
      res.write(`${JSON.stringify(cache[cacheKey])}`);
      return res.end();
    }

    const initialResults = await defaultProvider.fetchHotelData(query);

    // Send the initial results
    res.write(`${JSON.stringify(initialResults)}`);
    
    const largerGroupSizes = [group_size + 1, group_size + 2];
    const additionalResults = await Promise.all(
      largerGroupSizes.map(async (size) => {
        const additionalQuery: Query = { ...query, group_size: size };
        return await defaultProvider.fetchHotelData(additionalQuery);
      })
    );

    const aggregatedResults = [...initialResults, ...additionalResults.flat()];
    const sortedResults = aggregatedResults.sort((a, b) => 
      parseFloat(a.PricesInfo.AmountAfterTax) - parseFloat(b.PricesInfo.AmountAfterTax)
    );
    console.log(sortedResults)
    // // Send the additional results
    res.write(`${JSON.stringify(sortedResults)}`);
    
    // // Store the sorted results in the cache
    cache[cacheKey] = sortedResults;

    res.end();
  } catch (error) {
    console.error('Error fetching hotel data:', error);
    res.status(500).json({ error: 'Failed to fetch hotel data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});