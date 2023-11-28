"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
	FormErrorMessage,
	FormLabel,
	FormControl,
	Input,
	Stack,
	Box,
} from "@chakra-ui/react";
import { Button, Container, Text } from "@chakra-ui/react";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerWarga } from "@/helper/_POST";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type SignupInputType = {
	noKTP: string;
	token: string;
	password: string;
	retypePassword: string;
};
const RegisterPage = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm<SignupInputType>();
	const { mutateAsync: postWargaAsync, error } = useMutation({
		mutationFn: registerWarga,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["warga"] }),
	});
	const onSubmit: SubmitHandler<SignupInputType> = async (data) => {
		console.log(data);
		try {
			const response = await postWargaAsync({
				nik: data.noKTP,
				password: data.password,
				token: data.token,
			});
			console.log(response.status);
			toast.success("Selamat anda telah terdaftar");
			router.replace("/auth/login");
		} catch (err) {
			toast.error("Failed post data");
		}
	};
	return (
		<Container
			display={"flex"}
			maxWidth={"2xl"}
			h={'88vh'}
		>
			<Box
				m={'auto'}
				w={'full'}
				display={"flex"}
				alignItems={"center"}
				flexDirection={"column"}
			>
				<Text
					textColor={"blue.700"}
					fontWeight={"semibold"}
					fontSize={"1.5rem"}
				>
					Register
				</Text>
				<form
					onSubmit={handleSubmit(onSubmit)}
					style={{ width: "100%" }}
				>
					<Stack
						direction={"column"}
						spacing={2}
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
						<FormControl isInvalid={Boolean(errors.token)}>
							<FormLabel htmlFor="token">Token</FormLabel>
							<Input
								type="number"
								id="token"
								placeholder="Token"
								{...register("token", {
									required:
										"Harap masukkan token yang telah dikirim melalui email anda",
									pattern: {
										value: /^\d{5}$/,
										message:
											"Token hanya berupa angka dengan jumlah karakter sebanyak 5",
									},
								})}
							/>
							<FormErrorMessage>{errors?.token?.message}</FormErrorMessage>
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
						<FormControl isInvalid={Boolean(errors.retypePassword)}>
							<FormLabel htmlFor="retypePassword">
								Masukkan kembali password anda
							</FormLabel>
							<Input
								id="retypePassword"
								type="password"
								{...register("retypePassword", {
									required: "Harap masukkan kembali password anda",
									validate: (val: string) => {
										if (watch("password") != val) {
											return "Password anda tidak sesuai";
										}
									},
								})}
							/>
							<FormErrorMessage>
								{errors.retypePassword?.message}
							</FormErrorMessage>
						</FormControl>
						<Text textColor={"blue.600"}>
							* Silahkan cek token pada alamat Email anda !
						</Text>
						<Button
							type="submit"
							colorScheme="linkedin"
						>
							Daftar
						</Button>
					</Stack>
				</form>
			</Box>
		</Container>
	);
};

export default RegisterPage;
