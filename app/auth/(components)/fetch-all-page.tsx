import { Stack } from "@chakra-ui/react";
import React from "react";
import CardVoting from "./card-voting";
import { FormResponse, Administrative, VotingResponse } from "../../../types";
import CardForm from "./card-form";
export type FetchAllPageProps = {
	votings: VotingResponse[];
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
			{votings.map((el) => {
				return (
					<CardVoting
						jenisPilihan={el.Administrative.jenisPilihan}
						votingId={el.id}
						key={el.id}
					/>
				);
			})}
		</Stack>
	);
};

export default FetchAllPage;
