import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Button,
  FloatingPanelPopover,
  FloatingPanelPopoverContent,
  FloatingPanelPopoverTrigger,
} from "@webstudio-is/design-system";
import { VariablesPanel } from "./variables";
import {
  propsStore,
  selectedInstanceSelectorStore,
} from "~/shared/nano-states";
import { registerContainers } from "~/shared/sync";

export default {
  title: "Builder/Variables",
  component: VariablesPanel,
} satisfies Meta;

registerContainers();
selectedInstanceSelectorStore.set(["root"]);

const initialProp = {
  id: "my-prop",
  instanceId: "#",
  name: "my-prop",
  type: "string",
  value: "initial",
} as const;
propsStore.set(new Map([[initialProp.id, initialProp]]));

const VariablesPopover = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <FloatingPanelPopover open={isOpen} onOpenChange={setIsOpen}>
      <FloatingPanelPopoverTrigger asChild>
        <Button>Open variables panel</Button>
      </FloatingPanelPopoverTrigger>
      <FloatingPanelPopoverContent align="start">
        <VariablesPanel
          propId="my-prop"
          propName="my-prop"
          propMeta={{
            required: false,
            control: "text",
            type: "string",
            defaultValue: "initial",
          }}
        />
      </FloatingPanelPopoverContent>
    </FloatingPanelPopover>
  );
};

export const Variables: StoryObj = {
  render: () => <VariablesPopover />,
};
