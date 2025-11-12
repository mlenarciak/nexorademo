import { createFlag } from "./lib/create-flag";

export const showBetaFeature = createFlag("showBetaFeature");

export const flags = [showBetaFeature] as const;
