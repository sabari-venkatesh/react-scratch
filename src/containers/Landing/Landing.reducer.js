import * as actionTypes from "./Landing.types";

const initialState = {
  botInput: [],
  firstname: "",
  responseRender: [],
  setContentName: "",
  messages: [],
  token: {},
  setRole: "",
  newStatus: {},
  availableStatus: [],
  appData: {},
  ecosystem: {
    reactions: false,
    shares: false,
    navigation: false,
    contactus: false
  },
  toggleEventFilter: false,
  toggleMenuFilter: false,
  botSliderIndex: null,
  lastPath: "",
  clonedTemplateData: {},
  emailFormStatus: false,
  referer: "",
  recordingStatus: false,
  confirmSwitch: false,
  formChangesMade: false,
  confirmDiscardChanges: false,
  isSmallTalk: true,
  entityInfo: {},
  preview: false,
  contactusView: "",
  navigationHistory: [],
  reloadMenu: false
};

export const LandingReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.ON_CHANGE:
      return {
        ...state,
        botInput: actions.value
      };
    case actionTypes.ON_RESPONSE_CHANGE:
      return {
        ...state,
        responseRender: actions.value
      };

    case actionTypes.ON_CONTENT_NAME:
      return {
        ...state,
        setContentName: actions.value
      };

    case actionTypes.ON_RESPONSE:
      return {
        ...state,
        messages: actions.value
      };

    case actionTypes.ON_TOKEN_SAVE:
      return {
        ...state,
        token: actions.value
      };

    case actionTypes.SET_ROLE:
      return {
        ...state,
        setRole: actions.value
      };

    case actionTypes.CLOSE_DOC:
      return {
        ...state,
        showContent: false
      };

    case actionTypes.NEW_STATUS:
      return {
        ...state,
        newStatus: actions.value
      };

    case actionTypes.STORE_AVAILABLE_STATUS:
      return {
        ...state,
        availableStatus: actions.value
      };
    case actionTypes.ENABLE_SESSION_RELOAD:
      return {
        ...state,
        session_expiry_popup: actions.value
      };
    case actionTypes.STORE_CONTENT_TYPE:
      return {
        ...state,
        appData: actions.value
      };
    case actionTypes.TOGGLE_ECOSYSTEM:
      let ecosystem = { ...state.ecosystem };
      if (actions.value.ecosystem === "reactions") {
        ecosystem.reactions = !state.ecosystem[actions.value.ecosystem];
        ecosystem.shares = false;
        ecosystem.navigation = false;
        ecosystem.contactus = false;
      } else if (actions.value.ecosystem === "shares") {
        ecosystem.shares = !state.ecosystem[actions.value.ecosystem];
        ecosystem.reactions = false;
        ecosystem.navigation = false;
        ecosystem.contactus = false;
      } else if (actions.value.ecosystem === "navigation") {
        ecosystem.shares = false;
        ecosystem.reactions = false;
        ecosystem.contactus = false;
        if (actions.value.open === false) {
          ecosystem.navigation = actions.value.open;
        } else {
          ecosystem.navigation = !state.ecosystem[actions.value.ecosystem];
        }
      } else if (actions.value.ecosystem === "ecosystem") {
        ecosystem.shares = false;
        ecosystem.reactions = false;
        ecosystem.navigation = false;
        ecosystem.contactus = false;
      } else if (actions.value.ecosystem === "contactus") {
        ecosystem.shares = false;
        ecosystem.reactions = false;
        ecosystem.navigation = false;
        ecosystem.contactus = !state.ecosystem["contactus"];
      }
      return {
        ...state,
        ecosystem: ecosystem
      };
    case actionTypes.TOGGLE_EVENT_FILTER:
      let toggleEventFilter;
      if (actions.value) {
        toggleEventFilter = false;
      } else {
        toggleEventFilter = !state.toggleEventFilter;
      }
      return {
        ...state,
        toggleEventFilter
      };
    case actionTypes.TOGGLE_MENU_FILTER:
      let toggleMenuFilter;
      if (actions.value) {
        toggleMenuFilter = false;
      } else {
        toggleMenuFilter = !state.toggleMenuFilter;
      }
      return {
        ...state,
        toggleMenuFilter: toggleMenuFilter
      };

    case actionTypes.BOT_SLIDER_INDEX:
      return {
        ...state,
        botSliderIndex: actions.value
      };
    case actionTypes.STORE_LAST_PATH:
      return {
        ...state,
        lastPath: actions.value
      };
    case actionTypes.CLONED_TEMPLATE_DATA:
      return {
        ...state,
        clonedTemplateData: actions.value
      };
    case actionTypes.EMAIL_FORM_STATUS:
      return {
        ...state,
        emailFormStatus: actions.value
      };
    case actionTypes.STORE_REFERER:
      return {
        ...state,
        referer: actions.value
      };
    case actionTypes.STORE_RECORDING_STATUS:
      return {
        ...state,
        recordingStatus: actions.value
      };
    case actionTypes.CONFIRM_SWITCH:
      return {
        ...state,
        confirmSwitch: actions.value
      };
    case actionTypes.MONITOR_FORM_CHANGES:
      return {
        ...state,
        formChangesMade: actions.value
      };

    case actionTypes.IS_SMALLTALK:
      return {
        ...state,
        isSmallTalk: actions.value
      };
    case actionTypes.CONFIRM_DISCARD_CHANGES:
      return {
        ...state,
        confirmDiscardChanges: actions.value
      };
    case actionTypes.STORE_ENTITY_INFO:
      return {
        ...state,
        entityInfo: actions.value
      };
    case actionTypes.MAINTAIN_PREVIEW_STATE:
      return {
        ...state,
        preview: actions.value
      };
    case actionTypes.MAINTAIN_CONTACTUS_VIEW:
      return {
        ...state,
        contactusView: actions.value
      };
    case actionTypes.RESET_TRACKING:
      return {
        ...state,
        confirmSwitch: false,
        confirmDiscardChanges: false,
        formChangesMade: false
      };
    case actionTypes.MAINTAIN_NAVIGATION_HISTORY:
      return {
        ...state,
        navigationHistory: actions.value
      };
    case actionTypes.RELOAD_MENU:
      console.log("reload");
      return {
        ...state,
        reloadMenu: !state.reloadMenu
      };
    default:
      return state;
  }
};
