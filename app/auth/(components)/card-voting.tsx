import { ArrowRightIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";

const CardVoting = () => {
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
				VOTING PEMILIHAN KETUA RT
			</Text>
			<IconButton
				icon={<ArrowRightIcon />}
				aria-label="icon right arrow"
			/>
		</Flex>
	);
};

export default CardVoting;
