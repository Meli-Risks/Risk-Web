import {Impact, RiskResponse} from "../../../../lib";
import {Badge} from "primereact/badge";
import React from "react";
import {getSeverity} from "../../../../utils/risks";

type Props = {
    risk: RiskResponse;
}

/**
 * ImpactBodyTemplate component for displaying the impact of a risk as a badge.
 *
 * @param props - The component's properties.
 * @param props.risk - The risk data containing impact information.
 * @returns A component that displays the impact of a risk as a badge with severity.
 */
export const ImpactBodyTemplate = ({risk}: Props) => {
  return (
      <div className="flex align-items-center gap-2">
          <Badge className="text-white" value={Impact[risk.impact]} severity={getSeverity(risk.impact)}/>
      </div>
  );
}
