import type { IntegrationDataFormat } from '@/features/integration/types';

// NOTE:
// - This is a checked-in sample workflow used as the default `sample_1` workflow.
// - The editorContent is shared between nodes to reduce duplication; JSON export will still contain full content.

const editorContent = [
  {
    "id": "d54b13b4-d949-43e8-9d82-17880306aeb7",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "center"
    },
    "content": [
      {
        "type": "text",
        "text": "Student-Led Commission Project Agreement",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "cdbdb0d4-8d42-4d0d-a0d2-c8342e0ce5ea",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "center"
    },
    "content": [
      {
        "type": "text",
        "text": "(Ref: ",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "answer",
        "props": {
          "questionId": "question1",
          "label": "Q1"
        },
        "content": []
      },
      {
        "type": "text",
        "text": " )",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "2a4dc273-1f7d-48cc-9262-5526bd83f57b",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "left"
    },
    "content": [],
    "children": []
  },
  {
    "id": "2a2a2591-b063-4f66-8b1c-33f81781ef02",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "justify"
    },
    "content": [
      {
        "type": "text",
        "text": "This Agreement is made on",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": " [1 December 2025]",
        "styles": {
          "bold": true,
          "textColor": "rgb(112, 48, 160)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": ", between:",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "9ab76cb7-02d2-4c13-ad06-5e7dc6cae517",
    "type": "bulletListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "XYZ (UEN: xxxxxxxxx)",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": ", located at ABC, Singapore 123456.",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "f4cf7695-62fd-4274-918d-b770fca74f8f",
    "type": "bulletListItem",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "answer",
        "props": {
          "questionId": "question2",
          "label": "Q2"
        },
        "content": []
      },
      {
        "type": "text",
        "text": " ",
        "styles": {}
      },
      {
        "type": "text",
        "text": "(UEN: ",
        "styles": {
          "bold": true
        }
      },
      {
        "type": "answer",
        "props": {
          "questionId": "question3",
          "label": "Q3"
        },
        "content": []
      },
      {
        "type": "text",
        "text": " ",
        "styles": {}
      },
      {
        "type": "text",
        "text": ")",
        "styles": {
          "bold": true
        }
      },
      {
        "type": "text",
        "text": ", located at ",
        "styles": {}
      },
      {
        "type": "address",
        "props": {
          "format": "Street Address, City and Postal Code"
        },
        "content": []
      },
      {
        "type": "text",
        "text": " ",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "cca5ead2-c70b-41a2-9468-af64b466c203",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "left"
    },
    "content": [],
    "children": []
  },
  {
    "id": "0471dc1f-6c83-4dd4-9539-c19de1f4d7ad",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "justify"
    },
    "content": [
      {
        "type": "text",
        "text": "Project Duration and Effective Date of the Agreement:",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": " From ",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "time",
        "props": {
          "format": "Date, Month and Year"
        },
        "content": []
      },
      {
        "type": "text",
        "text": " to ",
        "styles": {}
      },
      {
        "type": "time",
        "props": {
          "format": "Date, Month and Year"
        },
        "content": []
      },
      {
        "type": "text",
        "text": " ",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "8f13540a-90d1-48e3-8138-da0a45ccdf4f",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "left"
    },
    "content": [],
    "children": []
  },
  {
    "id": "d082e6cc-60ff-49eb-b3de-5400f8e4321b",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "justify"
    },
    "content": [
      {
        "type": "text",
        "text": "WHEREAS",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": ", XYZ and the Company, collectively referred to as the \"Parties\" and individually as a \"Party\", have expressed a mutual interest in collaborating on the project titled “ ",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": "[",
        "styles": {
          "bold": true,
          "textColor": "rgb(112, 48, 160)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "answer",
        "props": {
          "questionId": "question4",
          "label": "Q4"
        },
        "content": []
      },
      {
        "type": "text",
        "text": "]",
        "styles": {
          "bold": true,
          "textColor": "rgb(112, 48, 160)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": "”",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": " ",
        "styles": {
          "bold": true,
          "textColor": "rgb(112, 48, 160)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": "as detailed in the Project Documentation, which is incorporated herein as Schedule 1 (the \"Project\").",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": "\"",
        "styles": {
          "textColor": "rgb(112, 48, 160)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "7cb578f6-8691-4553-b41c-5689594acb5d",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "left"
    },
    "content": [],
    "children": []
  },
  {
    "id": "800405a9-6709-491b-a3a3-bc24425fc049",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "justify"
    },
    "content": [
      {
        "type": "text",
        "text": "NOW IT IS HEREBY AGREED",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": " as follows.",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "04a7ffec-5040-4871-be58-212a037c5896",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "left"
    },
    "content": [],
    "children": []
  },
  {
    "id": "6be61cec-8aeb-4492-8bc8-e35aaf32d9f0",
    "type": "numberedListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "Project Implementation:",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "79cad3cd-c66b-4089-ad06-b5db34553e5a",
    "type": "bulletListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "Both XYZ and the Company shall execute the Project in accordance with the Project Documentation and the terms of this Agreement.",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "76a1b292-2bb1-4dc8-a4c0-c379b460d137",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "left"
    },
    "content": [],
    "children": []
  },
  {
    "id": "6b45a483-1818-41d6-bf17-f9c19e3f76b9",
    "type": "numberedListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left",
      "start": 2
    },
    "content": [
      {
        "type": "text",
        "text": "XYZ’s Responsibilities:",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "567fab0f-9667-4f6b-8d6f-c4a30a39a58e",
    "type": "bulletListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "XYZ",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": " will assign ",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "answer",
        "props": {
          "questionId": "question6",
          "label": "Q6"
        },
        "content": []
      },
      {
        "type": "text",
        "text": " ",
        "styles": {}
      },
      {
        "type": "text",
        "text": "groups of students (a total of ",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "answer",
        "props": {
          "questionId": "question7",
          "label": "Q7"
        },
        "content": []
      },
      {
        "type": "text",
        "text": " ",
        "styles": {}
      },
      {
        "type": "text",
        "text": "students) to work on the Project.",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "55277af3-37fe-4f83-9d46-fd0f3969329b",
    "type": "numberedListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left",
      "start": 3
    },
    "content": [
      {
        "type": "text",
        "text": "Company’s Responsibilities:",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "1c5cae1a-141a-4883-bf0e-7a5f90f703bf",
    "type": "bulletListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "The Company agrees to provide necessary resources and support to facilitate the successful execution of the project.",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "8428761c-0b20-4947-8019-72313eb96605",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "left"
    },
    "content": [],
    "children": []
  },
  {
    "id": "134537bd-3267-45a2-ad19-ffa974120d52",
    "type": "numberedListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left",
      "start": 4
    },
    "content": [
      {
        "type": "text",
        "text": "Payment: ",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": "[* Please choose one]",
        "styles": {
          "bold": true,
          "textColor": "rgb(192, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "a46db8b4-44c9-416e-96ef-23bb18608561",
    "type": "bulletListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "The Company shall pay ",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": "XYZ",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": " an agreed Project Fee of S$",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": " [",
        "styles": {
          "textColor": "rgb(112, 48, 160)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "answer",
        "props": {
          "questionId": "money1",
          "label": "Money 1"
        },
        "content": []
      },
      {
        "type": "text",
        "text": "]",
        "styles": {
          "textColor": "rgb(112, 48, 160)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": " (before GST) within 30 days upon receipt of an invoice and after the completion of the Project.",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "df548532-2b3a-42aa-873a-4696c657141b",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "left"
    },
    "content": [],
    "children": []
  },
  {
    "id": "9692a7d4-bb1b-42e4-8e97-60e185ee3add",
    "type": "numberedListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left",
      "start": 5
    },
    "content": [
      {
        "type": "text",
        "text": "Confidentiality:",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "74a43484-438f-4a58-b961-005e2ad73313",
    "type": "bulletListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "Each Party agrees to maintain confidentiality regarding any project details and not disclose any Confidential Information to third parties without prior written consent from the other Party.",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "f8adc8e1-9124-425c-8d74-65bf7756e003",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "left"
    },
    "content": [],
    "children": []
  },
  {
    "id": "47cfadf5-bbb7-44fb-876b-8bb3af0d9a4b",
    "type": "numberedListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left",
      "start": 6
    },
    "content": [
      {
        "type": "text",
        "text": "Intellectual Property (IP) Rights ",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": "and Deliverables",
        "styles": {
          "bold": true,
          "textColor": "rgb(233, 113, 50)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": ":",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "51760586-5a5a-47bf-b4b6-58c8f42513fa",
    "type": "bulletListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "Any existing IP shall remain the property of its original owner. Neither party may claim ownership of the other's pre-existing IP without prior written consent.",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "7ea11951-d181-41df-ab1e-51ab57857cba",
    "type": "bulletListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(233, 113, 50)",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "The Parties acknowledge that:",
        "styles": {
          "textColor": "rgb(233, 113, 50)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "b5a2404e-3bbd-4486-949f-2cf834e2246c",
    "type": "bulletListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(233, 113, 50)",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "The deliverables under this project are created as part of an educational initiative and are provided on an “as-is” basis as part of educational initiatives without any warranties, express or implied. ",
        "styles": {
          "textColor": "rgb(233, 113, 50)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "620a1cb4-83ab-4c6c-9a95-15d10c860338",
    "type": "bulletListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(233, 113, 50)",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "Any post-processing, commercial licenses, professional enhancement or additional development required for commercial use shall be the Company’s responsibility.",
        "styles": {
          "textColor": "rgb(233, 113, 50)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "8e63e0a2-a62e-42ee-b325-c3ba2b3e769b",
    "type": "bulletListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "Subject to the Company's full and timely payment of all applicable Project Fees, the Company shall own the New IP created during the Project.",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "dcd63fa4-8ba8-456d-9418-3747e32e7e4b",
    "type": "bulletListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "Company agrees to grant ",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": "XYZ",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": " royalty-free rights to use the Project IP and any associated trademarks for non-commercial, educational, and internal purposes. Such internal purposes shall include, but are not limited to, publicity, showcase and outreach of the course, pedagogical learning and development, internal research or studies, and institutional reporting.",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "5ce7e089-b480-4dc8-8151-a884ff408308",
    "type": "bulletListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "The students involved in the Project are given limited rights to cite the Project IP or trademarks in their portfolios for academic progression or job application purposes. This right does not extend to any commercial use or public dissemination beyond personal portfolio presentation.",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "977a05ea-0a24-4fe7-b8f1-a3acf2a5bcb0",
    "type": "bulletListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "The rights granted to ",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": "XYZ",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": " and the students under this clause 6 continue indefinitely, even after the Project or Agreement ends.",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "d9d56075-4f93-4611-8249-1b4f47a92871",
    "type": "bulletListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "Unless ",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": "XYZ",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": " agrees in writing, the Company cannot use, copy, or exploit any new Project IP created during the Project after it is completed if the Company does not fully pay the Project Fees.",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "6e37e519-8fa9-431a-b21d-da39d952d8ef",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "left"
    },
    "content": [],
    "children": []
  },
  {
    "id": "d830278b-9740-4fb0-b555-da52b94c8a77",
    "type": "numberedListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left",
      "start": 7
    },
    "content": [
      {
        "type": "text",
        "text": "Liability:",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "b32f026c-713b-44af-b1f3-d7639165c227",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "left"
    },
    "content": [],
    "children": []
  },
  {
    "id": "5839602f-5946-41e3-932d-faf83e201b75",
    "type": "bulletListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "The Project is educational in nature, so mistakes by students are expected.",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "aba9c2e4-760b-425d-8fe2-9b9ea30998ae",
    "type": "bulletListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "XYZ",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": " does not guarantee the Project results or IP.",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "812eaeff-de71-4f67-a1e8-63744f4398c9",
    "type": "bulletListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "XYZ",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      },
      {
        "type": "text",
        "text": "’s liability is limited to the amount of the Project fee.",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "f7d17d05-56f1-4ab9-98e8-3f392316890c",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "left"
    },
    "content": [],
    "children": []
  },
  {
    "id": "e8568cf6-96e6-4366-a8d0-a1193b4318f5",
    "type": "numberedListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left",
      "start": 8
    },
    "content": [
      {
        "type": "text",
        "text": "Publication and Publicity:",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "946b10a0-55c4-4382-9211-ff66483787fb",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "left"
    },
    "content": [],
    "children": []
  },
  {
    "id": "c3dfc3f7-96c0-495f-8589-ea3c58668968",
    "type": "bulletListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "Both Parties must obtain written consent from each other before publishing findings or using each other’s names for publicity.",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "09899fc1-940f-4f28-a3ce-7ef3ef691eec",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "left"
    },
    "content": [],
    "children": []
  },
  {
    "id": "294c8aeb-0384-447d-bad3-8ef8d30a54e4",
    "type": "numberedListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left",
      "start": 9
    },
    "content": [
      {
        "type": "text",
        "text": "Termination:",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "6bffe134-b691-49ae-a6db-3c4e426800b6",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "left"
    },
    "content": [],
    "children": []
  },
  {
    "id": "d335f905-1ea6-467a-9ba6-5c44fc001305",
    "type": "bulletListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "Either party may terminate this Agreement with written notice if the other Party breaches any terms and does not remedy the breach within 30 days.",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "90bd4b72-9216-44d7-9614-32a99ea4ca61",
    "type": "bulletListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "The Agreement may also be terminated by mutual consent.",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "c0cf6826-c4d9-4019-b69b-34fcad560383",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "\n",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "33606ee6-b1f7-4733-99be-253961b8d14b",
    "type": "numberedListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left",
      "start": 10
    },
    "content": [
      {
        "type": "text",
        "text": "General Terms:",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "5c0c0581-ea65-40fd-8ce7-5bc42f113615",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "left"
    },
    "content": [],
    "children": []
  },
  {
    "id": "cbc48606-654e-45d8-863b-4a1a3730f238",
    "type": "bulletListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "Any amendments to this Agreement must be in writing and signed by both Parties.",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "22c4bee7-c444-4eef-805c-51bf8e599be6",
    "type": "bulletListItem",
    "props": {
      "backgroundColor": "transparent",
      "textColor": "rgb(0, 0, 0)",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "The agreement shall be governed by the laws of Singapore. ",
        "styles": {
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "6a67e50f-18dd-43e6-b06f-62d69cdc7666",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "left"
    },
    "content": [],
    "children": []
  },
  {
    "id": "c3d8de14-56ad-474c-ac9c-fae24beb9e1b",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "justify"
    },
    "content": [
      {
        "type": "text",
        "text": "Signatures:",
        "styles": {
          "bold": true,
          "textColor": "rgb(0, 0, 0)",
          "backgroundColor": "transparent"
        }
      }
    ],
    "children": []
  },
  {
    "id": "0ba7edf4-bce5-4e2e-b8a0-d926c91148fd",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "signature",
        "props": {
          "backgroundColor": "default",
          "textColor": "default",
          "textAlignment": "left",
          "signatureId": "signature1",
          "label": "Signature 1"
        },
        "content": []
      },
      {
        "type": "text",
        "text": " ",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "4ad474e6-8a1f-4cc1-960d-61e77ee21bb6",
    "type": "table",
    "props": {
      "textColor": "default"
    },
    "content": {
      "type": "tableContent",
      "columnWidths": [
        null,
        null,
        null
      ],
      "rows": [
        {
          "cells": [
            {
              "type": "tableCell",
              "content": [
                {
                  "type": "text",
                  "text": "For Ngee Ann Polytechnic:",
                  "styles": {
                    "bold": true,
                    "textColor": "rgb(0, 0, 0)",
                    "backgroundColor": "transparent"
                  }
                },
                {
                  "type": "text",
                  "text": "[Name of School Director]Director, [School]\n",
                  "styles": {
                    "textColor": "rgb(0, 0, 0)",
                    "backgroundColor": "transparent"
                  }
                },
                {
                  "type": "text",
                  "text": " ",
                  "styles": {
                    "bold": true,
                    "textColor": "rgb(0, 0, 0)",
                    "backgroundColor": "transparent"
                  }
                }
              ],
              "props": {
                "colspan": 1,
                "rowspan": 1,
                "backgroundColor": "default",
                "textColor": "default",
                "textAlignment": "left"
              }
            },
            {
              "type": "tableCell",
              "content": [
                {
                  "type": "text",
                  "text": "\n",
                  "styles": {}
                }
              ],
              "props": {
                "colspan": 1,
                "rowspan": 1,
                "backgroundColor": "default",
                "textColor": "default",
                "textAlignment": "left"
              }
            },
            {
              "type": "tableCell",
              "content": [
                {
                  "type": "text",
                  "text": "For [Name of Industry Partner]:",
                  "styles": {
                    "bold": true,
                    "textColor": "rgb(0, 0, 0)",
                    "backgroundColor": "transparent"
                  }
                },
                {
                  "type": "text",
                  "text": "[Name of Signatory][Designation]\n",
                  "styles": {
                    "textColor": "rgb(0, 0, 0)",
                    "backgroundColor": "transparent"
                  }
                }
              ],
              "props": {
                "colspan": 1,
                "rowspan": 1,
                "backgroundColor": "default",
                "textColor": "default",
                "textAlignment": "left"
              }
            }
          ]
        }
      ]
    },
    "children": []
  },
  {
    "id": "41f86be4-503b-4d94-b771-cb95f23698b1",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "left"
    },
    "content": [],
    "children": []
  },
  {
    "id": "080b9cb4-2d2f-4d5c-bd88-0a3a6f617883",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "left"
    },
    "content": [],
    "children": []
  },
  {
    "id": "d2d4f667-44d0-4a24-9263-49ddf4b5ed64",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "left"
    },
    "content": [],
    "children": []
  },
  {
    "id": "38c78270-48a3-4592-a61e-62413b5b972a",
    "type": "paragraph",
    "props": {
      "backgroundColor": "default",
      "textColor": "default",
      "textAlignment": "left"
    },
    "content": [],
    "children": []
  }
];

export const sampleWorkflowStudentLedCommissionProjectAgreement = {
  "name": "Student-Led Commission Project Agreement",
  "nodes": [
    {
      "id": "0de6dcb2-5cc0-4c01-a653-eaae80019c12",
      "type": "node",
      "position": {
        "x": 648,
        "y": 810
      },
      "data": {
        "segments": [],
        "properties": {
          "label": "Form",
          "description": "Create a form with custom fields",
          "type": "form",
          "status": "active",
          "formBody": {
            "time": "",
            "time1": "Date, Month and Year",
            "question1": "Enter reference number",
            "question2": "Enter contractor name",
            "question3": "Enter contractor UEN",
            "address1": "Street Address, City and Postal Code",
            "currentTime1": "Date, Month and Year",
            "time2": "Date, Month and Year",
            "address1Label": "Enter contractor address",
            "question6": "Enter number of student groups",
            "question7": "Enter number of student per group",
            "time1Label": "Enter project effective date of agreement",
            "time2Label": "Enter project effective date of end",
            "question4": "Enter project title",
            "money1": "Enter project fee",
            "money1Currency": "SGD"
          },
          "errors": []
        },
        "type": "form",
        "icon": "Article",
        "editorContent": editorContent,
        "previewMode": "editDocument"
      },
      "selected": true,
      "measured": {
        "width": 900,
        "height": 1331
      },
      "dragging": false
    },
    {
      "id": "e33392e0-dbd7-432a-ae2e-316ac5a67d90",
      "type": "node",
      "position": {
        "x": 1188,
        "y": 810
      },
      "data": {
        "segments": [],
        "properties": {
          "label": "Approval",
          "description": "Approval node linked to other",
          "type": "approval",
          "status": "active",
          "linkedNodeId": "0de6dcb2-5cc0-4c01-a653-eaae80019c12",
          "noteRequirement": "optional",
          "notePlaceholder": "Additional note",
          "formBody": {
            "signature1": "Upload Nee Ann Polytechnic signature"
          },
          "errors": []
        },
        "type": "approval",
        "icon": "CheckCircle",
        "editorContent": editorContent
      },
      "selected": false,
      "measured": {
        "width": 309,
        "height": 74
      },
      "dragging": false
    }
  ],
  "edges": [
    {
      "source": "0de6dcb2-5cc0-4c01-a653-eaae80019c12",
      "sourceHandle": "0de6dcb2-5cc0-4c01-a653-eaae80019c12:source",
      "target": "e33392e0-dbd7-432a-ae2e-316ac5a67d90",
      "targetHandle": "e33392e0-dbd7-432a-ae2e-316ac5a67d90:target",
      "type": "labelEdge",
      "id": "xy-edge__0de6dcb2-5cc0-4c01-a653-eaae80019c120de6dcb2-5cc0-4c01-a653-eaae80019c12:source-e33392e0-dbd7-432a-ae2e-316ac5a67d90e33392e0-dbd7-432a-ae2e-316ac5a67d90:target"
    }
  ],
  "layoutDirection": "RIGHT"
} satisfies IntegrationDataFormat;
