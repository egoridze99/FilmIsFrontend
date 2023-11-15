import {SidePanel} from ".";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import React, {useState} from "react";

export default {
  title: "UI/SidePanel",
  component: SidePanel
} as ComponentMeta<typeof SidePanel>;

const Template: ComponentStory<typeof SidePanel> = (args) => {
  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow((prev) => !prev);
  };
  return (
    <>
      <button onClick={toggleShow}>Toggle SidePanel</button>
      {show && <SidePanel {...args} togglePanel={toggleShow} />}
    </>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  children: "Content"
};
