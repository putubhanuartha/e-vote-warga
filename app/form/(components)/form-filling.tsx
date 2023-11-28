"use client";
import { InputFormType } from "@/enums";
import { postAnswerForm } from "@/helper/_POST";
import { DynamicFormType } from "@/types";
import {
	Box,
	Button,
	Checkbox,
	CheckboxGroup,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Radio,
	RadioGroup,
	Stack,
	Text,
	Textarea,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { toast } from "react-toastify";

export type FormFillingPropsType = {
	dynamicDataForms: DynamicFormType[];
	title: string;
	id: string;
};
const FormFilling: React.FC<FormFillingPropsType> = ({
	dynamicDataForms,
	id,
	title,
}) => {
	const queryClient = useQueryClient();
	const refForm = useRef(null);
	const router = useRouter();
	const { mutateAsync: postAnswerAsync } = useMutation({
		mutationFn: postAnswerForm,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["form"] }),
	});
	const onSubmit = async (el: React.FormEvent<HTMLFormElement>) => {
		el.preventDefault();
		const form = new FormData(el.currentTarget);
		const values = dynamicDataForms.map((formDynamic) =>
			extractValue(formDynamic.type, formDynamic.id, form, el)
		);
		try {
			const response = await postAnswerAsync({
				data: JSON.stringify(values),
				idForm: id,
			});
			console.log(response);
			toast.success("Terima kasih sudah mengisi form");
			router.replace("/");
		} catch (err) {
			console.error(err);
			toast.error("gagal mengirim data");
		}
	};
	const extractValue = (
		type: InputFormType,
		id: string,
		form: FormData,
		el: React.FormEvent<HTMLFormElement>
	) => {
		switch (type) {
			case InputFormType.text:
				return form.get(id);
			case InputFormType.textarea:
				return form.get(id);
			case InputFormType.checkbox:
				const checkboxes = (
					refForm.current as unknown as HTMLElement
				)?.querySelectorAll(`.${id} input[type="checkbox"]`);
				return Array.from(checkboxes as NodeListOf<HTMLInputElement>)
					.filter((checkbox) => checkbox.checked)
					.map((el) => el.name);
			case InputFormType.radio:
				const radios = (
					refForm.current as unknown as HTMLElement
				)?.querySelectorAll(`span.${id} input[type="radio"]`);
				return Array.from(radios as NodeListOf<HTMLInputElement>)
					.filter((radio) => radio.checked)
					.map((el) => el.value);
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
					KUISIONER {title}
				</Heading>
				<Text textAlign={"center"}>
					RT 08/RW 09, Pondok Maharta Kecamatan Pondok Aren, Keluarahan Pondok
					Kacang Timur
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
				ref={refForm}
				onSubmit={onSubmit}
			>
				<Stack
					direction={"column"}
					rowGap={7}
				>
					{dynamicDataForms.map((el) => {
						const returnInputElement = (
							type: InputFormType,
							option: typeof el.option,
							id: typeof el.id
						) => {
							switch (type) {
								case InputFormType.text:
									return (
										<Input
											name={id}
											id={id}
											type="text"
										/>
									);
								case InputFormType.checkbox:
									return (
										<CheckboxGroup>
											<Stack
												direction={"column"}
												gap={2}
											>
												{option?.map((option) => {
													return (
														<Checkbox
															className={id}
															key={option}
															value={option}
															name={option}
														>
															{option}
														</Checkbox>
													);
												})}
											</Stack>
										</CheckboxGroup>
									);
								case InputFormType.radio:
									return (
										<RadioGroup>
											<Stack
												direction={"column"}
												gap={2}
											>
												{option?.map((option) => {
													return (
														<span
															key={option}
															className={id}
														>
															<Radio
																value={option}
																className={id}
																name={id}
															>
																{option}
															</Radio>
														</span>
													);
												})}
											</Stack>
										</RadioGroup>
									);
								default:
									return (
										<Textarea
											name={id}
											id={id}
										/>
									);
							}
						};
						return (
							<FormControl key={el.id}>
								<FormLabel htmlFor={el.id}>{el.title}</FormLabel>
								{returnInputElement(el.type, el.option, el.id)}
							</FormControl>
						);
					})}
					<Button
						colorScheme="linkedin"
						type="submit"
					>
						Submit
					</Button>
				</Stack>
			</form>
		</Box>
	);
};

export default FormFilling;
