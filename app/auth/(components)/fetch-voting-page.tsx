import { VotingResponse } from "@/types";
import { Stack } from "@chakra-ui/react";
import React from "react";
import CardVoting from "./card-voting";

export type FetchVotingProps = {
	votings: VotingResponse[];
};
const FetchVotingPage: React.FC<FetchVotingProps> = ({ votings }) => {
	console.log(votings);
	return (
		<Stack
			direction={"column"}
			spacing={4}
		>
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

export default FetchVotingPage;
