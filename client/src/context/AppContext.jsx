import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const backEndUrl = import.meta.env.VITE_BACKEND_URL;
  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchCities, setSearchCities] = useState([]);
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();
  //CLECK
  const { user } = useUser();
  const { getToken } = useAuth();

  const fetchUser = async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const { data } = await axios.get(`${backEndUrl}/api/user`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setIsOwner(data?.user?.role === "hotelOwner");
        setSearchCities(data.recentSearchedCities);
      } else {
        // Retry Fetch User Data After 5 Seconds
        setTimeout(fetchUser, 5000);
      }
    } catch (error) {
      toast.error(error.message);
      // console.log(error);
    }
  };

  const fetchRooms = async () => {
    try {
      const myResponse = await axios.get(`${backEndUrl}/api/rooms`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });
      if (myResponse.data.success) {
        setRooms(myResponse.data.rooms);
      } else {
        toast.error(myResponse.data.message);
        console.log(myResponse);
      }
      // console.log(myResponse.data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRooms();
  }, [user]);

  useEffect(() => {
    fetchUser();
    return () => {};
  }, [user]);
  const value = {
    currency,
    backEndUrl,
    navigate,
    user,
    getToken,
    isOwner,
    setIsOwner,
    showHotelReg,
    setShowHotelReg,
    searchCities,
    setSearchCities,
    rooms,
    fetchRooms,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
