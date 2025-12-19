export default function BreakingNewsBar() {
  return (
    <div className="bg-orange-500 text-white py-2 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-4">
          <span className="font-bold text-sm whitespace-nowrap">BREAKING:</span>
          <div className="flex-1 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap">
              <span className="inline-block mr-8">
                SSC CGL Admit Card Out! Check Now →
              </span>
              <span className="inline-block mr-8">
                UPSC Civil Services 2024 Notification Released →
              </span>
              <span className="inline-block mr-8">
                RBI Grade B Results Declared →
              </span>
              <span className="inline-block mr-8">
                New PM Kisan Scheme Benefits Announced →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

