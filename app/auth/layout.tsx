import { Box, Heading } from "@chakra-ui/react";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Box>
			<Box backgroundColor={"blue.500"} textColor={'white'} height={'12vh'} display={'flex'}>
				<Heading m={'auto'} fontStyle={"italic"}>E-Vote.</Heading>
			</Box>
			{children}
		</Box>
	);
};

export default AuthLayout;
