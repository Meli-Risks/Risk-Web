import {RiskResponse} from "../../../../lib";
import React from "react";

type Props = {
    risk: RiskResponse;
}

/**
 * ProviderBodyTemplate component for displaying the provider's name associated with a risk.
 *
 * @param props - The component's properties.
 * @param props.risk - The risk data containing provider information.
 * @returns A component for rendering the name of the provider associated with a risk.
 */
export const ProviderBodyTemplate = ({risk}: Props) => {
  return (
      <div className="flex align-items-center gap-2">
          <span>{risk.provider.name}</span>
      </div>
  );
}
