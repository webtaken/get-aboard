export const defaultEditorContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Add a description to the node" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Type '/' to see a list of commands. If you need help on how to use the editor see this example: ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://novel.sh/",
                target: "_blank",
              },
            },
          ],
          text: "Novel",
        },
        {
          type: "text",
          text: ".",
        },
      ],
    },
  ],
};
