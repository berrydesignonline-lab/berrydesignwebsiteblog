import Image from "next/image"

export function Logo({ white = true, className = "" }: { white?: boolean; className?: string }) {
  return (
    <Image
      src={white ? "/assets/logo/white-logo.png" : "/assets/logo/logo-v1.png"}
      alt="Berry Design Qatar"
      width={140}
      height={40}
      className={`object-contain ${className}`}
      priority
    />
  )
}
