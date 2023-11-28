"use client";
import React from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import SecurityProvider from "./security-provider";

const breakpoints = {
	base: "0px",
	sm: "320px",
	md: "768px",
	lg: "960px",
	xl: "1200px",
	"2xl": "1536px",
};

const queryClient = new QueryClient();
const theme = extendTheme({ breakpoints });
const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<CacheProvider>
			<ChakraProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<ToastContainer
						position="top-right"
						autoClose={1000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="light"
					/>
					{children}
				</QueryClientProvider>
			</ChakraProvider>
		</CacheProvider>
	);
};

export default Providers;
