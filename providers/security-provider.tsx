"use client";
import { authorizeUser } from "@/helper/_GET";
import { Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SecurityProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const { data, isError, error, isLoading } = useQuery({
		queryKey: ["auth"],
		queryFn: authorizeUser,
		retry: false,
	});
	useEffect(() => {
		if (isError) {
			router.replace("/auth/login");
		}
	}, [isError, router, isLoading]);
	return (
		<>{isLoading || isError ? <Heading>Loading ...</Heading> : children}</>
	);
};

export default SecurityProvider;
