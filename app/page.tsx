"use client";
import SecurityProvider from "@/providers/security-provider";
import {
	Box,
	Container,
	Heading,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from "@chakra-ui/react";
import HomeLayout from "@/layout/HomeLayout";
import FetchAllPage from "./auth/(components)/fetch-all-page";
import FetchKuisionerPage from "./auth/(components)/fetch-kuisioner-page";
import { useQuery } from "@tanstack/react-query";
import { getAllForms } from "@/helper/_GET";

export default function Home() {
	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["form", "voting"],
		queryFn: getAllForms,
	});
	console.log(data?.data);
	return (
		<SecurityProvider>
			<HomeLayout>
				<Container
					maxW={"6xl"}
					paddingTop={"1rem"}
				>
					<Text
						fontWeight={"semibold"}
						fontSize={"1.2rem"}
						textColor={"blue.700"}
						paddingLeft={"1rem"}
						mt={"1.5rem"}
					>
						Acara
					</Text>

					<Tabs mt={"1rem"}>
						<TabList>
							<Tab>Semua</Tab>
							<Tab>Voting</Tab>
							<Tab>Kuesioner</Tab>
							<Tab>Hasil</Tab>
						</TabList>

						{isLoading && isFetching && <Heading>Loading ...</Heading>}
						{data && (
							<TabPanels>
								<TabPanel>
									<FetchAllPage
										forms={data.data.forms}
										votings={data.data.votings}
									/>
								</TabPanel>
								<TabPanel>
									<p>two!</p>
								</TabPanel>
								<TabPanel>
									<FetchKuisionerPage forms={data.data.forms} />
								</TabPanel>
								<TabPanel>
									<p>hasil!</p>
								</TabPanel>
							</TabPanels>
						)}
					</Tabs>
				</Container>
			</HomeLayout>
		</SecurityProvider>
	);
}
