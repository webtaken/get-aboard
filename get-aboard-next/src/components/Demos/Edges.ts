import { edgesClass } from "@/stores/FlowMapStore";
import { Edge } from "reactflow";

export const initialEdges: Edge[] = [
  {
    id: "0",
    source: "0",
    target: "1",
    animated: true,
    type: "smoothstep",
    style: edgesClass,
  },
  {
    id: "1",
    source: "0",
    target: "2",
    animated: true,
    type: "smoothstep",
    style: edgesClass,
  },
  {
    id: "2",
    source: "2",
    target: "3",
    animated: true,
    type: "smoothstep",
    style: edgesClass,
  },
  {
    id: "3",
    source: "2",
    target: "4",
    animated: true,
    type: "smoothstep",
    style: edgesClass,
  },
  {
    id: "4",
    source: "2",
    target: "5",
    animated: true,
    type: "smoothstep",
    style: edgesClass,
  },
  {
    id: "5",
    source: "1",
    target: "6",
    animated: true,
    type: "smoothstep",
    style: edgesClass,
  },
  {
    id: "6",
    source: "3",
    target: "6",
    animated: true,
    type: "smoothstep",
    style: edgesClass,
  },
  {
    id: "7",
    source: "4",
    target: "6",
    animated: true,
    type: "smoothstep",
    style: edgesClass,
  },
  {
    id: "8",
    source: "5",
    target: "6",
    animated: true,
    type: "smoothstep",
    style: edgesClass,
  },
  {
    id: "9",
    source: "6",
    target: "7",
    animated: true,
    type: "smoothstep",
    style: edgesClass,
  },
  {
    id: "10",
    source: "6",
    target: "8",
    animated: true,
    type: "smoothstep",
    style: edgesClass,
  },
  {
    id: "11",
    source: "6",
    target: "9",
    animated: true,
    type: "smoothstep",
    style: edgesClass,
  },
  {
    id: "12",
    source: "7",
    target: "10",
    animated: true,
    type: "smoothstep",
    style: edgesClass,
  },
  {
    id: "13",
    source: "8",
    target: "10",
    animated: true,
    type: "smoothstep",
    style: edgesClass,
  },
  {
    id: "14",
    source: "9",
    target: "10",
    animated: true,
    type: "smoothstep",
    style: edgesClass,
  },
];
