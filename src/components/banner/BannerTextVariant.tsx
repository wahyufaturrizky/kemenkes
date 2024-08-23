interface BannerTextVariantProps {
  highlight?: string
  highlightFooter?: JSX.Element
}

const BannerTextVariant: React.FC<BannerTextVariantProps> = ({
  highlight, highlightFooter
}) => {
  return (
    <div className="h-full md:w-3/4 flex flex-col justify-around gap-4 py-6 whitespace-break-spaces text-white">
      <div className="text-2xl sm:text-3xl md:text-5xl font-bold">{highlight}</div>
      <div>{highlightFooter}</div>
    </div>
  )
}

export default BannerTextVariant