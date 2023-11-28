"use client";
import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import React from "react";
import { jwtDecode } from "jwt-decode";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	let decoded;
	if (typeof window !== undefined) {
		decoded =
			window && jwtDecode(window.localStorage.getItem("token") as string);
	}
	const { nama } = decoded as { nama: string };
	return (
		<>
			<Box
				top={0}
				left={0}
				right={0}
				position={"fixed"}
				height={"12vh"}
				display={"flex"}
				justifyContent={"center"}
				alignItems={"center"}
				bgColor={"blue.500"}
			>
				<Container
					textColor={"white"}
					maxW={"6xl"}
					display={"flex"}
					alignItems={"center"}
					justifyContent={"space-between"}
				>
					<NextLink href={"/"}>
						<Stack>
							<Heading fontStyle={"italic"}>E-Vote.</Heading>
							<Text>Cepat, mudah, dan transparan</Text>
						</Stack>
					</NextLink>
					<Box
						paddingX={"1.5rem"}
						paddingY={"0.5rem"}
						border={"2px"}
						borderColor={"white"}
						borderRadius={"full"}
					>
						<Text>{nama} - Warga</Text>
					</Box>
				</Container>
			</Box>
			<Container
				maxW={"6xl"}
				paddingTop={"12vh"}
				minH={"100vh"}
			>
				{children}
			</Container>
			<Box>
				<Box
					textColor={"white"}
					height={"8vh"}
					bgColor={"blue.500"}
					display={"flex"}
					alignItems={"center"}
					justifyContent={"space-between"}
				>
					<Container
						maxW={"6xl"}
						display={"flex"}
						alignItems={"center"}
						justifyContent={"space-between"}
					>
						<Link
							fontSize={"1.2rem"}
							href="/about-us"
							as={NextLink}
						>
							About us
						</Link>
						<Link
							fontSize={"1.2rem"}
							as={NextLink}
							href="/help"
						>
							Help
						</Link>
						<Link
							fontSize={"1.2rem"}
							as={NextLink}
							href="/faq"
						>
							FAQ{" "}
						</Link>
						<Link
							fontSize={"1.2rem"}
							as={NextLink}
							href="/terms"
						>
							Terms
						</Link>
						<Link
							fontSize={"1.2rem"}
							as={NextLink}
							href="/privacy"
						>
							Privacy
						</Link>
					</Container>
				</Box>
				<Box
					textColor={"white"}
					height={"12vh"}
					bgColor={"blue.700"}
					display={"flex"}
					alignItems={"center"}
					justifyContent={"center"}
				>
					<Stack>
						<Heading
							fontSize={"2rem"}
							fontStyle={"italic"}
							textAlign={"center"}
						>
							E-Vote.
						</Heading>
						<Text textAlign={"center"}>
							Copyright ©2023 e-vote. | Powered by Vercel & Express Js{" "}
						</Text>
					</Stack>
				</Box>
			</Box>
		</>
	);
};

export default HomeLayout;
