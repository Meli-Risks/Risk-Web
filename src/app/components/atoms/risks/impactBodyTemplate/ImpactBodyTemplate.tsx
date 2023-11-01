import {Impact, RiskResponse} from "../../../../lib";
import {Badge} from "primereact/badge";
import React from "react";
import {getSeverity} from "../../../../utils/risks";

type Props = {
    risk: RiskResponse;
}

export const ImpactBodyTemplate = ({risk}: Props) => {
  return (
      <div className="flex align-items-center gap-2">
          <Badge className="text-white" value={Impact[risk.impact]} severity={getSeverity(risk.impact)}/>
      </div>
  );
}