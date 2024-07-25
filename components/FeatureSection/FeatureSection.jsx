"use client";

import React from "react";
import FeaturesSectionGrid from "./FeatureSectionGrid";
import FeaturesSectionList from "./FeatureSectionList";

export default function FeatureSection() {
  return (
    <div className="mt-40 lg:mt-60  mx-10">
      <FeaturesSectionGrid />
      <FeaturesSectionList />
    </div>
  );
}
