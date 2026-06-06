export function AdSlot({ slot, className = "" }: { slot: string; className?: string }) {
  return (
    <div className={`my-6 ${className}`}>
      <div className="border border-dashed border-gray-200 rounded-lg bg-gray-50/50 flex items-center justify-center min-h-[90px]">
        <p className="text-xs text-gray-300">Ad — {slot}</p>
      </div>
    </div>
  );
}
