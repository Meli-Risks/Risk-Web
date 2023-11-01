import {RiskResponse} from "../../../../lib";
import React from "react";

type Props = {
    risk: RiskResponse;
}

export const ProviderBodyTemplate = ({risk}: Props) => {
  return (
      <div className="flex align-items-center gap-2">
          <span>{risk.provider.name}</span>
      </div>
  );
}