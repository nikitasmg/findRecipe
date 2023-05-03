import { CARDS_ONE_DESCRIPTION, CARDS_ONE_DESCRIPTION_EN, CARDS_ONE_IMAGE, CARDS_ONE_ROUTE, CARDS_ONE_TITLE, CARDS_ONE_TITLE_EN, CARDS_TWO_DESCRIPTION, CARDS_TWO_DESCRIPTION_EN, CARDS_TWO_IMAGE, CARDS_TWO_ROUTE, CARDS_TWO_TITLE, CARDS_TWO_TITLE_EN } from "./constants";


export type InfoBlockCardsFields = {
    "params.cards_1.title"?: string;
    "params.cards_1.description"?: string;
    "params.cards_1.title_en"?: string;
    "params.cards_1.description_en"?: string;
    "params.cards_1.image"?: string;
    "params.cards_1.route"?: string;
    "params.cards_2.title"?: string;
    "params.cards_2.description"?: string;
    "params.cards_2.title_en"?: string;
    "params.cards_2.description_en"?: string;
    "params.cards_2.image"?: string;
    "params.cards_2.route"?: string;
  };

  export type NamesInfoBlock = {
    cardOneTitle: typeof CARDS_ONE_TITLE | typeof CARDS_ONE_TITLE_EN;
    cardOneDescription: typeof CARDS_ONE_DESCRIPTION | typeof CARDS_ONE_DESCRIPTION_EN;
    cardOneImage: typeof CARDS_ONE_IMAGE;
    cardOneRoute: typeof CARDS_ONE_ROUTE;
    cardTwoTitle: typeof CARDS_TWO_TITLE | typeof CARDS_TWO_TITLE_EN;
    cardTwoDescription: typeof CARDS_TWO_DESCRIPTION | typeof CARDS_TWO_DESCRIPTION_EN;
    cardTwoImage: typeof CARDS_TWO_IMAGE;
    cardTwoRoute: typeof CARDS_TWO_ROUTE;
  }