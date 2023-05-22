/* eslint-disable import/no-named-as-default-member */
import { fetchDataHome } from "@/api-client";
import Home from "@/components/home";
import { PrimaryLayout } from "@/layouts";
import { Box, Stack, Typography } from "@mui/material";
import { GetStaticProps, GetStaticPropsContext } from "next";
import Image from "next/image";
import { ReactElement } from "react";

export interface IProps {
  data: any[];
}

const HomePage = ({ data }: IProps) => {
  console.log("data:", data);
  return (
    <>
      <Home />
      <Stack
        direction={"row"}
        sx={{
          position: "relative",
          aspectRatio: `calc(${data?.length ?? 0 / 1})`,
          bgcolor: "#FFFFFF",
          overflow: "hidden",
          width: "100%",
        }}
      >
        {data?.length &&
          data.map((item, index) => {
            return (
              <Box
                key={index}
                flex={1}
                position="relative"
                sx={{ cursor: "pointer" }}
              >
                <Image src={item.imgUrl} layout="fill" alt="img" />

                <Typography
                  variant="h5"
                  letterSpacing={"1px"}
                  textAlign="center"
                  position={"absolute"}
                  sx={{ bottom: 40, left: 0, right: 0 }}
                >
                  {item.name}
                </Typography>
              </Box>
            );
          })}
      </Stack>
    </>
  );
};

export default HomePage;
HomePage.getLayout = function getLayout(page: ReactElement) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export const getStaticProps: GetStaticProps<IProps> = async (
  context: GetStaticPropsContext
) => {
  const result = await fetchDataHome("categories");
  return {
    props: {
      data: result ?? [],
    },
  };
};
