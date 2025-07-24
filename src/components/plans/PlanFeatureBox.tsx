
import React from "react";

interface PlanFeatureBoxProps {
  title: string;
  description: string;
}

const PlanFeatureBox = ({ title, description }: PlanFeatureBoxProps) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-lg">
      <h3 className="font-semibold text-xl mb-2 text-primary">{title}</h3>
      <p className="text-foreground/80">{description}</p>
    </div>
  );
};

export default PlanFeatureBox;
