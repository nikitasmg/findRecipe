import { compose, curry, equals, filter, not, prop } from "rambda";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CreateNewsCategoryMutationVariables,
  UpdateNewsCategoryMutationVariables
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useRequestState } from "~/shared/hooks/useRequestState";
import { useCompilationsStore } from "~/shared/stores/compilations";
import { CompilationItem } from "~/shared/types/Compilation";
import { useAlertsStore } from "~/shared/stores/alerts";

export const useCompilations = (id: number) => {
  const [rows, setRows] = useState<CompilationItem[]>([]);

  const { variables, activeOrder, handleChangeOrder } = useRequestState("name");

  const compilationsHooks = useCompilationsStore((state) => state.compilationsHooks);

  const compilations = useCompilationsStore((state) => state.compilations);

  const addAlert = useAlertsStore((state) => state.addAlert);

  const errorAlert = compose(curry(addAlert)("error"), prop("message"));

  const { t } = useTranslation();

  const { get, create, update, remove } = compilationsHooks[id];

  const client = useGraphqlClient();

  const { data, isLoading } = get.hook(client, variables);

  const { mutateAsync: createMutation, isLoading: isCreateLoading } = create.hook(client, {
    onError: errorAlert
  });

  const { mutateAsync: updateMutation, isLoading: isUpdateLoading } = update.hook(client, {
    onError: errorAlert
  });

  const { mutateAsync: removeMutation, isLoading: isDeleteLoading } = remove.hook(client, {
    onError: errorAlert
  });

  const isMutationLoading = isCreateLoading || isUpdateLoading || isDeleteLoading;

  const compilationMeta = compilations.find(compose(equals(id + 1), prop("id")));

  const getUpdatedRows = curry((id: string, newValues: CompilationItem, rows: CompilationItem[]) =>
    rows.reduce((res: CompilationItem[], row) => {
      if (row.id === id) {
        return res.concat({ ...row, ...newValues });
      }

      return res.concat(row);
    }, [])
  );

  const onCreate = (args: CreateNewsCategoryMutationVariables) => {
    createMutation(args).then((data) => {
      const newItem = data[create.key as keyof typeof data] as unknown as CompilationItem;

      setRows(getUpdatedRows("new", newItem));
    });
  };

  const onUpdate = (args: UpdateNewsCategoryMutationVariables) => {
    const selectedId = args?.id;

    if (!selectedId) {
      addAlert("warning", t("Row not selected"));
    }

    updateMutation(args).then((data) => {
      const newItem = data[update.key as keyof typeof data] as unknown as CompilationItem;

      setRows(getUpdatedRows(newItem.id, newItem));
    });
  };

  const removeRowById = (id: string) =>
    filter<CompilationItem>(compose(not, equals(id), prop("id")));

  const onDelete = (id: string) => {
    if (id === "new") {
      return setRows(removeRowById(id));
    }

    removeMutation({ id }).then(() => {
      setRows(removeRowById(id));
    });
  };

  useEffect(() => {
    setRows(data?.[get.key as keyof typeof data] as CompilationItem[]);
  }, [data, get]);

  return {
    rows,
    setRows,
    isLoading,
    isMutationLoading,
    create: onCreate,
    update: onUpdate,
    remove: onDelete,
    compilationMeta,
    handleChangeOrder,
    activeOrder
  };
};
