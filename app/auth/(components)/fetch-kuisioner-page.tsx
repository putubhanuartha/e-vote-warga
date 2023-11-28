import React from "react";
import { FormResponse } from "@/types";
import { Stack } from "@chakra-ui/react";
import CardForm from "./card-form";
export type FetchKuisionerPageProps = {
	forms: FormResponse[];
};
const FetchKuisionerPage: React.FC<FetchKuisionerPageProps> = ({ forms }) => {
	return (
		<Stack
			direction={"column"}
			spacing={4}
		>
			{forms.map((el) => {
				return (
					<CardForm
						id={el.id}
						title={el.titleForm}
						key={el.id}
					/>
				);
			})}
		</Stack>
	);
};

export default FetchKuisionerPage;
