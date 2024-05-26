"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var axios_1 = require("axios");
var app = (0, express_1.default)();
var port = process.env.PORT || 5000;
var API_URL = 'https://gya7b1xubh.execute-api.eu-west-2.amazonaws.com/default/HotelsSimulator';
// In-memory cache
var cache = {};
app.use(express_1.default.json());
app.post('/api/search', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query_1, ski_site, from_date, to_date, group_size, cacheKey, initialResults, largerGroupSizes, additionalResults, aggregatedResults, sortedResults, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                query_1 = req.body.query;
                ski_site = query_1.ski_site, from_date = query_1.from_date, to_date = query_1.to_date, group_size = query_1.group_size;
                cacheKey = "".concat(ski_site, "-").concat(from_date, "-").concat(to_date, "-").concat(group_size);
                // Set up Server-Sent Events (SSE)
                res.setHeader('Content-Type', 'text/event-stream');
                res.setHeader('Cache-Control', 'no-cache');
                res.setHeader('Connection', 'keep-alive');
                // Check if the results are already in the cache
                if (cache[cacheKey]) {
                    cache[cacheKey].forEach(function (result) {
                        res.write("data: ".concat(JSON.stringify(result), "\n\n"));
                    });
                    return [2 /*return*/, res.end()];
                }
                return [4 /*yield*/, fetchHotelData(query_1)];
            case 1:
                initialResults = _a.sent();
                // Send the initial results
                initialResults.forEach(function (result) {
                    res.write("data: ".concat(JSON.stringify(result), "\n\n"));
                });
                largerGroupSizes = [group_size + 1, group_size + 2];
                return [4 /*yield*/, Promise.all(largerGroupSizes.map(function (size) { return __awaiter(void 0, void 0, void 0, function () {
                        var additionalQuery;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    additionalQuery = __assign(__assign({}, query_1), { group_size: size });
                                    return [4 /*yield*/, fetchHotelData(additionalQuery)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); }))];
            case 2:
                additionalResults = _a.sent();
                aggregatedResults = __spreadArray(__spreadArray([], initialResults, true), additionalResults.flat(), true);
                sortedResults = aggregatedResults.sort(function (a, b) { return a.price - b.price; });
                // Send the additional results
                sortedResults.forEach(function (result) {
                    res.write("data: ".concat(JSON.stringify(result), "\n\n"));
                });
                // Store the sorted results in the cache
                cache[cacheKey] = sortedResults;
                res.end();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error('Error fetching hotel data:', error_1);
                res.status(500).json({ error: 'Failed to fetch hotel data' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
var fetchHotelData = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var requestBody, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                requestBody = { query: query };
                return [4 /*yield*/, axios_1.default.post(API_URL, requestBody)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
        }
    });
}); };
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
