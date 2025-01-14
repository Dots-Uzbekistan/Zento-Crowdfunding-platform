import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./ViewRateChart.module.scss";

const ViewsRateChart = () => {
  const [viewsData, setViewsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchViewsRate = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await axios.get(
            "http://161.35.19.77:8001/api/investments/dashboard/views-rate/",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("API Response:", response.data);

          if (Array.isArray(response.data)) {
            let formattedData = response.data
              .map((item) => {
                if (
                  item.monthly_views &&
                  typeof item.monthly_views === "object"
                ) {
                  return Object.entries(item.monthly_views).map(
                    ([month, views]) => {
                      const parsedDate = moment(month, [
                        "YYYY-MM",
                        "MM-YYYY",
                        "MMM YYYY",
                      ]).toDate(); // Try multiple formats

                      return {
                        month: isNaN(parsedDate) ? month : parsedDate,
                        views: Number(views),
                        campaign: item.campaign_name,
                      };
                    }
                  );
                }
                return [];
              })
              .flat();

            // Sort data by month
            formattedData.sort((a, b) => moment(a.month).diff(moment(b.month)));

            console.log("Formatted Data:", formattedData);

            setViewsData(formattedData);
          } else {
            throw new Error("Unexpected data format");
          }
        } else {
          setError("No token found. Please log in.");
        }
      } catch (error) {
        console.error(
          "There was an error fetching the views rate data:",
          error
        );
        setError("Failed to fetch views rate data.");
      } finally {
        setLoading(false);
      }
    };

    fetchViewsRate();
  }, []);

  return (
    <div className={styles.viewsRateChart}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      ) : viewsData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={viewsData}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              tickFormatter={(date) =>
                moment(date).isValid() ? moment(date).format("MMM YYYY") : date
              }
              angle={-45} // Rotate labels to avoid overlapping
              textAnchor="end" // Align text
              interval={0} // Display all labels
            />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              formatter={(value) => new Intl.NumberFormat().format(value)}
            />
            <Area
              type="monotone"
              dataKey="views"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorViews)"
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <p>No data for the views rate chart.</p>
      )}
    </div>
  );
};

export default ViewsRateChart;
