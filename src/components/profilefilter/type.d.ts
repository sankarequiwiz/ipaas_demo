export type ServiceProfileDataTypes = {
    "href": string,
    "type": string,
    "id": string,
    "name": string,
    "description": string,
    "state": string,
    "image": Image,
    "visibility": string,
    "accessPointConfigs"?: {
         "type": string,
         "label": string,
         "recommended": boolean,
         "isBeta": boolean,
         "apiConfig": {
              "integrationKey": string
         },
         "assistanceInfo": {
              "processSteps": {
                   "title": string,
                   "subTitle": string,
                   "description": string
              }[]
         },
         "links": AssetsTypes[],
         "fieldTypeConfigs": {
              "type": string,
              "label": string,
              "name": string,
              "regex"?: string,
              "required": boolean,
              "securedHttpProtocolRequired": boolean,
              "consentInfo": {
                   "title": string,
                   "description": string
              },
              "links": AssetsTypes[],
              "assistanceInfo": {
                   "processSteps": {
                        "title": string,
                        "subTitle": string,
                        "description": string
                   }[]
              }
         }[]
    }[],
    "notifications"?: [],
    "tags"?: [],
    "attributes"?: [],
    "links"?: []
    "organization"?: CommonDataType,
    "changeLog"?: ChangeLogType
};

type ProfilePanelTypes = {
    services?: ServiceDataTypes[]
    type?: any
} & ServiceProfileDataTypes;