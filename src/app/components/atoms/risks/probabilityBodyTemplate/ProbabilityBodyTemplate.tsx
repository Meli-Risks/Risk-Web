import {Probability, RiskResponse} from "../../../../lib";
import {Badge} from "primereact/badge";
import React from "react";
import {getSeverity} from "../../../../utils/risks";

type Props = {
    risk: RiskResponse;
}

/**
 * ProbabilityBodyTemplate component for displaying the probability of a risk as a badge.
 *
 * @param props - The component's properties.
 * @param props.risk - The risk data containing probability information.
 * @returns A component that displays the probability of a risk as a badge with severity.
 */
export const ProbabilityBodyTemplate = ({risk}: Props) => {
    return (
        <div className="flex align-items-center gap-2">
            <Badge className="text-white" value={Probability[risk.probability]}
                   severity={getSeverity(risk.probability)}/>
        </div>
    );
}