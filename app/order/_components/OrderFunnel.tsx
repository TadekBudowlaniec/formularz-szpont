"use client";

import { useState } from "react";
import type { BriefData } from "@/lib/schemas";
import ProgressBar from "./ProgressBar";
import Sidebar from "./Sidebar";
import Step1Services from "./Step1Services";
import Step2Brief from "./Step2Brief";
import Step3Summary from "./Step3Summary";

export default function OrderFunnel() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [brief, setBrief] = useState<BriefData | null>(null);

  function toggle(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
      <ProgressBar step={step} />

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          {step === 1 && (
            <Step1Services
              selectedIds={selectedIds}
              onToggle={toggle}
            />
          )}
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
          {step === 3 && brief && (
            <Step3Summary
              selectedIds={selectedIds}
              brief={brief}
              onBack={() => setStep(2)}
            />
          )}
        </div>

        <div className="md:col-span-1">
          <Sidebar
            selectedIds={selectedIds}
            step={step}
            onNext={step === 1 ? () => setStep(2) : undefined}
            nextDisabled={selectedIds.length === 0}
          />
        </div>
      </div>
    </main>
  );
}
