import {Probability, RiskResponse} from "../../../../lib";
import {Badge} from "primereact/badge";
import React from "react";
import {getSeverity} from "../../../../utils/risks";

type Props = {
    risk: RiskResponse;
}

export const ProbabilityBodyTemplate = ({risk}: Props) => {
    return (
        <div className="flex align-items-center gap-2">
            <Badge className="text-white" value={Probability[risk.probability]}
                   severity={getSeverity(risk.probability)}/>
        </div>
    );
}