"use client";

import { useState } from "react";
import type { BriefData } from "@/lib/schemas";
import type { PackageId } from "@/lib/packages";
import ProgressBar from "./ProgressBar";
import Sidebar from "./Sidebar";
import Step1Packages from "./Step1Packages";
import Step2Brief from "./Step2Brief";
import Step3Summary from "./Step3Summary";

export default function OrderFunnel() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [packageId, setPackageId] = useState<PackageId | null>(null);
  const [brief, setBrief] = useState<BriefData | null>(null);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
      <ProgressBar step={step} />

      {step === 1 ? (
        <Step1Packages
          onChoose={(id) => {
            setPackageId(id);
            setStep(2);
          }}
        />
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            {step === 2 && (
              <Step2Brief
                defaultValues={brief ?? undefined}
                onBack={() => setStep(1)}
                onSubmit={(data) => {
                  setBrief(data);
                  setStep(3);
                }}
              />
            )}
            {step === 3 && brief && packageId && (
              <Step3Summary
                packageId={packageId}
                brief={brief}
                onBack={() => setStep(2)}
              />
            )}
          </div>

          <div className="md:col-span-1">
            <Sidebar packageId={packageId} />
          </div>
        </div>
      )}
    </main>
  );
}
