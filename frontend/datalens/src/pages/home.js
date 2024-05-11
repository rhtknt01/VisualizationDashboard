import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setApiDataList, setSwotData, setUsageTime, setApiCallsCount } from "../redux_store/features/dashboardSlice";
import { getSwot } from "../analysis/calculations";
import Hero from "../components/heroSection";
import Navbar from "../components/navbar";
import MainContainer from "../components/mainContainer";
import weightsData from "../analysis/weights";

function Home() {
  const url = "http://127.0.0.1:8000/api/visualization/";
  const usageUrl = "http://127.0.0.1:8000/usageMeter/";
  const apiCallsUrl = "http://127.0.0.1:8000/apiCallsCount/";
  const dispatch = useDispatch();
  const usageTime = useSelector((state) => state.dashboardStore.usageTime);
  const apiDataList = useSelector((state) => state.dashboardStore.apiDataList);
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const calculateUsageTime = useCallback(() => {
    const currentTime = new Date();
    const elapsedTime = (currentTime - startTime) / 60000; // Calculate elapsed time in minutes
    return Math.floor(elapsedTime);
  }, [startTime]);

  const sendUsageDataToServer = useCallback(async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "usage": usageTime }),
      };
      const response = await fetch(usageUrl, requestOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonMessage = await response.json();
      console.log(jsonMessage);
    } catch (error) {
      console.error("Error sending usage data:", error);
    }
  }, [usageTime, usageUrl]);

  const fetchUsageData = useCallback(async () => {
    try {
      const response = await fetch(usageUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonResponse = await response.json();
      dispatch(setUsageTime(jsonResponse.usage));
    } catch (error) {
      console.error("Error fetching usage data:", error);
    }
  }, [dispatch, usageUrl]);

  const fetchApiCalls = useCallback(async () => {
    try {
      const response = await fetch(apiCallsUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonResponse = await response.json();
      dispatch(setApiCallsCount(jsonResponse.count));
    } catch (error) {
      console.error("Error fetching usage data:", error);
    }
  }, [dispatch, apiCallsUrl]);

  const fetchApiData = useCallback(async () => {
    setLoading(true);

    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 'all': 'all' }),
      };
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      dispatch(setApiDataList(jsonData));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, url]);

  const handleAppClose = () => {
    setEndTime(new Date());
  };

  useEffect(() => {
    fetchApiCalls();
    window.addEventListener("beforeunload", handleAppClose);
    return () => {
      window.removeEventListener("beforeunload", handleAppClose);
    };
  }, [fetchApiCalls]);

  useEffect(() => {
    if (endTime) {
      sendUsageDataToServer();
    }
  }, [endTime, sendUsageDataToServer]);

  useEffect(()=>{
    fetchApiData(); // Fetch initial data when the component mounts or reloads
      fetchUsageData(); // Fetch usage data when the component mounts or reloads

  },[fetchApiData,fetchUsageData]);
  useEffect(() => {
    if (!usageTime) {
      const currentTime = new Date(); // Get the current time
      setStartTime(currentTime); // Set start time when the component mounts or reloads
    }
  }, [startTime]);

  useEffect(() => {
    // Update usage time every minute
    const interval = setInterval(() => {
      if (usageTime) {
        const newTime = calculateUsageTime();
        dispatch(setUsageTime(newTime+usageTime));
      }
    }, 60000); // 60000 milliseconds = 1 minute
    return () => clearInterval(interval);
  }, [startTime, calculateUsageTime, dispatch]);

  useEffect(() => {
    if (!loading) {
      const data = apiDataList ? getSwot(apiDataList, weightsData) : null;
      dispatch(setSwotData(data));
    }
  }, [apiDataList, loading, dispatch]);

  return (
    <div className="home_page">
      <Navbar />
      <Hero />
      <MainContainer />
    </div>
  );
}

export default Home;
