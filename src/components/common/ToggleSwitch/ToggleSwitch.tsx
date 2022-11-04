import { useState } from "react";
import { Switch } from "@headlessui/react";

interface Props {
  onClick: () => void;
}

export default function ToggleSwitch(props: Props) {
  const { onClick } = props;

  const [enabled, setEnabled] = useState(false);

  const onSwitchToggle = (value: boolean) => {
    setEnabled(value);
    onClick();
  };

  return (
    <Switch
      checked={enabled}
      onChange={onSwitchToggle}
      className={`${enabled ? "bg-primary" : "bg-background-300"}
          ${
            enabled ? "border-primary" : "border-background-300"
          } border-transparent relative inline-flex h-[28px] w-[48px] shrink-0 scale-75 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 min-[600px]:scale-100`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${enabled ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
}
