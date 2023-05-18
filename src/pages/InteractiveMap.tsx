import React from "react";
import { InteractiveMap as Map } from "~/modules/InteractiveMap";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { PageTableTitle } from "~shared/components/PageTableTitle";
import { TableWrapper } from "~shared/components/TableWrapper";
import { useInteractiveMapStore } from "~stores/interactiveMap";

export const InteractiveMap: React.FC = () => {
  const { count, isLoading } = useInteractiveMapStore((state) => ({
    count: state.count,
    isLoading: state.isLoading
  }));

  return (
    <PageWrapper>
      <PageTableTitle
        title='Interactive map'
        sitePath='ntc-in-surgut'
        count={count}
        isLoading={isLoading}
      />
      <TableWrapper>
        <Map />
      </TableWrapper>
    </PageWrapper>
  );
};
