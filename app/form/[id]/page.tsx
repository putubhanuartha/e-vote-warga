"use client";
import { getForm } from "@/helper/_GET";
import { Box, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import FormFilling from "../(components)/form-filling";

const FormPage = ({ params }: { params: { id: string } }) => {
	const { data, isLoading } = useQuery({
		queryKey: ["form"],
		queryFn: () => getForm(params.id),
	});
	return (
		<Box>
			{isLoading && <Heading>Loading ...</Heading>}
			{data && (
				<FormFilling
					dynamicDataForms={JSON.parse(data.data.contentForm)}
					id={data.data.id}
					title={data.data.titleForm}
				/>
			)}
		</Box>
	);
};

export default FormPage;
