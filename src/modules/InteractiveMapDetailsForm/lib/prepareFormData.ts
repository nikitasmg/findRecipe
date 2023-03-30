import { DeepPartial } from "react-hook-form";
import { MapObjectInput, MapObject, LikedDocumentPivotInput } from "~/generated/graphql";

export const prepareFormData = async (
  newValues: Partial<
    MapObject &
      MapObjectInput & {
        connectDocuments: string[];
        disconnectDocuments: string[];
        syncWithoutDetaching: LikedDocumentPivotInput[];
        updateDocuments: LikedDocumentPivotInput[];
      }
  >,
  values?: DeepPartial<MapObjectInput> | null
) => {
  const input: MapObjectInput = {
    ...(Boolean(values?.id) && { id: values?.id }),
    name: newValues.name,
    name_en: newValues.name_en,
    area: newValues.area,
    characteristics: newValues.characteristics,
    characteristics_en: newValues.characteristics_en,
    learn_more: newValues.learn_more,
    floors: newValues.floors,
    floors_en: newValues.floors_en,
    gross_boma_area: newValues.gross_boma_area,
    linked_documents: {
      connect: newValues.connectDocuments ?? [],
      disconnect: newValues.disconnectDocuments ?? [],
      syncWithoutDetaching: newValues.updateDocuments ?? []
    }
  };

  return input;
};
