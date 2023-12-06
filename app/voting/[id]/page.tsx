"use client";
import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import VotingFilling from "../(components)/voting-filling";
import { useQuery } from "@tanstack/react-query";
import { getCandidates } from "@/helper/_GET";
import { Administrative } from "@/types";

export type CandidatesResponse = {
	id: string;
	Candidate: {
		id: string;
		visi: string;
		misi: string;
		photoUrl: string;
		Warga: {
			id: string;
			nama: string;
		};
		Voting: {
			Administrative: Administrative;
		};
	};
};
const VotingPage = ({ params }: { params: { id: string } }) => {
	const { data, isLoading } = useQuery({
		queryKey: ["candidates"],
		queryFn: () => getCandidates(params.id),
	});

	return (
		<Box>
			{isLoading && <Heading>Loading ...</Heading>}
			{data && !isLoading && (
				<VotingFilling
					Administrative={data.data[0].Voting.Administrative}
					Candidates={data.data.map((el: any) => {
						return { ...el.Candidate, VotingCandidateId: el.id };
					})}
					votingId={data.data[0].Voting.id}
				/>
			)}
		</Box>
	);
};

export default VotingPage;
