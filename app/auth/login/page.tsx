"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
	FormErrorMessage,
	FormLabel,
	FormControl,
	Input,
	Stack,
	Box,
	ButtonGroup,
} from "@chakra-ui/react";
import { Button, Container, Text } from "@chakra-ui/react";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { loginWarga } from "../../../helper/_POST";
import { useRouter } from "next/navigation";
import Link from "next/link";

type LoginInputType = {
	noKTP: string;
	password: string;
};
const LoginPage = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<LoginInputType>();
	const { mutateAsync: loginWargaAsync, error } = useMutation({
		mutationFn: loginWarga,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["warga"] }),
	});
	const onSubmit: SubmitHandler<LoginInputType> = async (data) => {
		try {
			const response = await loginWargaAsync({
				nik: data.noKTP,
				password: data.password,
			});
			toast.success("sukses login");
			window.localStorage.setItem("token", response.data);
			router.push("/");
		} catch (err) {
			console.log(error);
			toast.error("Failed post data");
		}
	};
	return (
		<Container
			display={"flex"}
			maxWidth={"2xl"}
			h={"88vh"}
		>
			<Box
				display={"flex"}
				alignItems={"center"}
				flexDirection={"column"}
				m={"auto"}
				w={"100%"}
			>
				<Text
					textColor={"blue.700"}
					fontWeight={"semibold"}
					fontSize={"1.5rem"}
				>
					Login
				</Text>
				<form
					onSubmit={handleSubmit(onSubmit)}
					style={{ width: "100%" }}
				>
					<Stack
						direction={"column"}
						spacing={7}
					>
						<FormControl isInvalid={Boolean(errors.noKTP)}>
							<FormLabel htmlFor="noKTP">Nomor KTP</FormLabel>
							<Input
								type="number"
								id="noKTP"
								placeholder="No KTP"
								{...register("noKTP", {
									required: "Harap masukkan nomor KTP anda!",
									pattern: {
										value: /^\d{16}$/,
										message: "Karakter hanya berupa angka sebanyak 16",
									},
								})}
							/>
							<FormErrorMessage>{errors?.noKTP?.message}</FormErrorMessage>
						</FormControl>

						<FormControl isInvalid={Boolean(errors.password)}>
							<FormLabel htmlFor="password">Masukkan password anda</FormLabel>
							<Input
								id="password"
								{...register("password", {
									required: "Masukkan password anda",
								})}
								type="password"
							/>
							<FormErrorMessage>{errors.password?.message}</FormErrorMessage>
						</FormControl>

						<ButtonGroup>
							<Button
								type="submit"
								colorScheme="linkedin"
							>
								Login
							</Button>
							<Button
								type="button"
								colorScheme="linkedin"
							>
								<Link href={"/auth/signup"}>Signup</Link>
							</Button>
						</ButtonGroup>
					</Stack>
				</form>
			</Box>
		</Container>
	);
};

export default LoginPage;
