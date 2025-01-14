"use client";
import React, { useCallback } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from "@xyflow/react";
import { cn } from "@/lib/utils";
import "@xyflow/react/dist/style.css";
import { createFlowNode } from "./utils/create-flow-node";
import { ComponentTypeEnum } from "@/types/flow/flow-component";
import { NodeComponent } from "./flow-components/generic-component/generic-component";

export interface FlowPageProps {
  params: {
    folderId?: string;
    flowId: string;
  };
}
const initialNodes = [
  createFlowNode({ componentType: ComponentTypeEnum.AGENT }),
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const nodeTypes = {
  geneicNode: NodeComponent,
};

const FlowPageView = ({ params }: FlowPageProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="w-full  h-full bg-canvas">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Panel
          className={cn(
            " z-10 w-fit transition-all  gap-1.5  delay-10 bg-background fill-background stroke-background   m-2 rounded-md flex items-center justify-center group-data-[open=true]/sidebar-wrapper:opacity-0 group-data-[open=true]/sidebar-wrapper:translate-x-full opacity-100:"
          )}
          position="top-left"
        >
          <SidebarTrigger
            title="Components"
            className="px-3 py-1.5 border w-full"
          >
            Components
          </SidebarTrigger>
        </Panel>
        <Controls />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default FlowPageView;
