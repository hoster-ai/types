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
    openMethod: "ajax_call" | "small_iframe" | "medium_iframe" | "large_iframe"
  
    /**
     * The link of the action.
     */
    url: string;
  }