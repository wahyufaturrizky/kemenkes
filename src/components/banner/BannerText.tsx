interface BannerTextProps {
  topic?: string
  highlightHeader?: string
  highlight?: string
  highlightFooter?: JSX.Element
  updatedDate?: string
  source?: string
}

const BannerText: React.FC<BannerTextProps> = ({
  topic, highlightHeader, highlight, highlightFooter, updatedDate, source
}) => {
  return (
    <div className="h-full flex flex-col justify-around gap-4 py-6 whitespace-break-spaces text-white">
      <div className="text-lg sm:text-2xl md:text-4xl">{topic}</div>
      <div className="flex flex-col gap-2">
        <div className="text-xl md:text-3xl">{highlightHeader}</div>
        <div className="text-2xl sm:text-3xl md:text-5xl font-bold">{highlight}</div>
        <div>{highlightFooter}</div>
      </div>
      <div>
        <div className="font-bold">{updatedDate}</div>
        <div className="sm:text-xl">{source}</div>
      </div>
    </div>
  )
}

export default BannerText