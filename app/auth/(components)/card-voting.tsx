import { ArrowRightIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

export type CardVotingProps = {
	jenisPilihan: string;
	votingId: string;
};
const CardVoting: React.FC<CardVotingProps> = ({ jenisPilihan, votingId }) => {
	const router = useRouter();
	return (
		<Flex
			boxShadow={"lg"}
			alignItems={"center"}
			justifyContent={"space-between"}
			border={"1px"}
			borderColor={"blue.500"}
			borderRadius={"1rem"}
			paddingY={"1rem"}
			paddingX={"0.6rem"}
			width={"100%"}
		>
			<Text
				textColor={"blue.700"}
				fontWeight={"semibold"}
			>
				VOTING PEMILIHAN KETUA <span className="uppercase">{jenisPilihan}</span>
			</Text>
			<IconButton
				onClick={() => {
					router.push(`/voting/${votingId}`);
				}}
				icon={<ArrowRightIcon />}
				aria-label="icon right arrow"
			/>
		</Flex>
	);
};

export default CardVoting;
