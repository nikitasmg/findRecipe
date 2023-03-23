import { DeepPartial } from "react-hook-form";
import { MapObjectInput, MapObject } from "~/generated/graphql";

export const prepareFormData = async (
  newValues: Partial<
    MapObject &
      MapObjectInput & {
        connectDocuments: string[];
        disconnectDocuments: string[];
      }
  >,
  values?: DeepPartial<MapObjectInput> | null
) => {
  const input: MapObjectInput = {
    ...(Boolean(values?.id) && { id: values?.id }),
    name: newValues.name,
    area: newValues.area,
    characteristics: newValues.characteristics,
    learn_more: newValues.learn_more,
    floors: newValues.floors,
    gross_boma_area: newValues.gross_boma_area,
    linked_documents: {
      connect: newValues.connectDocuments ?? [],
      disconnect: newValues.disconnectDocuments ?? []
    }
  };

  return input;
};
