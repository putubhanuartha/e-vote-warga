import { JenisPilihan } from "@/enums";
import { postChooseCandidate } from "@/helper/_POST";
import { Administrative, Candidate } from "@/types";
import {
	Box,
	Flex,
	Heading,
	Stack,
	Text,
	Image,
	Button,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import React from "react";
import { toast } from "react-toastify";

export type VotingFillingProps = {
	Candidates: Candidate[];
	votingId: string;
	Administrative: Administrative;
};
const VotingFilling: React.FC<VotingFillingProps> = ({
	Candidates,
	votingId,
	Administrative,
}) => {
	const router = useRouter();
	const { mutateAsync: postChooseCandidateAsync } = useMutation({
		mutationFn: postChooseCandidate,
	});
	const handleSubmit = async (el: any) => {
		el.preventDefault();
		const dataForm = new FormData(el.currentTarget);
		const votingCandidateId = dataForm.get("candidate");
		try {
			await postChooseCandidateAsync({
				candidateVoteId: votingCandidateId as string,
			});
			toast.success("Terima kasih telah melakukan voting");
			router.push("/");
		} catch (err) {
			console.error(err);
			toast.error("Error post data");
		}
	};

	return (
		<Box
			py={"2rem"}
			display={"flex"}
			flexDir={"column"}
			rowGap={4}
		>
			<Stack
				bgColor={"blue.400"}
				textColor={"white"}
				py={"1.5rem"}
				px={"2rem"}
				rounded={"lg"}
				spacing={4}
			>
				<Heading
					textAlign={"center"}
					textTransform={"uppercase"}
				>
					PEMILIHAN{" "}
					<span className="uppercase">{Administrative.jenisPilihan}</span>
				</Heading>
				<Text textAlign={"center"}>
					{Administrative.jenisPilihan === JenisPilihan.rt &&
						`RT ${Administrative.rt}`}{" "}
					RW {Administrative.rw}, Kecamatan {Administrative.kecamatan},
					Kelurahan {Administrative.kelurahan}
				</Text>
			</Stack>
			<Text
				fontSize={"1.1rem"}
				fontWeight={"semibold"}
				textColor={"blue.700"}
			>
				Silahkan diisi
			</Text>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col"
			>
				<Stack
					direction={"row"}
					justifyContent={"space-evenly"}
				>
					{Candidates.map((el, index) => {
						return (
							<Flex
								key={el.id}
								alignItems={"center"}
								flexDirection={"column"}
								gap={5}
							>
								<Box
									shadow={"lg"}
									borderRadius={"lg"}
									overflow={"clip"}
								>
									<label
										htmlFor={el.id}
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										<Image
											alt={el.id}
											src={el.photoUrl}
											h={"20rem"}
											w={"17rem"}
											objectFit={"cover"}
										/>
										<Box
											display={"flex"}
											flexDirection={"column"}
											alignItems={"center"}
											paddingY={6}
											gap={2}
										>
											<Heading
												color={"blue.500"}
												textTransform={"uppercase"}
												fontSize={"1.5rem"}
											>
												Calon ke - {index + 1}
											</Heading>
											<Text
												fontWeight={"semibold"}
												fontSize={"1.1rem"}
												textAlign={"center"}
											>
												{el.Warga.nama}
											</Text>
											<Box>
												<Text textAlign={"center"}>{el.visi}</Text>
												<Text textAlign={"center"}>{el.misi}</Text>
											</Box>
										</Box>
									</label>
								</Box>
								<input
									value={el.VotingCandidateId}
									defaultChecked={index === 0}
									id={el.id}
									name="candidate"
									type="radio"
								/>
							</Flex>
						);
					})}
				</Stack>
				<Button
					type="submit"
					className="mt-4 w-fit block mx-auto "
				>
					Konfirmasi Pilihan
				</Button>
			</form>
		</Box>
	);
};

export default VotingFilling;
