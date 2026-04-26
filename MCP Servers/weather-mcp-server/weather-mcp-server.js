import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { fetchWeatherApi } from "openmeteo";

// Basically we are creating an MCP Server

// using standard IO as the transport layer - Console Based
// others are HTTP, WebSocket, MCC, like transaport layers
const WeatherMcpServer = new McpServer({
    name: "Weather MCP Server",
    description:
        "A MCP server that provides weather information using the Open-Meteo API.",
    version: "1.0.0",
});

// register/add a weather tool to our server
WeatherMcpServer.registerTool(
    "get_weather",
    {
        title: "Get Current Weather",
        description:
            "Fetches the current weathe rinformation for the latitude, and longitude",
        inputSchema: {
            latitude: z.number().describe("Latitude corrdinate"),
            longitude: z.number().describe("Longitude coordinate"),
        },
    },
    async ({ latitude, longitude }) => {
        try {
            const params = {
                latitude,
                longitude,
                current: [
                    "temperature_2m",
                    "relative_humidity_2m",
                    "apparent_temperature",
                    "is_day",
                    "precipitation",
                    "rain",
                    "wind_speed_10m",
                ],
                wind_speed_unit: "mph",
                temperature_unit: "fahrenheit",
                precipitation_unit: "inch",

            };

            const OPENMETEO_API_BASE_URL = `https://api.open-meteo.com/v1`;
            const responses = await fetchWeatherApi(`${OPENMETEO_API_BASE_URL}/forecast`, params);

            // Process first location
            const response = responses[0];

            // fetch current weather information from the response[0]
            const current = response.current();

            // Note: The order of weather variables in the URL query and the indices below need to match
            const weatherData = {
                temperature2m: current.variables(0).value(),
                relativeHumidity2m: current.variables(1).value(),
                apparentTemperature: current.variables(2).value(),
                isDay: current.variables(3).value() === 1,
                precipitation: current.variables(4).value(),
                rain: current.variables(5).value(),
                windSpeed10m: current.variables(6).value(),
            };

            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(weatherData, null, 2)
                    }
                ],
                structuredContent: {
                    temperature: {
                        current: current.variables(0).value(),
                        feelsLike: current.variables(2).value(),
                        unit: "fahrenheit",
                    },
                    humidity: {
                        value: current.variables(1).value(),
                        unit: "percent",
                    },
                    wind: {
                        speed: current.variables(6).value(),
                        unit: "mph",
                    },
                    precipitation: {
                        total: current.variables(4).value(),
                        rain: current.variables(5).value(),
                        unit: "inches",
                    },
                    conditions: {
                        isDay: current.variables(3).value() === 1,
                        dayNight: current.variables(3).value() === 1 ? "day" : "night",
                    },
                }
            }

        } catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error fetching weather information: ${error.message}`,
                    },
                ],
            };
        }
    },
);


// start receiving messages on stdin, and sending message on stdout
const stdioTransportObject = new StdioServerTransport();
WeatherMcpServer.connect(stdioTransportObject);



// Claude Code (MCP Servers - config file)

/**
 * "weather-server": {
 * "command": "/path/to/node",
 * "args": ["/path/to/weather.js"],
 * "env": {
 *     "NODE_OPTIONS": "--no-deprecation"
 * }
 * }
 */