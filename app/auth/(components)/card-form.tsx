import React from "react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
export type CardFormProps = {
	title: string;
	id: string;
};
const CardForm: React.FC<CardFormProps> = ({ title, id }) => {
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
				textTransform={"uppercase"}
			>
				KUISIONER DAN SURVEY {title}
			</Text>
			<IconButton
				onClick={() => {
					router.push(`/form/${id}`);
				}}
				icon={<ArrowRightIcon />}
				aria-label="icon right arrow"
			/>
		</Flex>
	);
};

export default CardForm;
