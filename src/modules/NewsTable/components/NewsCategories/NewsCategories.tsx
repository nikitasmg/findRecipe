import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import clsx from "clsx";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { NewsCategory, useNewsCategoriesQuery, useNewsQuery } from "~/generated/graphql";
import { useTranslation } from "react-i18next";

type NewsCategoryButtonProps = {
  onClick: () => void;
  newsCategory?: NewsCategory;
  allNews?: boolean;
  textColor?: string;
  disabled?: boolean;
};

type NewsCategoriesProps = {
  handleChangeFilter: (name: string, value: unknown) => void;
  handleSubmit: () => void;
};

const NewsCategoryButton: React.FC<NewsCategoryButtonProps> = ({
  onClick,
  newsCategory,
  allNews,
  textColor,
  disabled
}) => {
  const buttonClassName = "flex items-center gap-[6px] h-[44px] rounded-none normal-case";
  const badgeClassName = clsx(
    "bg-mainBg rounded-[13px] px-[6px] text-[10px] h-[16px] font-medium text-secondaryText",
    textColor
  );

  const { t } = useTranslation();

  const variables = !allNews
    ? {
        filter: [{ column: "category", value: `${newsCategory?.id}` }]
      }
    : {};

  const client = useGraphqlClient();

  const { data, isLoading } = useNewsQuery(client, variables, {
    refetchOnMount: true
  });

  return (
    <Button className={buttonClassName} onClick={onClick} disabled={disabled}>
      <Typography className={clsx("font-medium text-[14px] text-mainText", textColor)}>
        {!allNews ? newsCategory?.name : t("All news")}
      </Typography>
      <Box className={badgeClassName}>
        {isLoading ? (
          <Box className='flex h-full items-center justify-center'>
            <CircularProgress size={10} />
          </Box>
        ) : (
          data?.news?.paginatorInfo.total
        )}
      </Box>
    </Button>
  );
};

export const NewsCategories: React.FC<NewsCategoriesProps> = ({
  handleChangeFilter,
  handleSubmit
}) => {
  const [currentCategoryId, setCurrentCategoryId] = useState<number>(0);
  const client = useGraphqlClient();

  const { data: categories, isLoading } = useNewsCategoriesQuery(
    client,
    {},
    { refetchOnMount: true }
  );

  const handleClick = (categoryId: number) => {
    handleChangeFilter("category", categoryId);
    setCurrentCategoryId(categoryId);
  };

  useEffect(() => {
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategoryId]);

  return (
    <Box className='flex items-center flex-wrap bg-primary-5 rounded-lg gap-2 px-[16px] w-fit min-h-[44px] mb-[10px]'>
      {isLoading && (
        <Box className='flex h-full items-center justify-center'>
          <CircularProgress size={14} />
        </Box>
      )}
      {!isLoading && (
        <>
          <NewsCategoryButton
            textColor={currentCategoryId === 0 ? "!text-primary" : ""}
            allNews
            onClick={() => handleClick(0)}
          />
          {categories?.newsCategories.map((category) => (
            <NewsCategoryButton
              key={category.id}
              newsCategory={category}
              textColor={currentCategoryId === category.id ? "!text-primary" : ""}
              onClick={() => handleClick(category.id)}
              disabled={false}
            />
          ))}
        </>
      )}
    </Box>
  );
};
