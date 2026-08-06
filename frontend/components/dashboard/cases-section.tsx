import { FraudCase } from "@/types/dashboard";
import { Badge } from "@/components/ui/badge";

interface Props {
  cases: FraudCase[];
}

export default function CasesSection({
  cases,
}: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">

      <h2 className="mb-6 text-lg font-semibold">
        Recent Cases
      </h2>

      {cases.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No active investigations.
        </p>
      ) : (
        <div className="space-y-4">

          {cases.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-border pb-4"
            >
              <div>

                <h3 className="font-medium">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {item.transaction.merchant}
                </p>

              </div>

              <Badge>
                {item.status}
              </Badge>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}