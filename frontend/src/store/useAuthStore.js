import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";


export const useAuthStore = create((set, get)=>({
    authUser:null,
    isSigningUp: false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth: true,
    onlineUsers:[],
    socket:null,

    checkAuth: async() =>{
        try {
            const res = await axiosInstance.get("/auth/check");
            // console.log("Auth Check Response:", res.data);
            // This sends a GET request to /auth/check using Axios.
            // axiosInstance is likely a pre-configured Axios instance with a base URL.
            // The response (res) contains user data if the authentication check is successful.
            
            set({ authUser: res.data});
            // If the API call is successful, it sets authUser to the user data received from the backend.
            get().connectSocket()


        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({authUser: null});
        }finally{
            set({ isCheckingAuth:false});
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })

        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data});
            toast.success("Account created successfully");
            get().connectSocket()

        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set ({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);
          set({ authUser: res.data });
          toast.success("Logged in successfully");
    
          get().connectSocket()
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isLoggingIn: false });
        }
      },


      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
          set({ authUser: null });
          toast.success("Logged out successfully");
          get().disconnectSocket();
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },

      updateProfile: async (data) => {
        set({isUpdatingProfile:true})
        try {
          const res = await axiosInstance.put("/auth/update-profile",data);
          set({authUser: res.data});
          toast.success("Profile updated successfully");
        } catch (error) {
          console.log("error in update profile:", error);
          toast.error(error.response.data.message);
        }finally{
          set({isUpdatingProfile:false})
        }
      },


      connectSocket: () => {
        const { authUser } = get();
        if(!authUser || get().socket?.connect) return;
        
        const socket = io(BASE_URL,{
          query:{
            userId: authUser._id,
          },
        });

        socket.connect();
        
        set({ socket:socket });
        socket.on("getOnlineUser", (userIds) => {
          set({ onlineUsers:userIds})
        })
      },

      disconnectSocket: () => {
        if(get().socket?.connected) get().socket.disconnect();
      },



}));