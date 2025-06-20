import { OpenMethodEnum } from "../enums/open-method.enum";

export class ActionDto {
    /**
     * The icon of the action.
     */
    icon: string;
  
    /**
     * The label of the action (optional).
     */
    label?: string;

    // TODO Να κανουμε documentation
    openMethod: OpenMethodEnum;
  
    /**
     * The link of the action.
     */
    url: string;
  }