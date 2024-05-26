"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const defaultProvider_1 = require("./providers/defaultProvider");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// In-memory cache
const cache = {};
// Default provider instance
const defaultProvider = new defaultProvider_1.DefaultProvider();
app.use(express_1.default.json());
app.post('/api/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            cache[cacheKey].forEach((result) => {
                res.write(`data: ${JSON.stringify(result)}\n\n`);
            });
            return res.end();
        }
        const initialResults = yield defaultProvider.fetchHotelData(query);
        // Send the initial results
        initialResults.forEach((result) => {
            res.write(`data: ${JSON.stringify(result)}\n\n`);
        });
        const largerGroupSizes = [group_size + 1, group_size + 2];
        const additionalResults = yield Promise.all(largerGroupSizes.map((size) => __awaiter(void 0, void 0, void 0, function* () {
            const additionalQuery = Object.assign(Object.assign({}, query), { group_size: size });
            return yield defaultProvider.fetchHotelData(additionalQuery);
        })));
        const aggregatedResults = [...initialResults, ...additionalResults.flat()];
        const sortedResults = aggregatedResults.sort((a, b) => a.price - b.price);
        // Send the additional results
        sortedResults.forEach((result) => {
            res.write(`data: ${JSON.stringify(result)}\n\n`);
        });
        // Store the sorted results in the cache
        cache[cacheKey] = sortedResults;
        res.end();
    }
    catch (error) {
        console.error('Error fetching hotel data:', error);
        res.status(500).json({ error: 'Failed to fetch hotel data' });
    }
}));
/* To add a new API provider:
 *
 * 1. Create a new class that implements the `Provider` interface in the `providers` directory.
 * 2. Import the new provider class in the `index.ts` file.
 * 3. Create an instance of the new provider.
 * 4. Use the new provider instance to fetch data from the new API.
 * 5. Aggregate the results from multiple providers as needed.
 */
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
