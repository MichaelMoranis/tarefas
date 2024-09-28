export default function CurrentDate() {
  const currentDate = new Date().toLocaleDateString()
  return (
    <div>
      <div className="flex  items-center  gap-4 text-xl font-mono">

        {currentDate}
      </div>
      <div className="text-xs font-bold">
        <a href="https://moranis.vercel.app" target="_blank">
          feito por @moranisdev
        </a>
      </div>
    </div>
  )
}
