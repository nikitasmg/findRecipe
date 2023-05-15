import React from "react";
import { useParams } from "react-router-dom";
import { CompilationEditTable } from "~/modules/CompilationEditTable";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { DetailsHead } from "~shared/components/DetailsHead";
import { Box } from "@mui/material";
import { useNavigationBack } from "~shared/hooks/useBackClick";
import { useLang } from "~shared/hooks/useLang";
import { Panel } from "~/shared/components/Panel";

export const CompilationsEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const handleGoBack = useNavigationBack();

  const { lang, setLang } = useLang();

  return (
    <PageWrapper>
      <Panel className='bg-secondaryBg !px-0'>
        <Box className='flex flex-col gap-6 items-center'>
          <DetailsHead
            title='Compilations editing'
            onBackClick={handleGoBack}
            onLangChange={setLang}
            hideSaveButton
          />
          <CompilationEditTable id={Number(id) - 1} lang={lang} />
        </Box>
      </Panel>
    </PageWrapper>
  );
};
