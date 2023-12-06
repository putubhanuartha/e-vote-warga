import HomeLayout from "@/layout/HomeLayout";
import React from "react";

const FormLayout = ({ children }: { children: React.ReactNode }) => {
	return <HomeLayout>{children}</HomeLayout>;
};

export default FormLayout;
