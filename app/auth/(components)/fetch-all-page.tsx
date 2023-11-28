import { Stack } from "@chakra-ui/react";
import React from "react";
import CardVoting from "./card-voting";
import { FormResponse } from "../../../types";
import CardForm from "./card-form";
export type FetchAllPageProps = {
	votings: any[];
	forms: FormResponse[];
};
const FetchAllPage: React.FC<FetchAllPageProps> = ({ forms, votings }) => {
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

export default FetchAllPage;
